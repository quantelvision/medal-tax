import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Services for Non-Residents — a globe, a place planted on it. */
export function NonResidentServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <circle cx="19" cy="20" r="13" />
      <ellipse cx="19" cy="20" rx="5.5" ry="13" />
      <line x1="6" y1="20" x2="32" y2="20" />
      <path d="M36 22 C40 22 43 25 43 29 C43 34 36 42 36 42 C36 42 29 34 29 29 C29 25 32 22 36 22 Z" />
      <circle cx="36" cy="29" r="2" />
    </ServiceIconFrame>
  );
}
