#!/usr/bin/env python3
"""Freeze-frame the factory walkthrough video into stills for the facility page.

Source:
  data/new data/factory video.mp4   576x768, 30 fps, 84 s handheld walkthrough

The timestamps below were picked by eye from a 1 fps contact sheet -- one per
distinct part of the walkthrough (exterior, warehouse, assembly, office,
showroom). Because the footage is handheld, each timestamp is only a hint: we
sample ten frames across a one-second window around it and keep the sharpest
one, scored by the variance of an edge-detect pass.

Most of the footage is a 9:16 phone capture padded into the 576x768 frame with
a black bar down each side, so each still is trimmed back to its real content
before it is written -- see trim_pillarbox().

Output is WebP, matching extract_assets.py: a full-size still plus a 600px
card variant. The video is 576x768, so nothing is upscaled.

Requires: ffmpeg on PATH (brew install ffmpeg) and Pillow. Run from anywhere:
    python3 web/scripts/extract_facility_frames.py
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
VIDEO = ROOT / "data" / "new data" / "factory video.mp4"
OUT = ROOT / "web" / "public" / "facility"

CARD_EDGE = 600
QUALITY = 82

# seconds into the video -> output slug
SHOTS: list[tuple[float, str]] = [
    (11, "exterior"),
    (13, "entrance"),
    (17, "warehouse"),
    (22, "shop-floor"),
    (28, "packing"),
    (49.5, "assembly-overview"),
    (52.5, "assembly-bay"),
    (71, "assembly-line"),
    (47, "mezzanine"),
    (32, "office"),
    (43, "meeting-room"),
    (57, "showroom"),
    (60, "kettle-display"),
    (64, "cooktop-display"),
]

WINDOW = 1.0  # seconds sampled around each timestamp
SAMPLE_FPS = 10


def trim_pillarbox(im: Image.Image, threshold: int = 24) -> Image.Image:
    """Drop the black bars the phone footage is padded with.

    Most of the walkthrough is a 9:16 phone capture padded out to the 576x768
    frame, which leaves a 72px black bar down each side. A few shots fill the
    frame instead, so the bars are measured per frame rather than assumed: a
    column counts as padding only if its *brightest* pixel is still near black.
    Re-running on an already-trimmed still finds no bars and changes nothing.
    """
    grey = im.convert("L")
    width, height = grey.size
    columns = [max(grey.crop((x, 0, x + 1, height)).getdata()) for x in range(width)]
    lit = [x for x, peak in enumerate(columns) if peak >= threshold]
    if not lit or (lit[0] == 0 and lit[-1] == width - 1):
        return im
    return im.crop((lit[0], 0, lit[-1] + 1, height))


def sharpness(path: Path) -> float:
    """Variance of an edge-detect pass -- higher means less motion blur."""
    grey = Image.open(path).convert("L").resize((288, 384))
    hist = grey.filter(ImageFilter.FIND_EDGES).histogram()
    total = sum(hist)
    mean = sum(i * hist[i] for i in range(256)) / total
    return sum(hist[i] * (i - mean) ** 2 for i in range(256)) / total


def best_frame(ffmpeg: str, seconds: float, workdir: Path) -> Path:
    start = max(0.0, seconds - WINDOW / 2)
    subprocess.run(
        [
            ffmpeg, "-hide_banner", "-loglevel", "error",
            "-ss", f"{start}", "-t", f"{WINDOW}", "-i", str(VIDEO),
            "-vf", f"fps={SAMPLE_FPS}", "-q:v", "2",
            str(workdir / "s_%02d.png"),
        ],
        check=True,
    )
    frames = sorted(workdir.glob("s_*.png"))
    if not frames:
        sys.exit(f"no frames extracted at {seconds}s")
    return max(frames, key=sharpness)


def main() -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        sys.exit("ffmpeg not found -- install it with: brew install ffmpeg")
    if not VIDEO.exists():
        sys.exit(f"missing source video: {VIDEO}")

    OUT.mkdir(parents=True, exist_ok=True)
    for seconds, slug in SHOTS:
        with tempfile.TemporaryDirectory() as tmp:
            frame = best_frame(ffmpeg, seconds, Path(tmp))
            still = trim_pillarbox(Image.open(frame).convert("RGB"))
            still.save(OUT / f"{slug}.webp", "WEBP", quality=QUALITY, method=6)

            card = still.copy()
            card.thumbnail((CARD_EDGE, CARD_EDGE), Image.LANCZOS)
            card.save(OUT / f"{slug}-card.webp", "WEBP", quality=QUALITY, method=6)
        print(f"{slug:18} {still.width}x{still.height}  from {seconds}s")


if __name__ == "__main__":
    main()
