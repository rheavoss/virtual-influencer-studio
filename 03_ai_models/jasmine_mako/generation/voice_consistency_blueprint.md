# Jasmine Mako — Voice Consistency Design System

Generating talking AI videos often results in the AI "inventing" a slightly different voice per generation. To fix this, you must lock the voice parameters BEFORE sending prompts to video generators like Wan AI 2.2 or Higgsfield Seedance 2.0.

> **Voice consistency rule (non-negotiable):** Always include "soft warm East Asian accent, gentle and intimate tone" in EVERY video/voice prompt. See `jasmine_character_bible.json` → `voice_and_audio.consistency_rule`.

## The Claude Initialization Method

Before generating your first talking video, run this system exactly once. 
You will use Claude as a "voice designer."

**Step 1:** Select the definitive reference image of Jasmine Mako.
**Step 2:** Open an Anthropic Claude chat. Upload the image.
**Step 3:** Paste the following prompt into Claude:

> "I am building an AI influencer. Analyze this character's appearance, aesthetic, and age (24). Create a detailed, reusable voice description prompt. 
> 
> She is 24, East Asian (Japanese-Korean blend), extremely curvy but with a sweet, innocent, 'Girl Next Door' face. Her target audience is 30-50 year old financially stable males. Her tone should be warm, slightly husky/seductive but approachable, never aggressive.
> 
> Please generate a highly specific paragraph defining her:
> - Accent (e.g. gentle soothing general American with slight vocal fry, or whatever fits best)
> - Tone and Pitch
> - Pacing and Emotional Delivery
> - Vocal texture (breathy, husky, soft, etc.)
> 
> Output it as ONE cohesive paragraph I can copy and paste directly into video generation models."

## The Master Video Template Prompt

Once Claude gives you the Voice Anchor paragraph, you will use this exact prompt structure in Higgsfield / Dzine for EVERY dialogue video. 

**Part 1: The Voice Anchor (Never changes)**
`[PASTE CLAUDE VOICE ANCHOR PARAGRAPH HERE]`

**Part 2: The Scene Description (Changes per video)**
`[DESCRIBE SCENE: Lighting, physical movement, camera angle, pacing]`

**Part 3: The Dialogue (Changes per video)**
`Jasmine says: "[EXACT DIALOGUE HERE]"`

---

**Why this works:** The AI generation models (Kling/Veo) treat the prompt as predictive input. Giving it structural guardrails forces the model to adhere to the voice anchor instead of randomizing across seed noise. 
