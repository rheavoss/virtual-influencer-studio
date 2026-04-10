import json
import random
import time
import os
import instaloader

# Configuration
CREDENTIALS_FILE = "../07_credentials/scrapers.json"
OUTPUT_FILE = "../08_market_data/viral_patterns.json"
TARGET_ACCOUNTS = [
    "tanvijoshii_", 
    "emilypellegrini"
]

def load_credentials():
    if not os.path.exists(CREDENTIALS_FILE):
        print(f"Error: Credentials file {CREDENTIALS_FILE} not found.")
        return []
    with open(CREDENTIALS_FILE, 'r') as f:
        return json.load(f)

def init_instaloader(username, password):
    L = instaloader.Instaloader(
        download_pictures=False,
        download_video_thumbnails=False,
        download_videos=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False
    )
    print(f"[*] Attempting to login with Burner: {username}")
    try:
        L.login(username, password)
        print("[+] Login successful.")
        return L
    except Exception as e:
        print(f"[-] Login failed for {username}: {e}")
        return None

def human_jitter():
    # Random sleep between 30 and 120 seconds to bypass bot detection
    delay = random.randint(30, 120)
    print(f"[*] Sleeping for {delay} seconds to mimic human scrolling...")
    time.sleep(delay)

def scrape_target(L, target_username):
    data = {"target": target_username, "posts": []}
    print(f"[*] Scraping target: @{target_username}")
    try:
        profile = instaloader.Profile.from_username(L.context, target_username)
        count = 0
        for post in profile.get_posts():
            if count >= 3: # Scrape only the latest 3 posts to stay lightweight
                break
            
            post_data = {
                "date": str(post.date),
                "likes": post.likes,
                "comments": post.comments,
                "caption": post.caption
            }
            data["posts"].append(post_data)
            count += 1
            print(f"  -> Scraped recent post from {post.date}")
            
    except Exception as e:
        print(f"[-] Failed to scrape {target_username}: {e}")
        
    return data

def main():
    creds = load_credentials()
    if not creds:
        print("[-] Exiting: No burner credentials found.")
        return

    # Randomly select a burner to prevent single-account hammering
    burner = random.choice(creds)
    if burner['username'] == "YOUR_BURNER_1_USERNAME":
        print("[-] Please update 07_credentials/scrapers.json with real burner credentials.")
        return

    L = init_instaloader(burner['username'], burner['password'])
    if not L:
        return

    all_data = []
    
    for idx, target in enumerate(TARGET_ACCOUNTS):
        result = scrape_target(L, target)
        if result['posts']:
            all_data.append(result)
        
        # Determine if we need to sleep before the next profile
        if idx < len(TARGET_ACCOUNTS) - 1:
            human_jitter()

    # Save output
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(all_data, f, indent=4)
        
    print(f"[+] Scraping complete. Data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
