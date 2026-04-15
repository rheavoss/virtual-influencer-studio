# Higgsfield Narrative Short Film Pipeline — Voice & Dialogue
*Extracted from community video tutorial (Adil)*

This workflow documents how to create a narrative short film with continuous dialogue, custom real-world identity locking, and voice cloning using the Higgsfield ecosystem. 

### Tool Stack
- **Higgsfield (Soul ID)**: Custom face training.
- **Soul Cinema**: Aesthetic generation / B-Roll generation.
- **Cinema Studio (Multi-Shot)**: Action sequence and dialogue timing.
- **Higgsfield Audio**: Dialogue emotion preservation and voice cloning.
- **Claude**: Vague concept-to-prompt translation.

---

### The Narrative Cinematic Workflow

#### Step 1: The Emotional Foundation
*   Do not start with a visual prompt. Start with a 3-sentence emotional core. 
*   **Structure:** Setup, Midpoint, Climax. (e.g., A depressed cop in a locker room, a tense patrol car ride, a surprise birthday ambush).

#### Step 2: Native Face Training (Soul ID)
*   Instead of prompting an archetype, use **Higgsfield Character -> Soul ID**.
*   **Action:** Upload 20 photos of a real human face (varying lighting, angles, expressions) to train a proprietary Soul ID.
*   Once trained, this Soul ID can be triggered in Soul Cinema to drop the exact face into any generated frame.

#### Step 3: Establishing the Aesthetic & Props
1.  **Character Sheets:** Generate a master image of the character in Soul Cinema with the Soul ID (e.g., American policeman). Run that through Nano Banana Pro to create a full Character Sheet to lock the uniform details.
2.  **Prop Sheets:** Lock crucial narrative items (like a liquor bottle or an ID card) by generating a multi-angle Prop Sheet.
3.  **Locations:** Generate wide establishing shots (e.g., Blue locker room) to set the mood.

#### Step 4: The Multi-Shot Action Logic
*   **Module:** `Cinema Studio -> Multi-Shot`
*   **Prompt Anchoring Rule:** When writing the prompt, write the physical action *first*, then insert the image reference variables. 
    *   *Example:* `Policeman in uniform [Ref: Character Sheet] enters the locker room with blue lockers [Ref: Location].`
    *   This forces the engine to understand the *action* before trying to paint the pixels, yielding better movement.
*   **The Perspective Screenshot Move:** If a generation gives you a cool, unexpected POV (like looking *out* from inside a locker), take a screenshot of that exact frame. Upload the screenshot + the Prop Sheet to jumpstart the very next generation from that new perspective.

#### Step 5: Generating B-Roll (Claude Translation)
*   **Action:** Describe the *feeling* of the B-Roll (e.g., "cheap surveillance footage, bright sun, suburban") to Claude in plain English.
*   Let Claude write the technical prompt.
*   Generate 3-5 B-roll clips (dash cams, close-ups of a radio, passing streets) without multi-shot logic. These are used in post-production to cover awkward cuts in dialogue and breathe life into a static conversation scene.

#### Step 6: Audio & Voice Cloning (Higgsfield Audio)
*   **The Problem:** AI text-to-speech sounds robotic and lacks precise emotional timing (sighs, pauses, sarcasm).
*   **The Solution:** 
    1.  Record the dialogue yourself using your own voice to capture the exact pacing, emotion, and sarcasm. 
    2.  Upload the raw audio track to **Higgsfield Audio -> Change Voice**.
    3.  Select the AI voice profile you want (e.g., "Dave").
    4.  **Result:** The engine converts your voice into the AI voice *while perfectly preserving* the emotional delivery, pitch shifts, and timing of your original recording.
*   Layer these tracks over the characters in post-production (DaVinci/CapCut).
