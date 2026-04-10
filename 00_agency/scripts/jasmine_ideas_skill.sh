#!/usr/bin/env bash

# ==============================================================================
# JASMINE MAKO - AUTOMATED RESEARCH SKILL (/jasmine-ideas)
# Designed for Claude Code Custom Tooling
# ==============================================================================
# This script triggers a parallel research run specifically tuned for Jasmine's 
# demographic (males 30-50, USA) and niche (AIFM, GFE, Desi/Cultural).
#
# USAGE IN CLAUDE CODE: 
# Add this script to your PATH or register it as a tool in Claude Code configuration.
# Run with: `/jasmine-ideas`
# ==============================================================================

echo "🔍 Initiating parallel trend research for Jasmine Mako..."
echo "Target demographic: Males 30-50, USA, high disposable income"
echo "--------------------------------------------------------"

# Since Claude Code has web-browsing capabilities built-in, we use this script to 
# feed an exact pre-engineered prompt into the Claude Code context window.

cat << 'EOF'
SYSTEM INSTRUCTION FOR CLAUDE CODE:

You are executing the "Jasmine Idea" skill. Execute the following 5 specific web searches in parallel right now:

1. Search X (Twitter): "site:x.com (OnlyFans OR Fanvue OR AI Influencer) min_faves:500" - to find what is currently going viral in the adult/AI creator space.
2. Search YouTube: "AI influencer hook strategy OR AIFM blueprint 2026" - to find the latest tactical advice on content formats.
3. Search Google News: "AI influencer trends OR AIFM news" - to see if there are macro trends or platform clampdowns to avoid.
4. Search TikTok Trends (via web): "Top trending TikTok sounds USA 2026" - for audio ideas we can motion-sync Jasmine to.
5. Search Instagram Reels Trends: "Instagram Reels trend report" - to find current viral formats.

Once the searches complete, synthesize the data and generate exactly 10 Reel/Content concepts for Jasmine Mako.

RULES FOR THE 10 IDEAS:
- Must fit into one of Jasmine's 3 Pillars (Transformation, Talking/Voiceover, Cultural/Desi).
- No brain-rot Gen-Z trends. Concepts must appeal to 30-50 year old financially stable males.
- Each idea must be formatted as:
   [PILLAR] | [HOOK] | [VISUAL CONCEPT] | [AUDIO VIBE]
- Include 1 specific Fanvue PPV conversion concept based on current AIFM trends.

Execute the searches now and output the 10 ideas.
EOF
