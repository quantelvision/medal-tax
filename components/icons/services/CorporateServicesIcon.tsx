import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Corporate Services — incorporation, a building brought into being. */
export function CorporateServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="13" y="9" width="22" height="33" rx="1" />
      <rect x="17" y="14" width="4" height="4" />
      <rect x="27" y="14" width="4" height="4" />
      <rect x="17" y="21" width="4" height="4" />
      <rect x="27" y="21" width="4" height="4" />
      <rect x="17" y="28" width="4" height="4" />
      <rect x="27" y="28" width="4" height="4" />
      <rect x="20" y="36" width="8" height="6" />
    </ServiceIconFrame>
  );
}
