import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Accounting Services — an open ledger, ruled columns either side. */
export function AccountingServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="9" y="10" width="30" height="26" rx="2" />
      <line x1="24" y1="10" x2="24" y2="36" />
      <line x1="13" y1="17" x2="21" y2="17" />
      <line x1="13" y1="23" x2="21" y2="23" />
      <line x1="13" y1="29" x2="21" y2="29" />
      <line x1="27" y1="17" x2="35" y2="17" />
      <line x1="27" y1="23" x2="35" y2="23" />
      <line x1="27" y1="29" x2="35" y2="29" />
    </ServiceIconFrame>
  );
}
