# Higgsfield Viral Video Formats Playbook
*Extracted from community video tutorial (Adil)*

This guide breaks down the architecture of the 5 most viral video formats currently dominating social media. These formats are specifically optimized for generation in **Cedense 2.0** due to its ability to maintain perspective and physics through chaotic movement.

All these formats share one core trait: **High Rewatchability**.

---

### Format 1: The Transformation (The Rollercoaster)
This format relies on an abnormal three-act narrative structure compressed into 10-15 seconds.
*   **The Structure:** Normal -> Extreme Chaos (Monster/Magic) -> Immediate Return to Normal.
*   **Example:** A girl casually eating a burger -> A giant Kaiju attacks the bus and she transforms to fight it -> She sits back down and resumes eating her burger, unbothered.
*   **Prompting Trick (Ultra-Realism):** If your monsters or CGI elements look too "plasticky", add the strict negative constraint: `no 3D, no cartoon, no VFX`. This forces the generation into raw photorealism.
*   **Worldbuilding Execution:** To add humor without managing every detail, add the command `add a visual gag in the background`. Cedense will invent comedy that fits the genre.

### Format 2: The "Orb" (First-Person Power Fantasy)
First-person action sequences where the viewer's "hands" cast magic or interact with the environment.
*   **Why Cedense 2.0:** It successfully anchors the position of the hands while the camera spins, holding perspective perfectly.
*   **Execution:** Upload a strong location reference image (e.g., Post-apocalyptic city), but rely heavily on the text prompt to drive the action (e.g., `electro powers... defeat a colossal monster with an electrical beam`).

### Format 3: The Physical POV (First-Person Impact)
Putting the viewer *inside* the scene (e.g., a gladiator running through an arena or a knight taking physical hits).
*   **The Problem:** Most AI models break and drift out of POV when action gets fast.
*   **The Strict Constraint:** To lock the camera strictly to a first-person headset feel, use these exact absolute constraints: 
    > `single frame POV, no cuts, no zooms, natural head movement`
    Without these, the model will naturally begin to auto-edit and cut between wide shots, breaking the illusion.

### Format 4: The Continuous Fight Sequence
Complex, dynamically choreographed action scenes without cuts.
*   **Execution:** Feed Soul Cinema characters into Cedense. Cedense generates the hits, tension, and camera work dynamically. You can drive this through two extremes:
    *   **Micro-Prompting:** An intensely detailed prompt describing every punch, dodge, and camera sweep (Yields a highly technical 15-second sequence).
    *   **Contrast Comedy:** Pairing a small character (e.g., a girl with a lollipop) against an enormous fighter. The model intrinsically understands the physical comedy and frames the smaller character as dominant.

### Format 5: The "Low-Prompt" Animation Engine
Leveraging the AI's internal logic to invent choreography rather than hand-holding the engine.
*   **The Concept:** Give Cedense a jarring thematic contrast and let it invent the action.
*   **Example Prompt:** `fight of a 3D person with a 2D person`
*   **The Result:** Without providing locations, characters, or specific styles, the engine invents a comprehensive narrative (choreography, impact, slow-mo) simply based on fulfilling the core contradiction of the prompt.
