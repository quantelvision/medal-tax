import { team, whatsappHref, telHref } from "@/lib/data/site";
import { CallButton, WhatsAppButton } from "@/components/conversion/Buttons";
import { serviceIcons } from "@/components/icons/services";

export function ServiceContact({
  serviceName,
  serviceSlug,
  contactName,
}: {
  serviceName: string;
  serviceSlug?: string;
  contactName?: string;
}) {
  const person = contactName ? team.find((t) => t.name === contactName) : undefined;

  if (!person) return null;

  const message = `Hi ${person.name}, I would like help with ${serviceName}.`;
  const ServiceIcon = serviceSlug ? serviceIcons[serviceSlug] : undefined;

  return (
    <div className="rounded-md border border-line bg-paper-2/60 p-7">
      <p className="flex items-center gap-2 text-[14px] font-medium text-brass-2">
        {ServiceIcon && <ServiceIcon size="sm" className="shrink-0" />}
        {serviceName}
      </p>
      <p className="mt-2 font-display text-2xl text-navy">Speak with {person.name}</p>
      <p className="mt-1 text-[14.5px] text-slate">{person.role}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <CallButton phone={person.phone} label={`Call ${person.name}`} />
        <WhatsAppButton waNumber={person.whatsapp} message={message} label={`WhatsApp ${person.name}`} />
      </div>
    </div>
  );
}

export { whatsappHref, telHref };
