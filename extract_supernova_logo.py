from pathlib import Path

from PIL import Image, ImageChops, ImageFilter


SOURCE = Path(r"C:\Users\Harsh\Downloads\Gemini_Generated_Image_bvx5k8bvx5k8bvx5.png")
WORKSPACE_OUT = Path(r"C:\Users\Harsh\Documents\New project\assets\images\supernova-logo-transparent.png")
PROJECT_OUT = Path(r"C:\Users\Harsh\OneDrive\Automotive car detailing - kelowna\assets\images\supernova-logo-transparent.png")


def extract_logo(source: Path) -> Image.Image:
    image = Image.open(source).convert("RGBA")
    rgb = image.convert("RGB")
    white = Image.new("RGB", rgb.size, "white")
    diff = ImageChops.difference(rgb, white).convert("L")

    # Crop to the actual artwork while ignoring the large white canvas.
    crop_mask = diff.point(lambda value: 255 if value > 14 else 0)
    bbox = crop_mask.getbbox()
    if not bbox:
        raise RuntimeError("Could not find logo artwork in source image.")

    pad = 18
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(image.width, bbox[2] + pad)
    bottom = min(image.height, bbox[3] + pad)
    cropped = image.crop((left, top, right, bottom)).convert("RGBA")

    crop_rgb = cropped.convert("RGB")
    crop_diff = ImageChops.difference(crop_rgb, Image.new("RGB", crop_rgb.size, "white")).convert("L")

    # Soft background removal: white becomes transparent, anti-aliased edges stay smooth.
    alpha = crop_diff.point(lambda value: 0 if value < 10 else min(255, int((value - 10) * 2.25)))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.55))

    r, g, b, _ = cropped.split()
    extracted = Image.merge("RGBA", (r, g, b, alpha))

    # Trim any remaining transparent margin and add a small breathing room.
    trim_bbox = alpha.point(lambda value: 255 if value > 4 else 0).getbbox()
    if trim_bbox:
        extracted = extracted.crop(trim_bbox)

    final = Image.new("RGBA", (extracted.width + 36, extracted.height + 36), (0, 0, 0, 0))
    final.alpha_composite(extracted, (18, 18))
    return final


def main() -> None:
    logo = extract_logo(SOURCE)
    for output in (WORKSPACE_OUT, PROJECT_OUT):
        output.parent.mkdir(parents=True, exist_ok=True)
        logo.save(output, "PNG", optimize=True)
    print(f"saved {WORKSPACE_OUT}")
    print(f"saved {PROJECT_OUT}")


if __name__ == "__main__":
    main()
