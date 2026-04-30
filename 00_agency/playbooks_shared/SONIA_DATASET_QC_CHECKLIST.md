{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier-Bold;\f1\fmodern\fcharset0 Courier;\f2\fmodern\fcharset0 Courier-Oblique;
\f3\fnil\fcharset0 Menlo-Bold;\f4\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red70\green137\blue204;\red26\green26\blue26;\red224\green224\blue224;
\red85\green129\blue224;\red194\green126\blue101;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c33725\c61176\c83922;\cssrgb\c13333\c13333\c13333;\cssrgb\c90196\c90196\c90196;
\cssrgb\c40392\c58824\c90196;\cssrgb\c80784\c56863\c47059;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\b\fs23\fsmilli11700 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # SONIA_DATASET_QC_CHECKLIST.md
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **Date**
\f1\b0 \cf4 \strokec4 : 22 April 2026  \

\f0\b \cf2 \strokec2 **Version**
\f1\b0 \cf4 \strokec4 : 1.0  \

\f0\b \cf2 \strokec2 **Task**
\f1\b0 \cf4 \strokec4 : P0-31 \'96 Formal QC of all 54 clean images (and any future datasets)\
\

\f0\b \cf2 \strokec2 **MANDATORY**
\f1\b0 \cf4 \strokec4 : Use this checklist 
\f0\b \cf2 \strokec2 **every single time**
\f1\b0 \cf4 \strokec4  before starting or resuming any LoRA training run.\
\

\f0\b \cf2 \strokec2 ---
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 ## PRE-QC INSTRUCTIONS FOR CLAUDE CODE
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 1.\cf4 \strokec4  You must evaluate 
\f0\b \cf2 \strokec2 **every image individually**
\f1\b0 \cf4 \strokec4 .\
\cf5 \strokec5 2.\cf4 \strokec4  List each filename clearly as KEEP or DISCARD with exact reason.\
\cf5 \strokec5 3.\cf4 \strokec4  Never approve a batch without full checklist completion.\
\cf5 \strokec5 4.\cf4 \strokec4  Log any failure in claude_failure_log.md immediately.\
\
---\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ## STRICT QC CRITERIA (Apply to EVERY image)
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 ### 1. Skin Quality (Non-Negotiable)
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] Flawless porcelain smooth skin  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Perfect even skin tone  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Zero blemishes, zero pigmentation, zero marks, zero red spots  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Zero discoloration, zero texture imperfections, zero visible pores  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] No oily shine, no plastic/waxy look, no airbrush artifacts  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 2. Face Consistency
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] Exact Sonia facial features (consistent eye shape, nose, lips, jawline)  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Highly detailed face, sharp eyes  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Consistent expression across similar angles  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 3. Body & Breast Physics
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] Natural teardrop shaped DD breasts  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Realistic gravity and soft natural sag (no floating, no unnatural perkiness)  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Correct body proportions and posture  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 4. Hair & Overall Appearance
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] High top bun hairstyle with pink hair tie (in majority of images)  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Consistent hair color and style  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 5. Technical Requirements
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] No watermarks, text, logos, borders, or compression artifacts  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Resolution between 768\'961024 px (ideal range)  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Plain or simple background preferred for training  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Image is sharp and well-lit  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ### 6. Dataset Variety Check (Overall Set)
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] Minimum 8\'9612 headshots/close-ups with different expressions  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Minimum 8\'9612 three-quarter and side angles  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Minimum 15\'9620 full-body / lifestyle shots  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Good mix of lighting and simple poses  \
\
---\
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 ## FINAL APPROVAL CHECKLIST
\f1\b0 \cf4 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  [ ] All 54 images have been individually reviewed  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Number of KEEP images: 
\f2\i __
\f1\i0 ____ (target \uc0\u8805 50)  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] All DISCARD images logged with exact filename + reason  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Trigger word \cf6 \strokec6 `jasmakogirl`\cf4 \strokec4  will be used  \
\cf5 \strokec5 -\cf4 \strokec4  [ ] Captions prepared (Option A or B)  \
\
\pard\pardeftab720\partightenfactor0

\f0\b \cf2 \strokec2 **Only after ALL boxes above are checked 
\f3 \uc0\u8594 
\f0  proceed to Flex Gym training.**
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 ---
\f1\b0 \cf4 \strokec4 \
\

\f0\b \cf2 \strokec2 **How to use this file**
\f1\b0 \cf4 \strokec4 :\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 -\cf4 \strokec4  Open it every time before training.\
\cf5 \strokec5 -\cf4 \strokec4  Go through the checklist systematically.\
\cf5 \strokec5 -\cf4 \strokec4  Save a dated copy (e.g. \cf6 \strokec6 `JASMINE_DATASET_QC_22APR2026.md`\cf4 \strokec4 ) after each full QC round.\
\
This checklist was built directly from our past failure log and all analysed transcripts.\
 
\f4\fs24 \cf0 \cb1 \strokec7 \
}