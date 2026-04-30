{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier-Bold;\f1\fmodern\fcharset0 Courier;\f2\fnil\fcharset0 Menlo-Regular;
\f3\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red70\green137\blue204;\red26\green26\blue26;\red224\green224\blue224;
\red85\green129\blue224;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c33725\c61176\c83922;\cssrgb\c13333\c13333\c13333;\cssrgb\c90196\c90196\c90196;
\cssrgb\c40392\c58824\c90196;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\b\fs23\fsmilli11700 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # SONIA_CONTROLNET_AND_UPSCALE_QUICKSTART.md
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Date**
\f1\b0 \cf4 \strokec4 : 22 April 2026  \

\f0\b \cf2 \strokec2 **Version**
\f1\b0 \cf4 \strokec4 : 1.0  \

\f0\b \cf2 \strokec2 **Tasks Covered**
\f1\b0 \cf4 \strokec4 : P0-39 (ControlNet) + P0-40 (Two-step Upscale)\
\

\f0\b \cf2 \strokec2 ### 1. ControlNet Quickstart (for perfect pose & composition)
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Recommended ControlNet types for Sonia**
\f1\b0 \cf4 \strokec4 :\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  OpenPose (best for body pose)\
\cf5 \strokec5 -\cf4 \strokec4  Depth (best for scene composition)\
\cf5 \strokec5 -\cf4 \strokec4  Canny (best for edge/structure)\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 **Settings**
\f1\b0 \cf4 \strokec4 :\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  ControlNet Strength: 
\f0\b \cf2 \strokec2 **0.65 \'96 0.80**
\f1\b0 \cf4 \strokec4  (never 1.0)\
\cf5 \strokec5 -\cf4 \strokec4  Start with OpenPose + your 9-shot reference grid once ready\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 **How to use**
\f1\b0 \cf4 \strokec4 :\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 1.\cf4 \strokec4  Load Flux.1 Dev + soniagfe LoRA (weight 0.85\'961.0)\
\cf5 \strokec5 2.\cf4 \strokec4  Enable ControlNet\
\cf5 \strokec5 3.\cf4 \strokec4  Upload a pose reference from the 9-shot grid or a lifestyle photo\
\cf5 \strokec5 4.\cf4 \strokec4  Use the Core Base Prompt + specific scene description\
\cf5 \strokec5 5.\cf4 \strokec4  Generate\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 2. Two-Step Upscale Workflow (for 4K commercial quality)
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Step 1 \'96 Latent Upscale**
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  Generate base image at 768\'d71024 or 832\'d71216\
\cf5 \strokec5 -\cf4 \strokec4  Use \'93Upscale Latent by\'94 node 
\f2 \uc0\u8594 
\f1  Scale factor 
\f0\b \cf2 \strokec2 **1.5\'d7**
\f1\b0 \cf4 \strokec4 \
\cf5 \strokec5 -\cf4 \strokec4  Denoising strength: 
\f0\b \cf2 \strokec2 **0.40 \'96 0.45**
\f1\b0 \cf4 \strokec4  (critical for keeping LoRA control)\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 **Step 2 \'96 SeedVR 2 Final Upscale**
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  Feed the latent-upscaled image into SeedVR 2\
\cf5 \strokec5 -\cf4 \strokec4  Target resolution: 1536\'d72048 or 4K\
\cf5 \strokec5 -\cf4 \strokec4  This removes blurriness and adds natural detail without over-sharpening\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 **Full Combined Prompt Example**
\f1\b0 \cf4 \strokec4  (ready to copy):\
\pard\pardeftab720\partightenfactor0

\f3\fs24 \cf0 \cb1 \strokec6 \
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 soniagfe, [full core base prompt], wearing black lace micro bikini, seductive pose, bedroom setting, soft warm lighting\
\pard\pardeftab720\partightenfactor0
\cf0 text\
\
\pard\pardeftab720\partightenfactor0

\f1\fs23\fsmilli11700 \cf4 \cb3 \strokec4 **Negative Prompt** (use every time):\
\pard\pardeftab720\partightenfactor0

\f3\fs24 \cf0 \cb1 \strokec6 \
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 blurry, deformed, ugly, bad anatomy, extra limbs, watermark, text, logo, low quality, worst quality, plastic skin, shiny skin, oily skin, overexposed, underexposed\
\pard\pardeftab720\partightenfactor0
\cf0 text\
\
\pard\pardeftab720\partightenfactor0

\f1\fs23\fsmilli11700 \cf4 \cb3 \strokec4 Save this file on your desktop.\
\
---\
\
**Files you now have saved**:\
1. `JASMINE_TRIGGER_AND_ADVANCED_PROMPT_STRATEGY.md`\
2. `JASMINE_NEGATIVE_PROMPT_AND_SETTINGS.md`\
3. `JASMINE_POST_LORA_ACTIVATION_CHECKLIST.md`\
4. `JASMINE_CONTROLNET_AND_UPSCALE_QUICKSTART.md` 
\f2 \uc0\u8592 
\f1  just added\
\
Would you like me to prepare the next groundwork file right now?\
\
Options:\
- `JASMINE_DATASET_QC_CHECKLIST.md` (for P0-31)\
- `JASMINE_SOUL_ID_AND_9SHOT_GRID_GUIDE.md` (for P0-32)\
- Or anything else you want prepped before tokens return.\
\
Just tell me which one (or say \'93next one\'94 and I\'92ll choose the highest priority).  \
\
We\'92re building a very strong foundation while we wait.\
\pard\pardeftab720\partightenfactor0

\f3\fs24 \cf0 \cb1 \strokec6 \
\
\
}