import type { APIRoute, GetStaticPaths } from "astro";
import { audits, type Audit } from "../../lib/audits";
import { auditMarkdown } from "../../lib/markdown";

// Markdown twin of each audit page, linked from its <head> for agents
export const getStaticPaths: GetStaticPaths = () =>
  audits.map((audit) => ({ params: { slug: audit.slug }, props: { audit } }));

export const GET: APIRoute = ({ props }) =>
  new Response(auditMarkdown((props as { audit: Audit }).audit, 1), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
