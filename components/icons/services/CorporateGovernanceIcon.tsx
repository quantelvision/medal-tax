import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Corporate Governance — a shield, compliance affirmed within it. */
export function CorporateGovernanceIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <path d="M24 6 L38 11 V22 C38 33 32 40 24 43 C16 40 10 33 10 22 V11 Z" />
      <polyline points="17,24 21,29 31,17" />
    </ServiceIconFrame>
  );
}
