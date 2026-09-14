'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { IconArrowUpRight, IconShield, FooterBar, type FooterSocial } from './footer-kit';

type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * Six customer marks. Invented, not real companies — a logo row that ships with
 * somebody else's trademarks in it is wrong in every install. Straight lines,
 * rectangles and circles on a 24px grid, so the set stays crisp at 20px.
 */
function MarkNorthwind(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 22 21.5 12 16.6 2 21.5 12 2Z" />
    </svg>
  );
}

function MarkCobalt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2 22 12 12 22 2 12 12 2Zm0 5.3L7.3 12l4.7 4.7 4.7-4.7L12 7.3Z"
      />
    </svg>
  );
}

function MarkMeridian(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M3.4 9h17.2M3.4 15h17.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function MarkTessellate(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 3h8.4v8.4H3V3Z" />
      <path d="M12.6 3H21v8.4h-8.4V3Z" opacity="0.45" />
      <path d="M3 12.6h8.4V21H3v-8.4Z" opacity="0.45" />
      <path d="M12.6 12.6H21V21h-8.4v-8.4Z" />
    </svg>
  );
}

function MarkLinework(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="9" width="4" height="12" rx="2" opacity="0.45" />
      <rect x="10" y="3.5" width="4" height="17.5" rx="2" />
      <rect x="17" y="12.5" width="4" height="8.5" rx="2" opacity="0.45" />
    </svg>
  );
}

function MarkHollowCreek(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

/* One word each. Two-word names truncate to an ellipsis in the two-column
   mobile grid, and a logo row of half-names reads as broken rather than tight. */
/**
 * Certification marks, drawn rather than imported as images.
 *
 * The badges were five identical green dots, which told a procurement reader
 * nothing — the whole point of a compliance row is that the marks are
 * recognisable before you read the label. These are silhouettes in each
 * standard's own colours: the EU ring of twelve stars for GDPR, an audit seal
 * for SOC 2, a certification rosette for ISO, a shield and cross for HIPAA, a
 * locked card for PCI. Trademarks belong to their respective bodies; swap in
 * the official artwork you are licensed to display before shipping.
 */
function MarkSoc2(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#1F4E79" />
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="1.1"
      />
      <path
        d="m8.6 12.2 2.4 2.4 4.4-5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkIso(props: IconProps) {
  /* A certification rosette: twelve points around a disc. */
  const points = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `${(12 + Math.cos(a) * 10).toFixed(2)},${(12 + Math.sin(a) * 10).toFixed(2)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <polygon points={points} fill="#4338CA" />
      <circle cx="12" cy="12" r="7.2" fill="#fff" fillOpacity="0.18" />
      <path d="M7 12h10" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M9 9h6M9 15h6"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MarkGdpr(props: IconProps) {
  /* The EU ring: twelve gold stars on reflex blue. Reading it as stars at 22px
     needs discs, not five-point stars — the ring is what carries recognition. */
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 12 + Math.cos(a) * 7.2, y: 12 + Math.sin(a) * 7.2 };
  });
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#003399" />
      {stars.map((star, i) => (
        <circle key={i} cx={star.x.toFixed(2)} cy={star.y.toFixed(2)} r="1.15" fill="#FFCC00" />
      ))}
    </svg>
  );
}

function MarkHipaa(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.4 20 5.4v5.9c0 5-3.4 8.7-8 10.5-4.6-1.8-8-5.5-8-10.5V5.4l8-3Z"
        fill="#0F766E"
      />
      <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MarkPci(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="3" fill="#B01116" />
      <path d="M2 9.5h20" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" />
      <path
        d="M10.6 14.4v-1.2a1.4 1.4 0 0 1 2.8 0v1.2"
        stroke="#fff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect x="9.6" y="14.2" width="4.8" height="3.6" rx="1" fill="#fff" />
    </svg>
  );
}

/** Keyed on the badge id the fixture uses; anything unknown falls back to the shield. */
const BADGE_MARKS: Record<string, React.ComponentType<IconProps>> = {
  soc2: MarkSoc2,
  iso27001: MarkIso,
  gdpr: MarkGdpr,
  hipaa: MarkHipaa,
  pci: MarkPci,
};

const DEFAULT_CUSTOMERS = [
  { name: 'Northwind', mark: MarkNorthwind },
  { name: 'Cobalt', mark: MarkCobalt },
  { name: 'Meridian', mark: MarkMeridian },
  { name: 'Tessellate', mark: MarkTessellate },
  { name: 'Linework', mark: MarkLinework },
  { name: 'Hollow', mark: MarkHollowCreek },
];

const KEYFRAMES = `
@keyframes su-trust-in { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }
`;

export type TrustCenterFooterVariant = 'Badges' | 'Detailed';

export interface TrustBadge {
  id: string;
  label: string;
  scope: string;
  issued: string;
  href: string;
}

export interface CustomerMark {
  name: string;
  mark: React.ComponentType<IconProps>;
}

export interface TrustCenterFooterProps {
  socials?: FooterSocial[];
  brand: string;
  headline?: string;
  badges: TrustBadge[];
  /** Logos for the "deployed inside" row. Defaults to the bundled set. */
  customers?: CustomerMark[];
  customersLabel?: string;
  /** Link columns. A trust page is still a footer; without them it reads as a banner. */
  groups?: { title: string; links: { label: string; href: string }[] }[];
  requestLabel?: string;
  onRequestReport?: () => void;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: TrustCenterFooterVariant;
  className?: string;
}

export function TrustCenterFooter({
  socials,
  brand,
  headline = 'Audited, documented, and available for review.',
  badges,
  customers = DEFAULT_CUSTOMERS,
  customersLabel = 'Deployed inside',
  groups = [],
  requestLabel = 'Request full report',
  onRequestReport,
  links,
  copyright,
  variant = 'Badges',
  className,
}: TrustCenterFooterProps) {
  const detailed = variant === 'Detailed';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[38ch]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              <IconShield className="size-3.5" />
              Trust center
            </span>
            <h2 className="mt-2.5 text-balance text-[19px] font-semibold leading-[1.25] tracking-[-0.35px]">
              {headline}
            </h2>
          </div>

          <Button
            type="button"
            onClick={onRequestReport}
            className="group h-9 shrink-0 cursor-pointer gap-1.5 rounded-full px-4 text-[13px] transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            {requestLabel}
            <IconArrowUpRight className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Button>
        </div>

        <TooltipProvider delayDuration={120} skipDelayDuration={300}>
          <ul
            className={cn(
              'mt-8 grid gap-2.5',
              detailed ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-5',
            )}
          >
            {badges.map((badge) => {
              const Glyph = BADGE_MARKS[badge.id] ?? IconShield;
              const card = (
                <a
                  href={badge.href}
                  className={cn(
                    'flex h-full cursor-pointer flex-col rounded-xl border px-3.5 py-3 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 motion-reduce:transition-none',
                    'border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-black/[0.14] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]',
                    'dark:border-white/[0.09] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/[0.18]',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Glyph className="size-[22px] shrink-0" />
                    <span className="text-[13px] font-medium tracking-[-0.1px]">{badge.label}</span>
                  </span>
                  {detailed && (
                    <span className="mt-1.5">
                      <span className="block text-pretty text-[11.5px] leading-[1.5] text-neutral-500 dark:text-neutral-400">
                        {badge.scope}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] tabular-nums text-neutral-500 dark:text-neutral-400">
                        {badge.issued}
                      </span>
                    </span>
                  )}
                </a>
              );

              return (
                <li key={badge.id}>
                  {detailed ? (
                    card
                  ) : (
                    /* The scope and date float in a tooltip rather than expanding
                     the card. Expanding grew the row by 60px on hover, so the
                     grid reflowed and every badge you were about to reach for
                     jumped out from under the pointer. A tooltip is the same
                     information with no layout involved. */
                    <Tooltip>
                      <TooltipTrigger asChild>{card}</TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={8} className="max-w-[260px]">
                        <p className="text-pretty text-[12px] leading-[1.5]">{badge.scope}</p>
                        <p className="mt-1 font-mono text-[10.5px] tabular-nums opacity-70">
                          {badge.issued}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </li>
              );
            })}
          </ul>
        </TooltipProvider>

        {!detailed && (
          <p className="mt-3 text-[11.5px] text-neutral-500 dark:text-neutral-400">
            Hover or focus a certification for its scope and report date.
          </p>
        )}

        {customers.length > 0 && (
          <div className="mt-10 border-t border-black/[0.07] pt-7 dark:border-white/[0.08]">
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              {customersLabel}
            </p>
            {/* A grid, not a wrapping flex row: six names of uneven length left a
                single orphan on the second line at most widths. */}
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
              {customers.map((customer) => {
                const Glyph = customer.mark;
                return (
                  <li
                    key={customer.name}
                    className="flex min-w-0 items-center gap-2.5 text-neutral-400 transition-colors duration-150 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                  >
                    <Glyph className="size-[22px] shrink-0" />
                    <span className="truncate text-[13px] font-semibold tracking-[-0.3px] sm:text-[14.5px] sm:tracking-[-0.35px]">
                      {customer.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {groups.length > 0 && (
          <nav
            aria-label="Footer"
            className="mt-10 grid gap-8 border-t border-black/[0.07] pt-8 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
          >
            {groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default TrustCenterFooter;
