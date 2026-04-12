# Zero-Cost Video Generation: ByteDance "Seedance 2" Watermark Bypass
**Date Recorded:** 2026-04-11
**Context:** Alternative to LTX 2.3 and Higgsfield for free, high-quality AI video generation.

## 1. The Application: "Seedance 2" (JianYing / Dreamina by ByteDance)
The transcript details a Chinese video generation app (part of the ByteDance ecosystem, utilizing their Seedance 2.0 multimodal model) that currently operates on a free "freemium" daily credit pipeline.

**The Economics:**
- Users receive **10 Free Credits** every day simply by logging in.
- Generation cost: **1 Credit = 5 Seconds** of video | **2 Credits = 10 Seconds** of video.
- Yield: You can absolutely sustain a 1-Reel-a-day Instagram/Passes operation purely on the 10 daily free credits.

## 2. Platform Access Requirements
Because this is a native domestic Chinese application, standard Google/Apple login will not work.
- **Verification:** You must download the native Android APK.
- **Login:** Requires a phone number linked to a WhatsApp account (the app bridges the SMS verification code via WhatsApp).

## 3. The Core Exploit: Bypassing the Watermark
The catch with the free tier is that exporting directly from the app slaps a massive Chinese watermark on the final video, which ruins the "Jasmine Mako" realism. The workaround detailed in the transcript bypasses the server-side watermark render:

**The Bypass Workflow:**
1. Generate the video inside the Seedance 2 Android app. Wait for completion (1-3 minutes typically).
2. **DO NOT** press the "Download" or "Save" button in the app.
3. Instead, tap the **"Share"** icon and tap **"Copy Link"**.
4. Open your laptop/desktop computer and paste that link into a standard desktop browser (Chrome/Edge).
5. Ensure you have **IDM (Internet Download Manager)** or a similar video-sniffer extension installed on your desktop browser.
6. When the web player loads the video, IDM will intercept the raw streaming `.mp4` file directly from the ByteDance CDN *before* the UI overlays the watermark.
7. Download via IDM. You now have a pristine, high-fidelity AI video of Jasmine for absolutely $0.

## 4. Strategic Recommendation
We should add this to **Phase 1** as our secondary zero-cost video engine right behind the LTX/Modal setup. If the LTX pipeline proves too mechanically difficult to set up, this ByteDance method requires zero coding—just a WhatsApp number and a browser extension.
