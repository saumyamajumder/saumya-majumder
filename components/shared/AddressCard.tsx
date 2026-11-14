import { contactInfo, whatsappHref } from "@/data/site";
import type { AnyIcon } from "@/types";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { FaLinkedinIn, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa6";

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: AnyIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-brand-start">
        <Icon aria-hidden className="size-[18px]" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {label}
        </p>
        <div className="mt-1 text-sm font-medium break-words">{children}</div>
      </div>
    </li>
  );
}

/** Decorative map illustration (West Bengal pin) — swap for an embed if you like. */
function MapIllustration() {
  return (
    <div className="relative mt-7 overflow-hidden rounded-2xl border border-border bg-background">
      <svg viewBox="0 0 320 130" className="block h-auto w-full" aria-hidden>
        <defs>
          <pattern
            id="map-grid"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M16 0H0V16"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="map-route" x1="0" x2="1">
            <stop offset="0" stopColor="var(--brand-start)" />
            <stop offset="1" stopColor="var(--brand-end)" />
          </linearGradient>
        </defs>
        <rect width="320" height="130" fill="url(#map-grid)" />
        <path
          d="M-10 100 C 60 80, 90 120, 160 90 S 260 30, 330 50"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="14"
        />
        <path
          d="M70 -10 L 110 140"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="10"
        />
        <path
          d="M200 -10 C 190 40, 230 80, 215 140"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="8"
        />
        <path
          d="M40 118 C 80 100, 120 108, 160 70"
          fill="none"
          stroke="url(#map-route)"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <circle
          cx="160"
          cy="70"
          r="22"
          fill="var(--brand-start)"
          opacity="0.15"
        />
        <path
          d="M160 44c-8.3 0-15 6.5-15 14.6C145 69.5 160 84 160 84s15-14.5 15-25.4C175 50.5 168.3 44 160 44z"
          fill="var(--brand-start)"
        />
        <circle cx="160" cy="58" r="5" fill="#fff" />
      </svg>
      <p className="absolute right-3 bottom-3 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs font-medium">
        {contactInfo.location} · IST (UTC+5:30)
      </p>
    </div>
  );
}

export function AddressCard() {
  const telHref = `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`;
  return (
    <aside
      aria-labelledby="contact-info-title"
      className="h-full rounded-[20px] border border-border bg-surface p-6 sm:p-7"
    >
      <h3
        id="contact-info-title"
        className="font-heading text-xl font-semibold tracking-tight"
      >
        Contact details
      </h3>
      <ul className="mt-6 flex flex-col gap-5">
        <InfoRow icon={Mail} label="Email">
          <a
            href={`mailto:${contactInfo.email}`}
            className="underline-offset-4 hover:underline"
          >
            {contactInfo.email}
          </a>
        </InfoRow>

        <InfoRow icon={Phone} label="Phone / WhatsApp">
          <a href={telHref} className="underline-offset-4 hover:underline">
            {contactInfo.phone}
          </a>
        </InfoRow>

      

        <InfoRow icon={FaLinkedinIn} label="LinkedIn">
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
             Linkedin Profile
          </a>
        </InfoRow>

        <InfoRow icon={FaFacebookF} label="Facebook">
          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Facebook Profile
          </a>
        </InfoRow>

        <InfoRow icon={FaInstagram} label="Instagram">
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Instagram Profile
          </a>
        </InfoRow>
          <InfoRow icon={MapPin} label="Location">
          <address className="not-italic">{contactInfo.location}</address>
        </InfoRow>
      </ul>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] font-semibold text-[#06281a] transition-[translate,filter] duration-300 hover:-translate-y-0.5 hover:brightness-105"
      >
        <FaWhatsapp aria-hidden className="size-5" />
        Chat on WhatsApp
        <span className="sr-only"> (opens in a new tab)</span>
      </a>

      <MapIllustration />
    </aside>
  );
}
