#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
IMAGE_GEN="$CODEX_HOME/skills/imagegen/scripts/image_gen.py"
MODEL="${IMAGE_GEN_MODEL:-gpt-image-1.5}"
CONCURRENCY="${IMAGE_GEN_CONCURRENCY:-2}"

if [[ -f "$ROOT_DIR/.env.local" ]]; then
  set -a
  source "$ROOT_DIR/.env.local"
  set +a
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is not set." >&2
  echo "Add it to $ROOT_DIR/.env.local or export it first, then rerun this script." >&2
  exit 1
fi

if [[ ! -f "$IMAGE_GEN" ]]; then
  echo "Image CLI not found at $IMAGE_GEN" >&2
  exit 1
fi

python3 - <<'PY'
import importlib.util
import sys
if not importlib.util.find_spec("openai"):
    print("The Python openai package is not installed in the active environment.", file=sys.stderr)
    print("Install it with: python3 -m pip install --user openai", file=sys.stderr)
    raise SystemExit(1)
PY

mkdir -p \
  "$ROOT_DIR/source-images/hero" \
  "$ROOT_DIR/source-images/listings" \
  "$ROOT_DIR/source-images/sections"

python3 "$IMAGE_GEN" generate-batch \
  --model "$MODEL" \
  --input "$ROOT_DIR/prompts/urban-nest-hero.jsonl" \
  --out-dir "$ROOT_DIR/source-images/hero" \
  --output-format png \
  --concurrency "$CONCURRENCY" \
  --force \
  --no-augment

python3 "$IMAGE_GEN" generate-batch \
  --model "$MODEL" \
  --input "$ROOT_DIR/prompts/urban-nest-listings.jsonl" \
  --out-dir "$ROOT_DIR/source-images/listings" \
  --output-format png \
  --concurrency "$CONCURRENCY" \
  --force \
  --no-augment

python3 "$IMAGE_GEN" generate-batch \
  --model "$MODEL" \
  --input "$ROOT_DIR/prompts/urban-nest-sections.jsonl" \
  --out-dir "$ROOT_DIR/source-images/sections" \
  --output-format png \
  --concurrency "$CONCURRENCY" \
  --force \
  --no-augment

"$ROOT_DIR/scripts/optimize-images.sh"
