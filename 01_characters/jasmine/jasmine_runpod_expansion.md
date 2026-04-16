# RunPod ComfyUI Architecture (FLUX.2 Dev + PuLID + Kontext)

**Direct Workflow Link:** https://www.runcomfy.com/comfyui-workflows/flux-kontext-pulid-consistent-character-generation
*(Search "Flux Kontext PuLID Consistent Character" on runcomfy.com if link breaks)*
**Hardware:** A100 or H100 Pod

### Node Architecture
1. **Load Image Node**
   - **Input:** Clean frontal reference image (no watermark)
   - **Output:** Connect to both PuLID and Kontext reference inputs.

2. **PuLID Node (Face Lock)**
   - **main_face_image:** Connect from Load Image output
   - **id_weight:** 0.95–1.0 (strong lock)
   - **Output:** Connect to FLUX sampler’s “ID” or “face_id” input.

3. **Flux Kontext Node (Full-Body + Style Consistency)**
   - **Reference Image:** From Load Image
   - **Reference Strength:** 0.85–0.95
   - **Text Prompt:** From the 35-prompt list below
   - **Output:** Connect to FLUX sampler.

4. **FLUX.2 Dev Sampler (Core Generation)**
   - **Model:** FLUX.2 Dev
   - **Positive Prompt:** From Kontext
   - **Negative Prompt:** Use standard negative list (no tattoos)
   - **Steps:** 28–35
   - **Guidance Scale (CFG):** 3.5
   - **Sampler:** Euler
   - **Scheduler:** Simple

5. **VAE Decode Node**
   - Connect from sampler output.

6. **Save Image Node**
   - Connect from VAE Decode.

**Workflow Workflow:**
Use Batch mode (size 1 or 2). Save the workflow as JSON inside ComfyUI.

---

### 35-Image Dataset Expansion Prompts
```json
[
  {"prompt": "jasmakogirl, morning bedroom girlfriend experience, soft natural window light, lying in bed wearing oversized white t-shirt, sleepy seductive expression, ultra white skin with visible pores", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, casual morning coffee in kitchen, wearing tiny silk robe slightly open, soft morning light, gentle smile", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, cozy living room on couch, oversized hoodie and shorts, relaxed pose, warm lamp lighting", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, bedtime selfie in mirror, wearing only panties and loose tank top, soft bedroom lighting", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, lazy sunday afternoon in bed, reading book, wearing sheer white camisole, natural daylight", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, post-shower girlfriend look, towel wrapped low on chest, wet hair, steam in bathroom", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, casual home date night, wearing silk slip dress, candlelight, soft romantic expression", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, morning yoga stretch in bedroom, wearing sports bra and shorts, natural window light", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, cozy blanket on couch watching movie, wearing oversized sweater only, warm lighting", "category": "Girlfriend Experience"},
  {"prompt": "jasmakogirl, getting ready in bathroom mirror, wearing only bra and panties, soft morning light", "category": "Girlfriend Experience"},

  {"prompt": "jasmakogirl, micro pink bikini by pool, wet skin, golden hour sunlight, seductive pose", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, sheer white robe completely open, deep cleavage, bedroom lighting, intense eye contact", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, tiny black lace lingerie set, lying on bed, dramatic side lighting, sultry expression", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, wet t-shirt contest style, white shirt completely soaked, water droplets on skin", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, micro bikini mirror selfie in gym, deep cleavage, sweat glow on skin", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, sheer black bodysuit, studio lighting, extreme cleavage focus", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, tiny red thong bikini on beach, golden hour, wind in hair", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, open white shirt tied at waist only, no bra, rooftop golden hour", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, wet skin after shower, towel barely covering, seductive look", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, micro bikini from behind, looking over shoulder, sunset lighting", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, sheer lace bodysuit, dramatic low-key lighting, intense gaze", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, tiny string bikini, poolside at night, glowing underwater lights", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, open silk robe falling off shoulders, deep cleavage, bedroom lighting", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, wet white crop top and micro skirt, rain effect, dramatic lighting", "category": "Edge-of-TOS Thirst Trap"},
  {"prompt": "jasmakogirl, tiny black bikini, studio softbox lighting, extreme close-up cleavage", "category": "Edge-of-TOS Thirst Trap"},

  {"prompt": "jasmakogirl, elegant black saree with deep blouse, Indian wedding style, dramatic lighting", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, luxury nightclub look, tight red dress, neon club lighting, paparazzi flash", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, high fashion street style, oversized designer coat over lingerie, city night", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, red carpet event, sparkling silver gown with deep plunge, flash photography", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, luxury yacht party, white bikini and sheer cover-up, golden hour", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, high-end fashion shoot, avant-garde black outfit, studio dramatic lighting", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, rooftop golden hour fashion, open designer shirt, city skyline background", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, luxury car photoshoot, elegant evening dress, cinematic lighting", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, paparazzi street style at night, tight black dress, flash photography", "category": "High-Status Baddie"},
  {"prompt": "jasmakogirl, high-status baddie mirror selfie in luxury bathroom, designer lingerie set", "category": "High-Status Baddie"}
]
```
