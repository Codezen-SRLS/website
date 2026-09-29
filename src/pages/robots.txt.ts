import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/seo";

// Search engines and AI agents are all welcome; the site is public marketing content.
const AGENTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot"];

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      ...AGENTS.flatMap((a) => [`User-agent: ${a}`, "Allow: /", ""]),
      `Sitemap: ${SITE_URL}/sitemap-index.xml`,
      "",
      `# Machine-readable summaries: ${SITE_URL}/llms.txt, ${SITE_URL}/llms-full.txt, ${SITE_URL}/audits.json`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
