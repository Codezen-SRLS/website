import type { APIRoute } from "astro";
import { audits } from "../lib/audits";
import { CONTACT_EMAIL, SERVICES, SITE_URL, abs } from "../lib/seo";
import { computeStats } from "../lib/stats";

// https://llmstxt.org
export const GET: APIRoute = () => {
  const s = computeStats(audits);
  const featured = audits.filter((a) => a.featured);
  const body = `# Codezen

> Codezen (Codezen S.r.l., Italy) is a blockchain and Web3 security firm. It performs smart contract security audits and blockchain security consulting for EVM, Solana, Cosmos, Polkadot/Substrate and other ecosystems, reviewing Solidity, Rust, Anchor, CosmWasm, Cosmos SDK (Go), Substrate and Move code.

Track record: ${s.auditCount} published audits, ${s.vulnCount} vulnerabilities reported (${s.criticalCount} critical)${s.assetsProtected ? `, ${s.assetsProtected} in assets protected` : ""}, across ${s.ecosystemCount} ecosystems.

To request an audit, email ${CONTACT_EMAIL} with the project name, repository/scope, technology stack and preferred timeline, or use the "Request an audit" form on ${SITE_URL}/. Codezen replies within one business day.

## Services

${SERVICES.map((sv) => `- ${sv.title}: ${sv.longDescription}`).join("\n")}

## Main pages

- [Home](${SITE_URL}/): services, process, featured report, team
- [Audit portfolio](${SITE_URL}/portfolio/): every public audit, searchable
- [Privacy policy](${SITE_URL}/privacy-policy/)

## Data

- [All audits as JSON](${abs("/audits.json")}): title, technologies, partner, date, findings by severity, report PDF
- [Full text for LLMs](${abs("/llms-full.txt")}): services and every audit in one file

## Featured audits

${featured.map((a) => `- [${a.title} security audit](${abs(`/audits/${a.slug}.md`)}): ${a.description}${a.partner ? `, with ${a.partner}` : ""}`).join("\n")}

## Optional

${audits
  .filter((a) => !a.featured)
  .map((a) => `- [${a.title} security audit](${abs(`/audits/${a.slug}.md`)}): ${a.description}`)
  .join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
