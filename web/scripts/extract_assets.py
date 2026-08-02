#!/usr/bin/env python3
"""Extract product imagery from the source collateral in ../data into public/.

Sources:
  Anew Appliances Catalogue.pdf  -> 6 embedded JPEGs, one per catalogue page
                                    (the PDF reuses one photo per model pair)
  Water Kettle Catalogue.pptx    -> ppt/media/* , mapped to models by slide rels
  PHOTO-*.jpg                    -> business cards, cropped for the logo mark
  new data/*.jpg|jpeg|png        -> photographs of the current models
  new data/ICT Premium Models.xlsx -> xl/media/*, the premium-model renders

Everything is written as WebP: a 1200px hero and a 600px card variant. Sources
are never upscaled -- several catalogue photos are only ~535px wide.

Several shots were taken on a grey studio sweep rather than on white; the
assets listed in WHITEN_BACKDROP are swept to white on the way through, so the
catalogue reads as one set. See whiten_backdrop().

Requires: poppler (pdfimages), Pillow, NumPy and SciPy. Run from anywhere:
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
NEW_DATA = DATA / "new data"
PREMIUM_XLSX = NEW_DATA / "ICT Premium Models.xlsx"

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

# Loose photographs in `data/new data/`, keyed slug -> {asset name: file}.
# These run after extract_cooktops(), so a "hero" here deliberately lands on
# top of the ~535px rip pdfimages pulls out of the catalogue PDF.
NEW_PHOTOS: dict[str, dict[str, str]] = {
    "a4": {"hero": "IC AA A4.jpg"},
    "a4-5kva": {"hero": "IC AA A4.jpg"},
    "m3": {"hero": "IC M3 Model.jpeg"},
    "m3-5kva": {"hero": "IC M3 Model.jpeg"},
    # "Ceramic Bigger Glass.jpeg" is deliberately not mapped. It is the one
    # product shot taken on a wooden table rather than a sweep, so it cannot be
    # brought onto white with the rest of the catalogue, and its filename
    # claims a bigger plate than the 250x250mm the TDS records for the A8 pair
    # it otherwise matches.
    "slim-stove": {"hero": "ICT SP1.jpeg"},
    "p41": {"hero": "IC SP2.jpeg"},
    "a22": {"hero": "IR AA1.jpeg"},
    # Range cover. The spec sheet lists only a plastic (P41) and an aluminium
    # (A22) body, so this stainless one is attributed to neither model.
    "infrared": {"hero": "Infrared with SS Body.png"},
}

# Renders embedded in ICT Premium Models.xlsx. The sheet -> image mapping comes
# from xl/worksheets/_rels/*.rels -> xl/drawings/_rels/*.rels: the "Induction
# Cooktop Plus" sheet draws image2 and image1, "Folderbable Double Hob IC"
# draws image4 (unfolded) and image3 (folded).
PREMIUM_RENDERS: dict[str, dict[str, str]] = {
    "cooktop-plus": {"hero": "image2.png", "gallery-1": "image1.png"},
    "double-hob-foldable": {"hero": "image4.png", "gallery-1": "image3.png"},
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


# (slug, asset name) pairs shot on a grey sweep, which whiten_backdrop() lifts
# to white. Everything absent from this set is left exactly as it came:
#   cooktop-plus/gallery-1  a deliberately black studio render
#   kettle-colour/hero      the colour range on a shelf -- the grey kettle is
#                           too close to the backdrop to survive the fill
#   products/infrared       a kitchen scene, used as a facility image
WHITEN_BACKDROP: set[tuple[str, str]] = {
    ("m3", "hero"),
    ("m3-5kva", "hero"),
    ("p41", "hero"),
    ("a22", "hero"),
    ("slim-stove", "hero"),
    ("kettle-base", "hero"),
    ("ssj1501", "gallery-1"),
    ("ssj1501", "gallery-2"),
    ("ssj1517", "hero"),
}


def whiten_backdrop(
    im: Image.Image,
    t_in: float = 26.0,
    t_out: float = 88.0,
    feather: float = 2.0,
) -> Image.Image:
    """Sweep a grey studio backdrop to white without touching the product.

    The backdrop colour is read from the border, then the region reachable from
    the edge of the frame without crossing anything far from that colour is
    taken as background. Working from connectivity rather than colour alone is
    what protects light products: a highlight on brushed steel may match the
    backdrop, but it sits inside the product's own dark outline, so the fill
    never reaches it.

    The alpha is the blurred region gated a second time by the colour ramp.
    Blurring alone leaves a torn frontier where the fill stops in a soft
    contact shadow; the re-gate keeps that frontier smooth while stopping the
    blur from spilling a halo onto the product.
    """
    import numpy as np
    from scipy import ndimage

    rgb = np.asarray(im.convert("RGB")).astype(np.float32)
    height, width, _ = rgb.shape
    band = max(3, min(height, width) // 120)
    border = np.concatenate(
        [
            rgb[:band].reshape(-1, 3),
            rgb[-band:].reshape(-1, 3),
            rgb[:, :band].reshape(-1, 3),
            rgb[:, -band:].reshape(-1, 3),
        ]
    )
    backdrop = np.median(border, axis=0)
    distance = np.linalg.norm(rgb - backdrop, axis=2)

    reachable = distance < t_out
    seed = np.zeros_like(reachable)
    seed[0] = seed[-1] = True
    seed[:, 0] = seed[:, -1] = True
    seed &= reachable
    region = ndimage.binary_propagation(seed, mask=reachable).astype(np.float32)

    ramp = np.clip((t_out - distance) / (t_out - t_in), 0.0, 1.0)
    alpha = ndimage.gaussian_filter(region * ramp, feather)
    alpha = np.clip(alpha * ramp, 0.0, 1.0)[..., None]

    swept = rgb * (1.0 - alpha) + 255.0 * alpha
    return Image.fromarray(np.clip(swept, 0, 255).astype(np.uint8))


def trim_transparent(im: Image.Image) -> Image.Image:
    """Crop away a fully transparent margin.

    The premium-model renders are 5000px wide but the appliance occupies only
    the middle third of the frame, so thumbnailing them whole would leave a
    postage stamp. The alpha channel gives an exact bound -- nothing here is
    guessed. Photographs, which carry no alpha, are returned untouched.
    """
    if im.mode not in ("RGBA", "LA"):
        return im
    box = im.getchannel("A").getbbox()
    return im.crop(box) if box else im


def write_variants(src: Path, dest_dir: Path, name: str) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    im = flatten(trim_transparent(Image.open(src)))
    if (dest_dir.name, name) in WHITEN_BACKDROP:
        im = whiten_backdrop(im)
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


def extract_new_models(tmp: Path) -> None:
    """Imagery from `data/new data/` -- the premium and infrared models, plus
    sharper photographs of models the catalogue PDF only carries at ~535px."""
    for slug, assets in NEW_PHOTOS.items():
        dest = PUBLIC / "products" / slug
        for name, filename in assets.items():
            src = NEW_DATA / filename
            if not src.exists():
                sys.exit(f"{filename} missing from {NEW_DATA}")
            write_variants(src, dest, name)
        print(f"  photo   {slug:20s} <- {', '.join(assets.values())}")

    # The premium workbook is gitignored -- it carries costings alongside the
    # renders -- so a fresh clone will not have it. The committed WebPs stand.
    if not PREMIUM_XLSX.exists():
        print(f"  render  SKIPPED — {PREMIUM_XLSX.name} not present locally")
        return

    media = tmp / "premium"
    media.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(PREMIUM_XLSX) as archive:
        for member in archive.namelist():
            if member.startswith("xl/media/"):
                (media / Path(member).name).write_bytes(archive.read(member))

    for slug, assets in PREMIUM_RENDERS.items():
        dest = PUBLIC / "products" / slug
        for name, filename in assets.items():
            src = media / filename
            if not src.exists():
                sys.exit(f"{filename} missing from {PREMIUM_XLSX.name}")
            write_variants(src, dest, name)
        print(f"  render  {slug:20s} <- {', '.join(assets.values())}")


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

    # The crop boxes above are measured against one specific brand sheet and
    # one specific card photo. Point the script at a different revision of
    # either and the box lands on empty paper -- which yields a fully
    # transparent PNG that silently overwrites a good mark. Refuse to write it.
    inked = int((alpha > 10).sum())
    if inked < 1000:
        print(
            f"  logo    SKIPPED — the crop from {source.name} is blank "
            f"({inked} inked pixels), so the box no longer matches this "
            f"source. brand/logo.png and the icons were left as they are."
        )
        return

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
        # Last, so the sharper photographs overwrite the catalogue PDF's rips.
        print("extracting new models")
        extract_new_models(tmp)

    print("extracting brand assets")
    extract_logo()
    copy_catalogue()
    print("done")


if __name__ == "__main__":
    main()
