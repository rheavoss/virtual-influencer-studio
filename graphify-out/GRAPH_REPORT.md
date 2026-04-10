# Graph Report - /Users/user/Desktop/Instagram  (2026-04-10)

## Corpus Check
- Large corpus: 465 files · ~3,782,566 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 342 nodes · 333 edges · 82 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `AIFM 2026 Full Course — $60K/mo Operator Blueprint (Transcript 7)` - 14 edges
2. `Fanvue Platform` - 13 edges
3. `Content Production Matrix — 8 Content Types` - 11 edges
4. `Jasmine (AI Influencer Character)` - 9 edges
5. `Counter-Analysis: Antigravity Tech Stack Proposal` - 9 edges
6. `Competitor Intelligence: @purplehalcyon & @sofia9__official` - 9 edges
7. `AIFM 2026 Full Course Part 1 — Model Generation & Fanvue Setup (Transcript 5)` - 8 edges
8. `AIFM 2026 Full Course Part 2 — Marketing, Landing Pages & Daily Ops (Transcript 6)` - 8 edges
9. `Jasmine Project — Claude Code Briefing` - 7 edges
10. `Jasmine Mako Master Research Summary` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Platform Ecosystem Funnel Model (TikTok/Threads→IG→Fanvue)` --conceptually_related_to--> `Fanvue Platform`  [INFERRED]
  10_research/platform_research/transcript_6_aifm_part2_analysis.md → CLAUDE.md
- `Offer Ladder Framework ($10→$25→$50→$100+ PPV)` --conceptually_related_to--> `Fanvue Platform`  [INFERRED]
  10_research/platform_research/transcript_7_60k_blueprint_analysis.md → CLAUDE.md
- `PPV as Primary Revenue Engine (50-60% of Revenue)` --conceptually_related_to--> `Fanvue Platform`  [INFERRED]
  10_research/platform_research/transcript_6_aifm_part2_analysis.md → CLAUDE.md
- `DDD Cup Spec Lock (Not G-Cup)` --rationale_for--> `Content Ceiling Option A (No Nudity)`  [INFERRED]
  00_agency/final_strategy_planning.md → CLAUDE.md
- `Wan 2.7 I2V (Image-to-Video) for Character Motion` --semantically_similar_to--> `Wan AI Pro — Video Generation Tool ($5/mo)`  [INFERRED] [semantically similar]
  10_research/platform_research/antigravity_proposal_counter_2026-04-10.md → 13_finance/tool_costs.md

## Hyperedges (group relationships)
- **Jasmine Character Generation System** — entity_jasmine, jasmine_gen_prompt_master, seedance_param_framework, final_strategy_permanent_core, final_strategy_standard_negative, content_lora_jasmine_zimage, content_lora_jasmine_wan [INFERRED 0.88]
- **Content Production Pipeline** — content_type1_viral_clone, content_type2_face_swap, content_type3_talking_head, content_type4_grwm, content_type5_lifestyle, content_type6_trend_reaction, content_type7_product_review, content_type8_carousel, entity_wan_ai, entity_elevenlabs, entity_flux_kontext, entity_capcut, concept_opsec [EXTRACTED 1.00]
- **Monetization Funnel (Instagram to Fanvue)** — entity_instagram, entity_fanvue, entity_passes, omnichannel_matrix, fanvue_monetization_tiers, concept_gfe, concept_ppv, master_research_revenue_chat_ladder [EXTRACTED 1.00]
- **LoRA Training Dataset Creation** — curation_log_sofia, entity_sofia_ansari, final_strategy_lora_prompts_json, final_strategy_antigravity_move1, concept_lora_training, entity_runpod [INFERRED 0.85]
- **AI Advisor Team (Claude Code + Antigravity + CEO)** — entity_claude_code, entity_antigravity, entity_ceo, final_strategy_planning, operational_guidelines [EXTRACTED 1.00]
- **Vercel P&L Dashboard Tech Stack** — deploy_md_nextjs, deploy_md_supabase, deploy_md_vercel, deploy_md_fallback, claude_md_vercel_dashboard [EXTRACTED 1.00]
- **Voice Consistency System** — voice_blueprint_jasmine_mako, voice_blueprint_claude_init, concept_voice_anchor, entity_elevenlabs, entity_higgsfield [EXTRACTED 1.00]
- **Day 1 Multi-Platform Launch** — entity_instagram, entity_fanvue, entity_passes, growth_platform_launch, omnichannel_video_9x16, omnichannel_image_4x5 [EXTRACTED 1.00]
- **Wan AI Video Production Pipeline** — doc8_wan_ai, doc9_wan_ai_production, doc9_vace_chaining, doc9_s2v_mode, doc9_wan_prompt_recipe_official, doc5_start_frame_technique [EXTRACTED 1.00]
- **Character Lock and Consistency System** — doc4p2_face_lock_system, doc4p2_jewellery_makeup_rule, doc4p1_character_bible_v1, doc4p3_character_bible_v2, doc11_character_bible_json, doc4timeline_skin_realism_principle [EXTRACTED 1.00]
- **Sofia Ansari Dataset to LoRA Training Pipeline** — doc14_gallery_dl, doc14_curate_py, doc14_sofia_dataset, doc14_replicate_training, doc12_lora_method_new, doc13_flux_lora [EXTRACTED 1.00]
- **Platform Monetization Stack Decision** — doc11_fanvue_primary, doc4p1_fanvue_locked, doc4timeline_x_twitter_rejected, oscar_fanvue_vs_onlyfans, session02_ai_creator_marketplace_rejected [EXTRACTED 1.00]
- **Instagram Account Growth Protocol** — doc10_account_activation, doc11_renato_50k_case, oscar_account_warmup, oscar_bio_link_timing, oscar_story_highlights, oscar_phase0_setup_sequence [EXTRACTED 1.00]
- **Core Fanvue Monetization Framework** — concept_offer_ladder, concept_ppv_mass_messages, concept_ppv_revenue_model, concept_free_trial_strategy, concept_fan_notes_system, entity_fanvue [INFERRED 0.85]
- **Instagram Growth & OPSEC Framework** — concept_cloaking_ban, concept_zero_appeal_delete, concept_device_opsec, concept_us_proxy_requirement, concept_exif_stripping, concept_no_ai_hashtags, concept_mother_daughter_link, opsec_gate [INFERRED 0.85]
- **Jasmine Content Production Pipeline** — concept_higgsfield_character_swap, concept_wan_i2v, concept_civitai_image_gen, concept_comfyui_runpod, concept_dual_pipeline, concept_musetalk_replacement, concept_elevenlabs_voice, concept_content_tier_split [INFERRED 0.82]
- **Instagram Account Activation Sequence** — concept_account_activation_threshold, concept_boosting_method, concept_trial_reels, concept_3pillar_content_strategy, concept_hook_retention_reward, concept_later_scheduling [INFERRED 0.83]
- **Competitor Benchmark Analysis Set** — entity_purplehalcyon, entity_sofia_ansari, entity_muskan_kariya, concept_gfe_vs_mainstream, competitor_purplehalcyon, muskan_kariya_case_study [EXTRACTED 0.90]
- **Cross-Transcript Locked Decisions (7 Transcripts)** — transcript4_masterclass, transcript5_aifm_part1, transcript6_aifm_part2, transcript7_60k_blueprint, renato_transcript1, renato_transcript2, concept_free_trial_strategy, concept_ppv_revenue_model, concept_3pillar_content_strategy, concept_mother_daughter_link [EXTRACTED 0.90]
- **Multi-Platform Traffic Funnel Architecture** — concept_platform_ecosystem_model, concept_x_direct_conversion, concept_threads_comment_bait, concept_telegram_nurture, concept_purplehalcyon_funnel, entity_fanvue [INFERRED 0.82]
- **Active Tool Stack (~₹865/mo)** — tool_wan_ai_pro, tool_elevenlabs_starter, tool_flux_kontext, tool_google_one_veo3, tool_capcut, tool_metricool, tool_costs [EXTRACTED 1.00]

## Communities

### Community 0 - "Fanvue Monetization Ops"
Cohesion: 0.07
Nodes (33): Three-Pillar Reel Content Strategy, Chatter Hire Threshold ($500/mo Revenue Trigger), Local ComfyUI on RunPod for Unrestricted NSFW Generation, Dual Image Generation Pipeline (Cloud SFW + Local ComfyUI NSFW), Fan Notes System for Chatter Continuity, Fanvue Free Trial Launch Strategy (7-Day, 500-Spot Cap), Funnel Drop-Off Audit Framework, Hook / Retention / Reward QC Framework for Reels (+25 more)

### Community 1 - "Tool Stack & Character Voice"
Cohesion: 0.1
Nodes (26): Tool Stack — Confirmed Costs, Face and Body Drift Problem, Savior Alibi (Character Backstory Strategy), 360-Angle Reference Pack Method, Document 7 Analysis: 360 Pack & Start Frame Architecture, End-Frame to Start-Frame Audio Stitching, Image-First Zero-Hallucination Workflow, Motion Control Cloning Technique (+18 more)

### Community 2 - "Business Strategy & Competitors"
Cohesion: 0.1
Nodes (26): Competitor Analysis Tools (Metricool, Keyhole, etc.), Execution Plan to $2000 MRR, Accelerated $2000 MRR Business Strategy, Phase 0 — Foundation Tasks, LoRA Training Process (Flux.1 / Wan 2.2), OPSEC Pipeline (EXIF Strip + Film Grain), Jasmine Wan 2.2 LoRA, Jasmine Z-Image LoRA (+18 more)

### Community 3 - "Revenue Funnel & GFE"
Cohesion: 0.12
Nodes (21): Monetization Funnel (Instagram → Fanvue Pareto), Revenue Model — Platform Keep Rates, Girlfriend Experience (GFE) Content Strategy, Pay-Per-View (PPV) Monetization, Fanvue Platform, Instagram Platform, Passes.com Platform, Financial Math to $2000 MRR (+13 more)

### Community 4 - "Project Briefing & Dashboard"
Cohesion: 0.12
Nodes (19): Jasmine Project — Claude Code Briefing, Vercel P&L Dashboard Build, DDD Cup Spec Lock (Not G-Cup), Deploy Guide — Jasmine P&L Dashboard, Fallback Data (lib/fallback-data.js), Next.js 14 App Router Stack, Supabase PostgreSQL Database, Vercel Auto-Deploy Hosting (+11 more)

### Community 5 - "Content Policy & LoRA Blocker"
Cohesion: 0.12
Nodes (18): Content Tier Split — Instagram Safe vs Fanvue (ComfyUI Only), Instagram Content Hard Line — Female Nipple Visibility, LoRA Training Images as Current Blocker for All Content Generation, Muskan Kariya Failure Modes (Content Saturation, No Attachment), Telegram VIP Channel at ₹399/month (Muskan Kariya Displaced Audience), Jasmine (AI Influencer Character), Muskan Kariya — Instagram Native Sub Creator (₹34L Peak, Now Declined), Instagram Content Policy & Tool Capability Reference (+10 more)

### Community 6 - "Corrected Tech Stack"
Cohesion: 0.15
Nodes (17): Counter-Analysis: Antigravity Tech Stack Proposal, Civitai + Jasmine LoRA for Instagram-Tier Image Generation, ElevenLabs Voice Cloning for GFE Audio Notes, Higgsfield Character Swap for Video Motion Transfer, LoRA Training Dataset = 40-50 Images (Not 317), MuseTalk 1.5 Replaces SyncLabs for Lip Sync (Free, No NSFW Restriction), Tensor.art Fully SFW Since 2025 (Drop from Stack), Google Veo 3 Limited to Fully SFW Non-Character-Swap Content (+9 more)

### Community 7 - "Next.js Dashboard Code"
Cohesion: 0.21
Nodes (5): getData(), Page(), fi(), fL(), PLTable()

### Community 8 - "Character Spec & Boundaries"
Cohesion: 0.2
Nodes (12): Jasmine Character Specification, Locked Project Decisions, Content Ceiling Option A (No Nudity), 15-Category Production Blueprint (Boundaries Doc), Content Boundaries and Blueprint Matrix, Instagram TOS Policy Rules for Jasmine, Lena Paul (Content Ceiling Reference), Generation Key Rules (No Flush, Film Grain, etc.) (+4 more)

### Community 9 - "Competitor Intelligence"
Cohesion: 0.2
Nodes (12): Competitor Intelligence: @purplehalcyon & @sofia9__official, Competitor Tracker, Facebook Mandatory AI Labeling Rule for Monetization, Facebook Fan Subscriptions Eligibility & Revenue Share, GFE vs Mainstream Model Conversion Rate Gap (185x Difference), @purplehalcyon Three-Platform Traffic Funnel (YouTube→Facebook→Instagram), Sofia Ansari (@sofia9__official) as Pose/Motion Reference Dataset, Sofia Ansari Training Data Curation Log (+4 more)

### Community 10 - "OPSEC & Account Safety"
Cohesion: 0.27
Nodes (10): Link Cloaking = Instagram Ban Risk, Device OPSEC — Isolated US Geo-Signal Device, EXIF Metadata Stripping + Film Grain Injection OPSEC, Zero AI Hashtags Rule (Plausible Deniability), US Residential Proxy/SIM Requirement for India-Based Operators, Zero-Appeal Delete Protocol for Instagram Flags, Pre-Flight OPSEC Gate Workflow, Rationale: No Link Cloaking to Avoid Instagram Ban (5+ Redirects = Ban) (+2 more)

### Community 11 - "Batch Generation Scripts"
Cohesion: 0.36
Nodes (7): generate_single(), load_prompts(), main(), Install dependencies and configure API., Load JSON and filter to the target batch only., Call Imagen 3 API and save the best image., setup()

### Community 12 - "LoRA Training Pipeline"
Cohesion: 0.25
Nodes (8): LoRA Method (New - Flux.1 via Replicate), Rationale: LoRA over Rhea Method, Replicate Flux.1 LoRA Training, Rationale: Flux LoRA over Nano Banana for Body Geometry, curate.py Image Curation Script, gallery-dl Scraping Tool, Replicate Flux.1 LoRA Training Job, Sofia Ansari Training Dataset

### Community 13 - "Prompting & Free Tools"
Cohesion: 0.29
Nodes (8): Breakdown Product Prompt Format (Subject/Wardrobe/Product/Action/Camera/Vibe), Free/Zero-Cost Tool Stack Alternatives (Flux, ComfyUI, MuseTalk, CapCut), Kora Reality 7-Step Enterprise AI Influencer Pipeline, Low-Fidelity iPhone Aesthetic as AI Detection Bypass, Temporal Mapping / Timeline-Based Prompting for AI Video, Free Zero-Cost Alternatives to Enterprise AI Pipelines, Core Workflow: Kora Reality to Enhancor Video Pipeline, Structural Prompting Guide for AI Video

### Community 14 - "Wan AI Video System"
Cohesion: 0.29
Nodes (7): 7 Reel Types Framework, Rhea Voss LoRA, Wan AI Motion Engine, Wan AI Prompt Recipe, Wan Speech-to-Video Mode, VACE Video Chaining Tool, Wan AI Production Playbook

### Community 15 - "Community 15"
Cohesion: 0.6
Nodes (5): human_jitter(), init_instaloader(), load_credentials(), main(), scrape_target()

### Community 16 - "Community 16"
Cohesion: 0.4
Nodes (6): Instagram Account Activation Threshold (1-2K Followers), Image Boosting Method (Not Reels) for US Audience Activation, Weekly Story Archive Audit for Hidden Flags, Trial Reels — Instagram Native Non-Follower Reach Feature, Rationale: Boost Images (Not Reels) Because Images Are Cheaper Per Reach, Renato Full Instagram Growth Guide 2026 (Transcript 2)

### Community 17 - "Community 17"
Cohesion: 0.4
Nodes (5): Non-Negotiable Operational Guidelines, Rule 1: Risk Disclosure Before Command Execution, Rule 2: No Personal Account Bulk Scraping, Rule 3: No Auto-Run Without Safety Verification, Rule 4: State Open Questions Before Execution

### Community 18 - "Community 18"
Cohesion: 0.5
Nodes (4): Fanvue Primary Monetization Platform, purplehalcyon Case Study, Fanvue Platform Decision, Fanvue vs OnlyFans Decision

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (2): Convert to greyscale, run FIND_EDGES filter, return mean pixel intensity.     Hi, sharpness_score()

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (3): Voice Anchor (Locked Voice Prompt), Master Video Template Prompt Structure, Rationale: Voice Anchor Forces Model Adherence

### Community 22 - "Community 22"
Cohesion: 0.67
Nodes (3): Google AI Studio Inference Platform, Google Veo 3 Video Engine, Google Vids Workspace Engine

### Community 23 - "Community 23"
Cohesion: 0.67
Nodes (3): character_bible.json Final Version, rhea_voss_agent.py Python Agent, Face Lock System

### Community 24 - "Community 24"
Cohesion: 0.67
Nodes (3): Apify Web Scraping API, Competitor Reel Scraping Pipeline, Gemini API Video Analysis

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (3): Jasmine 6-Step Chatting Matrix, Mass Message PPV Blast Templates, Savior Alibi Conversion Tactic

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (2): Skin Realism Prompt V1, Skin Realism Design Principle

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (2): character_bible.json V2, rhea_voss_agent.py Source Code

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (2): Jasmine Character, 40 Flux.1 LoRA Training Prompts

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (2): Account Warmup Protocol (72 Hours), Phase 0 Setup Sequence

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (2): Agent: Display Task Table, Agent: Research Gate (Mandatory Algorithm)

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (2): Seedance 2.0 UGC Product Mode with Multi-Input Mood Board, Seedance 2.0 (Cedence) — UGC Product Integration

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (1): Nano Banana Google Image Model

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (1): HeyGen API (Rejected)

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): Zero-Cost Production Stack

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): Instagram Account Activation Protocol

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): Telegram + CupidBot Conversion Funnel

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): Bouncy Link Bio Tool

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): Civitai IceKiub ComfyUI Workflows

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): Content Cloning Strategy

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): LoRA Training for Character Lock

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (1): Sofia Ansari Strategic Pivot

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): Rhea Method (Old)

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): Seedance Parameter Schema

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): @fit_aitana AI Influencer Benchmark

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (1): Rhea Voss Character Origin

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (1): Seedance 2.0 UGC Pipeline

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (1): Video Type Taxonomy (11 Types)

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (1): Renato 50K-in-7-Days Case Study

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (1): Threads Method Free Traffic Engine

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (1): Adult Network Traffic via Mediator

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (1): Non-Nude Content Viability

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (1): Image-First Start Frame Technique

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (1): Z-Image Turbo Image Model

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (1): HeyGen Disqualified (Cost)

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (1): Official Wan Prompt Recipe

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (1): Rhea Voss Name Selection and Lock

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (1): Jewellery Makeup Rule

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (1): Doc4 Strategic Shifts Analysis

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (1): X Twitter Monetization Rejected

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (1): Free Stack Pivot

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): Free Alternatives to Paid UGC Pipeline

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): character_bible.json V1

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Follower Acquisition Cost Math

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): Vercel P&L Dashboard Build

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (1): CLAUDE.md Auto-Load Context File

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (1): Context7 MCP Tool

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (1): Firecrawl MCP Tool

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (1): AI Creator Marketplace Hard Pass

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (1): Instagram Content Policy Analysis

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (1): Antigravity AI Advisor

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (1): Final Strategy Planning Document

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (1): Jasmine Mako Character

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (1): Realism as #1 AIFM Success Variable

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (1): Bio and Link Timing Strategy

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Story Highlights as Conversion Hooks

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Buying Aged Accounts Risk (Rejected)

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): Celebrity Farming Strategy (Rejected)

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): Ask Me a Question Story Tactic

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (1): X Twitter Monetization Gate Analysis

## Knowledge Gaps
- **165 isolated node(s):** `Install dependencies and configure API.`, `Load JSON and filter to the target batch only.`, `Call Imagen 3 API and save the best image.`, `Convert to greyscale, run FIND_EDGES filter, return mean pixel intensity.     Hi`, `Vercel P&L Dashboard Build` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 26`** (2 nodes): `layout.js`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `Skin Realism Prompt V1`, `Skin Realism Design Principle`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `character_bible.json V2`, `rhea_voss_agent.py Source Code`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `Jasmine Character`, `40 Flux.1 LoRA Training Prompts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `Account Warmup Protocol (72 Hours)`, `Phase 0 Setup Sequence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `Agent: Display Task Table`, `Agent: Research Gate (Mandatory Algorithm)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (2 nodes): `Seedance 2.0 UGC Product Mode with Multi-Input Mood Board`, `Seedance 2.0 (Cedence) — UGC Product Integration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `Nano Banana Google Image Model`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `HeyGen API (Rejected)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Zero-Cost Production Stack`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `Instagram Account Activation Protocol`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `Telegram + CupidBot Conversion Funnel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Bouncy Link Bio Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `Civitai IceKiub ComfyUI Workflows`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Content Cloning Strategy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `LoRA Training for Character Lock`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `Sofia Ansari Strategic Pivot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `Rhea Method (Old)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `Seedance Parameter Schema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `@fit_aitana AI Influencer Benchmark`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `Rhea Voss Character Origin`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `Seedance 2.0 UGC Pipeline`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `Video Type Taxonomy (11 Types)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `Renato 50K-in-7-Days Case Study`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `Threads Method Free Traffic Engine`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `Adult Network Traffic via Mediator`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `Non-Nude Content Viability`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `Image-First Start Frame Technique`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `Z-Image Turbo Image Model`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `HeyGen Disqualified (Cost)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `Official Wan Prompt Recipe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `Rhea Voss Name Selection and Lock`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `Jewellery Makeup Rule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `Doc4 Strategic Shifts Analysis`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `X Twitter Monetization Rejected`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `Free Stack Pivot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `Free Alternatives to Paid UGC Pipeline`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `character_bible.json V1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Follower Acquisition Cost Math`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `Vercel P&L Dashboard Build`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `CLAUDE.md Auto-Load Context File`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `Context7 MCP Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `Firecrawl MCP Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `AI Creator Marketplace Hard Pass`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `Instagram Content Policy Analysis`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `Antigravity AI Advisor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `Final Strategy Planning Document`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `Jasmine Mako Character`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `Realism as #1 AIFM Success Variable`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `Bio and Link Timing Strategy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Story Highlights as Conversion Hooks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Buying Aged Accounts Risk (Rejected)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Celebrity Farming Strategy (Rejected)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `Ask Me a Question Story Tactic`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `X Twitter Monetization Gate Analysis`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Fanvue Platform` connect `Revenue Funnel & GFE` to `Fanvue Monetization Ops`, `Tool Stack & Character Voice`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `Jasmine (AI Influencer Character)` connect `Content Policy & LoRA Blocker` to `Character Spec & Boundaries`, `Competitor Intelligence`, `Project Briefing & Dashboard`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `Jasmine Project — Claude Code Briefing` connect `Project Briefing & Dashboard` to `Revenue Funnel & GFE`, `Content Policy & LoRA Blocker`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Fanvue Platform` (e.g. with `Platform Ecosystem Funnel Model (TikTok/Threads→IG→Fanvue)` and `Offer Ladder Framework ($10→$25→$50→$100+ PPV)`) actually correct?**
  _`Fanvue Platform` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Jasmine (AI Influencer Character)` (e.g. with `Muskan Kariya Failure Modes (Content Saturation, No Attachment)` and `GFE vs Mainstream Model Conversion Rate Gap (185x Difference)`) actually correct?**
  _`Jasmine (AI Influencer Character)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Install dependencies and configure API.`, `Load JSON and filter to the target batch only.`, `Call Imagen 3 API and save the best image.` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Fanvue Monetization Ops` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._