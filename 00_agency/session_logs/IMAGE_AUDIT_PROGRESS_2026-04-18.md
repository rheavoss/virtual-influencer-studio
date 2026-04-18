# Image Audit Progress — 2026-04-18

## COMPLETED
- `need_review/` (50) — viewed all, moved 48 to `pose_reference/`, trashed 2 (APT.(3) + duplicate)
- `30_dataset/grok_generated/` (19) — trashed (wrong body spec)
- `30_dataset/useful/` (19) — trashed (duplicate)
- `02_reference_images/jasmine/selected/` (19) — trashed (duplicate)
- `Downloads/train/discarded/` (1411) — trashed (user pre-rejected)
- `Downloads/useful/` Kling images — 11 new moved to `jasmine_dataset/`, 16 duplicates trashed
- Root `PHOTO-2026-04-10-23-50-02.jpg` — trashed (Facebook screenshot)
- `training_ready/` → renamed to `pose_reference/`

## IN PROGRESS — MUST COMPLETE
- `Downloads/train_approved/final_strict_approved/` — **493 images, ~6 viewed so far**
  - All viewed so far: high quality Indian influencer pose reference (same source as pose_reference/)
  - Decision when done: move all passing images to `pose_reference/`, trash poor quality
  - Location: `/Users/user/Downloads/train_approved/final_strict_approved/`

## NOT STARTED
- `Downloads/train_approved/false_positives_discarded/` — **233 images**
  - Name suggests user re-rejected these after initial approval
  - Decision: likely trash all, but must view each one first

## CURRENT PROJECT IMAGE STATE
| Folder | Count | Purpose |
|--------|-------|---------|
| `training_data/pose_reference/` | 87 | Indian influencer pose/content reference |
| `training_data/jasmine_dataset/` | 27 | Jasmine AI generations (Kling) + refs |
| `07_monetization/fanvue/subscription_data/` | 3 | Fanvue research |
| `30_dataset/` | 1 | Contact sheet |
| `training_data/excluded/` | 1 | Rejected |
| `generation/training_approved/` | 1 | Approved AI gen |
| **TOTAL project** | **121** | — |

## TRASH FOLDER
All trashed files at: `~/.Trash/jasmine_cleanup_2026-04-18/`
Nothing permanently deleted — all recoverable.

## NEXT SESSION RESUME POINT
1. Open `/Users/user/Downloads/train_approved/final_strict_approved/`
2. View ALL 493 images one by one
3. Move passing images to `pose_reference/`
4. Then view all 233 `false_positives_discarded/` images
5. Produce final updated image table
