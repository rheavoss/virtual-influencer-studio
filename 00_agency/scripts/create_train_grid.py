import os
from pathlib import Path
from PIL import Image

def create_grid():
    src_dir = Path.home() / "Desktop" / "train"
    out_path = Path.home() / "Desktop" / "train_grid.jpg"
    
    # Get all images
    extensions = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'}
    img_files = sorted([f for f in src_dir.iterdir() if f.suffix in extensions])
    
    if not img_files:
        print("No images found.")
        return
        
    print(f"Found {len(img_files)} images.")
    for i, f in enumerate(img_files):
        print(f"Grid Position {i} -> {f.name}")
    
    # Grid settings
    thumb_size = 256
    cols = 6
    rows = (len(img_files) + cols - 1) // cols
    
    grid_img = Image.new('RGB', (cols * thumb_size, rows * thumb_size), (255, 255, 255))
    
    for i, img_path in enumerate(img_files):
        try:
            with Image.open(img_path) as img:
                # Resize and crop to square
                width, height = img.size
                min_dim = min(width, height)
                left = (width - min_dim) / 2
                top = (height - min_dim) / 2
                right = (width + min_dim) / 2
                bottom = (height + min_dim) / 2
                img_cropped = img.crop((left, top, right, bottom))
                img_resized = img_cropped.resize((thumb_size, thumb_size))
                
                # Paste into grid
                x = (i % cols) * thumb_size
                y = (i // cols) * thumb_size
                grid_img.paste(img_resized, (x, y))
        except Exception as e:
            print(f"Error processing {img_path.name}: {e}")
            
    grid_img.save(out_path, quality=85)
    print(f"Grid saved to {out_path}")

if __name__ == "__main__":
    create_grid()
