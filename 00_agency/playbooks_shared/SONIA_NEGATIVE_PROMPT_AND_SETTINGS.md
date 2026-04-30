{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier-Bold;\f1\fmodern\fcharset0 Courier;\f2\froman\fcharset0 Times-Roman;
\f3\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red70\green137\blue204;\red26\green26\blue26;\red224\green224\blue224;
\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c33725\c61176\c83922;\cssrgb\c13333\c13333\c13333;\cssrgb\c90196\c90196\c90196;
\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\b\fs23\fsmilli11700 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # SONIA_NEGATIVE_PROMPT_AND_SETTINGS.md
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Date**
\f1\b0 \cf4 \strokec4 : 22 April 2026  \

\f0\b \cf2 \strokec2 **Version**
\f1\b0 \cf4 \strokec4 : 1.0  \

\f0\b \cf2 \strokec2 **Usage**
\f1\b0 \cf4 \strokec4 : Use these exact settings with the Sonia LoRA in Forge / ComfyUI / ZImage Turbo\
\

\f0\b \cf2 \strokec2 ### Recommended Negative Prompt (copy-paste this)
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0

\f2\fs24 \cf0 \cb1 \strokec5 \
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 blurry, deformed, ugly, bad anatomy, extra limbs, missing limbs, fused fingers, mutated hands, watermark, text, logo, signature, low quality, worst quality, plastic skin, shiny skin, oily skin, waxy skin, overexposed, underexposed, flat lighting, cartoon, 3d render, painting, drawing, illustration, anime, doll-like, barbie, barbie face, childlike, old, wrinkled skin, makeup overload\
\pard\pardeftab720\partightenfactor0
\cf0 text\
\
\pard\pardeftab720\partightenfactor0

\f1\fs23\fsmilli11700 \cf4 \cb3 \strokec4 ### Recommended Settings (Forge / ComfyUI / ZImage)\
\
**Base Settings (Start Here)**\
- Steps: 8\'9612 (ZImage Turbo) or 20\'9630 (full Flux)\
- CFG Scale: 1.0 \'96 1.5 (keep low for natural look)\
- Sampler: Euler a or DPM++ 2M Karras\
- Scheduler: Simple\
- LoRA Weight: Start at **0.85** 
\f3 \uc0\u8594 
\f1  test 0.7\'961.1\
- Resolution: 768\'d71024 or 832\'d71216 (portrait)\
\
**For 4K Commercial Quality (Two-Step Upscale)**\
1. First pass: Generate at 768\'d71024\
2. Latent Upscale: Scale by 1.5\'d7, denoising strength **0.40\'960.45**\
3. Final pass: SeedVR 2 upscaler to 4K\
\
**ControlNet Settings (when using pose/reference)**\
- ControlNet Strength: 0.65\'960.80 (never 1.0)\
- OpenPose / Depth / Canny preferred\
\
**Quick Tip**:  \
Always test 3\'964 seeds with the same prompt before committing to a final image.\
\
Save both files on your desktop.  \
They are now ready to use the moment the LoRA finishes training.\
\pard\pardeftab720\partightenfactor0

\f2\fs24 \cf0 \cb1 \strokec5 \
\
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 \
}