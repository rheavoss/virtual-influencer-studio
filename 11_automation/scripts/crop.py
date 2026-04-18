import os
import glob
from PIL import Image

src_dir = '/Users/user/Downloads/download_result (1)'
dst_dir = '/Users/user/Desktop/Instagram/30_dataset/raw_crop'
crop_amount = 75 # Pixels to remove from bottom

for filepath in glob.glob(os.path.join(src_dir, '*.png')):
    with Image.open(filepath) as img:
        # (left, upper, right, lower)
        width, height = img.size
        # Crop 75 pixels from the bottom
        cropped = img.crop((0, 0, width, height - crop_amount))
        
        filename = os.path.basename(filepath)
        dst_path = os.path.join(dst_dir, filename)
        cropped.save(dst_path, format="PNG")

print("Files successfully cropped and saved to Workspace.")
