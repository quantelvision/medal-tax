import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Import Export Code — a shipping crate, goods moving in both directions. */
export function ImportExportCodeIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="8" y="16" width="32" height="22" rx="2" />
      <line x1="18" y1="16" x2="18" y2="38" />
      <line x1="30" y1="16" x2="30" y2="38" />
      <line x1="8" y1="27" x2="40" y2="27" />
      <line x1="12" y1="8" x2="36" y2="8" />
      <polyline points="16,4 12,8 16,12" />
      <polyline points="32,4 36,8 32,12" />
    </ServiceIconFrame>
  );
}
