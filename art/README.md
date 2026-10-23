# Solora clay art

These are the 3D claymorphic illustrations for Tierly, Mixly and Swatchbox (`<repo>/public/art/`). Every image is rendered with three.js in headless Chromium on the GPU. All of them share one camera angle, one lighting rig and one set of materials, set in `LOOK` in `studio.js`.

| File | Role |
|---|---|
| `studio.js` | The renderer, camera and lights, plus the materials (`clay`, `gradient`) and geometry helpers (`pillow`, `rbox`, `tube`, `lathe`). |
| `objects.js` | The objects: gear, toggle, shield, puzzle, bulb, rocket, tier steps, price tag, gift box, bundle card, product card, swatches. |
| `scenes.js` | The still compositions per app. `animations.js` holds the two animated scenes. |
| `index.html`, `main.js`, `serve.mjs` | The page shell and the route both renderers use to serve it. |
| `render.mjs` | Renders the stills. |

## How it renders

`Studio.draw()` takes the average of N passes, 384 for a still and 112 for an animation frame. Each pass moves the camera by a sub-pixel amount and moves one shadow-casting light. Even passes are the key light, jittered over a small disc, so shadows come out soft. Odd passes come from a sky dome, which gives the soft ambient occlusion. The passes are summed in a float target, and the result is then tone-mapped (Khronos PBR Neutral), dithered, and written to a canvas with premultiplied alpha.

## Re-render

Run these from the `solora` repo. They need network access, because three.js `0.170.0` loads from jsDelivr.

```
node art/render.mjs                      # all stills, all apps
node art/render.mjs tierly/settings-hero # one still
node art/render.mjs mixly/ --probe=<dir> # PNG probes, nothing written to the apps
node scripts/capture/capture.mjs art/    # the 6 animations (see scenes/art.mjs)
node scripts/capture/capture.mjs art/swatchbox-feature-hero
```

**Stills**
- Display size is 560×420 for the heroes, 400×300 for `feature-empty` and 160×160 for the steps.
- Each one is rendered at 4× and downsampled with lanczos to 2×. The output is lossless webp with a transparent background.

**Animations**
- They are rendered at 960×600, 1920×1200 on the canvas, and go through the capture kit. The scene definitions are in `scripts/capture/scenes/art.mjs`.
- The background is an opaque soft card that fades to white at the edges. Transparent alpha made each file 3.8 MB or more, and the opaque card brings that down to about 0.6 MB.
- Frames are lossy webp at quality 92. The `-still.webp` is lossless and rendered at 384 passes with no motion blur.
- The art scenes use the app key `art`, so filters such as `tierly/` do not re-render them.

**What the kit gained.** Each of these is an option a scene can set; the defaults are unchanged:
- `scene.launch`: browser launch arguments. The art scenes use it for the GPU flags.
- `scene.dir` and `scene.file`: the output location.
- `scene.recorder`: `{ omitBackground }`.
- `scene.encode`: `quality`, `stillWidth` and `stillLossless`.
