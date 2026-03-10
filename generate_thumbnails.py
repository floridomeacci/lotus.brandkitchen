from __future__ import annotations

import json
import os
import subprocess
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

API_URL = "https://api.replicate.com/v1/models/bytedance/seedream-5-lite/predictions"

PROMPTS = {
    "content-kalender": "premium cinematic automotive campaign planning board, editorial calendar dashboard on tablet and wall glass panel, yellow accent highlights, dark luxury studio lighting, depth of field, ultra clean composition, photoreal, no text, no logos",
    "asset-scaler": "high-end automotive key visual shown across many devices and ad formats, phone tablet laptop outdoor billboard, precise scaling workflow, dark premium desk scene with yellow accents, photoreal, cinematic, no text, no logos",
    "brand-guardian": "luxury automotive brand guardian concept, strategist silhouette observing multiple moodboards and compliance overlays, moody dark environment, selective yellow highlights, refined and minimal, photoreal, no text, no logos",
    "briefing-agent": "creative briefing agent scene, premium workspace with voice assistant waveform hologram and campaign notes, automotive visuals on screens, calm cinematic lighting, dark background with subtle yellow accents, photoreal, no text, no logos",
    "edges": "futuristic yellow sports car in dramatic low-light studio, sharp body lines and reflective surfaces, premium automotive advertising style, cinematic contrast, dark scene, photoreal, no text, no logos",
}


def post_prediction(token: str, prompt: str) -> dict:
    payload = {
        "input": {
            "aspect_ratio": "21:9",
            "image_input": [],
            "max_images": 1,
            "output_format": "png",
            "prompt": prompt,
            "sequential_image_generation": "disabled",
            "size": "2K",
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = Request(
        API_URL,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Prefer": "wait",
        },
        method="POST",
    )
    with urlopen(req, timeout=180) as resp:
        body = resp.read().decode("utf-8", "ignore")
    return json.loads(body)


def download(url: str, file_path: Path) -> None:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=180) as resp:
        file_path.write_bytes(resp.read())


def resize_thumbnail(source: Path, target: Path, max_size: int = 840) -> None:
    subprocess.run(
        ["sips", "-Z", str(max_size), str(source), "--out", str(target)],
        check=True,
        capture_output=True,
    )


def extract_output_url(response_json: dict) -> str | None:
    output = response_json.get("output")
    if isinstance(output, list) and output:
        return output[0]
    if isinstance(output, str):
        return output
    return None


def main() -> int:
    token = os.getenv("REPLICATE_API_TOKEN")
    if not token:
        print("Missing REPLICATE_API_TOKEN")
        return 1

    root = Path.cwd()
    generated_dir = root / "assets" / "generated"
    thumbs_dir = root / "assets" / "thumbnails"
    generated_dir.mkdir(parents=True, exist_ok=True)
    thumbs_dir.mkdir(parents=True, exist_ok=True)

    for slug, prompt in PROMPTS.items():
        print(f"Generating {slug}...")
        try:
            response_json = post_prediction(token, prompt)
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
            print(f"  Failed request for {slug}: {exc}")
            continue

        response_file = generated_dir / f"{slug}.response.json"
        response_file.write_text(json.dumps(response_json, indent=2), encoding="utf-8")

        output_url = extract_output_url(response_json)
        if not output_url:
            print(f"  No output URL for {slug}")
            continue

        image_file = generated_dir / f"{slug}.png"
        thumb_file = thumbs_dir / f"{slug}-thumb.png"

        try:
            download(output_url, image_file)
            resize_thumbnail(image_file, thumb_file)
        except Exception as exc:
            print(f"  Failed file processing for {slug}: {exc}")
            continue

        print(f"  Saved {image_file}")
        print(f"  Saved {thumb_file}")
        time.sleep(0.5)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
