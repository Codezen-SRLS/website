// Site facts and schema.org JSON-LD builders. One source of truth for the
// <head>, llms.txt and the structured data on every page.

export const SITE_URL = "https://www.codezen.tech";
export const SITE_NAME = "Codezen";
export const SITE_TITLE = "Codezen | Smart Contract & Blockchain Security Audits";
export const SITE_DESCRIPTION =
  "Smart contract security audits for EVM, Solana and Cosmos. We audit Solidity, Rust, Anchor and CosmWasm protocols to find vulnerabilities before mainnet.";
export const CONTACT_EMAIL = "info@codezen.tech";
export const TWITTER_HANDLE = "@CodezenSRLS";
export const LEGAL = { name: "Codezen S.r.l.", vat: "IT16941791002", parent: "Altairith Capital" };

export const SOCIAL = {
  x: "https://x.com/CodezenSRLS",
  github: "https://github.com/Codezen-SRLS",
  linkedin: "https://www.linkedin.com/company/codezensrls",
  parent: "https://www.altairith.capital",
};

export const SERVICES = [
  {
    id: "smart-contract-audits",
    label: "Smart contracts",
    title: "Smart Contract Audits",
    description:
      "Line-by-line review that identifies vulnerabilities and proactively protects against exploits before mainnet.",
    // Approved long-form copy (src/data.json); used in structured data and llms.txt
    longDescription:
      "Enhance the security of your smart contracts with comprehensive audits that identify vulnerabilities and proactively protect against potential exploits.",
  },
  {
    id: "blockchain-consulting",
    label: "Architecture",
    title: "Blockchain Consulting",
    description:
      "Expert guidance on building and securing blockchain infrastructure, from design to deployment and hardening.",
    longDescription:
      "Receive expert guidance on building and securing your blockchain infrastructure, from architectural design to deployment and long-term optimization.",
  },
  {
    id: "disaster-recovery",
    label: "Continuity",
    title: "Disaster Recovery",
    description: "Robust recovery plans that protect users, minimize downtime, and restore operations fast.",
    longDescription:
      "Guarantee business continuity with a robust Disaster Recovery plan that protects users, minimizes downtime, and ensures rapid recovery of operations.",
  },
] as const;

export const PROCESS = [
  {
    step: "Discovery",
    description:
      "We analyze your project's requirements and unique challenges, laying the foundation for a customized security strategy.",
  },
  {
    step: "Audit",
    description:
      "We perform an exhaustive security audit, pinpointing vulnerabilities across contracts, architecture, and critical components.",
  },
  {
    step: "Reporting",
    description: "We deliver an in-depth report with actionable solutions to mitigate risks and fortify your project.",
  },
  {
    step: "Support",
    description:
      "We provide continuous support through implementation and keep your project protected over time.",
  },
] as const;

export const KNOWS_ABOUT = [
  "Smart Contract Audits",
  "Blockchain Security",
  "Solidity",
  "Rust",
  "Golang",
  "Anchor",
  "CosmWasm",
  "Cosmos SDK",
  "Substrate",
  "EVM",
  "Solana",
  "Polkadot",
  "Web3 Security",
  "DeFi Security",
];

export const abs = (path: string) => new URL(path, SITE_URL).href;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
// Referenced by other sites (christianvari.dev, altairith.capital): keep stable
export const FOUNDER_ID = `${SITE_URL}/#christian-vari`;

export const organization = () => ({
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: LEGAL.name,
  vatID: LEGAL.vat,
  url: `${SITE_URL}/`,
  logo: abs("/icons/icon-512x512.png"),
  image: abs("/og/default.png"),
  description:
    "Expert smart contract audits for Solidity, Rust, Anchor, CosmWasm and Cosmos SDK. Blockchain security consulting for EVM, Solana and Cosmos protocols.",
  email: CONTACT_EMAIL,
  areaServed: "Worldwide",
  knowsAbout: KNOWS_ABOUT,
  parentOrganization: { "@type": "Organization", name: LEGAL.parent, url: SOCIAL.parent },
  founder: { "@id": FOUNDER_ID },
  sameAs: [SOCIAL.x, SOCIAL.github, SOCIAL.linkedin],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Blockchain security services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.longDescription, provider: { "@id": ORG_ID } },
    })),
  },
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
});

export const person = (m: {
  name: string;
  role: string;
  description: string;
  website?: string;
  /** Other profiles of the same person, incl. their @id on their own site */
  sameAs?: string[];
  image?: string;
}) => ({
  "@type": "Person",
  "@id": `${SITE_URL}/#${m.name.toLowerCase().replace(/\s+/g, "-")}`,
  name: m.name,
  jobTitle: m.role,
  description: m.description,
  worksFor: { "@id": ORG_ID },
  ...(m.image ? { image: m.image } : {}),
  ...(m.website ? { url: m.website } : {}),
  ...(m.sameAs?.length ? { sameAs: m.sameAs } : m.website ? { sameAs: [m.website] } : {}),
  knowsAbout: KNOWS_ABOUT.slice(1),
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
