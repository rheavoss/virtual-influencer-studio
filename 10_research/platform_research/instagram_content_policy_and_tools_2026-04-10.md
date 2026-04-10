# Instagram Content Policy & Tool Capability Reference
**Prepared:** 2026-04-10  
**Based on:** Live content analysis — Lena Paul Instagram reference set (ESUIT folder, 23 images)  
**Purpose:** Define the content boundary for Jasmine's Instagram account + map which tools generate each content tier

---

## Q1 — Where Does Instagram Draw the Line?

**The single rule: the female nipple.**

Everything else — deep cleavage, thong from behind, lingerie, sheer fabric — is technically within Instagram's guidelines as long as the nipple/areola is not visibly exposed.

| Content Type | Instagram Status | Why |
|---|---|---|
| Bikini, any style — thong, triangle | ✅ Allowed | Swimwear is a legitimate category |
| Deep cleavage, leaning forward | ✅ Allowed | Nipple covered = fine |
| Thong from behind, full butt visible | ✅ Allowed | Instagram walked back the "no butt" policy |
| Lingerie sets (opaque) — garter, bra+thong | ✅ Allowed | Fashion/model framing |
| Sheer fabric — nipple area NOT visible through it | ✅ Allowed | Sheer ≠ violation; visible nipple through sheer = violation |
| Sheer fabric — nipple/areola visible through it | ❌ Removed | The line is visibility, not the fabric type |
| Sexual acts or simulated sex | ❌ Removed | Hard ban |
| Male/female genitalia | ❌ Removed | Hard ban |

### The Red Lace Teddy Exception
The sheer red lace bodysuit in the ESUIT reference set — where the fabric appears to show the areola through it — sits at or past the line. Instagram's automated detection would likely flag it. That specific image type needs a thicker/less sheer center panel to be safe for Instagram posting.

### Why Lena Paul's Account Survives
The platform's classifier looks at context signals — account type, captions, hashtags, reported flags. An account framed as a swimwear/fashion model gets treated differently than one that appears to be targeting adult content, even with identical images. Framing the account as influencer/model content (not adult content) is a direct factor in what survives moderation.

### Practical Rule for Jasmine's Instagram
**Nipple always covered → you can go as far as the full Lena Paul reference set (minus the sheer-visible images).**

Deep cleavage bikini, thong from behind, opaque lingerie sets, sheer fabric with covered center — all within bounds.

---

## Q2 — Which Tools Can Generate This Content Level?

### Capability Matrix

| Tool | Bikini / Deep Cleavage | Sheer Lingerie | Explicit (Fanvue) | Cost |
|---|---|---|---|---|
| **Civitai + NSFW Flux LoRA** | ✅ Full capability | ✅ With uncensored model | ✅ With NSFW model | Crypto credits (age-verified) |
| **Local ComfyUI (RunPod)** | ✅ Full capability | ✅ Unrestricted | ✅ Fully unrestricted | ~₹85–170/session |
| **Higgsfield (Wan 2.6 / Seedream 4.0)** | ✅ Confirmed near-uncensored | ✅ Likely | ❌ Hard explicit blocked | $9/mo |
| **Mage.space** | ✅ With NSFW toggle | ✅ With NSFW toggle | ⚠️ Partial | ~$8/mo |
| **Grok / Meta AI** | ⚠️ Bikini yes, deep cleavage iffy | ❌ Blocked | ❌ Hard blocked | Free |

### Right Tool Per Use Case

**Instagram content tier** (bikini, deep cleavage, lingerie, thong from behind):  
→ **Civitai + Jasmine LoRA** or **Higgsfield Seedream 4.0**  
Both handle this range reliably once the LoRA is trained.

**Fanvue content tier** (sheer-through, explicit):  
→ **Local ComfyUI on RunPod only**  
The only fully unrestricted option in the verified stack. No filters, no content policies, runs on a GPU session at ~₹85–170/hr.

**LoRA training dataset generation** (40–50 Jasmine reference images):  
→ **Civitai** for speed and convenience  
→ **Local ComfyUI** if explicit body references are needed for training diversity

### Content Tier Summary

| Tier | Examples | Tool |
|---|---|---|
| **Instagram Safe** | Bikini, deep cleavage, thong from behind, opaque lingerie | Civitai, Higgsfield, Mage.space |
| **Instagram Edge** | Sheer fabric (nipple covered), seductive poses | Civitai, Higgsfield |
| **Fanvue / Off-Platform** | Sheer visible, explicit | Local ComfyUI (RunPod) only |

---

## Key Takeaway

The Lena Paul reference content level — blue bikini at waterfall, pink lingerie sets, red sheer teddy (minus visible-nipple version) — is **fully achievable with Civitai + Jasmine LoRA** once training is complete.

The explicit Fanvue tier requires local ComfyUI. That is the hard split in the stack.

**The immediate blocker for all of this:** the 40–50 Jasmine LoRA training images do not yet exist. Until the LoRA is trained, no tool can reliably lock Jasmine's face and body across content types.
