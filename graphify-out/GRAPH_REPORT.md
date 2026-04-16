# Graph Report - .  (2026-04-17)

## Corpus Check
- 11 files · ~9,193 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 24 nodes · 20 edges · 8 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `getData()` - 3 edges
2. `get_node_type()` - 2 edges
3. `build_tree()` - 2 edges
4. `Page()` - 2 edges
5. `InvestorPage()` - 2 edges
6. `fi()` - 2 edges
7. `PLDashboard()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Page()` --calls--> `getData()`  [EXTRACTED]
  20_tech/jasmine-dashboard/app/page.js → 20_tech/jasmine-dashboard/app/5/page.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.38
Nodes (3): getData(), InvestorPage(), Page()

### Community 1 - "Community 1"
Cohesion: 0.4
Nodes (2): fi(), PLDashboard()

### Community 2 - "Community 2"
Cohesion: 1.0
Nodes (2): build_tree(), get_node_type()

### Community 3 - "Community 3"
Cohesion: 1.0
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 3`** (2 nodes): `sync_supabase.js`, `sync()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (2 nodes): `test_derive.js`, `deriveRows()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (2 nodes): `layout.js`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (1 nodes): `crop.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._