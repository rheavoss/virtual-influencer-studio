# Civitai Account Credentials

## API Key
```
1e8f8c0d9f6f7ca148c746265d94e40a
```

## API Usage
- **Authorization Header:** `Authorization: Bearer 1e8f8c0d9f6f7ca148c746265d94e40a`
- **Query String:** `?token=1e8f8c0d9f6f7ca148c746265d94e40a`

## Download Trained LoRA (once training complete)
```bash
wget "https://civitai.com/api/download/models/{modelVersionId}?token=1e8f8c0d9f6f7ca148c746265d94e40a" --content-disposition
```

## Key API Endpoints
- Models list: `GET https://civitai.com/api/v1/models`
- Get model: `GET https://civitai.com/api/v1/models/:modelId`
- Get model version: `GET https://civitai.com/api/v1/model-versions/:id`
- Search by hash: `GET https://civitai.com/api/v1/model-versions/by-hash/:hash`
- Images: `GET https://civitai.com/api/v1/images`

## Notes
- Training submission MUST be done via web UI — no API endpoint exists for training.
- After training completes, grab modelVersionId from training tab URL to download the .safetensors file.
- Date saved: 2026-04-11
