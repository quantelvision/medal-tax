import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Trademark Registration — a medal, registration affirmed at its centre. */
export function TrademarkRegistrationIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <circle cx="24" cy="18" r="12" />
      <polyline points="18,18 22,22 30,13" />
      <path d="M16 28 L11 43 L19 38 Z" />
      <path d="M32 28 L37 43 L29 38 Z" />
    </ServiceIconFrame>
  );
}
