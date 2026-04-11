# Jasmine Mako — Master Research Summary
**Compiled:** April 10, 2026

## SECTION 1: LOCKED STRATEGIC DECISIONS

### 1.1 Platform Ecosystem
| Platform | Single Job | Phase |
|---|---|---|
| **Instagram** | Primary traffic engine — Reels + Stories drive Fanvue | Phase 0 |
| ~~**TikTok**~~ | ~~Dormant social proof profile (10 posts, then stop)~~ | ~~Phase 0~~ |
| **Threads** | 5 one-liners/day — comment bait, builds familiarity | Phase 1 |
| **X/Twitter** | SFW teasers → Fanvue CTA | Phase 1 |
| **Fanvue** | Primary monetization (GFE subscription) | Phase 0 — Day 1 |
| **Room 11** | Secondary monetization — 100% automated DM chatting | After LoRA — requires 30–40 LoRA photos |

> ~~**TikTok row above DEPRECATED 2026-04-11:**~~ TikTok permanently removed from strategy. Antigravity confirmed via 30+ YouTube creator transcripts: TikTok algorithm deprioritizes AI-generated content and ban risk is high with no recovery path. Do not create any TikTok account for Jasmine.

### 1.1b Room 11 Setup Architecture
> **⚠️ PARTIALLY DEPRECATED 2026-04-11:** The "removing Fanvue entirely" instruction below is superseded. Antigravity's Move 13 ruling locks **Fanvue as primary** and Room 11 as secondary. Do not route all traffic to Room 11 only.

- **Automation Philosophy:** Room 11's fully managed chatting service handles DM closing automatically 24/7. You forfeit 40% of DM revenue to keep the pipeline passive. **Fanvue subscription revenue runs in parallel as primary.**
- **Traffic Routing:** Instagram and X/Twitter traffic → Fanvue (primary) + Room 11 (secondary via Carrd.co link page).
- **Data Centralization:** The Concierge 11 CRM logs subscriber LTV, tracking which whales the automated chatters are capturing.

### 1.2 Account Activation & Hardware Protocol (Phase 0)
**Device Setup:** Never use a computer to create accounts. Use a phone. Physical phone is safe for Phase 0 single account. Max 3 IG accounts per physical device. For SMS verification and acquiring a dedicated US virtual number, use **Calilio** (https://www.calilio.com/).
- *Calilio Cost:* ₹1,303/month ($12 seat + $2 US number = $14/mo × ₹93.08) — 1 US local number + 100 SMS packets. Sufficient for IG verification.
- ~~For TikTok, purchase expired US Verizon SIM cards from Amazon~~ — TikTok permanently removed from strategy. See 1.1 deprecation note.

1. **Day 1–3:** Create `@jasmine.mako` via physical phone. Add profile/soft bio (student, saving money, nothing sexy). Follow 5–20 USA accounts (Logan Paul, brands). Watch competitor reels only, do not like or comment. Wait 24 hrs. NO LINK.
2. **Day 4–7:** Post 1 SFW photo daily. Still NO LINK in bio. Let algorithm train based on watch-time.
3. **Day 8:** Add Carrd.co link-in-bio URL (Namecheap → Cloudflare → Carrd.co chain). Begin Reels. **Do NOT use mother-daughter method — see Section 1.3 deprecation.**
4. **Day 8–14:** Boost 2–3 static images at $5/day to males 30–50, USA.

### 1.3 Mother-Daughter Link Method — ⛔ DEPRECATED 2026-04-11

> **DEPRECATED:** Instagram chain-banning of linked accounts confirmed in 2026. Creating a dummy @jasmine.mako.link account for the mother-daughter method will trigger IG's coordinated inauthentic behavior detection and ban both accounts. Link.me is also flagged. Do not use this method.
>
> **Replacement:** Single account `@jasmine.mako` with bio pointing directly to Namecheap domain → Cloudflare → Carrd.co link page. See Section 1.2 Day 8 for updated bio link activation timing.

~~- **Main account:** `@jasmine.mako` — bio reads: `link in @jasmine.mako.link 👇`~~
~~- **Dummy account:** `@jasmine.mako.link` — bio contains ONLY the bridge page link (Link.me/Linktree).~~

### 1.4 Content Strategy — 3 Pillars
| Pillar | Format | Example |
|---|---|---|
| **Transformation** | Before/after | User films their own hand grabbing the camera -> SeaDance Start Frame -> Seamless transition into Jasmine Mako. |
| **Talking/Voiceover** | Speaking to camera | Opinion, confession, advice (GFE tone) |
| **Cultural/Desi** | Ethnic fashion | Diwali look, lehenga reveal, Holi celebration |

### 1.4b Video Generation Pipeline (SeaDance 2.0 via Higgsfield)
- **The Claude Workflow:** Construct a custom Claude "Video Prompt Builder" Skill. This breaks 15-second concepts into 10 multi-shot chunks (specifying lighting, camera behavior, Hex colors) and compiles them into a single master prompt.
- **Advanced Omni-Reference Strategy:** Upload **3 base SFW images** (e.g., Intro, Middle, Final Hero shot) into Higgsfield. Take a screenshot of the upload order so Claude can natively tag `[image 1]`, `[image 2]`, and `[image 3]` at the exact timestamps in the prompt to perfectly lock the visual aesthetic across all 15 seconds.
- **Native Sound Design:** Do not export to CapCut for audio. SeaDance 2.0 automatically generates synced sound effects and background music within its 15-second generation.
- **The "Cherry-Pick" Method:** A 15-second generation costs ~90 credits ($3 value). Generate twice using the exact same 3 Omni-images but different Claude prompts to build a 20-shot pool, then cherry-pick the flawless shots if Higgsfield's auto-edit has visual artifacting.

### 1.4c Long-Form PPV & Dialogue Pipeline (Avatar 5.0)
- **The Zero-Drift Strategy:** SeaDance is for 15s cinematic hooks. For 1-to-10 minute talking head videos (Direct-to-camera Reals or $50 PPV DMs on Fanvue), we use Avatar 5.0. 
- **The 15-Second Source:** We will feed Avatar 5 a 15-second reference video of a real human with Jasmine's deepfake applied. Avatar 5 learns the micro-movements, allowing us to drop 10-minute scripts that it will generate flawlessly without the "cousin drift" hallucination typical of image-based models.

### 1.5 Revenue Architecture & Chatting (6-Step Ladder)
- **Revenue Split:** Focus on generating volume traffic so the Room 11 managed chatters can convert PPV Messages (50-60%) and Mass Message PPVs (10-15%).
- **The Savior Alibi:** (Still applies). The Room 11 chatters will utilize the "nursing student/toxic parents" backstory to trigger "savior syndrome" for high-ticket tips.
- **ManyChat IG Funnel:** People buy emotional connection. Instagram DMs are routed through ManyChat automation to push users toward the Room 11 link.

### 1.6 Financial Settlement Pipeline (Cross-Border)
- **Primary Payouts (Skydo):** Room 11 and Fanvue USD payouts will route directly into the Skydo virtual US bank account. This serves as the B2B cross-border clearinghouse, completely bypassing extreme PayPal FX margins and holding fees to route back to the Indian home bank.
- **Backup (PayPal):** Maintained solely as a secondary fallback for edge-case billing or vendor payments.

## SECTION 2: TECH STACK

| Tool | Purpose | Cost |
|---|---|---|
| **Higgsfield Plus** | Images (NanaBanana Pro unlimited), Video (SeaDance 2.0 / Kling 3.0), Audio (ElevenLabs v3), Motion Control | $29/mo (annual) |
| **Loomflow AI** | The "Uncensored" alternative for SeaDance 2.0. To be used immediately if Higgsfield begins throwing "Face Detected / Violation" errors for Jasmine's realism. Features a built-in automated Prompt Agent, eliminating the need for Claude. | Pay-per-use |
| **Avatar 5.0** | Long-form Video-to-Video generation. Uses a 15-second source video to lock identity for zero-drift 10-minute PPV talking head videos. | TBD |
| **Google Colab + Flux.1** | NSFW Batch 2-3 image generation (uncensored) | Free |
| **fal.ai** | API for Kling 3.0 batch video generation (Phase 2 automation) | Pay-per-use |
| **Weave AI (Node Loophole)** | Zero-cost fallback for SeaDance 2.0. Involves looping Fal.ai model links into Weave AI via ProtonMail burners to get 15 free generations per account. | Free (High Labor) |
| **Later.com** | Posting scheduling for peak USA traffic | ~$18/mo |
| **Apify + Gemini** | Competitor Reel scraping & hook analysis pipeline | Pay-per-use / Free tier |

## SECTION 3: NEW TECHNIQUES

**1. Voice Consistency:** Utilize Claude to analyze Jasmine's base parameters. Create a universal voice prompt defining accent, tone, pacing, and emotional delivery. Prepend this to EVERY dialogue video.
**2. Advanced Competitor Scraping:** Utilize Apify via Claude Code to scrape top 30 competitor reels, extracting view counts and transcripts, feeding to Gemini to extract viral hooks and rewrite them for Jasmine.
