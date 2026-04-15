# UrbanNest Asset Workspace

This workspace contains the image-pack scaffold for the UrbanNest MVP.

The built-in image generation tool is not exposed in this session, so the
project currently includes:

- final asset destination folders under `public/images/`
- source master folders under `source-images/`
- a prompt manifest for the first nine generated assets
- a script to convert source images into optimized `.webp` assets

## Folder layout

- `public/images/hero/`
- `public/images/listings/`
- `public/images/sections/`
- `source-images/hero/`
- `source-images/listings/`
- `source-images/sections/`
- `prompts/urban-nest-image-pack.json`
- `scripts/optimize-images.sh`

## How to use this

1. Generate or source the master images using the prompts in
   `prompts/urban-nest-image-pack.json`.
2. Save the chosen masters into the matching `source-images/` folder with the
   exact filenames from the manifest.
3. Run `./scripts/optimize-images.sh`.
4. The optimized `.webp` files will be written into `public/images/`.

## Notes

- The asset pack is Nairobi-inspired and portfolio-safe.
- All prompts are written for clean, text-free, watermark-free imagery.
- The current pack is for the public MVP only, not full listing galleries.
