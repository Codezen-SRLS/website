import type { APIRoute, GetStaticPaths } from "astro";
import { audits, type Audit } from "../../../lib/audits";
import { auditOg } from "../../../lib/og";

export const getStaticPaths: GetStaticPaths = () =>
  audits.map((audit) => ({ params: { slug: audit.slug }, props: { audit } }));

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await auditOg((props as { audit: Audit }).audit)), {
    headers: { "Content-Type": "image/png" },
  });
