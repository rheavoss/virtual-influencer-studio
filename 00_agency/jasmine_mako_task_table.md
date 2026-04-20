# Jasmine Mako — Phase 0 & Phase 1 Execution Pipeline
**Updated:** 2026-04-20 (Session 13 — P0-07 LoRA complete. P0-08 Higgsfield subscribed. Karpathy Protocol expanded. Vercel ignore-build-step fixed.)

**Legend:**
- **Assignee:** [Antigravity] (Code/Workflows/OpSec), [Claude Code] (Text Prompts/Scripting), [Grok] (Market Intel/Trends/X & Web Research), [CEO] (Physical accounts/Payments).
- **RICE Score:** Reach (1-10) × Impact (1-10) × Confidence (0-100%) ÷ Effort (1-10) = Priority Score. Higher is better.

---

## 🚨 URGENT — Infra Hotfixes (Do First)

- [ ] **[P0-36]** `[Tech Ops]` (Claude Code) *(RICE: 8×9×1.0÷1 = 72)* — **URGENT** Fix `~/.studio-sync/sync-project.sh` to exclude `.gbrain` from auto-commits. Currently `.gbrain` triggers Vercel Preview builds on every brain-update, burning the 100 deploy/day quota. Add `git reset HEAD .gbrain 2>/dev/null || true` after the existing dashboard exclusion line.
- [ ] **[P0-38]** `[Tech Ops]` (Claude Code) *(RICE: 9×9×1.0÷2 = 40.5)* — **URGENT** Delete legacy `jasmine-dashboard` Vercel project (prj_3cCte5hEyZuJpwzDQ7EGocr4Gxc1). Character-specific name conflicts with multi-character agency vision. **Pre-condition:** Must first deploy to `virtual-influencer-dashboard` project and re-alias production URL — cannot delete until alias is migrated (alias currently points to jasmine-dashboard deployment). Do after P0-37.
- [ ] **[P0-37]** `[Tech Ops]` (Claude Code) *(RICE: 8×8×1.0÷1 = 64)* — **URGENT** Fix deploy command in `CLAUDE.md` and `20_tech/jasmine-dashboard/deploy.md`: change `name:"jasmine-dashboard"` → `name:"virtual-influencer-dashboard"`. Wrong project name caused 1hr+ of wasted deploys and tokens on 2026-04-20.

---

## PHASE 0: LAUNCH & ASSETS

### Infrastructure & Approvals
- [x] **[P0-00]** `[Tech Ops]` (Antigravity) *(RICE: 6×7×0.9÷3 = 12.6)* - Implement pre-commit hooks + JSON Schema enforcement. `.pre-commit-config.yaml` + `schemas/character_bible.schema.json` created and committed 2026-04-17.
- [x] **[P0-01]** `[Exec Dept]` (CEO) *(RICE: N/A - Done)* - Tech stack finalized and pricing verified.
- [x] **[P0-02]** `[Strategy]` (Claude) *(RICE: N/A - Done)* - Character Bible locked (v2.1).
- [x] **[P0-03]** `[Content]` (Claude) *(RICE: N/A - Done)* - Image Generation 40-prompt JSON Matrix locked.
- [x] **[P0-04]** `[AI Ops]` (Antigravity) *(RICE: N/A - Done)* - Batch Generation script developed (`jasmine_batch_generator.py`).
- [x] **[P0-05]** `[Content]` (CEO + Claude) *(RICE: N/A - Done)* - LoRA training dataset assembled: 38 images in `03_ai_models/jasmine_mako/training_data/jasmine_dataset/`. Generated via Kling Image 3 series mode (pink bikini reference, face-forward only). Outfits: black gym wear, pink micro bikini, white bodysuit, red bodycon. Completed 2026-04-18.
- [x] **[P0-06]** `[Strategy]` (Claude) *(RICE: N/A - Done)* - Character Card written.
- [x] **[P0-07]** `[AI Ops]` (CEO) *(RICE: 10×10×1.0÷3 = 33.3)* - ✅ COMPLETE 2026-04-19 — `jasmine_v1.safetensors` trained on Vast.ai. ostris/ai-toolkit, 2000 steps, LoRA rank 16. File in `03_ai_models/jasmine_mako/lora_checkpoints/`.
- [x] **[P0-08]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - ✅ COMPLETE — Higgsfield Starter subscribed ($9/mo).

### Link-in-Bio Setup 
- [ ] **[P0-10]** `[Exec Dept]` (CEO) *(RICE: 10×8×1.0÷2 = 40)* - Register domain on Namecheap.
- [ ] **[P0-11]** `[Tech Ops]` (Antigravity) *(RICE: 10×9×1.0÷2 = 45)* - Configure Namecheap domain to redirect to Bouncy.cc link page. ~~Carrd.co deprecated — in-app browser = logged-out users = low conversion.~~
- [ ] **[P0-12]** `[Tech Ops]` (Antigravity) *(RICE: 10×8×0.9÷3 = 24)* - Build Bouncy.cc link-in-bio page (free tier). ~~Carrd.co deprecated.~~
- [ ] **[P0-13]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - Add Bouncy.cc redirect URL to Instagram bio. ~~Carrd.co deprecated.~~

### Social Media Pre-Launch
- [ ] **[P0-14]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - Buy Calilio standard plan (US virtual number).
- [ ] **[P0-15]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷2 = 50)* - Create `@jasmine.mako` IG account using physical device.
- [ ] **[P0-16]** `[Growth]` (CEO) *(RICE: 10×8×0.9÷4 = 18)* - Implement 72-hour interaction-only warmup (No links).
- [ ] **[P0-17]** `[Growth]` (CEO) *(RICE: 10×10×1.0÷3 = 33)* - Day 4–7: Post 1 SFW photo daily.

### OPSEC Pipeline
- [ ] **[P0-18]** `[Tech Ops]` (Antigravity) *(RICE: 10×10×0.9÷4 = 22.5)* - Build ExifTool strip + film grain python pipeline.
- [ ] **[P0-19]** `[Tech Ops]` (Antigravity) *(RICE: 10×10×1.0÷2 = 50)* - Test OPSEC pipeline on sample image before upload.

### Fanvue + Passes + X/Twitter (Day 1)
- [ ] **[P0-20]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷3 = 33)* - Set up Fanvue account + subscription pricing.
- [ ] **[P0-21]** `[Exec Dept]` (CEO) *(RICE: 8×7×1.0÷2 = 28)* - Mirror account on Passes.
- [ ] **[P0-22]** `[Exec Dept]` (CEO) *(RICE: 10×6×1.0÷2 = 30)* - X/Twitter SFW teasers account live.

### Room 11 Setup (Sequential: After LoRA Only)
- [ ] **[P0-23]** `[Exec Dept]` (CEO) *(RICE: 8×8×1.0÷2 = 32)* - Create Room 11 host account using US Gmail.
- [ ] **[P0-24]** `[Content]` (Antigravity) *(RICE: 8×10×0.9÷5 = 14.4)* - Generate & upload 30–40 LoRA output photos for content wall.
- [ ] **[P0-25]** `[Exec Dept]` (CEO) *(RICE: 8×6×1.0÷2 = 24)* - Activate "Fully Managed Chatting Service" (60% split).

### Monetization Assets
- [x] **[P0-26]** `[Strategy]` (Claude) *(RICE: N/A - Done)* - Write the 6-Step Chatter Matrix / Script.
- [x] **[P0-27]** `[Strategy]` (Claude) *(RICE: N/A - Done)* - Write 3 variants of Mass Message PPV blasts.
- [x] **[P0-28]** `[Strategy]` (Claude) *(RICE: N/A - Done)* - Create Fan Notes Template to tag Whales.

### Master Frameworks + April 15-16 Stack (Added 2026-04-18 — Grok MASTER_FRAMEWORKS_INTEGRATION_001)
- [ ] **[P0-32]** `[Strategy]` (Grok / Antigravity) *(RICE: 10×10×1.0÷1 = 120)* - Test and integrate Higgsfield as primary cinematic video platform (Veo 3.1 + Kling motion control + Nano Banana Pro reference sheets + image-to-video chaining) with Jasmine Flux.1 LoRA for all 8 CT types. Do NOT start until P0-29 Grok sign-off received.
- [ ] **[P0-33]** `[Strategy]` (Grok / Claude) *(RICE: 10×10×0.9÷1 = 90)* - Run full stack validation: Open Generative AI → Higgsfield/OpenMontage → Light Reel strategy → Vugola distribution. Document unified Jasmine content engine.
- [ ] **[P0-34]** `[Tech Ops]` (Grok / Claude) *(RICE: 9×9×1.0÷1 = 85)* - Integrate OpenMontage (agentic video studio) + Light Reel AI into content strategy and iteration workflow (screenshot/share tracking + "Product = Marketing" loop).
- [ ] **[P0-35]** `[Strategy]` (Claude / Grok) *(RICE: N/A)* - Maintain and update `00_agency/master_frameworks_compilation.md` as living single source of truth for all collected strategies and tools.
- [ ] **[P1-47]** `[Tech Ops]` (Antigravity) *(RICE: 8×8×1.0÷1 = 65)* - Implement Vugola AI + NotebookLM + Claude cost hack into automation pipeline for clipping, scheduling, and cheap large-context scripting.

### LoRA Training — Prompt Recovery & Dataset QC (Added 2026-04-18 — Grok TASK_TABLE_UPDATE_001)
- [ ] **[P0-29]** `[Strategy]` (Grok / Claude) *(RICE: 10×10×1.0÷1 = 100)* - Recover or recreate missing master prompt files (`00_studio_template/master_generator_prompt_system.md` and `01_characters/jasmine/jasmine_generator_prompt.md`) referenced in April 16 Grok session. If intentionally removed, document replacement system in `jasmine_character_bible.json`.
- [ ] **[P0-30]** `[Content]` (Grok / Antigravity) *(RICE: 10×10×1.0÷2 = 50)* - Generate/regenerate 40 high-consistency LoRA training images using recovered master prompt system. Connie Perignon aesthetic, strict non-nude ceiling, heavy tattoos, deep cleavage, wet skin, bedroom/fantasy poses. Do NOT start until P0-29 Grok sign-off received.
- [ ] **[P0-31]** `[AI Ops]` (Grok) *(RICE: 9×9×0.9÷2 = 40.5)* - Formal QC on 40-image LoRA training set against `jasmine_character_bible.json`: consistency, aesthetic match, tattoo accuracy, pose variety, content-ceiling compliance. Grok sign-off required before Vast.ai training begins.

---

## PHASE 1: AUTOMATION & SCALING

### Growth & SEO
- [ ] **[P1-05]** `[Growth / SEO]` (Grok) *(RICE: 8×8×0.85÷2 = 27.2)* - Integrate Common Crawl backlinks script (`cc-backlinks.sh`). Run first competitor analysis on top East-Asian GFE / virtual-influencer domains, and prepare backlink acquisition playbook for Jasmine's future domain / Linktree / landing page. Deliverables: `09_marketing/seo/competitor_backlinks_YYYY-MM-DD.md` + `backlink_playbook.md`. Ready for execution once first reels are live.
- [ ] **[P1-48]** `[Growth / SEO]` (Claude / CEO) *(RICE: 9×9×0.8÷5 = 12.9)* - **Programmatic SEO Pages:** Use Cursor + Claude Code + Firecrawl + Perplexity to auto-generate 500+ city/niche landing pages (e.g. "virtual GFE India", "AI girlfriend Mumbai"). Full strategy: `09_marketing/seo/programmatic_seo_strategy.md`. Prerequisites: domain live (P0-10), Grok keyword research. Do NOT start before domain is registered.
- [ ] **[P1-49]** `[Growth / SEO]` (Claude / CEO) *(RICE: 9×9×0.75÷6 = 10.1)* - **GeoDirectory SEO Flywheel:** Build WordPress + GeoDirectory OR Webflow + Airtable + WhaleSync super-collections site. Auto-generates thousands of location×category pages (7 categories × 13 locations = 91+ pages minimum, scales to 500+). Full strategy: `09_marketing/seo/geo_directory_seo_hack.md`. Run parallel with P1-48 after domain live.

### Social Media SOPs
- [ ] **[P1-56]** `[Growth]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - **7-Day Instagram Warm-Up:** Execute full day-by-day protocol immediately after account creation (P0-15). Full SOP: `09_marketing/instagram/ig_warmup_sop.md`. Includes ban-prevention rules, algorithm signal building, post-warm-up cadence. Track daily in `08_analytics/ig_warmup_log.md`.
- [ ] **[P1-50]** `[Growth]` (CEO / Antigravity) *(RICE: 9×9×0.8÷3 = 21.6)* - **Threads Scaling SOP:** Launch Threads account with 7-day warm-up protocol → 3–6 posts/day + 8–10 viral comments/day → link.boo CTA → 20–100 paying Fanvue subscribers/day target. Full SOP: `09_marketing/threads/threads_scaling_sop.md`. Start Month 1 after IG account warm.
- [ ] **[P1-51]** `[Growth]` (Antigravity / Claude) *(RICE: 9×8×0.7÷4 = 12.6)* - **AI Personas Authority Network:** Create 10–50 AI personas (fan accounts, reviewers, fitness accounts) that consistently endorse Jasmine across Threads/X/IG. Creates "everyone is talking about her" effect. Full strategy: `09_marketing/growth/ai_personas_authority_strategy.md`. Cost: ~₹500/month.

### YouTube Revenue Channel
- [ ] **[P1-52]** `[Growth / Revenue]` (Antigravity / CEO) *(RICE: 9×9×0.7÷6 = 9.5)* - **Hybrid Faceless RPV YouTube Channels:** Launch Jasmine as AI avatar host on high-RPV YouTube channels (AI creator case studies, platform reviews, GFE explainers). Stack AdSense + affiliates + Fanvue CTAs. Target: $2,000–$18,000/month per channel. Full strategy: `09_marketing/youtube/hybrid_youtube_rpv_strategy.md`. Start Month 3+ after Fanvue established.

### Content Production Tooling
- [ ] **[P1-53]** `[Tech Ops]` (Antigravity / Claude) *(RICE: 9×9×0.7÷5 = 11.3)* - **Cance 2 + Arc Ads Cloning Pipeline:** Build local Claude Code dashboard → upload winning competitor ads → Cance 2 API generates Jasmine versions → 8+ variants per batch → A/B test → scale winner. 46% cheaper than direct API. Full pipeline: `04_content_pipeline/cance2_arc_ads_cloning_pipeline.md`. Start Month 2 after Fanvue live.
- [ ] **[P1-54]** `[Tech Ops]` (Claude / Antigravity) *(RICE: 9×8×0.7÷4 = 12.6)* - **Hyperframes HTML-First Video Pipeline:** Set up Hyperframes repo for deterministic short-form video generation. HTML template → consistent Jasmine clips every time, no drift. Use for daily IG reel factory (Higgsfield for hero content only). Full pipeline: `04_content_pipeline/hyperframes_video_pipeline.md`. Requires Grok G0 research on current repo status.
- [ ] **[P1-55]** `[Content]` (Antigravity) *(RICE: 8×8×0.8÷2 = 25.6)* - **Flow 3D Motion Graphics:** Integrate Flow + ChatGPT master prompts to add 3D animated overlays to all Jasmine videos. Animated text, particles, light leaks, transitions. Free professional polish. Full guide: `04_content_pipeline/flow_3d_motion_graphics.md`. Test on 3 existing clips first.
- [ ] **[P1-57]** `[Tech Ops]` (Antigravity / Claude) *(RICE: 9×9×0.7÷5 = 11.3)* - **UGC Ad Testing Pipeline (Cance 2 API):** Build automated pipeline: Jasmine assets → Cance 2 API → 8+ UGC ad variants → review dashboard → auto-schedule approved ads. 5 hook types × 4 CTA types = 20 possible variants. Full pipeline: `04_content_pipeline/ugc_ad_testing_pipeline.md`. Start Month 2.
- [ ] **[P1-58]** `[Content]` (Antigravity / CEO) *(RICE: 8×9×1.0÷1 = 72)* - **6-Step Editing SOP:** Lock and apply the 6-step editing system to every Jasmine video: (1) auto-cut, (2) music first, (3) best section first, (4) templates, (5) sound effects, (6) rewatch. Full SOP: `04_content_pipeline/editing_system_sop.md`. Also lock brand kit (font, color, watermark position) into character bible.

### Sponsorships & Brand Deals
- [ ] **[P1-59]** `[Revenue]` (Claude) *(RICE: 9×9×1.0÷1 = 81)* - **Jasmine Media Kit (USD-denominated):** Build PDF media kit targeting US brands — follower count, engagement rate, audience demographics (US/UK/AU heavy), content style, niche (lifestyle/beauty/fashion), pricing sheet in USD. Include Fanvue-adjacent brands section. Claude drafts, CEO approves. Required before any outbound pitch. Output: `09_marketing/sponsorships/jasmine_media_kit.md` + PDF export.
- [ ] **[P1-60]** `[Revenue]` (CEO) *(RICE: 9×8×0.9÷1 = 64.8)* - **List Jasmine on Collabstr + Passionfroot + Instagram Creator Marketplace:** List with USD pricing. Collabstr = brands browse and DM. Passionfroot = creator storefront, brands buy directly. Creator Marketplace = Meta's tool, activates once 10k followers hit. All three platforms are location-agnostic — US brands find and pay Indian creators daily. Prereq: P1-59 media kit done + 10k followers. Doc: `09_marketing/sponsorships/brand_deal_platforms_sop.md`.

### Social Scheduling
- [ ] **[P1-01]** `[Tech Ops]` (Antigravity) *(RICE: 10×8×1.0÷4 = 20)* - Configure Metricool free tier pipeline for IG+FB+YouTube Shorts scheduling. ~~TikTok DEPRECATED 2026-04-11.~~
- [ ] **[P1-02]** `[Exec Dept]` (CEO) *(RICE: 5×5×1.0÷1 = 25)* - Upgrade to Metricool paid tier (only when advanced analytics needed).
- [ ] **[P1-41]** `[Strategy]` (Claude) *(RICE: 9×9×0.9÷3 = 24.3)* - Run full Brand Blueprint exercise for Jasmine: (1) Goals + impediments, (2) Niche stack (category→niche→sub-niche), (3) TAM analysis — quantify Hindi-speaking Indian GFE market size, (4) Recognizability audit — costume/sonic/backdrop/iconic feature locked, (5) Aspirational vs attainable positioning, (6) Output to `01_characters/jasmine/jasmine_brand_blueprint.md`. Framework: Faceless Francis Brand Blueprint (OFM).
- [ ] **[P1-42]** `[Content]` (Antigravity) *(RICE: 8×9×0.7÷2 = 25.2)* - **Monitor OmniShow (12.3B product-hold model):** Code not released yet (as of Apr 2026). Watch repo — when live, test "Jasmine holds [product]" workflow: input = person image + product image + audio + pose reference → output = lip-synced product-hold video. Primary use case: brand deal UGC without needing a real shoot. Check GitHub/HuggingFace weekly.
- [ ] **[P1-43]** `[Content]` (Antigravity) *(RICE: 9×8×0.8÷2 = 28.8)* - **Test CoMoVi for human motion fix:** Code is live now. Built on Wan 2.2 — fixes limb glitching and anatomy drift in AI video. Run Jasmine clips that have arm/hand/leg issues through CoMoVi before publishing. Document: which clip types benefit most (dance, walking, hand gestures). Integrate into post-production pipeline if consistent improvement.
- [ ] **[P1-44]** `[Content]` (Antigravity) *(RICE: 7×8×0.6÷3 = 11.2)* - **Monitor Vanast (virtual clothing try-on):** Code coming soon. When live: test outfit swap on Jasmine reference images — upload her photo + clothing item image → she wears it. Use case: rapid outfit variation for IG content without regenerating full image. Watch HuggingFace/GitHub for release.
- [ ] **[P1-45]** `[Content]` (Antigravity) *(RICE: 9×9×0.8÷2 = 32.4)* - **Test Moss TTS Nano for Hindi voice pipeline:** 100M param model, CPU-only (no GPU needed), 20 languages including Hindi, instant voice cloning. Directly supports P1-38 Hindi dub pipeline as a FREE alternative to ElevenLabs for Hindi TTS. Test: (1) clone Jasmine's ElevenLabs voice reference, (2) generate Hindi speech sample, (3) compare quality vs ElevenLabs Hindi output. If quality acceptable → zero marginal cost Hindi audio. Repo: MossAudio/Moss-TTS-Nano.
- [ ] **[P1-46]** `[Content]` (Antigravity) *(RICE: 7×7×0.8÷3 = 13.1)* - **Evaluate Prompt Relay for temporal video control:** Works with Wan 2.2 — assign different prompts to exact timestamps in a video clip (e.g., "sitting at 0s → standing at 2s → walking at 4s"). Use case: scripted scene transitions without cutting. Test with a simple Jasmine GFE scene: soft intro → movement → pose hold. Compare result quality vs standard single-prompt Kling clip.
- [ ] **[P1-40]** `[Grok]` (Grok) *(RICE: 8×8×0.8÷2 = 25.6)* - Research TAM for Hindi-speaking Indian GFE/subscription content market: (1) estimated Hindi-speaking males 18–35 with disposable income online, (2) current Hindi creator presence on Fanvue/OnlyFans (near zero = opportunity), (3) average willingness to pay in ₹ for Hindi GFE vs English, (4) verdict: is a dedicated Hindi Instagram + Telegram worth building separately or mix into main account?
- [ ] **[P1-39]** `[Tech Ops]` (Antigravity) *(RICE: 8×9×0.8÷3 = 19.2)* - Evaluate Hindi content distribution strategy: (1) separate Hindi IG account vs mixed-language main account, (2) separate Hindi Telegram VIP channel vs one channel, (3) pricing — should Hindi subscribers pay less (₹ pricing) vs international ($). Decision needed before Hindi pipeline goes live.
- [ ] **[P1-38]** `[Content]` (Antigravity) *(RICE: 10×9×0.8÷2 = 36.0)* - Test ElevenLabs Hindi dubbing pipeline: (1) generate sample Jasmine English voice clip, (2) use ElevenLabs voice clone → translate → Hindi dub, (3) test lip sync accuracy via Kling/Higgsfield — Hindi phonetics differ significantly from English mouth movements, (4) verdict: publish quality or not? If yes, document full workflow. This unlocks the entire Hindi-speaking Indian GFE market.
- [ ] **[P1-37]** `[Content]` (Antigravity) *(RICE: 9×8×0.8÷3 = 19.2)* - Evaluate **Arcads** platform for Jasmine UGC pipeline: (1) image gen + Kling 3.0 + Veo 3.1 + talking actors in one place, (2) test product-hold workflow — "Jasmine holds [product]" in one prompt, (3) test item transplant — upload product image separately, apply to character, (4) compare cost vs separate Kling/Higgsfield stack. Link: arcads.ai.
- [ ] **[P1-36]** `[Content]` (Antigravity) *(RICE: 10×9×1.0÷1 = 90)* - **VOICE CONSISTENCY RULE (lock into all video prompts):** Always specify Jasmine's accent explicitly in every single video/voice prompt — "soft warm East Asian accent, gentle and intimate tone." Never leave accent vague. Vague accent = voice drifts between clips = broken character consistency. Add this rule to `jasmine_character_bible.json` and `seedance_parameter_framework.md`.
- [ ] **[P1-35]** `[Tech Ops]` (Antigravity) *(RICE: 8×8×0.9÷1 = 57.6)* - Monitor Seedance 2.0 rollout on Higgsfield — already on paid plan, zero extra cost when live. Do NOT pay Dreamina $20/month. Check Higgsfield dashboard weekly. When available: test Omni multi-reference with 4–6 Jasmine LoRA outputs for character consistency across shots. Reference: `01_characters/jasmine/params/seedance_parameter_framework.md`.
- [ ] **[P1-34]** `[Content]` (Antigravity) *(RICE: 9×9×0.9÷2 = 36.4)* - Test Kling 3.0 motion control via free platforms: (1) **VV AI** — 150 free credits/month = 1 guaranteed free generation, use for Jasmine motion control test; (2) **Luma Labs** — upload Jasmine image + reference video → Modify Video → Kling 3 section; (3) **Roboneo AI** — New Project → Workflow → Motion Control. Goal: produce one Jasmine motion video at zero cost before committing to Kling subscription.
- [ ] **[P1-33]** `[Grok]` (Grok) *(RICE: 6×7×0.8÷2 = 16.8)* - Research HighLevel India pricing and evaluate as scheduler-only tool (NOT image gen — Jasmine images must be LoRA-generated). Key questions: (1) India monthly cost in ₹, (2) can it schedule pre-made images to IG without using its own image gen, (3) does it replace Metricool + Later.com, (4) verdict: worth adding to stack or skip?

### Content & Growth
- [ ] **[P1-03]** `[Growth]` (CEO) *(RICE: 9×8×0.8÷2 = 28.8)* - Turn on $5/day IG Boost for static images.
- [ ] **[P1-04]** `[Tech Ops]` (Antigravity) *(RICE: 10×9×0.8÷6 = 12)* - Set up Apify + Context7 automated competitor reel scraper.
- [ ] **[P1-05]** `[Strategy]` (Grok) *(RICE: 10×8×0.9÷4 = 18)* - Execute daily X/Reddit trend sweeps for /jasmine-ideas via live web access.
- [ ] **[P1-06]** `[Strategy]` (Claude) *(RICE: 10×9×0.9÷5 = 16.2)* - Create 'Video Prompt Builder' Skill (15-second chunk mapping).
- [ ] **[P1-07]** `[AI Ops]` (Antigravity) *(RICE: 10×10×0.8÷6 = 13.3)* - Execute First Reel (3-Image Omni-Reference) via Higgsfield.
- [ ] **[P1-08]** `[AI Ops]` (Antigravity) *(RICE: 10×10×0.9÷4 = 22.5)* - **SPOF Fix:** Create Antigravity `.md` Skill file to automate A-roll/B-roll product ads via Claude + Higgsfield API.
- [ ] **[P1-09]** `[Content]` (Antigravity) *(RICE: 8×8×0.9÷5 = 11.5)* - Record a 15-second human source video, apply Jasmine deepfake mapping for PPV Avatar baseline.

### Agent Automation & DevOps 
- [ ] **[P1-10]** `[Tech Ops]` (Antigravity) *(RICE: 10×10×0.8÷6 = 13.3)* - Deploy Hermes-Agent on $5 VPS for central execution.
- [ ] **[P1-11]** `[Tech Ops]` (Antigravity) *(RICE: 10×9×0.9÷4 = 20.2)* - Connect Hermes-Agent to Telegram for remote ops.
- [ ] **[P1-12]** `[Tech Ops]` (Antigravity) *(RICE: 10×8×0.7÷6 = 9.3)* - **SPOF Fix:** Build Zapier/Browser script to pipe SpicyChat responses into Fanvue automatically.
- [ ] **[P1-13]** `[Tech Ops]` (Antigravity) *(RICE: 10×8×0.8÷5 = 12.8)* - Build ManyChat automation for IG DMs routing to Fanvue.
- [ ] **[P1-14]** `[Market Intel]` (Grok) *(RICE: 10×9×0.9÷5 = 16.2)* - **Grok Workflow:** Operate Playwright Headless Script to query X/Grok UI for daily trends without API costs.

### Payment Infrastructure & Geo-Routing
- [x] **[P1-15]** `[Tech Ops]` (Antigravity) *(RICE: N/A - Done)* - Implement `middleware.ts` on Vercel for Cashfree (IN) vs. WHOP (Intl) geo-routing.
- [ ] **[P1-16]** `[Tech Ops]` (Antigravity) *(RICE: 10×8×1.0÷3 = 26.6)* - Build `/checkout/cashfree` (native SDK) and `/checkout/whop` endpoints on mediator site.
- [ ] **[P1-17]** `[Exec Dept]` (CEO) *(RICE: 10×8×1.0÷2 = 40)* - Configure Skydo receiving account as the default payout destination for all payment gateways.
- [ ] **[P1-18]** `[Exec Dept]` (CEO) *(RICE: 6×8×0.8÷2 = 19.2)* - Follow up on Paddle / Lemon Squeezy (MoR) account approvals with $15k MRR 90-day projection.

### Post-Production VFX & Schedulers
- [ ] **[P1-19]** `[Tech Ops]` (Antigravity) *(RICE: 10×9×0.9÷4 = 20.2)* - Deploy self-hosted `Postiz` instance on Railway for multi-account portfolio scheduling.
- [ ] **[P1-20]** `[Exec Dept]` (CEO) *(RICE: 10×8×0.8÷3 = 21.3)* - Complete OAuth app approvals for Instagram, Threads, YouTube for Postiz integration. ~~TikTok DEPRECATED 2026-04-11.~~
- [ ] **[P1-21]** `[Content]` (Antigravity) *(RICE: 10×9×0.8÷3 = 24.0)* - Test `TNTwise/REAL-Video-Enhancer` (or `VEnhancer`) GUI toolkit to fix waxy faces/artifacts in AI output.
- [ ] **[P1-22]** `[Tech Ops]` (Antigravity) *(RICE: 8×9×0.7÷6 = 8.4)* - Integrate `Netflix VOID` for professional object interaction and physics scene reasoning on CapCut exports.
- [ ] **[P1-23]** `[Content]` (Antigravity) *(RICE: 10×9×0.8÷4 = 18.0)* - Use `CharaConsist` to maintain Jasmine's physical consistency across all batch-generated videos.
- [ ] **[P1-24]** `[Tech Ops]` (Antigravity) *(RICE: 8×8×0.9÷3 = 19.2)* - Build central ComfyUI post-prod pipeline via `ComfyUI-VideoHelperSuite`.

### IDE & Workflow Upgrades
- [ ] **[P1-25]** `[AI Ops]` (CEO) *(RICE: 10×8×1.0÷2 = 40)* - Install `claude-mem` + `token-savior` for persistent context saving and 97% reduced token usage.
- [ ] **[P1-26]** `[AI Ops]` (Antigravity) *(RICE: 9×8×0.9÷3 = 21.6)* - Connect `ruflo` for multi-agent swarm orchestration inside Claude Code.
- [x] **[P1-27]** `[AI Ops]` (CEO) *(RICE: N/A - Done)* - Inject `andrej-karpathy-skills` `CLAUDE.md` to enforce strict, surgical, goal-driven AI coding parameters. Karpathy Protocol live in CLAUDE.md.

### Additional Video Post-Production (Identified via Grok Research — Apr 15)
- [ ] **[P1-28]** `[Content]` (Antigravity) *(RICE: 10×9×0.8÷3 = 24.0)* - Test `willermo/video-enhancer` — 2-stage Real-ESRGAN + GFPGAN pipeline to fix waxy AI faces and skin artifacts on CapCut exports.
- [ ] **[P1-29]** `[Content]` (Antigravity) *(RICE: 9×8×0.8÷3 = 19.2)* - Test `phoenix104104/fast_blind_video_consistency` to eliminate frame-to-frame jitter and flickering in AI-generated Reels.
- [ ] **[P1-30]** `[Content]` (Antigravity) *(RICE: 9×8×0.8÷4 = 14.4)* - Test `sczhou/Upscale-A-Video` (CVPR 2024) — diffusion-based upscale 720p CapCut exports to crisp 1080p/4K without introducing new flicker.

### Payment Infrastructure (Remaining)
- [ ] **[P1-31]** `[Tech Ops]` (Antigravity) *(RICE: 8×7×0.9÷2 = 25.2)* - Add manual country-selector dropdown on checkout page as user override for geo-routing (India/International toggle).
- [ ] **[P1-32]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - Run end-to-end test transactions — one Indian payment via Cashfree, one international via WHOP. Verify live flow before launch.

---

## PHASE 2 — DESI CHARACTER (Parallel from Month 2)
> **Decision locked:** 2026-04-19. Real data: muskankaria ₹15.1L/month (3,869 subs × ₹390), sofia9_official ₹14.3L/month (7,958 subs × ₹180). Jasmine stays USD-first. Desi character runs parallel for fast INR cashflow.

- [ ] **[P2-01]** `[Strategy]` (Claude + CEO) *(RICE: 10×10×0.9÷2 = 45)* - Lock desi character spec: name, appearance (Indian-curvy, 22-26yo), Hindi/Hinglish voice persona, content ceiling (same Option A — no nudity). Create `01_characters/desi_character/character_brief.md`.
- [ ] **[P2-02]** `[AI Ops]` (CEO + Claude) *(RICE: 10×10×0.9÷3 = 30)* - Generate 38 desi character LoRA training images (same pipeline as Jasmine — Kling Image series mode, face-forward, varied outfits). Target: Indian-curvy aesthetic, warm skin tone.
- [ ] **[P2-03]** `[AI Ops]` (CEO) *(RICE: 10×10×0.9÷3 = 30)* - Train Desi Flux.1 Dev LoRA on Vast.ai. Same settings as P0-07 (ostris/ai-toolkit, 2000 steps, rank 16). Est. cost ~$2.
- [ ] **[P2-04]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - Set up desi character Instagram account. Separate from Jasmine. Hindi/Hinglish bio. Indian girl name.
- [ ] **[P2-05]** `[Content]` (Antigravity + Claude) *(RICE: 9×9×0.9÷2 = 36.4)* - Generate 30-day Hindi/Hinglish content calendar. Reels captions, story scripts, GFE DM templates in Hindi. Mirror sofia9_official/muskankaria content structure.
- [ ] **[P2-06]** `[AI Ops]` (Claude) *(RICE: 9×9×0.9÷3 = 24.3)* - Clone Hindi voice via VoiceBox (zero-shot, local). Test lip-sync with Higgsfield using Hindi audio. Confirm quality before launch.
- [ ] **[P2-07]** `[Exec Dept]` (CEO) *(RICE: 10×10×1.0÷1 = 100)* - Set up IG native subscription at 10k followers (₹250–390/month tier). Target Month 4–5 unlock.

---

## BACKLOG (Post $500 MRR)

### Studio Expansion
- [ ] **[B-01]** `[Tech Ops]` (Antigravity) *(RICE: 10×10×0.8÷5 = 16)* - Deploy Character Card to SpicyChat Premium for interactive funnels.
- [ ] **[B-02]** `[Strategy]` (Claude) *(RICE: 10×10×0.7÷8 = 8.7)* - Duo Engine Expansion (Launch best friend influencer / second character).
- [ ] **[B-03]** `[Growth]` (CEO) *(RICE: 10×8×0.8÷3 = 21.3)* - Paid Community Page Shoutouts triggered on organic milestones.

### Payment Optimisation
- [ ] **[B-04]** `[Tech Ops]` (Antigravity) *(RICE: 6×7×0.7÷3 = 9.8)* - A/B test WHOP vs Paddle / Lemon Squeezy for international checkout conversion. Requires Paddle/LemonSqueezy approvals first (P1-18).
- [ ] **[B-05]** `[Exec Dept]` (CEO) *(RICE: 7×8×0.8÷2 = 22.4)* - Follow up Grey Business account approval — alternative international payout rail to Skydo.

### Investor Deck & Fundraising (Post M3 Traction — Target: $750k–$900k at $7–7.5M post-money SAFE)
> **Trigger:** Only start after 3 months of real Jasmine data (followers, Fanvue MRR, CAC proof). Do not pitch before M3.

- [ ] **[B-06]** `[Strategy]` (Claude) *(RICE: 8×9×0.8÷4 = 14.4)* - Reframe entire deck as "AI Virtual Influencer Studio" — portfolio-first model, not single-character bet.
- [ ] **[B-07]** `[Strategy]` (Claude) *(RICE: 8×9×0.8÷3 = 19.2)* - Build Studio Ops Evolution Roadmap slide (M1–M3 solo founder → M4–M6 VAs → M7+ operator at >₹14L MRR).
- [ ] **[B-08]** `[Strategy]` (Claude) *(RICE: 8×9×0.8÷3 = 19.2)* - Build De-Risked Multi-Platform Architecture diagram slide (shared backend + parallel characters + owned audience).
- [ ] **[B-09]** `[Strategy]` (Claude) *(RICE: 8×9×0.8÷3 = 19.2)* - Create 3-scenario CAC sensitivity table (Base / Conservative / Pessimistic) with actual Taboola CPL data.
- [ ] **[B-10]** `[Strategy]` (Claude) *(RICE: 7×8×0.8÷2 = 22.4)* - Update Use-of-Funds slide with portfolio milestones and tranches.
- [ ] **[B-11]** `[Strategy]` (Claude) *(RICE: 7×8×0.8÷2 = 22.4)* - Create IP Moat & Legal slide (trademarks, prompts, assets, automation workflows).
- [ ] **[B-12]** `[Strategy]` (Claude) *(RICE: 7×7×0.8÷2 = 19.6)* - Create Postiz self-hosted slide (unlimited portfolio scale, zero SaaS cost vs competitors).
- [ ] **[B-13]** `[Strategy]` (Claude) *(RICE: 8×9×0.9÷2 = 32.4)* - Prepare 1-page traction update document for 90-day outreach (hard M3 metrics only — no projections).
- [ ] **[B-14]** `[Strategy]` (Claude + CEO) *(RICE: 8×9×0.8÷3 = 19.2)* - Draft customised outreach emails + one-pager for target funds: Inner Circle, Night Ventures, Slow Ventures, Creator Ventures, a16z, Sequoia.
- [ ] **[B-15]** `[Exec Dept]` (CEO) *(RICE: 9×10×0.7÷4 = 15.75)* - Finalise raise amount, valuation cap, and SAFE terms. Current Grok recommendation: **$750k–$900k at $7–7.5M post-money SAFE**. CEO to confirm before outreach.
