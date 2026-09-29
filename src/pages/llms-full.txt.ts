import type { APIRoute } from "astro";
import { audits } from "../lib/audits";
import { auditMarkdown } from "../lib/markdown";
import { CONTACT_EMAIL, PROCESS, SERVICES, SITE_URL } from "../lib/seo";
import { computeStats } from "../lib/stats";

export const GET: APIRoute = () => {
  const s = computeStats(audits);
  const body = `# Codezen: smart contract and blockchain security audits

Website: ${SITE_URL}/
Contact: ${CONTACT_EMAIL}

Codezen is a cybersecurity firm specializing in blockchain and Web3 technologies. It has published ${s.auditCount} security audits and reported ${s.vulnCount} vulnerabilities (${s.criticalCount} critical) across ${s.ecosystemCount} ecosystems.

## Services

${SERVICES.map((sv) => `### ${sv.title}\n\n${sv.longDescription}`).join("\n\n")}

## How Codezen works

${PROCESS.map((p, i) => `${i + 1}. ${p.step}: ${p.description}`).join("\n")}

## Audits

${audits.map((a) => auditMarkdown(a, 3)).join("\n\n---\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
