import asyncio
import edge_tts
import os
import sys

from pydub import AudioSegment
from pydub.generators import WhiteNoise

VOICE = "en-IN-NeerjaNeural"
RATE = "-10%"
PITCH = "-5Hz"
VOLUME = "+0%"

async def generate_raw_voice(script: str, filename: str):
    print("🎙️ Generating base voice...")
    communicate = edge_tts.Communicate(
        text=script, 
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
        volume=VOLUME
    )
    await communicate.save(filename)
    print("✅ Base voice generated.")

def humanize_audio(input_file: str, output_file: str):
    print("🛠️ Applying UGC Audio Fix (Pink Noise Masking & EQ)...")
    
    # Load the base AI voice
    voice = AudioSegment.from_file(input_file, format="mp3")
    
    # Generate white noise exactly the same length as the voice
    noise_gen = WhiteNoise()
    # Pydub generators return an infinite stream, so we take the exact duration (in milliseconds)
    noise = noise_gen.to_audio_segment(duration=len(voice))
    
    # Filter white noise to sound more like wind/pink noise and reduce volume heavily
    noise = noise.low_pass_filter(2000)
    noise = noise - 30
    
    # Slightly lower the high frequencies of the voice to mimic smartphone compression
    voice = voice.low_pass_filter(5000)
    
    # Overlay the voice on top of the noise
    humanized_voice = voice.overlay(noise)
    
    # Export it
    humanized_voice.export(output_file, format="mp3", bitrate="192k")
    print(f"🎉 Humanized audio successfully saved to: {output_file}")


if __name__ == "__main__":
    print("-" * 50)
    print("JASMINE :: UGC AUDIO FIX ENGINE")
    print("-" * 50)
    
    # We use explicit spelling and ellipses for SSML-like breath pauses
    sample_script = (
        "Guess where I'm hiking today? ... "
        "The air is so thin in Spiti valley ... "
        "but the view is completely worth it."
    )

    temp_file = "temp_voice.mp3"
    out_file = "/Users/user/Desktop/Instagram/jasmine_pov_hook_humanized.mp3"

    # 1. Generate Voice
    asyncio.run(generate_raw_voice(sample_script, temp_file))
    
    # 2. Apply Humanization
    try:
        humanize_audio(temp_file, out_file)
        # Cleanup
        if os.path.exists(temp_file):
            os.remove(temp_file)
    except Exception as e:
        print(f"Error during Audio processing: {e}. (Ensure ffmpeg is installed)")
