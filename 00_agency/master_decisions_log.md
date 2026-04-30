# Master Decisions Log — Virtual Influencer Studio
> **Purpose:** Single source of truth for every key decision made across all research sessions.
> Any decision buried in archive docs is promoted here permanently.
> **Rule:** Before any investor pitch, strategy update, or major execution step — read this file first.
> Last updated: 2026-04-17

---

## 1. Platform Decisions

| Decision | Chosen | Rejected | Why |
|---|---|---|---|
| Primary monetization | Fanvue | OnlyFans | Fanvue: AI-friendly ecosystem, built-in AI creator discovery, AI messaging tools built-in, Indian audience already paying here |
| Secondary monetization | Passes.com | — | 90% creator keep rate. No-nudity policy = perfect fit for our content ceiling. Launch Day 1. |
| Multi-platform | MYM.fans | — | ~80% keep. AI allowed + #AI tag required. European traffic. India payout. Day 1. |
| Multi-platform | Alua | — | 80% keep. AI allowed (no terminations reported). Paid chat GFE revenue. India payout. Day 1. |
| Multi-platform | LoyalFans | — | 80% keep. AI allowed if labeled #AI. Niche traffic. India payout. Day 1. |
| Rejected — AI ban risk | ~~Fansly~~ | Fanvue/Alua/LoyalFans | Photorealistic AI creator bans at payout stage (2026 crackdown). Do not use. |
| Primary traffic (SFW) | Instagram | TikTok | TikTok permanently dropped 2026-04-11: algorithm deprioritizes AI content, ban risk high, no recovery path |
| Video hosting | YouTube Shorts | TikTok | Zero extra production — Metricool mirrors Reels automatically |
| Link-in-bio | Bouncy.cc | Linktree/Carrd | Bouncy opens native Safari/Chrome (logged-in users) → higher Fanvue signup conversion |
| DM automation | CupidBot | Manual | 300 free trial conversations, 10–12% conversion to paid subs, 24/7 automated |
| Scheduling | Metricool (free) | Later.com ($18/mo) | Zero cost, mirrors IG to all platforms |
| Payout | Skydo (virtual US bank) | PayPal | Bypasses PayPal FX margins entirely. B2B cross-border clearinghouse. |
| India payments | Cashfree | Razorpay | Cashfree geo-routed for Indian subscribers. WHOP for international. |
| Browser OPSEC | Dolphin{anty} | Regular Chrome | Separates all platform activity from personal identity |
| Phone verification | Calilio | Personal SIM | US local number + 100 SMS/month for platform verification. ₹1,303/month |

---

## 2. Character Spec — Locked (DO NOT OVERRIDE)

| Spec | Value | Why Locked |
|---|---|---|
| Cup size | **DDD (32DDD)** | G-cup causes BBW drift in Flux models. Lena Paul reference. |
| Body | 32DDD-23-36, 163cm, 52kg | Slim hourglass — slim everywhere except bust |
| Hair | Very long, dark blue-black, slight natural waves | Identity anchor |
| Skin | Fair, warm neutral-peachy, matte natural finish | No pink flush, no oily skin |
| Skin imperfections | Visible pores on cheeks/nose, 2–3 acne marks left cheek, slight under-eye shadow | Realism — prevents "plastic skin" AI look |
| Tattoos | **NONE** | Removed from spec. Earlier Rhea Voss drafts had tattoos — those are deprecated |
| Voice accent | Soft warm Indian/South Asian accent, gentle and intimate tone | Must be in every single video/voice prompt — never leave vague |
| Content ceiling | Lena Paul level — deep cleavage, micro bikini, sheer. No nudity. No topless. Ever. | CEO personal values |
| Age | 24 | Locked |
| Ethnicity | Indian/South Asian — Indian/South Asian blend | Locked |

---

## 3. Acquisition Strategy — Full Picture

### Channel 1: Instagram Reels Ads (Safe on Meta)
- SFW lifestyle/fitness content ONLY in ads
- Budget: ₹1,500–2,000/month starting Month 3
- CPM India: ₹60–120
- Cost per follower: ₹15–25 (fitness niche: ₹18–45)
- Goal: High-quality IG profile growth

### Channel 2: Adult Ad Networks (Taboola / ExoClick / TrafficJunky)
- **CRITICAL RULE: NEVER direct to IG profile. Always: Adult network → rheavoss.com mediator → Fanvue link**
- Budget: ₹1,500–3,000/month starting Month 3
- Cost per click: ₹1–6
- Daily volume: 500–1,000 profile/Fanvue visits at ₹3,000/month
- Goal: Direct Fanvue subscriber acquisition

### Channel 3: Organic (Zero Cost)
- Community page submissions (Desi Girls pages) → 2,000–8,000 profile visits per feature
- Reddit seeding (r/IndianBabes, r/desi) → 5,000–50,000 views per post
- Comment seeding on viral Indian posts → 50,000–500,000 views
- Facebook group seeding (Desi Girls groups, 50k–500k members)
- Telegram bridge channel → 5–10% Fanvue conversion
- See: `growth_hacks_playbook.md` for full execution

### Channel 4: Threads Method (Month 3+)
- Buy aged 2014+ IG accounts (~$2.50 each)
- Mobile proxy: ₹4,500–5,000/month for 4–6 accounts
- Post 3–5 times/day: 3 photos + 1 QR code (links to Telegram VIP)
- Case study result: 5,800 clicks → 300 subs → $4,500 revenue
- CupidBot handles Telegram → Fanvue conversion automatically

### Account Activation (Pre-condition for all above)
- Instagram suppresses Reels under 1,000 followers
- First: post 3 static images, boost at ₹20–30/day for 5–7 days
- Cost: ₹300–600 total one-time
- Only after ~1,000 followers: begin Reels

---

## 4. Video Production — Key Technical Decisions

| Decision | Chosen | Rejected | Why |
|---|---|---|---|
| Primary video engine | Wan AI ($5/mo) | HeyGen | HeyGen Digital Twin: $2–6/min = ₹18,000–55,000/month for same 40–60 Reels output. Wan: $5/month |
| Image generation | Flux.1 Dev + Sonia LoRA | MidJourney / Krea | Open weights = no censorship = Fanvue content viable |
| Static image workflow | Always generate image first → use as Start Frame | Text-to-video directly | 30–40% better consistency |
| Prompt format (Wan/Seedance) | Subject + Scene + Motion + Aesthetic + Stylization, 80–120 words natural language | Keyword stacking | Keyword stacking degrades video model output |
| Scene reference | Pinterest → Qwen 3VL caption → prompt | Manual prompt writing | Research-backed, ultra-detailed scene prompts |
| Quality control | Generate 2× with different prompts, cherry-pick best | Single generation | Ensures best quality before publishing |
| LoRA training | Vast.ai / RunPod ($1–2 one-time) | Civitai online | Cost control. One-time investment. |

---

## 5. Revenue Architecture

| Stream | Platform | Keep Rate | Notes |
|---|---|---|---|
| Subscriptions | Fanvue | 80% | Primary engine. $20/month sub price. |
| Subscriptions | Passes.com | 90% | Same content, highest margin. No-nudity policy fits our ceiling. Day 1. |
| Subscriptions | MYM.fans | ~80% | Multi-platform. AI allowed with #AI tag. European audience. Day 1. |
| Subscriptions | Alua | 80% | Paid chat GFE revenue stream. AI allowed. Day 1. |
| Subscriptions | LoyalFans | 80% | Niche traffic. AI labeled. Day 1. |
| PPV drops | Fanvue | 80% | Locked exclusive content drops |
| Voice note PPV | Fanvue | 80% | ~$7/note. 15 sales/month = $105 |
| DM chatting | Room 11 | 60% (CEO keeps) | 100% automated. Handles PPV, mass message blasts (10–15% conversion). 24/7. |
| Telegram VIP | Direct | ~95% | Starts Month 4 (needs 3 months audience warm-up) |
| IG Subscriptions | Instagram | ~80% | Requires 10,000 followers |
| Brand deals | Direct | 100% | Month 7+ once follower base proven |

**Payout flow:** Fanvue/Room11 USD → Skydo virtual US bank → India (via Skydo, not PayPal)

---

## 6. Content Rules (Non-Negotiable)

| Rule | Detail |
|---|---|
| Content ceiling | Lena Paul level. Deep cleavage, micro bikini, sheer. No nipple/areola. No nudity. No topless. Ever. |
| Instagram hard line | Female nipple/areola = instant ban. All IG content stays SFW. |
| OPSEC before every upload | ExifTool strip + film grain on every image/video before uploading to any platform |
| Voice prompt rule | Always include "soft warm Indian/South Asian accent, gentle and intimate tone" in every voice/video prompt |
| Ad traffic routing | Adult networks → mediator ONLY. Never direct to IG profile. |
| No personal accounts | All platforms use Calilio US number. Never personal Indian SIM. |

---

## 7. Deprecated / Rejected Methods

| Method | Why Rejected | Date |
|---|---|---|
| TikTok | 2026 algorithm deprioritizes AI content. Ban risk high, no recovery path | 2026-04-11 |
| Fansly | Photorealistic AI creator bans at payout stage (2026 crackdown). Account + earnings at risk. | 2026-04-24 |
| Mother-daughter IG link accounts | Instagram 2026 detects coordinated inauthentic behaviour → chain bans entire network | 2026-04-11 |
| Linktree/Carrd as link-in-bio | In-app browser = logged-out users = low Fanvue signup conversion | Permanent |
| Direct adult traffic → IG profile | Instant shadowban/ban | Permanent |
| Google Veo 3 (primary pipeline) | Evaluated but requires Google approval. Using Wan AI + Higgsfield instead | 2026-04-13 |
| HeyGen Digital Twin | $2–6/min makes it 360× more expensive than Wan AI for same output | 2026-04-13 |
| G-cup body spec | Causes BBW drift in Flux models. Locked at DDD (32DDD). | 2026-04-11 |
| Heavy tattoo spec (Rhea Voss) | Removed from Sonia's character spec. Earlier Rhea drafts — deprecated. | 2026-04-13 |

---

## 9. Revenue Targets & Survival Math (Locked 2026-04-24)

| Target | INR/month | Fanvue Subs | IG Followers | Timeline | Status |
|---|---|---|---|---|---|
| **Survival (primary)** | **₹1L** | **127 subs** | **~8,500** | **M2** | **Active goal** |
| Scale | ₹3L | 380 subs | ~25,000 | M4 | Next milestone |
| Growth | ₹20L | ~2,500 subs | ~170,000 | M12 | Long-term |

**Net per sub:** $9.99 × 85% Fanvue keep × ₹93.08 = ₹789/sub/month  
**Fixed burn:** ₹10,973/month (10 tools — see `plan_3L_retrograde.html`)  
**Rule:** Survival first. Scale second. Never reverse order.  
**Moat:** Real moat = distribution engine + conversion funnels + chat/upsell system. NOT visuals, AI tools, or content quality — those are table stakes.

---

## 8. Open Questions (CEO Decision Needed)

| Question | Context | Priority |
|---|---|---|
| PPV pricing tiers | Archive references $7 voice note PPV and $20 sub, but no locked price list for video PPV drops | HIGH |
| Hindi content strategy | Task P1-38/39/40 researching Hindi GFE market. Separate IG account or mixed? Separate Telegram? | MEDIUM |
| Character #2 identity | B-02 in task table. What archetype, when to launch? | LOW |
