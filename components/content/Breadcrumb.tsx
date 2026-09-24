import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export function Breadcrumb({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper">
      <BreadcrumbSchema items={items} />
      <ol className="mx-auto flex max-w-[var(--container-page)] flex-wrap items-center gap-1.5 px-5 py-3 text-[13px] text-slate md:px-8">
        {items.map((item, i) => (
          <li key={item.url} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="text-ink">{item.name}</span>
            ) : (
              <Link href={item.url} className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-2">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
