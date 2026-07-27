#!/usr/bin/env python3
"""Extract product imagery from the source collateral in ../data into public/.

Sources:
  Anew Appliances Catalogue.pdf  -> 6 embedded JPEGs, one per catalogue page
                                    (the PDF reuses one photo per model pair)
  Water Kettle Catalogue.pptx    -> ppt/media/* , mapped to models by slide rels
  PHOTO-*.jpg                    -> business cards, cropped for the logo mark

Everything is written as WebP: a 1200px hero and a 600px card variant. Sources
are never upscaled -- several catalogue photos are only ~535px wide.

Requires: poppler (pdfimages) and Pillow. Run from anywhere:
    python3 web/scripts/extract_assets.py
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "data"
PUBLIC = ROOT / "web" / "public"
APP = ROOT / "web" / "src" / "app"

PDF = DATA / "Anew Appliances Catalogue.pdf"
PPTX = DATA / "Water Kettle Catalogue.pptx"
CARDS = DATA / "PHOTO-2026-07-20-18-16-52.jpg"
BRAND_SHEET = DATA / "logo.png"

HERO_EDGE = 1200
CARD_EDGE = 600
QUALITY = 82

# pdfimages emits one image per catalogue page, in page order. Pages 2-7 are
# A4, A4-5KVA, A8, A8-5KVA, M3, M3-5KVA -- but each pair shares a photo, so
# only three distinct files come out of the six extractions.
COOKTOPS: dict[str, int] = {
    "a4": 0,
    "a4-5kva": 1,
    "a8": 2,
    "a8-5kva": 3,
    "m3": 4,
    "m3-5kva": 5,
}

# Slide -> model mapping taken from ppt/slides/_rels, then corrected by eye:
# slides 7 and 8 both reference image14/image15, and image1 is slide-master
# decoration rather than a product. First entry of each list is the hero.
KETTLES: dict[str, list[str]] = {
    "kettle-base": ["image2.jpeg"],
    "kettle-colour": ["image3.jpeg", "image5.jpeg", "image4.jpeg"],
    "ssj1501": ["image6.png", "image7.png", "image8.png"],
    "ssj1507": ["image9.png", "image10.png", "image11.png", "image12.png"],
    "ssj1508": ["image13.png", "image14.png", "image15.png"],
    # SSJ1517 has a PP plastic outer layer; the stainless shots slide 8 borrows
    # from slide 7 show a different body, so they are deliberately left out.
    "ssj1517": ["image16.png"],
}

# Tight bounding boxes of the "A" monogram, measured by thresholding gold
# pixels (r > b + 20) in each source. The brand sheet carries a crisp 220px
# render of the mark, so it wins when present; the business card photo is the
# fallback and only yields 89px.
LOGO_BOX_BRAND_SHEET = (1160, 94, 1380, 294)
LOGO_BOX_CARDS = (597, 478, 686, 559)
LOGO_TARGET_WIDTH = 660
BRAND_GOLD = (169, 120, 46)
BRAND_IVORY = (251, 248, 243)
ICON_SIZE = 180
FAVICON_SIZES = [16, 32, 48]


def flatten(im: Image.Image) -> Image.Image:
    """Composite transparency onto white -- every source shoots on white."""
    im = im.convert("RGBA")
    canvas = Image.new("RGBA", im.size, (255, 255, 255, 255))
    canvas.alpha_composite(im)
    return canvas.convert("RGB")


def write_variants(src: Path, dest_dir: Path, name: str) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    im = flatten(Image.open(src))
    for suffix, edge in ((name, HERO_EDGE), (f"{name}-card", CARD_EDGE)):
        out = im.copy()
        out.thumbnail((edge, edge), Image.LANCZOS)  # never upscales
        out.save(dest_dir / f"{suffix}.webp", "WEBP", quality=QUALITY, method=6)


def extract_cooktops(tmp: Path) -> None:
    if not shutil.which("pdfimages"):
        sys.exit("pdfimages not found -- install poppler (brew install poppler)")
    subprocess.run(
        ["pdfimages", "-j", "-all", str(PDF), str(tmp / "ck")],
        check=True,
    )
    for slug, index in COOKTOPS.items():
        matches = sorted(tmp.glob(f"ck-{index:03d}.*"))
        if not matches:
            sys.exit(f"no extracted image {index} for {slug}")
        write_variants(matches[0], PUBLIC / "products" / slug, "hero")
        print(f"  cooktop {slug:10s} <- {matches[0].name}")


def extract_kettles(tmp: Path) -> None:
    media = tmp / "media"
    media.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(PPTX) as archive:
        for member in archive.namelist():
            if member.startswith("ppt/media/"):
                target = media / Path(member).name
                target.write_bytes(archive.read(member))

    for slug, images in KETTLES.items():
        dest = PUBLIC / "products" / slug
        for position, filename in enumerate(images):
            src = media / filename
            if not src.exists():
                sys.exit(f"{filename} missing from {PPTX.name}")
            name = "hero" if position == 0 else f"gallery-{position}"
            write_variants(src, dest, name)
        print(f"  kettle  {slug:10s} <- {', '.join(images)}")


def extract_logo() -> None:
    """Lift the monogram off its background into a transparent PNG.

    Both sources sit on an off-white that is never a flat colour -- the card is
    a photograph and the brand sheet is a rendered mockup. Keying on distance
    from white rather than matching a colour keeps the stroke's anti-aliased
    edges, and repainting the result in the brand gold drops any colour cast.
    """
    import numpy as np

    dest = PUBLIC / "brand"
    dest.mkdir(parents=True, exist_ok=True)

    if BRAND_SHEET.exists():
        source, box = BRAND_SHEET, LOGO_BOX_BRAND_SHEET
    else:
        source, box = CARDS, LOGO_BOX_CARDS

    # Composite over white first: the brand sheet is RGBA and its transparent
    # areas would otherwise read as black, i.e. fully opaque.
    art = Image.open(source).convert("RGBA").crop(box)
    canvas = Image.new("RGBA", art.size, (255, 255, 255, 255))
    canvas.alpha_composite(art)

    pixels = np.asarray(canvas.convert("RGB")).astype(int)
    darkness = 255 - pixels.min(axis=2)
    alpha = np.clip((darkness - 15) * 1.6, 0, 255).astype("uint8")

    mark = np.zeros((*alpha.shape, 4), dtype="uint8")
    mark[..., 0:3] = BRAND_GOLD
    mark[..., 3] = alpha

    out = Image.fromarray(mark, "RGBA")
    scale = LOGO_TARGET_WIDTH / out.width
    out = out.resize(
        (LOGO_TARGET_WIDTH, round(out.height * scale)), Image.LANCZOS
    )
    out.save(dest / "logo.png", "PNG")
    print(f"  logo    -> brand/logo.png ({out.width}x{out.height}) from {source.name}")
    write_icons(out)


def write_icons(mark: Image.Image) -> None:
    """Render the browser tab and iOS home-screen icons from the monogram.

    Next.js picks these up by filename from src/app: `icon.png` becomes the
    favicon and `apple-icon.png` the touch icon, both with the right <link>
    tags. They sit on ivory rather than transparency so the gold stroke stays
    legible against a dark tab strip.
    """

    def square(size: int, padding_ratio: float) -> Image.Image:
        canvas = Image.new("RGBA", (size, size), (*BRAND_IVORY, 255))
        inner = round(size * (1 - 2 * padding_ratio))
        art = mark.copy()
        art.thumbnail((inner, inner), Image.LANCZOS)
        canvas.alpha_composite(
            art, ((size - art.width) // 2, (size - art.height) // 2)
        )
        return canvas

    # The favicon is tiny, so the mark gets almost the whole tile.
    favicon = square(FAVICON_SIZES[-1], 0.06)
    favicon.save(APP / "favicon.ico", "ICO", sizes=[(s, s) for s in FAVICON_SIZES])

    # iOS crops a rounded rect out of the touch icon, so it needs real margin.
    square(ICON_SIZE, 0.16).save(APP / "apple-icon.png", "PNG")
    print(f"  icons   -> app/favicon.ico, app/apple-icon.png")


def copy_catalogue() -> None:
    dest = PUBLIC / "downloads"
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copy2(PDF, dest / "anew-appliances-induction-catalogue.pdf")
    print("  pdf     -> downloads/anew-appliances-induction-catalogue.pdf")


def main() -> None:
    for source in (PDF, PPTX, CARDS):
        if not source.exists():
            sys.exit(f"missing source: {source}")

    with tempfile.TemporaryDirectory() as raw:
        tmp = Path(raw)
        print("extracting cooktops")
        extract_cooktops(tmp)
        print("extracting kettles")
        extract_kettles(tmp)

    print("extracting brand assets")
    extract_logo()
    copy_catalogue()
    print("done")


if __name__ == "__main__":
    main()
