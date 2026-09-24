import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Audit Services — a document, examined under the glass. */
export function AuditServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="8" y="6" width="22" height="32" rx="3" />
      <line x1="12" y1="14" x2="26" y2="14" />
      <line x1="12" y1="20" x2="26" y2="20" />
      <line x1="12" y1="26" x2="22" y2="26" />
      <circle cx="31" cy="31" r="8" />
      <line x1="36.5" y1="36.5" x2="42" y2="42" />
    </ServiceIconFrame>
  );
}
