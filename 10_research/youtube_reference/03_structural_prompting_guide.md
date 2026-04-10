# Structural Prompting Guide for AI Video

This document explicitly captures the "Cheat Sheet" prompting techniques used by Sirio Berati to control the Enhancor.ai / Seedance 2.0 UGC models, as opposed to generating static images.

## The Paradigm Shift
Image generation uses *Spatial Mapping* (describing what exists in an image).
Video generation requires *Temporal Mapping* (describing what happens over time). If you use a static image prompt for a video generator, it will cause chaos.

## Technique 1: Timeline-Based Prompting
The most professional way to lock in consistency over a 5 to 15-second clip is to bracket actions exactly by second markers. 

**Format:**
`[MM:SS - MM:SS] [Camera Angle] [Subject Action] [Lighting/Environment] [Camera Movement]`

**Example for Rhea Voss:**
```text
[00:00-00:03] Handheld iPhone selfie view. Rhea Voss looking directly into the lens, talking naturally. Subtle ambient breeze moving dark wavy hair. 
[00:03-00:07] Continued talking, soft eye blinks. Natural chest breathing. Slight camera shake mimicking a human holding the phone.
[00:07-00:10] Rhea smiles warmly, breaking deep eye contact. Natural finish. No morphing of facial geometry.
```
*Why this works:* It forces the model to treat the video as an unfolding timeline rather than trying to cram all instructions into every single frame, which causes morphing.

## Technique 2: The "Breakdown" Product Prompt
When generating product ads (e.g., Rhea holding a protein bar), professionals use a highly segmented JSON-like breakdown structure so the AI perfectly understands the hierarchy of objects.

**Format Pattern:**
```text
Subject: [Character lock details]
Wardrobe: [Specific outfit]
Product: [Specific brand/object in detail]
Action: [What the subject is doing with the product]
Camera: [Lens type, framing, movement]
Vibe: [Lighting, film grain, aesthetic]
```

**Example for Rhea Voss (Protein Bar Ad):**
```text
Subject: 26-year-old curvy East Asian woman, full round cheeks, precise Japanese irezumi arm tattoos.
Wardrobe: Black tight sports bra, high-waisted teal leggings.
Product: A metallic silver protein bar wrapper with bold blue text.
Action: Holding the protein bar near her chest, pointing to the label, talking directly to camera.
Camera: Vertical 9:16 iPhone back-camera, chest-up framing, subtle handheld shake.
Vibe: High contrast gym lighting, slight sweat on skin, unpolished UGC aesthetic.
```

## Technique 3: Freestyle Prompting (Fast Ideation)
For very quick B-roll (like Rhea walking on a beach), you drop the structure and focus heavily on *outcomes* rather than specific details.

**Format:**
`"Generate a [Format] video that feels like [Vibe], showing [Subject] doing [Action]."`

**Example:**
`"Generate an unpolished iPhone vertical video that feels like a raw Instagram story update, showing Rhea walking along a Goan beach at sunset while holding the camera out in front of her."`

## The Golden Rules for Video Prompts
1.  **Demand "Low-Fidelity":** Always include words like *iPhone footage, handheld, natural, slight grain, unpolished, user-generated*. Cinematic lighting flags the brain as "fake/AI".
2.  **Define the Morph Limits:** Hard-code warnings like *zero face morphing, retain exact original facial proportions* at the end of the prompt to act as negative constraints.
