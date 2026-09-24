import type { ComponentType } from "react";
import type { ServiceIconProps } from "./ServiceIconBase";
import { IncomeTaxFilingIcon } from "./IncomeTaxFilingIcon";
import { GstServicesIcon } from "./GstServicesIcon";
import { TdsServicesIcon } from "./TdsServicesIcon";
import { DigitalSignatureIcon } from "./DigitalSignatureIcon";
import { CorporateGovernanceIcon } from "./CorporateGovernanceIcon";
import { NonResidentServicesIcon } from "./NonResidentServicesIcon";
import { AccountingServicesIcon } from "./AccountingServicesIcon";
import { AuditServicesIcon } from "./AuditServicesIcon";
import { CorporateServicesIcon } from "./CorporateServicesIcon";
import { CorporateFinanceIcon } from "./CorporateFinanceIcon";
import { AmazonSellerOnboardingIcon } from "./AmazonSellerOnboardingIcon";
import { ImportExportCodeIcon } from "./ImportExportCodeIcon";
import { TrademarkRegistrationIcon } from "./TrademarkRegistrationIcon";

export * from "./ServiceIconBase";
export {
  IncomeTaxFilingIcon,
  GstServicesIcon,
  TdsServicesIcon,
  DigitalSignatureIcon,
  CorporateGovernanceIcon,
  NonResidentServicesIcon,
  AccountingServicesIcon,
  AuditServicesIcon,
  CorporateServicesIcon,
  CorporateFinanceIcon,
  AmazonSellerOnboardingIcon,
  ImportExportCodeIcon,
  TrademarkRegistrationIcon,
};

/**
 * Slug -> icon, keyed exactly to `slug` in lib/data/services.ts. A missing
 * entry is a build-time type error (see the exhaustiveness check this
 * satisfies at its one call site in lib/data/services.ts's slug list), not a
 * silently blank icon at runtime.
 */
export const serviceIcons: Record<string, ComponentType<ServiceIconProps>> = {
  "income-tax-filing": IncomeTaxFilingIcon,
  "gst-services": GstServicesIcon,
  "tds-services": TdsServicesIcon,
  "digital-signature": DigitalSignatureIcon,
  "corporate-governance": CorporateGovernanceIcon,
  "non-resident-services": NonResidentServicesIcon,
  "accounting-services": AccountingServicesIcon,
  "audit-services": AuditServicesIcon,
  "corporate-services": CorporateServicesIcon,
  "corporate-finance": CorporateFinanceIcon,
  "amazon-seller-onboarding": AmazonSellerOnboardingIcon,
  "import-export-code": ImportExportCodeIcon,
  "trademark-registration": TrademarkRegistrationIcon,
};
