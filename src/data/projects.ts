// Headline projects shown as icons on the orbit ring. One node per major
// work — AEGIS is a single node; its RFCs/DOIs/papers are detail within it,
// not separate icons. `presence` is intentionally absent (stealth).

export interface Project {
  id: string;
  name: string;
  monogram: string; // 1–2 char mark shown on the icon disc
  tag: string; // short category label
  blurb: string;
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'aegis',
    name: 'AEGIS Initiative',
    monogram: 'Æ',
    tag: 'AI Governance',
    blurb:
      'A governance architecture for constrained intelligence. It evaluates human intent, clarifies consequences, and enforces explicit boundaries before AI agents act — a twelve-repository ecosystem with published specs, protocols, and a live operator platform.',
    url: 'https://aegis-initiative.com',
  },
  {
    id: 'reminiscences',
    name: "A Sailor's Reminiscences",
    monogram: 'SR',
    tag: 'Memoir',
    blurb:
      "The memoir of Olavus Vullum Bjørnson Vestbø (1859–1940), a Norwegian sailor on the proud sailships — translated, transcribed, and published more than a century after he set out.",
    url: 'https://memoirs.finnoybu.com',
  },
  {
    id: 'trilogy',
    name: 'The Finnoybu Trilogy',
    monogram: 'FT',
    tag: 'Fiction',
    blurb:
      'A Norse fantasy trilogy written as E. A. Westbo. Book I, Salt and Silence, is complete; Books II and III are drafted.',
    url: 'https://fiction.finnoybu.com',
  },
  {
    id: 'press',
    name: 'FINNOYBU Press',
    monogram: 'FP',
    tag: 'Publishing',
    blurb:
      'Practical AI guidebooks — fifteen titles and counting, across ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Cursor, and more.',
    url: 'https://press.finnoybu.org',
  },
  {
    id: 'claude-io',
    name: 'claude-io',
    monogram: 'io',
    tag: 'Developer Tools',
    blurb:
      'Voice and vision I/O helpers for developers building with Claude. Speak to Claude, have it speak back, show it things.',
    url: 'https://github.com/finnoybu/claude-io',
  },
  {
    id: 'dive',
    name: 'DIVE',
    monogram: 'DI',
    tag: 'Infrastructure',
    blurb:
      'The Domain Integrity Engine — a deterministic monitor that snapshots, diffs, and classifies operational drift across DNS, TLS, and RDAP over time.',
  },
  {
    id: 'forensickle',
    name: 'Forensickle',
    monogram: 'Fx',
    tag: 'Digital Forensics',
    blurb:
      'Investigative tooling for structured digital-forensics workflows — script-driven local collection that extends toward correlated multi-system analysis.',
    url: 'https://github.com/finnoybu/forensickle',
  },
  {
    id: 'afp',
    name: 'Americans for Propriety',
    monogram: 'AP',
    tag: 'Civic',
    blurb:
      'Civic research and action — briefs that name the stakes, letters constituents can actually send, and a public record of how their representatives vote.',
  },
  {
    id: 'mskosman',
    name: 'mskosman.com',
    monogram: 'MK',
    tag: 'Education',
    blurb:
      "Homeschool, tutoring, and extracurricular lesson plans aligned to Virginia's K–12 Standards of Learning.",
    url: 'https://mskosman.com',
  },
  {
    id: 'wilohwisp',
    name: 'wilohwisp.com',
    monogram: 'WW',
    tag: 'Personal',
    blurb:
      'A small site, hand-built and held in trust for one specific person until they are ready for it.',
  },
];
