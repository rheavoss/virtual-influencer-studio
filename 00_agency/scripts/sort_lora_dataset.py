import cv2
import os
import shutil
from pathlib import Path

# Config
SOURCE_DIR = Path.home() / "Downloads" / "suhuuu"
APPROVED_DIR = SOURCE_DIR / "approved"
DISCARDED_DIR = SOURCE_DIR / "discarded"

# Parameters
BLUR_THRESHOLD = 80.0 # Lower means more blurry. 80 is a strict cutoff for sharp images.
MIN_RESOLUTION = 640  # Minimum width or height requirement

# Create folders
APPROVED_DIR.mkdir(exist_ok=True)
DISCARDED_DIR.mkdir(exist_ok=True)

# Load Haar cascade for fast frontal face detection (built-in OpenCV)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def process_images():
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.JPG', '*.JPEG', '*.PNG', '*.WEBP']:
        image_files.extend(list(SOURCE_DIR.glob(ext)))
        
    print(f"Found {len(image_files)} images to process...")
    
    if len(image_files) == 0:
        print("No images found in the root directory. Perhaps they are already sorted?")
        return

    approved_count = 0
    discarded_count = 0
    
    for count, img_path in enumerate(image_files):
        if count > 0 and count % 500 == 0:
            print(f"Processed {count}/{len(image_files)}...")
            
        try:
            # Read image
            img = cv2.imread(str(img_path))
            if img is None:
                shutil.move(str(img_path), str(DISCARDED_DIR / img_path.name))
                discarded_count += 1
                continue
                
            height, width = img.shape[:2]
            
            # 1. Resolution Check
            if min(height, width) < MIN_RESOLUTION:
                shutil.move(str(img_path), str(DISCARDED_DIR / img_path.name))
                discarded_count += 1
                continue
                
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # 2. Sharpness (Blur) Check
            laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
            if laplacian_var < BLUR_THRESHOLD:
                shutil.move(str(img_path), str(DISCARDED_DIR / img_path.name))
                discarded_count += 1
                continue
                
            # 3. Single Face Check
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))
            if len(faces) != 1:
                # Discard 0 or 2+ faces
                shutil.move(str(img_path), str(DISCARDED_DIR / img_path.name))
                discarded_count += 1
                continue
                
            # Passed all checks = Approval
            shutil.move(str(img_path), str(APPROVED_DIR / img_path.name))
            approved_count += 1
            
        except Exception as e:
            try:
                shutil.move(str(img_path), str(DISCARDED_DIR / img_path.name))
            except:
                pass
            discarded_count += 1

    print(f"\nProcessing complete.")
    print(f"✅ Approved: {approved_count} images")
    print(f"❌ Discarded: {discarded_count} images")

if __name__ == "__main__":
    process_images()
