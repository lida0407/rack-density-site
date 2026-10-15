// Impressum for the German pages (§ 5 DDG; I18N.md §3). Dali supplies the registered details of Mustard Seed Solutions.
// Until every required field is filled, /de/impressum/ shows "[wird ergänzt]" for the gaps and stays noindex.
export const IMPRESSUM: {
  legalName: string | null;        // registered name with legal form, as in the business register
  address: string[] | null;        // registered office: street, postcode and town, country (one line each)
  representative: string | null;   // person(s) authorised to represent the company (director)
  register: string | null;         // register and number, e.g. "Malta Business Registry, C 12345" (null if not registered)
  vat: string | null;              // VAT identification number (null if none)
  phone: string | null;            // optional: a second fast contact channel besides e-mail
} = {
  legalName: null,
  address: null,
  representative: null,
  register: null,
  vat: null,
  phone: null,
};
/** Fields the page cannot go live (indexable) without. Register and VAT are added when they exist. */
export const impressumComplete = () => !!(IMPRESSUM.legalName && IMPRESSUM.address?.length && IMPRESSUM.representative);
