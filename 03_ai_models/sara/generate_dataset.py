#!/usr/bin/env python3
"""
Sara Dataset Generation — fal.ai Qwen-Image-Edit-2511
Generates 25 varied images from sara_face_crop.jpg as seed.
Output: 03_ai_models/sara/training_data/dataset_raw/
"""

import os
import time
import base64
import fal_client
from pathlib import Path

# Config
FAL_KEY = "103859dd-e085-4f50-be7e-8afa3e89aec2:fbc6dda9c5f4170b675a3eec52919802"
SEED_IMAGE = "/Users/user/Desktop/Instagram/01_characters/sara/face_reference/sara_face_crop.jpg"
OUTPUT_DIR = Path("/Users/user/Desktop/Instagram/03_ai_models/sara/training_data/dataset_raw")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

os.environ["FAL_KEY"] = FAL_KEY

NEGATIVE = (
    "cartoon, anime, CGI, 3d render, plastic skin, watermark, text, logo, "
    "nudity, topless, nipples, tattoos, Asian features, extra limbs, "
    "deformed hands, bad anatomy, blurry, out of focus, ponytail, updo"
)

PROMPTS = [
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing front facing camera, white triangle bikini, pool edge, bright midday sunlight, full body, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing 3/4 angle, red bikini, beach, golden hour warm light, full body, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting at pool edge feet in water, black bikini, outdoor pool, daytime, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, walking toward camera, floral sundress, city street, daytime, full body, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, leaning on railing arms out, crop top and high-waist jeans, rooftop city view, golden hour, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting cross-legged on bed, oversized white tee, cozy bedroom, soft light, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing gym mirror selfie, sports bra and leggings, gym interior, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, laughing, large natural heavy bust, hourglass figure, fair warm skin, sitting at cafe table, summer dress, outdoor cafe, daytime, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, lying on beach towel propped on elbows, bikini, sandy beach, bright sun, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing in kitchen, casual tank top and denim shorts, modern kitchen, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing at rooftop bar holding cocktail glass, elegant blouse and trousers, city lights background, night, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident expression, large natural heavy bust, hourglass figure, fair warm skin, leaning against wall arms raised, leather jacket and bodysuit, street at night, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing in hotel doorway, swimsuit coverup, resort setting, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting on couch legs tucked, body-con mini dress, living room, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair wet, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, portrait shoulders up, steamy bathroom, soft warm light, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair wind blown, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, walking on beach, white bikini, ocean waves, golden hour, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, sitting in car arm on window, casual outfit sunglasses, daytime, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing by apartment window, sheer white top with bra fully visible underneath nipples covered, golden light, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident expression, large natural heavy bust, hourglass figure, fair warm skin, gym mirror selfie hand on hip, high-waist shorts and sports bra, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, relaxed expression, large natural heavy bust, hourglass figure, fair warm skin, lying on bed reading, casual pyjamas, cozy bedroom, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing in front of luxury car, white jeans and fitted blazer, parking lot, daytime, full body, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, elegant expression, large natural heavy bust, hourglass figure, fair warm skin, seated on chair legs crossed, evening dress, luxury interior, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, laughing, large natural heavy bust, hourglass figure, fair warm skin, outdoor cafe, looking at phone, light summer outfit, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, warm smile, large natural heavy bust, hourglass figure, fair warm skin, standing by hotel window arms raised, short silk robe, city view, photorealistic, 8k",
    "saragirl, white Caucasian woman, striking blue eyes, long straight jet black hair, strong dark brows, confident smile, large natural heavy bust, hourglass figure, fair warm skin, standing front hand on hip, black bikini, clean white studio, photorealistic, 8k",
]

def image_to_data_uri(path):
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    ext = Path(path).suffix.lstrip(".")
    return f"data:image/{ext};base64,{data}"

def generate_image(prompt, idx):
    out_path = OUTPUT_DIR / f"sara_{idx:02d}.png"
    if out_path.exists():
        print(f"[{idx:02d}] Already exists, skipping")
        return

    print(f"[{idx:02d}] Generating: {prompt[:60]}...")
    try:
        result = fal_client.subscribe(
            "fal-ai/qwen-image-edit-2511",
            arguments={
                "prompt": prompt,
                "image_urls": [image_to_data_uri(SEED_IMAGE)],
                "negative_prompt": NEGATIVE,
                "num_inference_steps": 30,
                "guidance_scale": 1.0,
                "image_size": {"width": 1024, "height": 1536},
                "num_images": 1,
            },
        )
        img_url = result["images"][0]["url"]

        # Download
        import httpx
        img_data = httpx.get(img_url).content
        with open(out_path, "wb") as f:
            f.write(img_data)
        print(f"[{idx:02d}] Saved → {out_path.name} ({len(img_data)//1024}KB)")
    except Exception as e:
        print(f"[{idx:02d}] ERROR: {e}")

if __name__ == "__main__":
    print(f"Seed image: {SEED_IMAGE}")
    print(f"Output dir: {OUTPUT_DIR}")
    print(f"Generating {len(PROMPTS)} images...\n")

    for i, prompt in enumerate(PROMPTS, start=1):
        generate_image(prompt, i)
        time.sleep(1)  # polite rate limit

    done = list(OUTPUT_DIR.glob("sara_*.png"))
    print(f"\nDone. {len(done)}/{len(PROMPTS)} images in {OUTPUT_DIR}")
