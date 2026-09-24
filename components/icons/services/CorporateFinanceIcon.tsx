import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/** Corporate Finance — growth, read off a rising bar chart. */
export function CorporateFinanceIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <line x1="8" y1="39" x2="40" y2="39" />
      <rect x="11" y="29" width="6" height="10" rx="1" />
      <rect x="21" y="21" width="6" height="18" rx="1" />
      <rect x="31" y="13" width="6" height="26" rx="1" />
      <line x1="13" y1="16" x2="33" y2="8" />
      <polyline points="26,8 33,8 33,15" />
    </ServiceIconFrame>
  );
}
