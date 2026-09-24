export type Category =
  | "tax-compliance"
  | "accounting-financial"
  | "business-registration"
  | "ecommerce-support";

export const categories: Record<Category, { name: string; description: string }> = {
  "tax-compliance": {
    name: "Tax & Compliance",
    description: "Income tax, GST and TDS filing, advisory and representation.",
  },
  "accounting-financial": {
    name: "Accounting & Financial Services",
    description: "Bookkeeping, audit, and corporate finance support.",
  },
  "business-registration": {
    name: "Business & Registration Services",
    description: "Company, governance, IP and certificate registrations.",
  },
  "ecommerce-support": {
    name: "E-Commerce & Business Support",
    description: "Onboarding and compliance support for online sellers.",
  },
};

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  category: Category;
  navLabel: string;
  featured: boolean;
  oldUrl?: string; // legacy URL on medaltax.com, for the 301 map
  eyebrow: string;
  shortDescription: string;
  heroDescription: string;
  whoNeedsIt: string[];
  commonSituations: string[];
  whatWeHandle: string[];
  process?: string[];
  documents?: string[];
  benefits?: string[];
  considerations?: string[];
  faqs: FAQ[];
  related: string[]; // slugs
  contactTeamName?: string; // key into team[] for a service-specific contact
  verified: boolean; // false = present in prompt brief but not found on live site during audit
  sourceNote: string;
}

export const services: Service[] = [
  {
    slug: "income-tax-filing",
    name: "Income Tax Filing",
    category: "tax-compliance",
    navLabel: "Income Tax",
    featured: true,
    oldUrl: "/income-tax-2/",
    eyebrow: "Tax & Compliance",
    shortDescription:
      "Income tax return filing and advisory for individuals, businesses and corporate entities.",
    heroDescription:
      "Medal Tax handles income tax filing and advisory for individuals, employees, businesses and corporate entities — from routine returns to representation before the Income Tax Department.",
    whoNeedsIt: [
      "Salaried individuals and professionals filing annual returns",
      "Business owners and corporate entities with recurring tax obligations",
      "Employees of corporate clients needing return filing support",
      "Anyone facing an assessment, notice, or refund delay",
    ],
    commonSituations: [
      "Filing this year's return and unsure which ITR form applies",
      "Restructuring salary components to improve tax efficiency",
      "Received a notice or need to respond to an assessment",
      "Need PAN registration for a business, employee, or individual",
      "Managing advance tax estimates and deposits through the year",
    ],
    whatWeHandle: [
      "Filing of income tax and wealth tax returns for individuals, businesses, and corporate entities",
      "Income tax return filing for employees of corporate clients",
      "Strategic tax planning for corporates and individuals",
      "Structuring and restructuring salary components for tax efficiency",
      "Assistance obtaining Advance Tax Rulings and No Objection Certificates from the Income Tax Department",
      "PAN registration for businesses, employees and individuals",
      "Estimation and timely deposit of advance tax",
      "Evaluation and management of deferred tax liabilities",
      "Liaison with the Income Tax Department for assessments, rectifications and refunds",
      "Representation in appeals under the Income Tax Act, including search, seizure and prosecution-related matters",
    ],
    documents: [
      "PAN and Aadhaar",
      "Form 16 / salary statements (for salaried individuals)",
      "Bank statements and interest certificates",
      "Business income and expense records (for businesses/professionals)",
      "Details of investments, deductions and prior-year tax paid",
    ],
    benefits: [
      "One point of contact for filing, planning and department correspondence",
      "Regular updates on tax law changes, notifications and rulings that affect you",
      "Support for both simple annual filings and complex assessment matters",
    ],
    considerations: [
      "Return filing deadlines and applicable forms depend on your income sources and entity type — share your situation before assuming a standard timeline.",
      "Advance tax and TDS credit should be reconciled before filing to avoid mismatches with department records.",
    ],
    faqs: [
      {
        q: "Who should file an income tax return?",
        a: "Anyone whose income exceeds the basic exemption limit, or who needs to file for reasons such as claiming a refund, carrying forward losses, or visa/loan documentation, should file a return. Specific thresholds depend on your income type and entity — speak with our team to confirm your situation.",
      },
      {
        q: "Do you handle both individual and business tax filings?",
        a: "Yes. We handle income tax filing for salaried individuals, freelancers, professionals, and businesses, along with the associated planning and department liaison.",
      },
      {
        q: "What if I've already received a notice from the Income Tax Department?",
        a: "We assist with liaison, rectifications, and representation in assessments and appeals, including complex or long-running matters. Share the notice with our team so we can review the specifics.",
      },
    ],
    related: ["gst-services", "tds-services", "accounting-services"],
    contactTeamName: "Karthik",
    verified: true,
    sourceNote: "Content drawn from the live /income-tax-2/ page.",
  },
  {
    slug: "gst-services",
    name: "GST Services",
    category: "tax-compliance",
    navLabel: "GST",
    featured: true,
    oldUrl: "/gst-2/",
    eyebrow: "Tax & Compliance",
    shortDescription:
      "End-to-end GST registration, return filing, reconciliation and departmental representation.",
    heroDescription:
      "From registration to litigation support, Medal Tax provides end-to-end GST compliance and advisory across dealer types, e-commerce operators, and cross-border supply chains.",
    whoNeedsIt: [
      "Regular and composition dealers required to file periodic returns",
      "E-commerce operators and OIDAR entities with GST obligations",
      "Businesses undergoing GST registration, amendment or cancellation",
      "Any GST-registered business managing input tax credit (ITC) reconciliation",
    ],
    commonSituations: [
      "New business needs GST registration before it can start invoicing",
      "GSTR-1 vs GSTR-2B mismatches affecting input tax credit",
      "Received a GST notice or assessment query",
      "Migrating legacy pre-GST credits or resolving transition issues",
      "Need HSN/SAC classification or rate confirmation for a product line",
    ],
    whatWeHandle: [
      "End-to-end GST return filing for Regular Dealers, Composition Dealers, ISD, Non-Residents, E-Commerce Operators, and OIDAR entities",
      "Practical GST advisory on compliance, classification, valuation, place of supply, and litigation support",
      "GST impact analysis across business models, sectors and supply chains",
      "GST audit and reconciliation as per the latest GST Act provisions",
      "GST registration, amendment, cancellation and revocation support",
      "Input Tax Credit (ITC) reconciliation, optimization, blockage analysis and reversal handling",
      "GST assessments, notices, replies and departmental representation",
      "Migration, transition credits and legacy issue resolution (pre-GST to GST matters)",
      "Maintenance of GST-compliant records and documentation as per Rule 56 & Rule 57",
      "Strategic GST planning to reduce tax leakage and improve cash flow",
      "Vendor and customer GST compliance management (GSTR-1 vs GSTR-2B mismatch control)",
      "GSTIN verification, vendor due diligence and risk profiling",
      "HSN/SAC classification, rate determination and compliance validation",
    ],
    documents: [
      "PAN and business incorporation documents",
      "Proof of business address and bank account details",
      "Sales and purchase records for the return period",
      "Existing GSTIN and prior filing history (for ongoing compliance)",
    ],
    benefits: [
      "A single team handling registration through to ongoing monthly/quarterly compliance",
      "Structured ITC reconciliation to reduce credit blockages",
      "Support during notices and departmental queries, not just routine filing",
    ],
    considerations: [
      "Filing frequency and applicable return forms depend on turnover, dealer type and registration category.",
      "We do not guarantee specific assessment or refund outcomes — these are determined by the GST authorities.",
    ],
    faqs: [
      {
        q: "What is GST registration?",
        a: "GST registration is the process of registering a business under the Goods and Services Tax framework, which is required once a business crosses the applicable turnover threshold or falls under specific categories that require mandatory registration.",
      },
      {
        q: "Who needs GST registration?",
        a: "Businesses whose turnover exceeds the prescribed threshold, e-commerce operators, and certain other categories of suppliers are required to register under GST. Requirements vary by state and business type.",
      },
      {
        q: "How does GST filing work?",
        a: "Once registered, a business must file periodic returns (monthly or quarterly, depending on the scheme) reporting sales, purchases and input tax credit. Non-filing, even with nil turnover, can attract penalties.",
      },
      {
        q: "Who should file GST returns?",
        a: "Any business registered under GST must file returns regularly, even if there is no turnover for the period.",
      },
    ],
    related: ["income-tax-filing", "tds-services", "amazon-seller-onboarding"],
    verified: true,
    sourceNote: "Content drawn from the live /gst-2/ page.",
  },
  {
    slug: "tds-services",
    name: "TDS Services",
    category: "tax-compliance",
    navLabel: "TDS",
    featured: false,
    oldUrl: "/tds-2/",
    eyebrow: "Tax & Compliance",
    shortDescription: "TDS/TCS computation, deposit, returns and certificate issuance.",
    heroDescription:
      "Medal Tax provides expert guidance on all aspects of TDS/TCS compliance, from TAN registration through quarterly return filing and assessment support.",
    whoNeedsIt: [
      "Businesses required to deduct tax at source on payments made",
      "Employers issuing TDS certificates to employees",
      "Any entity that needs a Tax Deduction Account Number (TAN)",
    ],
    commonSituations: [
      "Setting up TDS compliance for a new business",
      "Monthly reconciliation of TDS payable vs deposited",
      "Filing quarterly E-TDS returns and correction statements",
      "Responding to a TDS assessment or department query",
    ],
    whatWeHandle: [
      "Assistance obtaining a Tax Deduction Account Number (TAN)",
      "Regular review of TDS/withholding tax compliance",
      "Accurate computation of monthly TDS",
      "Monthly reconciliation of TDS payable and deposited",
      "Electronic or manual deposit of TDS",
      "Issuance of monthly and annual TDS certificates",
      "Filing of quarterly E-TDS and manual returns",
      "Submission of correction statements when required",
      "Comprehensive support for TDS assessments",
    ],
    faqs: [
      {
        q: "What is TDS?",
        a: "Tax Deducted at Source (TDS) is tax that a payer deducts at the time of making certain payments (such as salary, rent, or professional fees) and remits to the government on the recipient's behalf.",
      },
      {
        q: "Do I need a TAN to deduct TDS?",
        a: "Yes. Any person or business required to deduct TDS must first obtain a Tax Deduction Account Number (TAN), which we can assist with.",
      },
    ],
    related: ["income-tax-filing", "gst-services", "accounting-services"],
    verified: true,
    sourceNote: "Content drawn from the live /tds-2/ page.",
  },
  {
    slug: "digital-signature",
    name: "Digital Signature Certificate",
    category: "business-registration",
    navLabel: "Digital Signature",
    featured: false,
    oldUrl: "/digital-signature-2/",
    eyebrow: "Business & Registration Services",
    shortDescription: "Class 3 Digital Signature Certificates for individuals, businesses and DGFT filings.",
    heroDescription:
      "Medal Tax provides Digital Signature Certificates (DSC) for secure authentication and legal compliance across statutory filings.",
    whoNeedsIt: [
      "Directors and signatories filing statutory documents online",
      "Businesses filing GST, IEC or company filings requiring a DSC",
      "Foreign nationals requiring a Class 3 DSC",
    ],
    commonSituations: [
      "Need a DSC to complete an IEC, GST, or company registration filing",
      "Existing certificate has expired and needs renewal",
      "Need encryption alongside signing for secure document exchange",
    ],
    whatWeHandle: [
      "Signature Authentication Certificate",
      "Data Encryption Certificate",
      "Document Signing Certificate",
      "Class 3 Digital Signature",
      "Class 3 Digital Signature with Encryption",
      "Class 3 Digital Signature for Foreign Nationals",
      "Class 3 Digital Signature (DGFT Compliance)",
    ],
    faqs: [
      {
        q: "What is a Digital Signature Certificate used for?",
        a: "A DSC is used to sign documents electronically for statutory and regulatory filings — such as GST, company filings, and DGFT/IEC matters — in place of a physical signature.",
      },
      {
        q: "Which class of DSC do I need?",
        a: "Requirements depend on the filing — for example, DGFT-related filings require a Class 3 (DGFT) certificate. Tell us which filing you need it for and we'll confirm the right class.",
      },
    ],
    related: ["import-export-code", "corporate-services", "gst-services"],
    verified: true,
    sourceNote: "Content drawn from the live /digital-signature-2/ page.",
  },
  {
    slug: "corporate-governance",
    name: "Corporate Governance",
    category: "business-registration",
    navLabel: "Corporate Governance",
    featured: false,
    oldUrl: "/corporate-governance/",
    eyebrow: "Business & Registration Services",
    shortDescription: "Governance frameworks, internal controls and audit committee support for growing companies.",
    heroDescription:
      "As companies grow, effective governance becomes essential to regulatory compliance and stakeholder trust. Medal Tax supports the frameworks and oversight mechanisms that underpin it.",
    whoNeedsIt: [
      "Companies subject to SEBI or stock-exchange listing governance requirements",
      "Growing companies formalising board and audit-committee structures",
      "Businesses seeking independent verification of internal controls",
    ],
    commonSituations: [
      "Setting up an internal audit function for the first time",
      "Forming an independent audit committee for the board",
      "Preparing governance disclosures for lenders or investors",
    ],
    whatWeHandle: [
      "Periodic monitoring through internal audit",
      "Independent audit for unbiased assessment of financial statements and controls",
      "Independent verification to strengthen credibility of corporate disclosures",
      "Support for effective board supervision mechanisms",
      "Accountability structures for management decisions and actions",
      "Support in appointing independent directors",
      "Formation of an independent audit committee for the board",
      "Guidance on adequate disclosure and transparency in reporting",
    ],
    faqs: [
      {
        q: "Why does corporate governance matter for a growing company?",
        a: "As companies scale, lenders, investors and regulators increasingly assess governance standards — covering transparency, board oversight, and internal controls — alongside financial performance.",
      },
    ],
    related: ["corporate-services", "audit-services", "corporate-finance"],
    verified: true,
    sourceNote: "Content drawn from the live /corporate-governance/ page.",
  },
  {
    slug: "non-resident-services",
    name: "Services for Non-Residents",
    category: "tax-compliance",
    navLabel: "Non-Residents",
    featured: false,
    oldUrl: "/non-residents/",
    eyebrow: "Tax & Compliance",
    shortDescription: "PAN, tax planning, FEMA/RBI advisory and repatriation support for NRIs and foreign nationals.",
    heroDescription:
      "Medal Tax supports non-resident individuals and businesses with Indian tax compliance, FEMA/RBI matters, and cross-border financial administration.",
    whoNeedsIt: [
      "Non-resident Indians (NRIs) with Indian income or assets",
      "Foreign nationals investing in or repatriating funds from India",
      "Non-residents needing PAN or tax return filing in India",
    ],
    commonSituations: [
      "Need a PAN to complete a transaction or investment in India",
      "Repatriating income or sale proceeds from India",
      "Buying or selling residential or commercial property in India",
      "Unclear on FEMA/RBI approval requirements for a transaction",
    ],
    whatWeHandle: [
      "Allotment of Permanent Account Number (PAN)",
      "Tax planning and strategic structuring",
      "Obtaining advance rulings on debatable tax issues",
      "Consultancy on FEMA/RBI matters for cross-border transactions",
      "Filing income tax/wealth tax returns for non-resident individuals and businesses",
      "Investment advisory",
      "Issuing certificates for repatriation of income/assets from India",
      "RBI applications, including approvals for sale and purchase of property in India",
    ],
    faqs: [
      {
        q: "Do NRIs need to file an Indian income tax return?",
        a: "NRIs with income earned or accrued in India — such as rent, capital gains, or business income — are generally required to file a return in India, regardless of their residency status abroad.",
      },
    ],
    related: ["income-tax-filing", "corporate-finance"],
    verified: true,
    sourceNote: "Content drawn from the live /non-residents/ page.",
  },
  {
    slug: "accounting-services",
    name: "Accounting Services",
    category: "accounting-financial",
    navLabel: "Accounting",
    featured: true,
    oldUrl: "/accounting-services/",
    eyebrow: "Accounting & Financial Services",
    shortDescription: "Comprehensive accounting and financial record-keeping for businesses of every size.",
    heroDescription:
      "Medal Tax provides comprehensive accounting services, keeping your financial records accurate and audit-ready while supporting the compliance work built on top of them.",
    whoNeedsIt: [
      "Businesses that need ongoing bookkeeping and financial statements",
      "Companies preparing for statutory audit or tax filing",
      "Founders who want financial management handled by specialists",
    ],
    commonSituations: [
      "Books are behind and need to be brought current before filing deadlines",
      "Preparing financial statements for a loan, investor, or audit",
      "Need ongoing monthly bookkeeping rather than a one-off catch-up",
    ],
    whatWeHandle: [
      "Comprehensive accounting services and bookkeeping",
      "Accurate financial management aligned with statutory requirements",
      "Preparation of financial statements to support compliance and audit",
    ],
    faqs: [
      {
        q: "Can you take over bookkeeping that's fallen behind?",
        a: "Yes — we regularly bring books current before a filing deadline or audit, then move clients onto an ongoing monthly cadence.",
      },
    ],
    related: ["audit-services", "corporate-finance", "gst-services"],
    verified: true,
    sourceNote:
      "Core service description drawn from the live /accounting-services/ page. Note: the live page also carries a separate landing-page layout with client testimonials and satisfaction statistics that read as template/placeholder content rather than verified client feedback; these have been excluded from this redesign per the no-fabricated-testimonials rule and should be replaced with real, consented client testimonials if available.",
  },
  {
    slug: "audit-services",
    name: "Audit Services",
    category: "accounting-financial",
    navLabel: "Audit",
    featured: false,
    oldUrl: "/audit-services/",
    eyebrow: "Accounting & Financial Services",
    shortDescription: "Statutory, tax, internal and specialised audits across companies, trusts and societies.",
    heroDescription:
      "Medal Tax conducts statutory, tax and internal audits that go beyond compliance sign-off — reviewing systems, verifying expenses and identifying operational inefficiencies.",
    whoNeedsIt: [
      "Companies requiring statutory audit under company law",
      "Entities subject to tax audit under Section 44AB of the Income Tax Act",
      "PF trusts, charitable trusts, schools and co-operative societies",
      "Banks requiring revenue or branch audits",
    ],
    commonSituations: [
      "Annual statutory audit is due",
      "Turnover has crossed the tax-audit threshold under Section 44AB",
      "Board wants an internal audit to review controls and processes",
      "A trust, society or school needs its financial audit completed",
    ],
    whatWeHandle: [
      "In-depth analysis of existing systems, procedures and controls",
      "Compliance assurance against company policy and statutory requirements",
      "Financial review against GAAP, applicable Accounting Standards and IFRS",
      "Expense verification to guard against misstatement",
      "Operational efficiency assessment",
      "Fraud detection and revenue-leakage identification",
      "Certification of financial statements",
      "Statutory audit of companies",
      "Tax audit under Section 44AB of the Income Tax Act, 1961",
      "Audits under other sections of the Income Tax Act",
      "Concurrent audits",
      "Revenue and branch audits of banks",
      "Audit of PF trusts, charitable trusts, schools and co-operative societies",
      "Information system audit",
      "Internal audits",
    ],
    faqs: [
      {
        q: "What triggers a mandatory tax audit?",
        a: "A tax audit under Section 44AB is generally required once a business or profession crosses the prescribed turnover or gross-receipts threshold. Thresholds and exceptions vary by entity type — confirm your specific position with our team.",
      },
    ],
    related: ["accounting-services", "corporate-governance", "corporate-finance"],
    verified: true,
    sourceNote: "Content drawn from the live /audit-services/ page.",
  },
  {
    slug: "corporate-services",
    name: "Corporate Services",
    category: "business-registration",
    navLabel: "Corporate Services",
    featured: false,
    oldUrl: "/corporate-services/",
    eyebrow: "Business & Registration Services",
    shortDescription: "Incorporation, company law compliance, secretarial matters and corporate restructuring.",
    heroDescription:
      "Medal Tax supports companies through incorporation, statutory filings, and secretarial matters, along with more complex restructuring work.",
    whoNeedsIt: [
      "Founders incorporating a new company",
      "Companies with annual filing and secretarial obligations",
      "Businesses undergoing mergers, acquisitions or restructuring",
    ],
    commonSituations: [
      "Incorporating a new company and need the filings handled correctly",
      "Annual return or statutory document deadline approaching",
      "Planning a merger, acquisition or company reorganisation",
      "Need to change company name, objects, or registered office",
    ],
    whatWeHandle: [
      "Company incorporation and fulfilment of legal requirements",
      "Company law consultancy on compliance and regulation",
      "Mergers, acquisitions and corporate reorganisations",
      "Filing of annual returns and statutory documents",
      "Clause 49 compliance review",
      "Secretarial matters and share transfers",
      "Statutory record maintenance",
      "Advisory on public, rights and bonus issues",
      "Company modifications — name, objects, registered office and other statutory details",
    ],
    faqs: [
      {
        q: "What's involved in incorporating a company?",
        a: "Incorporation involves reserving a name, preparing incorporation documents, and filing with the Registrar of Companies, followed by post-incorporation compliances such as PAN, TAN and bank account setup. We handle the filings and documentation involved.",
      },
    ],
    related: ["corporate-governance", "digital-signature", "corporate-finance"],
    verified: true,
    sourceNote: "Content drawn from the live /corporate-services/ page.",
  },
  {
    slug: "corporate-finance",
    name: "Corporate Finance",
    category: "accounting-financial",
    navLabel: "Corporate Finance",
    featured: false,
    oldUrl: "/corporate-finance/",
    eyebrow: "Accounting & Financial Services",
    shortDescription: "Project reports, CMA data, private placement and external commercial borrowing support.",
    heroDescription:
      "Medal Tax supports the financial documentation and structuring businesses need to raise funding — from bank loan applications to cross-border borrowing.",
    whoNeedsIt: [
      "Businesses applying for bank loans or credit facilities",
      "Companies raising funds through private placement or corporate deposits",
      "Businesses exploring external commercial borrowing (ECB)",
    ],
    commonSituations: [
      "Bank has requested a project report or CMA data for a loan application",
      "Raising working capital or a term loan",
      "Exploring foreign-currency borrowing for the business",
    ],
    whatWeHandle: [
      "Project report preparation for financial planning and investment decisions",
      "CMA data preparation for bank loans",
      "Private placement and corporate funding, including inter-corporate deposits and term loans",
      "External Commercial Borrowings (ECB) advisory and compliance support",
    ],
    faqs: [
      {
        q: "What is CMA data and why does my bank need it?",
        a: "CMA (Credit Monitoring Arrangement) data is a structured financial projection banks use to assess a business's creditworthiness before sanctioning a loan or credit facility. We prepare this in the format banks expect.",
      },
    ],
    related: ["accounting-services", "audit-services", "corporate-services"],
    verified: true,
    sourceNote: "Content drawn from the live /corporate-finance/ page.",
  },
  {
    slug: "amazon-seller-onboarding",
    name: "Amazon Seller Onboarding",
    category: "ecommerce-support",
    navLabel: "Amazon Onboarding",
    featured: true,
    oldUrl: "/amazon-onboarding-support/",
    eyebrow: "E-Commerce & Business Support",
    shortDescription: "Seller account setup, GST/tax compliance and listing support for new and existing Amazon sellers.",
    heroDescription:
      "Medal Tax provides Amazon seller onboarding support — helping businesses set up seller accounts and stay compliant while they grow on the platform. Medal Tax is an independent advisory provider and is not affiliated with or endorsed by Amazon.",
    whoNeedsIt: [
      "New sellers setting up an Amazon seller account for the first time",
      "Existing sellers optimising listings or resolving account issues",
      "Businesses needing GST and tax compliance alongside their seller setup",
    ],
    commonSituations: [
      "Setting up a seller account and unsure which category approvals are needed",
      "Need GST registration sorted before listing products",
      "Listings need SEO-friendly titles, descriptions and images",
      "Setting up FBA (Fulfilled by Amazon) and inventory logistics",
      "Concerned about account health or policy compliance",
    ],
    whatWeHandle: [
      "Seller account registration — assistance creating and verifying your Amazon Seller account",
      "Category and product approval guidance",
      "Listing optimisation — SEO-friendly titles, descriptions and images",
      "Pricing and tax compliance, including GST & TDS setup",
      "Brand registry and protection support",
      "Inventory and shipping setup, including FBA (Fulfilled by Amazon)",
      "Account health and policy compliance to help avoid suspensions",
    ],
    documents: [
      "PAN and GSTIN",
      "Bank account details for seller payouts",
      "Business registration documents",
      "Product and category-specific documents (where category approval is required)",
    ],
    faqs: [
      {
        q: "How does Amazon Seller Onboarding work with Medal Tax?",
        a: "We assist with account registration and verification, category approvals, GST and tax compliance setup, and listing optimisation, so a new seller account is set up correctly from the start.",
      },
      {
        q: "Is Medal Tax affiliated with Amazon?",
        a: "No. Medal Tax provides independent advisory and compliance support to sellers and is not affiliated with, endorsed by, or representing Amazon.",
      },
      {
        q: "Do I need GST registration before selling on Amazon?",
        a: "In most cases, yes — GST registration is generally required to sell on Amazon's Indian marketplace. We can set this up as part of onboarding.",
      },
    ],
    related: ["gst-services", "import-export-code", "digital-signature"],
    contactTeamName: "Imran",
    verified: true,
    sourceNote: "Content drawn from the live /amazon-onboarding-support/ page.",
  },
  {
    slug: "import-export-code",
    name: "Import Export Code (IEC) Registration",
    category: "business-registration",
    navLabel: "IEC Registration",
    featured: true,
    eyebrow: "Business & Registration Services",
    shortDescription: "IEC registration for businesses starting or scaling import/export activity.",
    heroDescription:
      "An Import Export Code (IEC) is required to import or export goods and services from India. Medal Tax assists with IEC registration as part of its business and compliance services.",
    whoNeedsIt: [
      "Businesses starting import or export activity",
      "E-commerce sellers exporting internationally",
      "Companies expanding into cross-border trade",
    ],
    commonSituations: [
      "Starting a new export or import business and need an IEC to begin",
      "An existing IEC needs updating after a business change",
      "A bank or customs authority has asked for IEC details before releasing a shipment or payment",
    ],
    whatWeHandle: [
      "IEC registration application and submission",
      "Guidance on documentation required for registration",
      "Coordination with digital signature requirements where applicable",
    ],
    documents: [
      "PAN of the business/individual",
      "Business registration proof (or individual proof, for sole proprietors)",
      "Bank account details and cancelled cheque or bank certificate",
      "Address proof of the business premises",
      "Digital Signature Certificate (where required for the filing)",
    ],
    benefits: [
      "One registration is generally valid for the lifetime of the business, subject to any updates required",
      "Enables legal import/export activity and access to related export benefits and schemes",
    ],
    considerations: [
      "Processing timelines are set by the issuing authority (DGFT) and can vary — we do not guarantee a specific approval date.",
      "Approval depends on the accuracy and completeness of documentation submitted.",
    ],
    faqs: [
      {
        q: "What is an Import Export Code (IEC)?",
        a: "An IEC is a 10-digit registration number issued by the Directorate General of Foreign Trade (DGFT) that is required for any business or individual engaged in importing or exporting goods and services from India.",
      },
      {
        q: "Who needs an IEC?",
        a: "Any business or individual involved in cross-border trade of goods or services generally needs an IEC, including e-commerce sellers who export internationally.",
      },
      {
        q: "How long does IEC registration take?",
        a: "Processing timelines are set by the DGFT and depend on the accuracy of the documents submitted. Share your documents with our team and we'll advise on the specifics of your application.",
      },
    ],
    related: ["digital-signature", "amazon-seller-onboarding", "corporate-services"],
    verified: true,
    sourceNote:
      "IEC Registration is confirmed as an active Medal Tax service via the enquiry-form service list on /contact-us-2/ and the service list on /accounting-services/, though it does not yet have its own dedicated page on the live site. This page has been built new as part of this redesign.",
  },
  {
    slug: "trademark-registration",
    name: "Trademark Registration",
    category: "business-registration",
    navLabel: "Trademark Registration",
    featured: true,
    eyebrow: "Business & Registration Services",
    shortDescription: "Trademark registration guidance for businesses protecting a brand name, logo or mark.",
    heroDescription:
      "Trademark registration protects a business's brand name, logo, or mark under Indian trademark law. This page outlines what the process involves — confirm current scope and pricing with Medal Tax directly.",
    whoNeedsIt: [
      "Businesses launching a new brand name, logo or tagline",
      "Companies expanding into new product categories under an existing brand",
      "Sellers wanting brand protection ahead of marketplace brand registry",
    ],
    commonSituations: [
      "Launching a new brand and want to secure the name before a competitor does",
      "Received a trademark objection or opposition and need guidance",
      "Need brand registration for a marketplace's brand protection programme",
    ],
    whatWeHandle: [
      "Guidance on trademark classes relevant to your goods or services",
      "Trademark search prior to filing",
      "Preparation and filing of the trademark application",
      "Guidance through examination, objection and opposition stages",
    ],
    documents: [
      "Business/applicant identity and address proof",
      "Logo or wordmark to be registered (if applicable)",
      "Proof of use or proposed-to-be-used declaration",
    ],
    benefits: [
      "Legal ownership and exclusive right to use the registered mark for the goods/services covered",
      "A registered mark strengthens brand protection and enforcement options",
    ],
    considerations: [
      "Trademark registration is not guaranteed — approval depends on the Trademark Registry's examination and any objections or oppositions raised.",
      "Timelines are set by the Registry and can extend to several months or longer depending on objections.",
    ],
    faqs: [
      {
        q: "What is trademark registration?",
        a: "Trademark registration is the legal process of registering a brand name, logo, or mark with the Trademark Registry, granting the owner exclusive rights to use it for the specified goods or services.",
      },
      {
        q: "Who may need trademark registration?",
        a: "Any business that wants legal protection over its brand name, logo, or mark — particularly before scaling, expanding into new markets, or applying to a marketplace's brand registry programme.",
      },
      {
        q: "Is approval guaranteed?",
        a: "No. Registration depends on the Trademark Registry's examination of the application, and can be affected by objections or third-party oppositions. We do not guarantee approval or a specific timeline.",
      },
    ],
    related: ["corporate-services", "import-export-code", "amazon-seller-onboarding"],
    verified: false,
    sourceNote:
      "IMPORTANT — CONTENT REQUIRED: Trademark Registration was named in this project's brief as a service to build a dedicated page for, but it was NOT found on the live medaltax.com site (navigation, service list, or contact form) during this audit. This page has been built with general, factual information about the trademark process and no Medal-Tax-specific claims. Before launch, Medal Tax should confirm whether this is an active service offering and supply any specifics (turnaround experience, scope of support) to replace the general placeholders above.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(category: Category) {
  return services.filter((s) => s.category === category);
}

export const featuredServices = services.filter((s) => s.featured);
