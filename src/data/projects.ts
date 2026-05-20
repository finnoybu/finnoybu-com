// Headline projects shown as icons on the orbit ring. One node per major
// work — AEGIS is a single node; its RFCs/DOIs/papers are detail within it,
// not separate icons. `presence` is intentionally absent (stealth).

export interface Project {
  id: string;
  name: string;
  monogram: string; // 1–2 char mark shown on the icon disc
  tag: string; // short category label
  blurb: string; // one-liner shown on the ring's detail panel
  details?: string; // longer write-up shown in the project detail view
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
    details:
      'AEGIS is a governance architecture for constrained intelligence — a system that evaluates human intent, clarifies the consequences of a requested action, and enforces explicit boundaries before an AI agent is allowed to act. It treats authority, constraint, and consequence-awareness as first-class architectural properties rather than safeguards bolted on afterward; the working principle is that capability without constraint is not intelligence. The initiative spans a twelve-repository ecosystem — the AGP-1 governance runtime, the ATX-1 threat taxonomy, published specifications and position papers, and a hosted operator platform with a live demo. Reference releases carry DOIs, and the protocol RFCs and adversarial-evaluation program are active work.',
    url: 'https://aegis-initiative.com',
  },
  {
    id: 'reminiscences',
    name: "A Sailor's Reminiscences",
    monogram: 'SR',
    tag: 'Memoir',
    blurb:
      "The memoir of Olavus Vullum Bjørnson Vestbø (1859–1940), a Norwegian sailor on the proud sailships — translated, transcribed, and published more than a century after he set out.",
    details:
      "A Sailor's Reminiscences is the memoir of Olavus Vullum Bjørnson Vestbø (1859–1940), who left Norway as a boy and spent his youth aboard the merchant sailships. Olavus was my great-great-grandfather. I received a copy of his memoirs in 1999, after I was reunited with my birth family thirty-three years on from being adopted. The manuscript had been translated from Norwegian decades earlier and hand-copied more than once along the way, so bringing it back to life — transcribed, edited, and published where anyone can read it — took the better part of twenty years. Sixty-eight chapters, and finally finished.",
    url: 'https://memoirs.finnoybu.com',
  },
  {
    id: 'trilogy',
    name: 'The Finnoybu Trilogy',
    monogram: 'FT',
    tag: 'Fiction',
    blurb:
      'A Norse fantasy trilogy written as E. A. Westbo. Book I, Salt and Silence, is complete; Books II and III are drafted.',
    details:
      'The Finnoybu Trilogy is a three-book Norse fantasy series, written under the pen name E. A. Westbo. Book I, Salt and Silence, is complete and prepared for print; Books II and III are drafted.',
    url: 'https://fiction.finnoybu.com',
  },
  {
    id: 'press',
    name: 'FINNOYBU Press',
    monogram: 'FP',
    tag: 'Publishing',
    blurb:
      'Practical AI guidebooks — fifteen titles and counting, across ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Cursor, and more.',
    details:
      'FINNOYBU Press is a publishing imprint built on a simple idea: the tools reshaping how people work deserve clear, practical guides written for the people actually using them. Its catalog covers the current generation of AI systems — ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Cursor, OpenClaw, NotebookLM — alongside an AI Systems Playbook that ties them together, fifteen titles and counting. Every guide is hands-on rather than theoretical, and the storefront runs at press.finnoybu.org.',
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
    url: 'https://github.com/finnoybu/americansforpropriety',
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
    url: 'https://wilohwisp.com',
  },
  {
    id: 'sturrocks',
    name: "Sturrock's HVAC Solutions",
    monogram: 'SH',
    tag: 'Web Design',
    blurb:
      "An HVAC contractor's marketing site — designed and developed end to end.",
    url: 'https://sturrockshvac.com',
  },
];
