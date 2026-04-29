import json
import re

# Fix the Character Bible
bible_path = '/Users/user/Desktop/Instagram/01_characters/jasmine/jasmine_character_bible.json'
with open(bible_path, 'r') as f:
    bible = json.loads(f.read())
if "" in bible:
    del bible[""]
with open(bible_path, 'w') as f:
    f.write(json.dumps(bible, indent=2))

# Fix the batch generator script
script_path = '/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/generation/jasmine_batch_generator.py'
with open(script_path, 'r') as f:
    script = f.read()

# Remove specific tattoo/mole strings
script = script.replace('    "Small dark beauty mark mole on center of chest. "\\n', '')
script = script.replace('    "Small red lipstick kiss mark tattoo located right above her deep cleavage on upper chest. "\\n', '')
script = script.replace('    "Small black cross tattoo on front right collarbone. "\\n', '')

with open(script_path, 'w') as f:
    f.write(script)

# Fix the prompt batch JSON
prompts_path = '/Users/user/Desktop/Instagram/03_ai_models/jasmine_mako/generation/jasmine_prompts_batch1.json'
with open(prompts_path, 'r') as f:
    prompts = json.loads(f.read())

to_remove = [
    ", chest beauty mark visible, red kiss tattoo above cleavage visible",
    ", red kiss tattoo above cleavage visible",
    ", chest beauty mark visible",
    ", red kiss tattoo and chest mole clearly visible",
    ", red kiss tattoo and chest mole visible",
    ", red kiss tattoo above cleavage",
    ", red kiss tattoo prominently visible, chest mole and distinguishing marks all visible",
    ", red kiss tattoo fully visible",
    ", chest mole and distinguishing marks all visible",
    ", red kiss tattoo visible"
]

for p in prompts:
    if 'scene' in p:
        # manual cleanups
        for tr in to_remove:
            p['scene'] = p['scene'].replace(tr, '')
            p['scene'] = p['scene'].replace("  ", " ") # clean double spaces
        
        # some prompts just say "red kiss tattoo above cleavage visible" or so.
        # Let's also do generic regex
        p['scene'] = re.sub(r'red kiss tattoo[^,]*,?', '', p['scene'])
        p['scene'] = re.sub(r'chest mole[^,]*,?', '', p['scene'])
        p['scene'] = re.sub(r'beauty mark[^,]*,?', '', p['scene'])
        p['scene'] = p['scene'].replace(' ,', ',').replace(',,', ',').replace('  ', ' ')

with open(prompts_path, 'w') as f:
    f.write(json.dumps(prompts, indent=2))

print("Sanitization complete.")
