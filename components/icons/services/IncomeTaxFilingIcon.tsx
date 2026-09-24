import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Income Tax Filing — a return, filed and checked off. */
export function IncomeTaxFilingIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="12" y="6" width="24" height="36" rx="3" />
      <line x1="17" y1="16" x2="31" y2="16" />
      <line x1="17" y1="23" x2="31" y2="23" />
      <line x1="17" y1="30" x2="25" y2="30" />
      <polyline points="19,33 23,38 33,26" />
    </ServiceIconFrame>
  );
}
