// Terms & policies for finnoybu.com — the personal portfolio site.
//
// Site-specific: these terms describe finnoybu.com itself. The Privacy Policy
// is separate and canonical — see ./privacy.ts, the single source of truth
// shared (via build-time fetch) across all the *.finnoybu.com sites.
//
// `body` entries are trusted, hand-authored block-level HTML strings rendered
// via set:html inside a `.prose` container.

import type { PolicySection } from './privacy';

export const LEGAL_LAST_UPDATED = 'May 22, 2026';

/** Terms & policies for finnoybu.com — the personal portfolio site. */
export const LEGAL_SECTIONS: PolicySection[] = [
  {
    id: 'copyright',
    heading: 'Copyright',
    body: [
      `<p>&copy; 2026 Finnoybu Press. All rights reserved. The design, source
      code, written content, and original imagery of the Finnoybu family of
      websites &mdash; <strong>finnoybu.com</strong> and its
      <strong>*.finnoybu.com</strong> subdomains &mdash; are the intellectual
      property of Finnoybu Press and may not be reproduced, distributed, or
      transmitted in any form without prior written permission.</p>`,
      `<p>These websites are operated by <strong>Finnoybu Operations</strong>.
      Finnoybu Press holds the copyright and intellectual property; Finnoybu
      Operations runs the sites. The individual projects linked from
      finnoybu.com &mdash; books, software, and other works &mdash; are governed
      by their own licenses and terms, which take precedence for those
      works.</p>`,
    ],
  },
  {
    id: 'terms-of-use',
    heading: 'Terms of Use',
    body: [
      `<p>By accessing <strong>finnoybu.com</strong> ("the Site"), operated by
      Finnoybu Operations ("we," "us," "our"), you agree to these Terms of Use.
      If you do not agree, please do not use the Site.</p>`,
      `<p>The Site is an informational portfolio provided for personal,
      non-commercial reference. It offers no accounts, no sign-in, no payments,
      and no interactive submissions. We may revise, relocate, or remove any
      part of it at any time without notice.</p>`,
      `<p>Where the Site links to a separate project &mdash; a book, an
      application, or another website &mdash; that project carries its own
      terms, which govern your use of it.</p>`,
      `<p>These terms are governed by the laws of the Commonwealth of Virginia,
      United States, without regard to conflict-of-law principles.</p>`,
    ],
  },
  {
    id: 'privacy',
    heading: 'Privacy',
    body: [
      `<p>finnoybu.com itself collects no personal information from visitors.
      Our <a href="/privacy-policy">Privacy Policy</a> is a single, shared
      policy covering data practices across all the Finnoybu sites &mdash;
      including the accounts and purchases offered on the reading sites. See it
      for the full details.</p>`,
    ],
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable Use',
    body: [
      `<p>When using the Site, you agree not to:</p>`,
      `<ul>
        <li>Reproduce, distribute, or publicly display the Site's content or
        imagery without prior written permission.</li>
        <li>Use automated tools (bots, scrapers, crawlers) to harvest content
        from the Site in bulk.</li>
        <li>Attempt to gain unauthorized access to the Site or its hosting
        infrastructure.</li>
        <li>Interfere with the operation of the Site, including by introducing
        malware or overloading the server with excessive requests.</li>
        <li>Use the Site for any unlawful purpose or in violation of any
        applicable local, state, national, or international law.</li>
      </ul>`,
    ],
  },
  {
    id: 'disclaimer',
    heading: 'Disclaimer & External Links',
    body: [
      `<p>The Site is provided "as is," without warranties of any kind. To the
      fullest extent permitted by law, Finnoybu Operations shall not be liable
      for any indirect, incidental, or consequential damages arising from your
      use of the Site.</p>`,
      `<p>finnoybu.com links to other websites, including projects operated by
      Finnoybu Operations and sites operated by third parties. We are not
      responsible for the content, accuracy, or practices of any external site,
      and a link does not imply endorsement.</p>`,
    ],
  },
  {
    id: 'accessibility',
    heading: 'Accessibility',
    body: [
      `<p>We are committed to keeping this site usable by everyone. The project
      ring on the home page is a decorative interface: it honors your operating
      system's reduced-motion preference and falls back to a plain, fully
      navigable list of links on small screens and whenever motion is
      reduced.</p>`,
      `<p>If you encounter an accessibility barrier, please contact us at
      <a href="mailto:hello@finnoybu.com">hello@finnoybu.com</a> and we will
      work to resolve it promptly.</p>`,
    ],
  },
  {
    id: 'dmca',
    heading: 'DMCA & Takedown',
    body: [
      `<p>If you believe content on this site infringes your copyright, please
      send a written notice to
      <a href="mailto:hello@finnoybu.com">hello@finnoybu.com</a> including:
      identification of the copyrighted work, the infringing URL, your contact
      information, and a statement of good-faith belief.</p>`,
    ],
  },
  {
    id: 'impressum',
    heading: 'Impressum',
    body: [
      `<p><strong>Operator:</strong> Finnoybu Operations</p>`,
      `<p><strong>Copyright &amp; intellectual property:</strong> Finnoybu Press</p>`,
      `<p><strong>Responsible person:</strong> Ken Tannenbaum</p>`,
      `<p><strong>Contact:</strong>
      <a href="mailto:hello@finnoybu.com">hello@finnoybu.com</a></p>`,
    ],
  },
];
