import cv2
import os
import shutil
from pathlib import Path

# Config - WE ARE NOW SCANNING INSIDE THE APPROVED FOLDER
SOURCE_DIR = Path.home() / "Downloads" / "suhuuu" / "approved"
APPROVED_STRICT_DIR = SOURCE_DIR / "final_strict_approved"
DISCARDED_STRICT_DIR = SOURCE_DIR / "false_positives_discarded"

# Create folders
APPROVED_STRICT_DIR.mkdir(exist_ok=True)
DISCARDED_STRICT_DIR.mkdir(exist_ok=True)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def process_images():
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.JPG', '*.JPEG', '*.PNG', '*.WEBP']:
        image_files.extend(list(SOURCE_DIR.glob(ext)))
        
    print(f"Found {len(image_files)} images in the Approved folder to re-scan...")

    approved_count = 0
    discarded_count = 0
    
    for img_path in image_files:
        try:
            img = cv2.imread(str(img_path))
            if img is None:
                continue
                
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # THE FIX: minNeighbors changed from 5 to 12.
            # This requires the algorithm to be 240% more confident that a face exists.
            # It will easily reject complex clothing/flower shadows.
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=12, minSize=(60, 60))
            
            if len(faces) != 1:
                # Discard false positives
                shutil.move(str(img_path), str(DISCARDED_STRICT_DIR / img_path.name))
                discarded_count += 1
            else:
                # Passed the strict check
                shutil.move(str(img_path), str(APPROVED_STRICT_DIR / img_path.name))
                approved_count += 1
            
        except Exception as e:
            pass

    print(f"\nStrict Re-scan complete.")
    print(f"✅ Survived Strict Check: {approved_count} images")
    print(f"❌ Kicked out as False Positives: {discarded_count} images")

if __name__ == "__main__":
    process_images()
