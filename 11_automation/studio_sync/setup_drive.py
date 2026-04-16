#!/usr/bin/env python3
"""
Studio Sync — Step 1: Create VirtualInfluencerStudio folder on contact.rheavoss@gmail.com Drive
Uses gws CLI directly (already authenticated) for all API calls instead of extracting tokens.
"""
import json, subprocess, os, sys

GWS = os.path.expanduser("~/.local/bin/gws")
PROJECT_DIR = os.path.expanduser("~/Desktop/Instagram")
CONFIG_DIR = os.path.join(PROJECT_DIR, "11_automation/studio_sync")

def gws_call(args):
    """Call gws CLI and return parsed JSON response."""
    env = {**os.environ, "PATH": os.environ.get("PATH", "") + ":/Users/user/.local/bin"}
    result = subprocess.run([GWS] + args, capture_output=True, text=True, env=env)
    if result.returncode != 0:
        print(f"  ⚠️  gws error: {result.stdout[:200]}")
        return None
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        return result.stdout.strip()

def find_folder(name, parent_id=None):
    """Find a Drive folder by name, optionally within a parent."""
    q = f"name='{name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    if parent_id:
        q += f" and '{parent_id}' in parents"
    params = json.dumps({"q": q, "fields": "files(id,name)", "pageSize": 5})
    result = gws_call(["drive", "files", "list", "--params", params])
    if result and "files" in result and result["files"]:
        return result["files"][0]
    return None

def create_folder(name, parent_id=None):
    """Create a Drive folder, return its ID."""
    # Check if exists first
    existing = find_folder(name, parent_id)
    if existing:
        print(f"  ↩️  Already exists: {name} (ID: {existing['id']})")
        return existing["id"]
    
    body = {"name": name, "mimeType": "application/vnd.google-apps.folder"}
    if parent_id:
        body["parents"] = [parent_id]
    
    result = gws_call(["drive", "files", "create", "--json", json.dumps(body)])
    if result and "id" in result:
        print(f"  ✅ Created: {name} (ID: {result['id']})")
        return result["id"]
    return None

if __name__ == "__main__":
    print("🚀 Setting up VirtualInfluencerStudio on Google Drive (contact.rheavoss@gmail.com)")
    print("=" * 60)

    # Step 1: Create root folder
    print("\n📁 Creating root folder...")
    root_id = create_folder("VirtualInfluencerStudio")
    if not root_id:
        print("❌ Failed to create root folder. Check gws Drive API access.")
        sys.exit(1)

    # Step 2: Create subfolders
    print("\n📁 Creating subfolders...")
    subfolders = {
        "datasets": None,
        "reference_images": None,
        "ai_models": None,
        "characters": None,
        "strategy_docs": None,
    }
    for name in subfolders:
        subfolders[name] = create_folder(name, root_id)

    # Step 3: Save config
    os.makedirs(CONFIG_DIR, exist_ok=True)
    config = {
        "account": "contact.rheavoss@gmail.com",
        "root_folder_id": root_id,
        "root_folder_name": "VirtualInfluencerStudio",
        "subfolders": subfolders,
        "drive_url": f"https://drive.google.com/drive/folders/{root_id}"
    }
    config_path = os.path.join(CONFIG_DIR, "drive_config.json")
    with open(config_path, "w") as f:
        json.dump(config, f, indent=2)

    print(f"\n✅ Drive setup complete!")
    print(f"🔗 Drive URL: {config['drive_url']}")
    print(f"📄 Config: {config_path}")
    print(f"📦 Root Folder ID: {root_id}")
