import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** GST Services — an invoice, its torn receipt edge the recognisable cue. */
export function GstServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <path d="M14 8 H34 V30 L30 35 L26 30 L22 35 L18 30 L14 30 Z" />
      <line x1="18" y1="14" x2="30" y2="14" />
      <line x1="18" y1="20" x2="30" y2="20" />
      <line x1="18" y1="25" x2="26" y2="25" />
    </ServiceIconFrame>
  );
}
