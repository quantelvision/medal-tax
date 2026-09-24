import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/**
 * Amazon Seller Onboarding — a parcel, its flaps open.
 *
 * First pass had the flap lines converge to a single point above the box,
 * which is the standard silhouette for a house roof, not an opened carton.
 * Real cardboard flaps fold outward when open, so splaying them outward both
 * fixes the misread and is the more accurate drawing.
 */
export function AmazonSellerOnboardingIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <rect x="10" y="16" width="28" height="22" rx="2" />
      <line x1="10" y1="16" x2="5" y2="9" />
      <line x1="38" y1="16" x2="43" y2="9" />
      <line x1="24" y1="16" x2="24" y2="38" />
    </ServiceIconFrame>
  );
}
