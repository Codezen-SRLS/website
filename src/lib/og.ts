// Build-time Open Graph images (1200×630) in the Prism style, rendered with satori.
import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { SEVERITIES, totalFindings, type Audit } from "./audits";
import { clampWords } from "./seo";

const root = process.cwd();
const font = (pkg: string, file: string) => readFile(path.join(root, "node_modules/@fontsource", pkg, "files", file));

let fonts: Promise<{ name: string; data: Buffer; weight: 300 | 400 | 600; style: "normal" }[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    font("outfit", "outfit-latin-300-normal.woff").then((data) => ({ name: "Outfit", data, weight: 300 as const, style: "normal" as const })),
    font("outfit", "outfit-latin-600-normal.woff").then((data) => ({ name: "Outfit", data, weight: 600 as const, style: "normal" as const })),
    font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff").then((data) => ({ name: "Mono", data, weight: 400 as const, style: "normal" as const })),
  ]));

let mark: Promise<string> | undefined;
const loadMark = () =>
  (mark ??= readFile(path.join(root, "src/assets/logos/mark-white.svg")).then(
    (svg) => `data:image/svg+xml;base64,${svg.toString("base64")}`
  ));

// Minimal hyperscript for satori's element tree
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | null | false)[]): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.filter((c) => c !== null && c !== false) },
});
const img = (src: string, style: Record<string, unknown>): Node => ({ type: "img", props: { src, style } });

const BG = {
  backgroundColor: "#0a0b12",
  backgroundImage:
    "radial-gradient(700px 500px at 85% 0%, rgba(4,217,255,0.18), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(49,46,129,0.75), transparent 60%)",
};

const frame = async (content: Node[]) => {
  const brand = h(
    "div",
    { alignItems: "center", gap: 16 },
    img(await loadMark(), { width: 72, height: 42 }),
    h("div", { fontSize: 30, fontWeight: 600, color: "#f4f7ff", letterSpacing: 6 }, "CODEZEN")
  );
  const tree = h(
    "div",
    { width: 1200, height: 630, flexDirection: "column", justifyContent: "space-between", padding: 64, fontFamily: "Outfit", color: "#f4f7ff", ...BG },
    brand,
    ...content,
    h("div", { height: 2, width: "100%", backgroundImage: "linear-gradient(90deg, rgba(4,217,255,0.8), rgba(22,140,205,0.4), transparent)" })
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
};

const kicker = (text: string) =>
  h("div", { fontFamily: "Mono", fontSize: 22, letterSpacing: 5, color: "#5be4ff", textTransform: "uppercase" }, text);

export const defaultOg = () =>
  frame([
    h(
      "div",
      { flexDirection: "column", gap: 24 },
      kicker("Smart contract & blockchain security"),
      h(
        "div",
        { flexDirection: "column", fontSize: 88, fontWeight: 600, lineHeight: 1, letterSpacing: -3 },
        h("div", {}, "Every line in."),
        h("div", { color: "#2ee2ff" }, "Every threat out.")
      ),
      h("div", { fontSize: 28, fontWeight: 300, color: "rgba(232,238,255,0.7)" }, "Audits for Solidity, Rust, Anchor, CosmWasm, Cosmos SDK and Substrate.")
    ),
  ]);

const logoDataUri = async (a: Audit) => {
  if (!a.image) return null;
  try {
    const file = path.join(root, "src/sharedData", a.image);
    const png = await sharp(file).resize(420, 236, { fit: "cover" }).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null;
  }
};

// One line of the mono kicker holds ~32 characters: "<label> · <firm>" when it fits,
// else the label alone; never cut mid-word
const KICKER_MAX = 32;
const ogKicker = (a: Audit) => {
  const label = a.description || "Security audit";
  const full = `${label}${a.partner ? ` · ${a.partner}` : ""}`;
  return full.length <= KICKER_MAX ? full : clampWords(label, KICKER_MAX);
};

export const auditOg = async (a: Audit) => {
  const total = totalFindings(a.issues);
  const logo = await logoDataUri(a);
  // Long names get a smaller size so they keep to two lines
  const title = clampWords(a.title, 40);
  const titleSize = title.length > 18 ? 56 : 72;
  return frame([
    h(
      "div",
      { alignItems: "center", justifyContent: "space-between", gap: 48 },
      h(
        "div",
        { flexDirection: "column", gap: 20, flex: 1 },
        kicker(ogKicker(a)),
        h("div", { fontSize: titleSize, fontWeight: 600, lineHeight: 1.04, letterSpacing: -2 }, title),
        h("div", { fontSize: 34, fontWeight: 300, color: "rgba(232,238,255,0.7)" }, "Security audit by Codezen"),
        total > 0 &&
          h(
            "div",
            { gap: 14, marginTop: 8 },
            ...SEVERITIES.map((s) =>
              h(
                "div",
                { alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, border: `1.5px solid ${s.color}`, fontFamily: "Mono", fontSize: 20, color: s.text },
                `${s.label.toUpperCase()} ${a.issues?.[s.key] || 0}`
              )
            )
          )
      ),
      logo && img(logo, { width: 420, height: 236, borderRadius: 24, border: "1px solid rgba(255,255,255,0.18)" })
    ),
  ]);
};
