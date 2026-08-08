// ===========================================
// LEGAL & COMPLIANCE DETAILS
// ===========================================
// Trader identification and EU product-safety details shown in the footer
// and on the Policies page.
//
// IMPORTANT: every field below is rendered publicly as a legal statement.
// Anything left as an empty string is simply NOT rendered — so an incomplete
// config is safe (it shows less), but a wrong one is not. Fill these in from
// your actual Companies House / HMRC / GPSR paperwork. Do not guess.
//
// Why each field is here:
//  - legalName / companyNumber / registeredAddress / vatNumber
//      UK Companies Act + EU Consumer Rights Directive require a trader to
//      make its identity "easily, directly and permanently accessible".
//      The site footer is the conventional place.
//  - euResponsiblePerson
//      EU General Product Safety Regulation (GPSR, (EU) 2023/988, applies
//      since 13 Dec 2024). A business outside the EU cannot sell physical
//      goods to EU or Northern Ireland consumers unless an economic operator
//      established in the EU is named as the Responsible Person, with
//      contact details shown to the buyer. If you use a service for this
//      (or your POD partner acts as one), put their details here.

export const LEGAL = {
  // Public-facing brand name — safe default, always shown.
  tradingName: 'Otterseas',

  // Contact address for consumers. Already public across the site.
  email: 'info@otterseas.com',

  // --- Trader identity (fill from Companies House) -------------------
  legalName: '',        // e.g. 'Otterseas Ltd'
  companyNumber: '',    // e.g. '12345678'
  registeredAddress: [], // e.g. ['1 Harbour Way', 'Plymouth', 'PL1 1AA', 'United Kingdom']
  vatNumber: '',        // e.g. 'GB123456789' — omit entirely if not VAT registered

  // --- GPSR: EU Responsible Person (required to sell to EU/NI) -------
  euResponsiblePerson: {
    name: '',
    address: [],
    email: '',
  },
};

// Only render the trader block once there is something real to show.
export const hasTraderIdentity = () =>
  Boolean(LEGAL.legalName || LEGAL.companyNumber || LEGAL.registeredAddress.length || LEGAL.vatNumber);

export const hasEuResponsiblePerson = () =>
  Boolean(LEGAL.euResponsiblePerson.name && (LEGAL.euResponsiblePerson.email || LEGAL.euResponsiblePerson.address.length));

// Single-line trader summary for the footer, e.g.
// "Otterseas Ltd · Company No. 12345678 · VAT GB123456789 · 1 Harbour Way, Plymouth, PL1 1AA"
export const traderSummary = () => {
  const parts = [];
  if (LEGAL.legalName) parts.push(LEGAL.legalName);
  if (LEGAL.companyNumber) parts.push(`Company No. ${LEGAL.companyNumber}`);
  if (LEGAL.vatNumber) parts.push(`VAT ${LEGAL.vatNumber}`);
  if (LEGAL.registeredAddress.length) parts.push(LEGAL.registeredAddress.join(', '));
  return parts.join(' · ');
};
