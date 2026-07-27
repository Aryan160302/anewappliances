import Image from "next/image";

import { company } from "@/data/company";

// Intrinsic size of public/brand/logo.png, cropped from the brand sheet.
const MARK_WIDTH = 660;
const MARK_HEIGHT = 600;

export function Wordmark({
  size = "default",
  /** Drops the name below `sm`, where the header has no room for it. */
  markOnlyOnMobile = false,
}: {
  size?: "default" | "large";
  markOnlyOnMobile?: boolean;
}) {
  const width = size === "large" ? 52 : 30;

  return (
    <span className="flex items-center gap-3">
      <Image
        src="/brand/logo.png"
        alt={markOnlyOnMobile ? company.name : ""}
        width={width}
        height={Math.round((width * MARK_HEIGHT) / MARK_WIDTH)}
        // Tailwind's preflight forces `height: auto` on images, so the width
        // has to be pinned in CSS too or the rendered box ignores the props.
        className={`h-auto ${size === "large" ? "w-[52px]" : "w-[30px]"}`}
        priority
      />
      <span
        className={`tracked-caps font-medium text-ink ${
          // The large mark sits in a narrow card, so its name must be allowed
          // to wrap; the header's must not.
          size === "large" ? "text-lg sm:text-2xl" : "whitespace-nowrap text-sm"
        } ${markOnlyOnMobile ? "hidden sm:inline" : ""}`}
      >
        {company.name}
      </span>
    </span>
  );
}
