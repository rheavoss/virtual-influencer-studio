#!/bin/bash
CHARACTER_ID=$1
if [ -z "$CHARACTER_ID" ]; then
  echo "Usage: ./duplication_script.sh new_character_name"
  exit 1
fi

BASE_DIR=~/Desktop/Instagram
NEW_DIR="$BASE_DIR/01_characters/$CHARACTER_ID"
NEW_MODEL_DIR="$BASE_DIR/03_ai_models/${CHARACTER_ID}_mako"

echo "Creating new character: $CHARACTER_ID"

cp -r "$BASE_DIR/01_characters/jasmine" "$NEW_DIR"
cp -r "$BASE_DIR/03_ai_models/jasmine_mako" "$NEW_MODEL_DIR"

find "$NEW_DIR" -type f -name "*jasmine*" -exec rename 's/jasmine/'$CHARACTER_ID'/g' {} \;
find "$NEW_MODEL_DIR" -type f -name "*jasmine*" -exec rename 's/jasmine/'$CHARACTER_ID'/g' {} \;

sed -i '' "s/\"character_id\": \".*\"/\"character_id\": \"$CHARACTER_ID\"/" "$NEW_DIR/character_bible_schema.json" 2>/dev/null || true

echo "✅ New character $CHARACTER_ID created successfully!"
echo "Next: Add reference images to 02_reference_images/$CHARACTER_ID/ and train new LoRA."
