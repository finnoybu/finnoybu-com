// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL — Finnoybu Privacy Policy content. SINGLE SOURCE OF TRUTH.
//
// This file lives only in the finnoybu-com repo. finnoybu.com publishes it as
// JSON at https://finnoybu.com/privacy.json (see src/pages/privacy.json.ts).
// fiction.finnoybu.com and memoirs.finnoybu.com fetch that JSON at BUILD TIME
// and render it with their own CSS — no copy of this content exists in any
// other repo, so it cannot drift.
//
// To change the policy: edit this file, deploy finnoybu.com, then rebuild the
// consumer sites so they pick up the change.
//
// `body` entries are trusted, hand-authored block-level HTML strings rendered
// via set:html inside the host site's prose container.
// ─────────────────────────────────────────────────────────────────────────────

export interface PolicySection {
  /** Anchor id — used for the on-page table of contents. */
  id: string;
  /** Section heading, rendered as an <h2>. */
  heading: string;
  /** Block-level HTML strings (<p>, <ul>, <h3>, …), rendered in order. */
  body: string[];
}

export const PRIVACY_LAST_UPDATED = 'May 22, 2026';

/**
 * Privacy Policy — a single umbrella policy for the whole Finnoybu family of
 * *.finnoybu.com sites. Written subdomain-agnostically so the identical text
 * can be served from finnoybu.com, fiction.finnoybu.com, and
 * memoirs.finnoybu.com, with finnoybu.com/privacy-policy as the canonical URL.
 */
export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: 'overview',
    heading: 'Overview',
    body: [
      `<p>Finnoybu Operations ("we," "us," "our") operates the Finnoybu family
      of websites. This Privacy Policy is a single, shared policy that applies
      to all three of them:</p>`,
      `<ul>
        <li><strong>finnoybu.com</strong> &mdash; a personal portfolio site.</li>
        <li><strong>fiction.finnoybu.com</strong> &mdash; the online reading
        edition of the Finnoybu fiction.</li>
        <li><strong>memoirs.finnoybu.com</strong> &mdash; the online reading
        edition of <em>A Sailor's Reminiscences</em>.</li>
      </ul>`,
      `<p>The sites are not alike. finnoybu.com is a static page that collects
      nothing, while the two reading sites offer accounts and purchases.
      Several sections below therefore apply only to the reading sites, and say
      so. Other projects and sites linked from these pages &mdash; including
      press.finnoybu.org &mdash; are operated under their own privacy
      policies.</p>`,
    ],
  },
  {
    id: 'portfolio-site',
    heading: 'finnoybu.com — The Portfolio Site',
    body: [
      `<p><strong>finnoybu.com</strong> is a static website. It has no user
      accounts, no sign-in, no contact forms, and no database. Simply visiting
      it collects no personal information.</p>`,
      `<p>finnoybu.com sets no cookies and runs no advertising, analytics, or
      cross-site tracking. Nothing about your visit is stored in your browser or
      sent to us. The sections that follow describe the <strong>reading
      sites</strong>; none of them apply to finnoybu.com.</p>`,
    ],
  },
  {
    id: 'reading-sites',
    heading: 'The Reading Sites — What We Collect',
    body: [
      `<p><strong>fiction.finnoybu.com</strong> and
      <strong>memoirs.finnoybu.com</strong> let you create an account, read
      online, and purchase digital downloads. When you use them, we collect the
      following.</p>`,
      `<h3>Account information</h3>
      <p>When you create an account, we collect your <strong>email
      address</strong>. If you sign in with Google, Facebook, Apple, or GitHub,
      we also receive your <strong>name</strong> and <strong>profile
      picture</strong> as provided by that service. If you register with email
      and password, we store a securely hashed version of your password &mdash;
      we never store passwords in plain text.</p>`,
      `<h3>Reading activity</h3>
      <p>While you are signed in, we store your <strong>reading
      progress</strong> &mdash; the chapter you are reading, your scroll
      position, and the percentage read &mdash; so you can resume where you left
      off across devices.</p>`,
      `<h3>Bookmarks, annotations, and errata</h3>
      <p>We store the <strong>bookmarks</strong> and <strong>annotations</strong>
      you create while reading. On memoirs.finnoybu.com, we also store any
      <strong>errata reports</strong> you submit.</p>`,
      `<h3>Purchases</h3>
      <p>When you buy a digital download, we record the <strong>product
      purchased</strong>, the <strong>amount</strong> and
      <strong>currency</strong>, and a <strong>Stripe session
      identifier</strong>. We never receive or store your payment card details
      &mdash; those are handled entirely by Stripe.</p>`,
      `<h3>Browser storage</h3>
      <p>We store your <strong>reading preferences</strong> (such as theme and
      font size) and your <strong>cookie-consent choice</strong> in your
      browser's local storage.</p>`,
    ],
  },
  {
    id: 'how-we-use',
    heading: 'How We Use Your Data',
    body: [
      `<p>On the reading sites, we use the data above to:</p>`,
      `<ul>
        <li>Provide the reading experience &mdash; syncing progress, bookmarks,
        and annotations across your devices;</li>
        <li>Process purchases and deliver digital downloads;</li>
        <li>Send transactional email, such as sign-in and password-reset
        messages;</li>
        <li>Review and incorporate errata reports into the manuscript;</li>
        <li>Understand, in aggregate, how the sites are used.</li>
      </ul>`,
      `<p>We do <strong>not</strong> sell, rent, or share your personal data with
      third parties for advertising or marketing, and we do <strong>not</strong>
      send marketing or promotional email.</p>`,
    ],
  },
  {
    id: 'third-parties',
    heading: 'Hosting & Third-Party Services',
    body: [
      `<p>All Finnoybu sites are hosted on <strong>Cloudflare Pages</strong>.
      Like any web host, Cloudflare processes the basic technical data needed to
      deliver pages and protect the service, including IP addresses and request
      times. For the reading sites, Cloudflare also stores account data, reading
      activity, and purchase records in a Cloudflare D1 database and serves paid
      downloads from Cloudflare R2 storage.
      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare
      Privacy Policy</a></p>`,
      `<p>The reading sites also rely on these services, solely to operate the
      sites:</p>`,
      `<ul>
        <li><strong>Amazon Web Services (Simple Email Service)</strong> &mdash;
        sends sign-in, verification, and password-reset email. AWS receives only
        the destination address and the contents of the message.
        <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer">AWS
        Privacy Notice</a></li>
        <li><strong>Stripe</strong> &mdash; processes payments and handles
        payment card details directly.
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe
        Privacy Policy</a></li>
        <li><strong>Google, Meta, Apple, and GitHub</strong> &mdash; if you sign
        in with one of these providers, we receive your email address, name, and
        profile picture from that provider, and nothing else.</li>
      </ul>`,
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies & Local Storage',
    body: [
      `<p><strong>finnoybu.com</strong> sets no cookies at all.</p>`,
      `<p>The <strong>reading sites</strong> use:</p>`,
      `<ul>
        <li>an <strong>authentication cookie</strong>, set on the
        <code>.finnoybu.com</code> domain so that a single sign-in covers both
        fiction.finnoybu.com and memoirs.finnoybu.com;</li>
        <li><strong>local storage</strong> for your reading preferences and your
        cookie-consent choice.</li>
      </ul>`,
      `<p>None of the Finnoybu sites use cookies for advertising, retargeting, or
      cross-site tracking.</p>`,
    ],
  },
  {
    id: 'retention',
    heading: 'Data Retention',
    body: [
      `<p>For the reading sites, we keep your account data and associated content
      &mdash; bookmarks, annotations, errata reports, and reading progress
      &mdash; for as long as your account is active. Purchase records are kept
      indefinitely for tax and accounting purposes. If you delete your account,
      your personal data is removed; purchase records are anonymized rather than
      deleted.</p>`,
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your Rights',
    body: [
      `<p>You have the right to:</p>`,
      `<ul>
        <li><strong>Access</strong> the personal data we hold about you;</li>
        <li><strong>Correct</strong> inaccurate data;</li>
        <li><strong>Delete</strong> your data &mdash; see Data Deletion
        below;</li>
        <li><strong>Export</strong> your data in a portable format.</li>
      </ul>`,
      `<p>If you are located in the European Economic Area, the GDPR grants you
      additional rights, including the right to restrict processing and the
      right to lodge a complaint with your local data-protection authority. If
      you are a California resident, the CCPA grants similar rights. To exercise
      any of these rights, contact us at
      <a href="mailto:hello@finnoybu.com">hello@finnoybu.com</a>.</p>`,
    ],
  },
  {
    id: 'data-deletion',
    heading: 'Data Deletion',
    body: [
      `<p>You may delete your reading-site account at any time. Email
      <a href="mailto:hello@finnoybu.com">hello@finnoybu.com</a> with the subject
      line "Delete my account," sent from the address associated with your
      account. We will process the request within <strong>30 days</strong> and
      confirm by email once it is complete.</p>`,
      `<p>Deletion removes your account, sign-in records, reading progress,
      bookmarks, annotations, and errata reports. Purchase records are anonymized
      &mdash; only the transaction amount and date are retained, for
      accounting.</p>`,
    ],
  },
  {
    id: 'children',
    heading: "Children's Privacy",
    body: [
      `<p>The Finnoybu sites are not directed at children under 13, and we do not
      knowingly collect personal data from children under 13. If you believe a
      child under 13 has provided us with personal data, please contact us and
      we will delete it promptly.</p>`,
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to This Policy',
    body: [
      `<p>We may update this Privacy Policy from time to time. Changes are posted
      on this page with a revised "last updated" date. Material changes
      affecting registered users of the reading sites will also be communicated
      by email.</p>`,
    ],
  },
];
