# Higgsfield + Claude Video Animation Workflow
*Extracted from community video tutorial (Adil)*

This is the exact pipeline for generating consistent, multi-scene character videos spanning diverse animation styles using Higgsfield AI and Claude Code. This pipeline is critical for our automated UGC video generation.

### Tool Stack Matrix
1. **Claude Code**: The brain. Manages prompt formatting, story continuity, and shot-by-shot generation.
2. **Soul Cinema (Higgsfield)**: The style engine. Generates initial 2D/stylized keyframes.
3. **Nana Banana Pro / Nanob (Higgsfield)**: The editor. Fixes, character-swaps, and generates prop sheets.
4. **Cedense 2.0 (Higgsfield)**: The animation engine. Generates the final up-to-15-second video sequences.

---

### The Consistency Workflow (Step-by-Step)

#### Step 1: Generate the Base Character (Soul Cinema)
*   **Prompting:** Keep it basic and let the model do the heavy lifting (e.g., `cartoon style man waking up in bedroom`).
*   **Enhancer:** Turn on the Soul Cinema Enhancer to discover unique visual styles easily.
*   **Correction:** If the character generated does *not* match your target identity, **DO NOT re-roll**. Take the styled image directly into **Nana Banana Pro** and request a character swap to match your target identity (e.g., Sonia).

#### Step 2: Establish Prop Consistency (Claude + Nanob)
*   If a specific prop (like a watch, a protein bar, or gym gear) appears across multiple scenes, it must be locked.
*   **Action:** Upload your Scene 1 image to Claude and ask it to generate a "Prop Sheet prompt" matching that exact visual style.
*   **Crucial Detail:** The Prop Sheet must include **multiple angles**. Cedense 2.0 needs to see the prop from every direction to keep it consistent when it spins or moves in 3D space during a video.
*   **Generation:** Run Claude's prompt through Nana Banana Pro to get your finalized Prop Sheet image.

#### Step 3: Animate the First Scene (Claude + Cedense 2.0)
*   Feed the Character Image and the Prop Sheet back into Claude. 
*   Describe your precise sequence of actions (e.g., *"He panics, sees a message, checks the watch, teleports"*).
*   Claude format this action into a strict Cedense 2.0 prompt.
*   **Rule:** Keep all scene generations **under 15 seconds** (one generation per style) so you have clean cuts and manageable render times.

#### Step 4: The Scene Transition Engine (The Critical Secret)
To drop the same character seamlessly into a completely different environment (e.g., from morning anime bedroom to 3D cyberpunk claymation):
1. **Generate the New Scene Keyframe** in Soul Cinema (e.g., `claymation style, man in suit on a horse`). 
2. **Swap the Identity** in Nana Banana Pro if the subject doesn't look like your character.
3. **Claude Continuity Block:** Upload the new Scene 2 Keyframe *AND* the prompt from Scene 1 to Claude. Doing this teaches Claude exactly what action just occurred so it can fluidly carry the motion and style over. Describe what happens next.
4. **Cedense 2.0 Generation:** Provide Cedense with:
    1. The new prompt (from Claude)
    2. The new style keyframe (from Soul Cinema/Nanob)
    3. **THE PREVIOUS SCENE'S VIDEO FILE**. 

Feeding the *previous video* into Cedense for the *next scene's* generation allows the AI to link the portal effects, momentum, character layout, and narrative continuity perfectly.

### Summary Loop
`Keyframe (Soul Cinema)` -> `Swap Identity/Props (Nanob)` -> `Write Sequence (Claude)` -> `Animate using Keyframe + Previous Video (Cedense)` -> Repeat.
