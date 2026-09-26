import Link from "next/link";
import type { Service } from "@/lib/data/services";
import { getService } from "@/lib/data/services";
import { serviceIcons } from "@/components/icons/services";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealItem } from "@/components/motion/RevealItem";

export function NumberedList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-navy">{title}</h2>
      <ol className="mt-6 space-y-5">
        {items.map((item, i) => (
          <li key={item} className="flex gap-4">
            <span className="font-display text-lg text-brass-2">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-step-9 leading-relaxed text-ink">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PlainList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-navy">{title}</h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-b border-line pb-3 text-step-9 leading-relaxed text-ink">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocumentsGrid({ documents }: { documents: string[] }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-navy">Documents typically required</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {documents.map((doc) => (
          <div key={doc} className="rounded-md border border-line px-5 py-4 text-step-7 leading-relaxed text-ink">
            {doc}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RelatedServices({ service }: { service: Service }) {
  const related = service.related.map((slug) => getService(slug)).filter(Boolean) as Service[];
  if (!related.length) return null;
  return (
    <div>
      <h2 className="font-display text-3xl text-navy">Related services</h2>
      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
        {related.map((r) => {
          const ServiceIcon = serviceIcons[r.slug];
          return (
            <RevealItem key={r.slug} className="h-full">
              <Link
                href={`/services/${r.slug}`}
                className="group flex h-full flex-col rounded-md border border-line p-5 transition-colors duration-(--dur-base) ease-standard hover:border-brass/60"
              >
                <ServiceIcon size="md" className="text-brass-2" />
                <p className="mt-3 text-step-4 text-slate">{r.eyebrow}</p>
                <p className="mt-1.5 font-display text-lg text-navy transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2">{r.name}</p>
                <p className="mt-2 text-step-6 leading-relaxed text-slate">{r.shortDescription}</p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
