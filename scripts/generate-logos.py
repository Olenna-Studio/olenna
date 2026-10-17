import os
import shutil
from PIL import Image
import numpy as np

def generate_brand_assets(src_path: str):
    if not os.path.exists(src_path):
        raise FileNotFoundError(f"Source image not found at: {src_path}")

    logo_dir = "public/images/logo"
    os.makedirs(logo_dir, exist_ok=True)
    raw_dest = os.path.join(logo_dir, "logo-raw.png")

    # 1. Copy raw file
    shutil.copy2(src_path, raw_dest)
    print(f"Copied raw logo to {raw_dest}")

    # 2. Master RGBA unmixing
    im_rgb = Image.open(src_path).convert("RGB")
    arr = np.array(im_rgb, dtype=np.float32)
    bg = np.array([254.0, 248.0, 248.0], dtype=np.float32)

    dist = np.linalg.norm(arr - bg, axis=2)
    t_low = 4.0
    t_high = 30.0

    t = np.clip((dist - t_low) / (t_high - t_low), 0.0, 1.0)
    # Smoothstep
    alpha = t * t * (3.0 - 2.0 * t)

    fg = np.zeros_like(arr)
    mask = alpha > 0.005
    for c in range(3):
        fg[mask, c] = np.clip((arr[mask, c] - (1.0 - alpha[mask]) * bg[c]) / alpha[mask], 0.0, 255.0)

    rgba = np.dstack([fg, alpha * 255.0]).astype(np.uint8)
    master = Image.fromarray(rgba, mode="RGBA")

    # 3. Emblem crop
    emblem_crop = master.crop((487, 96, 1006, 557))
    emb_pad = 16
    emblem = Image.new("RGBA", (emblem_crop.width + 2 * emb_pad, emblem_crop.height + 2 * emb_pad), (0, 0, 0, 0))
    emblem.paste(emblem_crop, (emb_pad, emb_pad), emblem_crop)
    emblem.save(os.path.join(logo_dir, "olenna-emblem.png"))
    emblem.save(os.path.join(logo_dir, "olenna-emblem.webp"), "WEBP", lossless=True)
    print(f"Saved emblem: {emblem.size}")

    # 4. Wordmark crop (OLENNA + STUDIOX)
    wm_crop = master.crop((263, 570, 1272, 845))
    wm_pad = 20
    wordmark = Image.new("RGBA", (wm_crop.width + 2 * wm_pad, wm_crop.height + 2 * wm_pad), (0, 0, 0, 0))
    wordmark.paste(wm_crop, (wm_pad, wm_pad), wm_crop)
    wordmark.save(os.path.join(logo_dir, "olenna-wordmark.png"))
    wordmark.save(os.path.join(logo_dir, "olenna-wordmark.webp"), "WEBP", lossless=True)
    print(f"Saved wordmark: {wordmark.size}")

    # 5. Full stacked logo (Emblem + OLENNA + STUDIOX + BEAUTY • FASHION • LIFESTYLE)
    stacked_crop = master.crop((263, 96, 1272, 901))
    stk_pad = 24
    stacked = Image.new("RGBA", (stacked_crop.width + 2 * stk_pad, stacked_crop.height + 2 * stk_pad), (0, 0, 0, 0))
    stacked.paste(stacked_crop, (stk_pad, stk_pad), stacked_crop)
    stacked.save(os.path.join(logo_dir, "olenna-logo-full.png"))
    stacked.save(os.path.join(logo_dir, "olenna-logo-full.webp"), "WEBP", lossless=True)
    print(f"Saved full stacked: {stacked.size}")

    # 6. Horizontal Lockup (Emblem on left + OLENNA STUDIOX on right)
    target_h = 300
    emb_scale = target_h / emblem_crop.height
    emb_w = int(emblem_crop.width * emb_scale)
    emb_resized = emblem_crop.resize((emb_w, target_h), Image.Resampling.LANCZOS)

    text_scale = (target_h * 0.90) / wm_crop.height
    text_w = int(wm_crop.width * text_scale)
    text_h = int(wm_crop.height * text_scale)
    text_resized = wm_crop.resize((text_w, text_h), Image.Resampling.LANCZOS)

    gap = 40
    canvas_w = emb_w + gap + text_w
    canvas_h = target_h
    horizontal = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    horizontal.paste(emb_resized, (0, 0), emb_resized)
    text_y = (target_h - text_h) // 2
    horizontal.paste(text_resized, (emb_w + gap, text_y), text_resized)
    horizontal.save(os.path.join(logo_dir, "olenna-horizontal.png"))
    horizontal.save(os.path.join(logo_dir, "olenna-horizontal.webp"), "WEBP", lossless=True)
    print(f"Saved horizontal: {horizontal.size}")

    # 7. Favicons and app icons
    max_d = max(emblem_crop.width, emblem_crop.height)
    pad_icon = int(max_d * 0.06)
    sq_dim = max_d + 2 * pad_icon
    icon_base = Image.new("RGBA", (sq_dim, sq_dim), (0, 0, 0, 0))
    icon_base.paste(emblem_crop, ((sq_dim - emblem_crop.width) // 2, (sq_dim - emblem_crop.height) // 2), emblem_crop)

    # Next.js app icon
    icon_512 = icon_base.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save("src/app/icon.png")

    # Favicon .ico files
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    ico_imgs = [icon_base.resize(s, Image.Resampling.LANCZOS) for s in sizes]
    ico_imgs[0].save("public/favicon.ico", format="ICO", sizes=sizes)
    ico_imgs[0].save("src/app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved icon.png and favicon.ico files successfully!")

if __name__ == "__main__":
    src = "/Users/harinikesh/Downloads/Olenna Studiox Luxury Beauty Emblem.png"
    generate_brand_assets(src)
