import { SEVERITIES, auditSummary, formatDate, techTags, totalFindings, type Audit } from "./audits";
import { abs, CONTACT_EMAIL } from "./seo";
import { ecosystemsOf } from "./stats";

// Plain-markdown description of an audit, for /audits/<slug>.md and llms-full.txt
export const auditMarkdown = (a: Audit, level = 1) => {
  const h = "#".repeat(level);
  const total = totalFindings(a.issues);
  const facts = [
    ["Audit type", a.description],
    ["Technologies", techTags(a).join(", ")],
    ["Ecosystem", ecosystemsOf(a).join(", ")],
    ["Delivered with", a.partner],
    ["Report date", a.reportDate ? formatDate(a.reportDate) : undefined],
    ["Full report (PDF)", a.github],
    ["Project website", a.website],
    ["Page", abs(a.path)],
  ].filter(([, v]) => v);

  return `${h} ${a.title} security audit

${a.extendedDescription || ""}

${auditSummary(a)}

${facts.map(([k, v]) => `- ${k}: ${v}`).join("\n")}
${
  total > 0
    ? `\n${h}# Findings by severity\n\n| Severity | Count |\n| --- | --- |\n${SEVERITIES.map((s) => `| ${s.label} | ${a.issues?.[s.key] || 0} |`).join("\n")}\n| Total | ${total} |\n`
    : ""
}${level === 1 ? `\nNeed a similar audit? Email ${CONTACT_EMAIL} or visit ${abs("/")}.\n` : ""}`;
};
