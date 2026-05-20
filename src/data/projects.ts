// Single source of truth for the project entries surfaced on finnoybu.com.
// Each project lists the stratum it belongs to. Add or remove freely; the
// page reads from this array.

export interface Project {
  name: string;
  one_liner: string;
  url?: string;
  stratum: 'now' | 'craft' | 'publish' | 'civic' | 'family' | 'reconstruct';
  marker?: string; // small label: DOI, RFC, version, year-started, etc.
}

export const PROJECTS: Project[] = [
  // ─── NOW · the architect's flagship ────────────────────────
  {
    stratum: 'now',
    name: 'AEGIS Platform',
    one_liner:
      'Hosted SaaS operator dashboard and governance API for constrained intelligence systems. Treats authority, constraint, and consequence-awareness as first-class architectural properties.',
    url: 'https://demo.aegis-platform.net',
    marker: 'demo live',
  },
  {
    stratum: 'now',
    name: 'AIAM-1',
    one_liner:
      'Identity and access management protocol for AI agents. Specification for how agents authenticate, scope, and prove their permissions to act.',
    url: 'https://github.com/aegis-initiative/aegis-governance/blob/main/rfc/RFC-0019-AIAM-1-Identity-Access-Management-AI-Agents.md',
    marker: 'RFC-0019',
  },
  {
    stratum: 'now',
    name: 'AGAP-1',
    one_liner:
      'Automated governance attestation protocol. Machine-verifiable claims that a given action passed through a governance runtime before execution.',
    url: 'https://github.com/aegis-initiative/aegis-governance/blob/main/rfc/RFC-0018-Automated-Governance-Attestation-Protocol.md',
    marker: 'RFC-0018',
  },
  {
    stratum: 'now',
    name: 'ATX-1 Threat Taxonomy',
    one_liner:
      'Ten tactics, twenty-nine sub-techniques covering the AI governance threat surface. Used as the structural backbone for adversarial evaluation work.',
    url: 'https://doi.org/10.21227/7c9p-6150',
    marker: 'v2.2 · DOI',
  },
  {
    stratum: 'now',
    name: 'Governing the Action Boundary',
    one_liner:
      'Twenty-one-page category-definition paper making the architectural case for boundary-enforced AI governance.',
    url: 'https://doi.org/10.5281/zenodo.19489150',
    marker: 'DOI',
  },
  {
    stratum: 'now',
    name: 'AEGIS Federation',
    one_liner:
      'Cross-domain trust protocol for networks of governed AI systems. Lets independent operators interoperate without surrendering their own governance posture.',
    url: 'https://aegis-federation.com/',
    marker: 'spec',
  },

  // ─── CRAFT · investigative + tooling work ──────────────────
  {
    stratum: 'craft',
    name: 'claude-io',
    one_liner:
      'Unofficial voice and vision I/O helpers for developers building with Claude. Speak to Claude. Have Claude speak back. Show Claude things.',
    url: 'https://github.com/finnoybu/claude-io',
    marker: 'dev tools',
  },
  {
    stratum: 'craft',
    name: 'DIVE — Domain Integrity Engine',
    one_liner:
      'Deterministic governance and infrastructure-integrity monitor. Snapshots, compares, and classifies operational drift over time. RDAP, DNS, TLS surface.',
    marker: 'engine',
  },
  {
    stratum: 'craft',
    name: 'Forensickle',
    one_liner:
      'Investigative tooling initiative for structured digital-forensics workflows. Starts as script-driven local collection; extends toward correlated multi-system analysis.',
    url: 'https://github.com/finnoybu/forensickle',
    marker: 'DFIR',
  },

  // ─── CIVIC · public-record work ────────────────────────────
  {
    stratum: 'civic',
    name: 'Americans for Propriety',
    one_liner:
      'Civic research and action: briefs that name the stakes, letters constituents can actually send, and a public record of what their representatives do with their vote.',
    marker: 'civic',
  },

  // ─── PUBLISH · finished books ──────────────────────────────
  {
    stratum: 'publish',
    name: "A Sailor's Reminiscences",
    one_liner:
      'The 1859–1940 memoir of Olavus Vullum Bjørnson Vestbø — a Norwegian sailor on the proud sailships. Translated, transcribed, and finally published 127 years after he set out.',
    url: 'https://memoirs.finnoybu.com',
    marker: 'memoir',
  },
  {
    stratum: 'publish',
    name: 'The Finnoybu Trilogy',
    one_liner:
      'Norse fantasy as E.A. Westbo. Book I — Salt and Silence — complete; Books II and III drafted. A multi-generational saga that reads like the sea remembers.',
    url: 'https://fiction.finnoybu.com',
    marker: 'fiction',
  },
  {
    stratum: 'publish',
    name: 'FINNOYBU Press',
    one_liner:
      'Practical AI guidebooks across ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Cursor, OpenClaw, NotebookLM, and the underlying AI Systems Playbook. Fifteen titles and growing.',
    url: 'https://press.finnoybu.org',
    marker: 'press',
  },

  // ─── FAMILY · built for specific humans (no recipient attribution) ──
  {
    stratum: 'family',
    name: 'mskosman.com',
    one_liner:
      'Production-quality static site for homeschool, tutoring, and extracurricular lesson plans aligned to Virginia Department of Education K–12 Standards of Learning.',
    url: 'https://mskosman.com',
    marker: 'curriculum',
  },
  {
    stratum: 'family',
    name: 'wilohwisp.com',
    one_liner:
      'A small site, hand-built, for a small person — held in reserve until they are ready to inhabit it.',
    marker: 'in trust',
  },
];

// Stratum metadata — labels, period descriptors, ordering.
export interface StratumMeta {
  id: Project['stratum'];
  label: string;
  period: string;
  blurb: string;
}

export const STRATA: StratumMeta[] = [
  {
    id: 'now',
    label: 'Architect',
    period: '2026 — Now',
    blurb:
      'Frameworks for constrained intelligence. Governance treated as architecture, not bolt-on. Published specs, machine-verifiable protocols, adversarial evaluation against live deployments.',
  },
  {
    id: 'craft',
    label: 'Craft',
    period: '2025 → ongoing',
    blurb:
      'Tools shaped by their actual use. Things small enough to be honest about. Built first for problems I have, then polished for problems other people have.',
  },
  {
    id: 'civic',
    label: 'Civic',
    period: '2025 → ongoing',
    blurb: 'Where authority needs accounting.',
  },
  {
    id: 'publish',
    label: 'Publish',
    period: '2026 — Book year',
    blurb:
      'Three lineages of work that arrived at print: a sailor’s manuscript reassembled across four generations, a Norse fantasy that wanted to be written, and a stack of guidebooks for the tools reshaping the next ten years of work.',
  },
  {
    id: 'family',
    label: 'In Trust',
    period: '— ongoing',
    blurb:
      'Two sites built for specific humans, not for the open web. They are listed here because authorship deserves crediting; nothing further about the people they were built for is anybody else’s business.',
  },
];
