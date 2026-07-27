import { company, whatsappLink } from "@/data/company";

/**
 * Floating WhatsApp enquiry button, pinned bottom-right on every page.
 *
 * Styled in the site's gold rather than WhatsApp green so it belongs to the
 * page; the glyph carries the recognition on its own. Collapsed it is a plain
 * disc, and on hover it opens into a pill. It sits above page content but
 * below the sticky header's z-index band.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(
        "Hello Anew Appliances, I'd like to enquire about your products.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Anew Appliances on WhatsApp at ${company.whatsapp.display}`}
      className="gold-fill group fixed right-5 bottom-5 z-40 flex h-14 items-center rounded-full ring-1 ring-black/10 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.03] sm:right-7 sm:bottom-7"
    >
      <span className="flex size-14 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-7 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </span>

      {/* The label unfurls on hover, where a pointer and the room both exist. */}
      <span className="tracked-caps hidden max-w-0 overflow-hidden text-[0.65rem] whitespace-nowrap transition-[max-width,padding] duration-300 group-hover:max-w-56 group-hover:pr-7 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
