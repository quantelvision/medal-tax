import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Digital Signature — a certificate token, chip and signature in one. */
export function DigitalSignatureIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="7" y="14" width="34" height="22" rx="3" />
      <rect x="12" y="20" width="8" height="6" rx="1" />
      <path d="M23 30 Q27 24 30 29 T38 27" />
    </ServiceIconFrame>
  );
}
