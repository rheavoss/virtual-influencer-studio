{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier-Bold;\f1\fmodern\fcharset0 Courier;\f2\fnil\fcharset0 Menlo-Regular;
\f3\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red70\green137\blue204;\red26\green26\blue26;\red224\green224\blue224;
\red85\green129\blue224;\red194\green126\blue101;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c33725\c61176\c83922;\cssrgb\c13333\c13333\c13333;\cssrgb\c90196\c90196\c90196;
\cssrgb\c40392\c58824\c90196;\cssrgb\c80784\c56863\c47059;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\b\fs23\fsmilli11700 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # SONIA_SOUL_ID_AND_9SHOT_GRID_GUIDE.md
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Date**
\f1\b0 \cf4 \strokec4 : 22 April 2026  \

\f0\b \cf2 \strokec2 **Version**
\f1\b0 \cf4 \strokec4 : 1.0  \

\f0\b \cf2 \strokec2 **Task**
\f1\b0 \cf4 \strokec4 : P0-32 \'96 Generate Sonia 9-shot Character Reference Grid in Higgsfield\
\

\f0\b \cf2 \strokec2 **When to use this guide**
\f1\b0 \cf4 \strokec4 : Immediately after your Flux LoRA (soniagfe.safetensors) finishes training and you have tested it successfully.\
\

\f0\b \cf2 \strokec2 ---
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 ## Step-by-Step Process (Do in this exact order)
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 ### 1. Prepare Your Best Reference Images
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  Choose the 
\f0\b \cf2 \strokec2 **single strongest full-body image**
\f1\b0 \cf4 \strokec4  from your 54 clean images (best face, best skin, best body physics).\
\cf5 \strokec5 -\cf4 \strokec4  Also prepare 4\'966 additional clean images (different angles/expressions) as backup references.\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 2. Create Soul ID in Higgsfield
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 1.\cf4 \strokec4  Log into Higgsfield 
\f2 \uc0\u8594 
\f1  go to 
\f0\b \cf2 \strokec2 **Soul ID**
\f1\b0 \cf4 \strokec4  section.\
\cf5 \strokec5 2.\cf4 \strokec4  Click \'93Create New Soul\'94.\
\cf5 \strokec5 3.\cf4 \strokec4  Upload your strongest full-body image as the main reference.\
\cf5 \strokec5 4.\cf4 \strokec4  Upload the additional 4\'966 images as supporting references.\
\cf5 \strokec5 5.\cf4 \strokec4  Set:\
\cf5 \strokec5    -\cf4 \strokec4  Soul Name: \cf6 \strokec6 `Sonia`\cf4 \strokec4 \
\cf5 \strokec5    -\cf4 \strokec4  Description: \cf6 \strokec6 `Girl-next-door student GFE, Indian / South Asian, natural teardrop DD breasts, realistic gravity`\cf4 \strokec4 \
\cf5 \strokec5    -\cf4 \strokec4  Strength: Default or slightly higher for face lock\
\cf5 \strokec5 6.\cf4 \strokec4  Click 
\f0\b \cf2 \strokec2 **Train Soul**
\f1\b0 \cf4 \strokec4  (this usually takes 5\'9615 minutes).\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 3. Generate the Official 9-Shot Character Reference Grid
\f1\b0 \cf4 \strokec4 \
Once Soul ID is ready:\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 1.\cf4 \strokec4  Go to 
\f0\b \cf2 \strokec2 **Shots**
\f1\b0 \cf4 \strokec4  or 
\f0\b \cf2 \strokec2 **Character Reference Grid**
\f1\b0 \cf4 \strokec4  tool in Higgsfield.\
\cf5 \strokec5 2.\cf4 \strokec4  Select your new \cf6 \strokec6 `Sonia`\cf4 \strokec4  Soul ID.\
\cf5 \strokec5 3.\cf4 \strokec4  Use this exact prompt for the grid:\
\pard\pardeftab720\partightenfactor0

\f3\fs24 \cf0 \cb1 \strokec7 \
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 soniagfe, keep this person\'92s facial features exactly, Indian / South Asian skin tone, natural teardrop DD breasts with realistic gravity, plain white studio background, full body turntable, 9 different angles and expressions\
\pard\pardeftab720\partightenfactor0
\cf0 text\
\
\pard\pardeftab720\partightenfactor0

\f1\fs23\fsmilli11700 \cf4 \cb3 \strokec4 4. Generate the 9-shot grid (front, \'be left, \'be right, side left, side right, back, close-up face, smiling, sultry expression).\
5. Download the grid as one image or as individual shots.\
\
### 4. How to Use the 9-Shot Grid Going Forward\
- This grid becomes your **master reference** for all ControlNet workflows.\
- Upload it whenever you use OpenPose / Depth / Canny in Forge or ComfyUI.\
- It dramatically reduces face/body drift in complex poses and video frames.\
\
**Success Criteria**:\
- Face must be 95%+ consistent across all 9 shots\
- Skin must remain flawless\
- Breasts must show correct natural gravity in every angle\
\
**If the grid is not consistent** 
\f2 \uc0\u8594 
\f1  go back to LoRA testing / retraining before proceeding.\
\
Save this file on your desktop. It is now your official post-LoRA activation map.\
\
---\
\
**You now have 5 complete groundwork files saved:**\
\
1. SONIA_TRIGGER_AND_ADVANCED_PROMPT_STRATEGY.md  \
2. SONIA_NEGATIVE_PROMPT_AND_SETTINGS.md  \
3. SONIA_POST_LORA_ACTIVATION_CHECKLIST.md  \
4. SONIA_CONTROLNET_AND_UPSCALE_QUICKSTART.md  \
5. SONIA_SOUL_ID_AND_9SHOT_GRID_GUIDE.md 
\f2 \uc0\u8592 
\f1  just added\
}