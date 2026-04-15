# Higgsfield Cinema Studio 2.5 — Cinematic Commercial Pipeline
*Extracted from community video tutorial (Adil)*

This workflow outlines how to create high-budget, cinematic AI commercials using Higgsfield's Cinema Studio 2.5. It focuses on using built-in archetype and location tools alongside multi-shot video generation to produce agency-quality output.

### Tool Stack
- **Higgsfield Cinema Studio 2.5** (Characters, Locations, Scenes, Video Modules)
- **Claude** (Prompt Engineering)
- **Post-Production/Editing** (e.g., DaVinci Resolve for grain/scan lines)

---

### The 5-Step Cinematic Workflow

#### Step 1: Character Generation (The Character Sheet)
Instead of relying solely on text prompts, use the Cinema Studio engine to build native character profiles.
*   **Module:** `Cinema Studio -> Characters`
*   **Settings:**
    *   **Genre:** Action / Thriller / Romance
    *   **Budget:** Select high budget (e.g., $100M) for a more cinematic, polished look.
    *   **Archetype:** Use native archetypes (e.g., Lover, Hero).
    *   **Customization:** Input specific physical traits (Latino, 30s, tall, wavy hair) and outfit requirements (Black Tuxedo).
*   **Output:** The system generates a **Full Character Sheet**, which is a game-changer for maintaining facial and structural consistency across later animations.

#### Step 2: Location Generation (Setting the Scene)
*   **Module:** `Cinema Studio -> Locations`
*   **Prompt Structure:** 
    1.  **Architecture:** "Gatsby style mansion lobby, grand twin staircases"
    2.  **Lighting:** "Warm golden lights"
    3.  **Feeling/Atmosphere:** "Elegant yet slightly ominous atmosphere of a secret late night rendezvous"
*   **Rule:** For luxury brands, you don't just prompt the room; you prompt the *feeling* of desirability.

#### Step 3: Keyframing (Combining Elements)
Before animating, you must lock the initial frame.
*   **Module:** `Cinema Studio -> Scenes`
*   **Action:** Select the Character (from Step 1) and the Location (from Step 2).
*   **Prompting Tool:** Do not write prompts blindly. Tell Claude: `"Give me a detailed prompt to generate a keyframe. I want [simple description]."`. Feed Claude's detailed output into Higgsfield.
*   This generates the perfectly composed start frame.

#### Step 4: Video Generation & Continuity
*   **Module:** `Cinema Studio -> Video`
*   **Core Action:** Use the composed Scene from Step 3 as your Start Frame.
*   **Multi-Shot Auto Mode:** Use this mode to generate multiple dynamic camera movements and angles automatically. You can choose the best output (e.g., figure-8 camera movement).
*   **The Scene Continuation Trick:** When continuing a conversation or action in the exact same location, **do not generate a new start frame from scratch**. Take a screenshot/frame-grab from the end of your last generated video and use *that* as the start frame for the next generation. This guarantees lighting and background continuity.

#### Step 5: Advanced Items & VFX Compositing
*   **Adding Holograms or Props:**
    1.  Generate the specific prop (e.g., a glowing hologram or an ID card) in `Images`.
    2.  In `Video Single Shot`, upload the base location/character frame. Then upload the Prop image as an *additional reference*.
    3.  Prompt the action (e.g., "hologram coming out of the watch").
*   **Lasers/Environmental Hazards:** 
    1.  Generate a clean image of the room.
    2.  Generate a parallel image of the room *with* the lasers. 
    3.  Use the clean room as the Start Frame and the laser room as the End Frame.
*   **Order of Operations Rule:** Always get the location and the camera angle generated correctly *first*, and only then insert the character into that established geometry. Doing both at the same time often results in distorted generations.

### Production Economics
*   **Total Credits Used:** ~5,420 credits (on a Creator Plan).
*   **Total Time:** ~6 hours of manual rolling and rendering.
*   **Output Value:** Equivalent to a traditional production agency quote of ~$300,000 for a 60-second multi-actor, multi-location action commercial.
