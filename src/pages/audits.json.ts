import type { APIRoute } from "astro";
import { audits, techTags, totalFindings } from "../lib/audits";
import { abs, SITE_NAME } from "../lib/seo";
import { ecosystemsOf } from "../lib/stats";

// Machine-readable index of every public Codezen audit
export const GET: APIRoute = () =>
  Response.json({
    publisher: SITE_NAME,
    url: abs("/portfolio/"),
    count: audits.length,
    audits: audits.map((a) => ({
      title: a.title,
      url: abs(a.path),
      markdown: abs(`/audits/${a.slug}.md`),
      type: a.description,
      summary: a.extendedDescription,
      technologies: techTags(a),
      ecosystems: ecosystemsOf(a),
      partner: a.partner || null,
      reportDate: a.reportDate,
      reportPdf: a.github || null,
      projectWebsite: a.website || null,
      findings: a.issues ? { ...a.issues, total: totalFindings(a.issues) } : null,
    })),
  });
