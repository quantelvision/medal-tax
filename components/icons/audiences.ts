import { User, Buildings, ShoppingBagOpen, GlobeHemisphereWest } from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { Audience } from "@/lib/data/audiences";

/** Keyed by audience slug — same pairing pattern as components/icons/services. */
export const audienceIcons: Record<Audience["slug"], PhosphorIcon> = {
  individuals: User,
  businesses: Buildings,
  ecommerce: ShoppingBagOpen,
  "non-residents": GlobeHemisphereWest,
};
