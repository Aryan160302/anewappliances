"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square border border-hairline bg-white">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 520px, 92vw"
          className="object-contain p-8"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${alt} — view ${index + 1}`}
              aria-current={index === active}
              className={`relative h-20 w-20 border bg-white transition-colors ${
                index === active
                  ? "border-gold"
                  : "border-hairline hover:border-gold-soft"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
