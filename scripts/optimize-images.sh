#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="$ROOT_DIR/prompts/urban-nest-image-pack.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "Manifest not found: $MANIFEST" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required but not installed." >&2
  exit 1
fi

export ROOT_DIR

python3 - <<'PY'
import json
import os
import subprocess
import sys
from pathlib import Path

root = Path(os.environ["ROOT_DIR"])
manifest_path = root / "prompts" / "urban-nest-image-pack.json"
with manifest_path.open() as fh:
    manifest = json.load(fh)

missing = []
processed = []

for asset in manifest["assets"]:
    source = root / asset["source_dir"] / asset["master_filename"]
    output = root / asset["output_dir"] / asset["output_filename"]
    output.parent.mkdir(parents=True, exist_ok=True)

    if not source.exists():
        missing.append(str(source.relative_to(root)))
        continue

    source_for_webp = source
    if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        converted = source.with_suffix(".png")
        subprocess.run(
            ["sips", "-s", "format", "png", str(source), "--out", str(converted)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        source_for_webp = converted

    subprocess.run(
        ["cwebp", "-q", "84", str(source_for_webp), "-o", str(output)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    processed.append((source.relative_to(root), output.relative_to(root)))

    if source_for_webp != source and source_for_webp.exists():
        source_for_webp.unlink()

if missing:
    print("Missing source masters:")
    for item in missing:
        print(f" - {item}")

if processed:
    print("Optimized assets:")
    for source, output in processed:
        print(f" - {source} -> {output}")

if missing:
    sys.exit(2)
PY
