# Automated Competitor Reel Scraping Pipeline
*(Phase 1 Scaling Tactic)*

Once Jasmine Mako's Phase 0 workflow is established and you begin full-scale video production, do not guess what content to make. Use Claude Code and Apify to mathematically scrape the top AIFM hooks and rewrite them.

## The Architecture
1. **Apify:** A web scraping API that bypasses Instagram's bot protections.
2. **Gemini API:** Used because Google's model can natively "watch" video feeds and correctly transcribe/understand visual context (OpenAI is weaker at native video ingestion).
3. **Claude Code / Anthropic API:** Coordinates the workflow and writes the final script.

## The Workflow Execution command (For Claude Code)

When you are ready to script a week's worth of videos, feed this exact prompt into your Claude Code terminal:

```text
SYSTEM COMMAND: COMPETITOR SCRAPE INITIATED

1. Connect to Apify API.
2. Target the following top-tier AI Influencer Instagram accounts provided in my configs.
3. Scrape their last 30 published Reels, pulling View Count, Like Count, and the Video Media File.
4. Filter for only the Top 3 most-viewed videos from this dataset.
5. Pipe those 3 video files into the Gemini API for visual and audio analysis.
6. Extract the following from each video:
   - The Hook (First 3 seconds verbal and visual)
   - The Retention Mechanism (What keeps them watching)
   - The Reward (The payoff at the end)
7. Draft 3 brand new scripts for Jasmine Mako using the exact same structural hook and retention framework, but styled for her 30-50yo target demographic.

OUTPUT the 3 scripts in markdown.
```

## Why this is necessary
Content that scores 3+ million views follows a specific cadence. By extracting the literal transcript and timing using Gemini, you remove the guesswork out of Pillar 2 (Talking/Opinion) content. 

*Note: For this script to work, API keys for Apify, Gemini, and Anthropic must be configured in your `.env` for the Claude Code project.*
