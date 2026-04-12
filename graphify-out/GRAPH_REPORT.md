# Graph Report - .  (2026-04-11)

## Corpus Check
- 10 files · ~3,824,593 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 39 nodes · 42 edges · 8 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `main()` - 5 edges
2. `main()` - 4 edges
3. `fi()` - 3 edges
4. `PLTable()` - 3 edges
5. `setup()` - 3 edges
6. `load_prompts()` - 3 edges
7. `generate_single()` - 3 edges
8. `getData()` - 2 edges
9. `Page()` - 2 edges
10. `fL()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.27
Nodes (4): ChartTooltip(), fi(), fL(), PLTable()

### Community 1 - "Community 1"
Cohesion: 0.36
Nodes (7): generate_single(), load_prompts(), main(), Install dependencies and configure API., Load JSON and filter to the target batch only., Call Imagen 3 API and save the best image., setup()

### Community 2 - "Community 2"
Cohesion: 0.4
Nodes (2): getData(), Page()

### Community 3 - "Community 3"
Cohesion: 0.6
Nodes (5): human_jitter(), init_instaloader(), load_credentials(), main(), scrape_target()

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (2): Convert to greyscale, run FIND_EDGES filter, return mean pixel intensity.     Hi, sharpness_score()

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **4 isolated node(s):** `Install dependencies and configure API.`, `Load JSON and filter to the target batch only.`, `Call Imagen 3 API and save the best image.`, `Convert to greyscale, run FIND_EDGES filter, return mean pixel intensity.     Hi`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 6`** (2 nodes): `layout.js`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Install dependencies and configure API.`, `Load JSON and filter to the target batch only.`, `Call Imagen 3 API and save the best image.` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._