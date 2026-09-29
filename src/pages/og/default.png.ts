import type { APIRoute } from "astro";
import { defaultOg } from "../../lib/og";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await defaultOg()), { headers: { "Content-Type": "image/png" } });
