import os
import time
from pathlib import Path
import requests
from tqdm import tqdm
import fal_client

# ========================= CONFIG =========================
# Set FAL_KEY as env var: export FAL_KEY="your-key"
# Never hardcode API keys — get from credentials vault
REFERENCE_IMAGE_PATH = "/Users/user/Desktop/Instagram/jasmine_reference.jpg"
OUTPUT_FOLDER = "/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/training_data/jasmine_dataset"
NUM_IMAGES = 20   # 27 done → need 20 more to hit 47 LoRA threshold
WIDTH = 1024
HEIGHT = 1024     # LoRA training standard: 1024x1024 square

NEGATIVE_PROMPT = (
    "rosy flush, pink cheeks, red cheeks, blushing, flushed skin, redness on face, "
    "shiny skin, glossy skin, oily skin, plastic skin, airbrushed skin, porcelain skin, "
    "waxy skin, beauty filter, skin smoothing, studio lighting, ring light, beauty lighting, "
    "HDR, over-exposed highlights, artificial light glow, cinematic lighting, dramatic lighting, "
    "heavy makeup, eyeliner, winged liner, different face, face morphing, round belly, soft belly, "
    "fat belly, pot belly, chubby belly, BBW, plus-size, obese, overweight, thick waist, "
    "no waist definition, thick thighs, heavy thighs, chubby arms, heavy arms, flabby arms, "
    "muscular arms, small breasts, tattoo, freckles, cartoon, anime, CGI, deformed, blurry, low quality"
)

# Jasmine character spec — NO tattoo (fixed Apr 2026)
BASE_BODY_PROMPT = (
    "24-year-old East Asian woman, broad oval face with wide prominent cheekbones, "
    "East Asian almond eyes slightly hooded relaxed and natural, dark brown warm hazel irises, "
    "fair even-toned skin with warm neutral-peachy undertone no flush no redness, "
    "very long dark uniform black-brown hair with slight natural waves, "
    "slim petite frame, DDD cup heavy natural bust with natural drop and weight, "
    "flat firm toned midsection, dramatically slim defined waist, full feminine hips, "
    "toned fit legs, dramatic busty hourglass figure. "
    "Shot on iPhone 14, slight film grain, matte natural skin finish, visible pores. "
)

# 40 scene variations (structured for LoRA diversity — lighting, angle, outfit, setting)
PROMPTS = [
    "professional studio portrait, subtle confident smile, soft cinematic lighting, white seamless background, 3/4 body shot",
    "mirror selfie in luxury marble bathroom, iPhone flash photography, white crop top, seductive half-lidded eyes",
    "high fashion editorial on rooftop at golden hour sunset, open white linen shirt tied at waist, city skyline bokeh background",
    "casual street style outfit, oversized hoodie and denim shorts, natural daylight, coffee shop background",
    "beach golden hour portrait, white micro bikini, wind-blown hair, glowing skin, ocean waves behind",
    "gym mirror selfie, black sports bra and high-waist leggings, athletic lighting, 3/4 body shot",
    "evening glamour, sleek black evening dress, dramatic side lighting, elegant posture",
    "cozy bedroom candid, oversized white t-shirt, soft warm lamp light, relaxed natural pose",
    "poolside fashion shot, wet dark hair, white bikini, bright sunlight, 3/4 body shot",
    "luxury hotel balcony at dusk, white silk robe, city lights bokeh, serene expression",
    "minimalist studio shot, black turtleneck sweater, dramatic low-key lighting, intense gaze",
    "summer festival vibe, cropped tank top and shorts, golden hour sunlight, joyful expression",
    "office look, white button-up shirt, pencil skirt, natural window light, professional yet confident",
    "yoga studio mirror selfie, black yoga set, soft natural window light",
    "sunny park, white sundress, soft bokeh background, relaxed sitting pose on grass",
    "street fashion night shot, leather jacket over white top, neon signs background",
    "cozy winter indoor, oversized knit sweater, soft warm lamp glow, sitting cross-legged",
    "elegant dinner date look, deep red wrap dress, candlelight, sophisticated expression",
    "casual home, white blouse, laptop on table background, natural soft light",
    "tropical resort balcony, white bikini top and beach shorts, ocean view, golden hour",
    "urban rooftop fashion, black crop top and high-waist skirt, sunset sky behind",
    "minimal white studio, white fitted bodysuit, clean high-key even lighting, full body",
    "luxury car interior through window, white dress, golden hour light",
    "sunrise balcony, white sheer robe, soft morning light, relaxed expression",
    "deep teal silk saree with gold zari border, showing slim midriff, outdoor Indian heritage courtyard, sandstone background",
    "gym hands on hips, coral sports bra and black compression leggings, focused determined gaze",
    "café interior, fitted sage green wrap dress, warm ambient light, standing beside counter",
    "sandy beach standing relaxed, white bikini top and cream linen shorts, one hand lifting hair",
    "high-key white background, white sports bra and shorts, clean bright studio light",
    "close-up portrait only face and shoulders, natural window light, soft smile, no makeup look",
    "side profile portrait, natural outdoor daylight, hair over one shoulder, serene expression",
    "looking down candid, oversized denim jacket, street cobblestone background, natural light",
    "night city street, white bodycon dress, street lamp glow, confident walk pose",
    "rooftop pool edge, feet dangling, white bikini, blue water reflection, overhead shot",
    "kitchen candid, white tank top, morning light, coffee mug, relaxed weekend vibe",
    "bookstore aisle, cream oversized sweater, soft warm indoor light, browsing books",
    "art gallery, black slip dress, dramatic spotlighting, contemplative expression",
    "post-workout glow, grey sports bra and shorts, gym background, towel around neck",
    "luxury spa robe, hair in towel wrap, soft diffused steam lighting, serene expression",
    "close-up hands and midriff, slim waist detail, white bikini bottom, golden hour skin"
]

# =======================================================

def main():
    fal_key = os.environ.get('FAL_KEY')
    if not fal_key:
        raise ValueError("FAL_KEY env var not set. Run: export FAL_KEY='your-key-here'")

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    # Count existing images to avoid overwriting
    existing = list(Path(OUTPUT_FOLDER).glob("jasmine_*.jpg"))
    start_index = len(existing)

    print(f"Generating {NUM_IMAGES} face-locked images for Jasmine (PuLID + Flux.1 Dev)")
    print(f"Reference: {REFERENCE_IMAGE_PATH}")
    print(f"Output: {OUTPUT_FOLDER}")
    print(f"Starting at index {start_index + 1} (existing: {start_index})\n")

    print("Uploading reference image to fal-cdn...")
    reference_url = fal_client.upload_file(REFERENCE_IMAGE_PATH)
    print(f"Uploaded: {reference_url}\n")

    for i in tqdm(range(NUM_IMAGES), desc="Generating"):
        prompt_index = (start_index + i) % len(PROMPTS)
        prompt = BASE_BODY_PROMPT + PROMPTS[prompt_index]

        try:
            result = fal_client.subscribe(
                "fal-ai/flux-pulid",
                arguments={
                    "prompt": prompt,
                    "reference_image_url": reference_url,
                    "image_size": {"width": WIDTH, "height": HEIGHT},
                    "num_inference_steps": 28,
                    "guidance_scale": 3.5,
                    "negative_prompt": NEGATIVE_PROMPT,
                    "seed": int(time.time() * 1000) + i,
                },
                with_logs=False,
            )

            image_url = result["images"][0]["url"]
            response = requests.get(image_url, timeout=30)
            filename = f"{OUTPUT_FOLDER}/jasmine_{start_index + i + 1:03d}.jpg"

            with open(filename, "wb") as f:
                f.write(response.content)

            print(f"Saved {filename}")
            time.sleep(0.8)

        except Exception as e:
            print(f"Error on image {i + 1}: {e}. Retrying in 5s...")
            time.sleep(5)
            continue

    total = start_index + NUM_IMAGES
    print(f"\nDone. {total}/47 images in dataset ({OUTPUT_FOLDER})")

if __name__ == "__main__":
    main()
