const path = require(`path`);

// GA_TRACKING_ID is set without the GATSBY_ prefix in CI, so expose it to the
// browser bundle explicitly; analytics load from src/lib/consent.js after opt-in.
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.GA_TRACKING_ID": JSON.stringify(process.env.GA_TRACKING_ID || ""),
      }),
    ],
  });
};

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Report file names usually start with the publication date, e.g. "2025-10-17 Audit Report ..."
const reportDate = (url) => {
  const match = decodeURIComponent(url || "").match(/(20\d\d)[-_.](\d\d)[-_.](\d\d)/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type !== `AuditHistoryJson`) return;
  actions.createNodeField({ node, name: `reportDate`, value: reportDate(node.github) || `` });
};

// Page paths for every audit, resolved together so collisions can be handled:
// 1. an explicit `slug` in audit-history.json always wins;
// 2. otherwise the slugified title;
// 3. titles that collide get their report date appended (stable, unlike "-2");
// 4. anything still ambiguous fails the build instead of overwriting a page.
const resolveAuditPaths = (audits) => {
  const base = new Map();
  audits.forEach((a) => base.set(a.id, a.slug ? slugify(a.slug) : slugify(a.title)));

  const groups = new Map();
  audits.forEach((a) => {
    const key = base.get(a.id);
    groups.set(key, [...(groups.get(key) || []), a]);
  });

  const paths = new Map();
  const conflicts = [];
  groups.forEach((group, key) => {
    if (group.length === 1) {
      paths.set(group[0].id, `/audits/${key}/`);
      return;
    }
    const dated = group.map((a) => ({ a, date: reportDate(a.github) }));
    const dates = dated.map((d) => d.date);
    const canUseDates = group.every((a) => !a.slug) && dates.every(Boolean) && new Set(dates).size === dates.length;
    if (!canUseDates) {
      conflicts.push(`"${key}": ${group.map((a) => a.title).join(`, `)}`);
      return;
    }
    dated.forEach(({ a, date }) => paths.set(a.id, `/audits/${key}-${date}/`));
  });

  if (conflicts.length) {
    throw new Error(
      `Audit page URLs collide. Add a unique "slug" to these entries in audit-history.json:\n  ${conflicts.join(`\n  `)}`
    );
  }
  return paths;
};

// Recomputed per lookup (cheap for ~100 audits) so `gatsby develop` never serves stale paths
const getAuditPaths = async (nodeModel) => {
  const { entries } = await nodeModel.findAll({ type: `AuditHistoryJson` });
  return resolveAuditPaths(Array.from(entries));
};

exports.createSchemaCustomization = ({ actions }) => {
  // Declared so audit-history.json entries may optionally set their own URL slug
  actions.createTypes(`
    type AuditHistoryJson implements Node {
      slug: String
    }
  `);
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    AuditHistoryJson: {
      pagePath: {
        type: `String!`,
        resolve: async (source, args, context) => (await getAuditPaths(context.nodeModel)).get(source.id),
      },
    },
  });
};

exports.resolveAuditPaths = resolveAuditPaths;

// Tags too generic to say two audits are related
const GENERIC_TAGS = new Set([`audit`, `blockchain`, `smart contract`]);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allAuditHistoryJson {
        nodes {
          id
          tags
          pagePath
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Could not load audits for audit pages`, result.errors);
    return;
  }

  const audits = result.data.allAuditHistoryJson.nodes;
  const tagSet = (a) => new Set((a.tags || []).map((t) => t.toLowerCase()).filter((t) => !GENERIC_TAGS.has(t)));

  audits.forEach((audit) => {
    const own = tagSet(audit);
    const related = audits
      .filter((other) => other.id !== audit.id)
      .map((other) => ({ id: other.id, shared: [...tagSet(other)].filter((t) => own.has(t)).length }))
      .filter((o) => o.shared > 0)
      .sort((a, b) => b.shared - a.shared)
      .slice(0, 3)
      .map((o) => o.id);

    actions.createPage({
      path: audit.pagePath,
      component: path.resolve(`src/templates/audit.js`),
      context: { id: audit.id, related },
    });
  });
};
