import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { SITE_DIR } from './site.mjs'

export const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="clBg" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F56F0B"/><stop offset="1" stop-color="#EC377E"/>
    </linearGradient>
    <mask id="clGap" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="1200">
      <rect width="1200" height="1200" fill="#fff"/><circle cx="600" cy="600" r="312" fill="#000"/>
    </mask>
    <mask id="clCheck" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="1200">
      <rect width="1200" height="1200" fill="#fff"/>
      <path d="M484 608 L562 686 L720 528" fill="none" stroke="#000" stroke-width="82" stroke-linecap="round" stroke-linejoin="round"/>
    </mask>
  </defs>
  <rect width="1200" height="1200" fill="url(#clBg)"/>
  <g transform="translate(600 600) scale(.84) translate(-600 -600)">
    <g mask="url(#clGap)" fill="#FFFFFF">
      <circle cx="286" cy="600" r="212"/>
      <circle cx="914" cy="600" r="212"/>
    </g>
    <circle cx="600" cy="600" r="262" fill="#FFFFFF" mask="url(#clCheck)"/>
  </g>
</svg>
`

const rasterise = (size) =>
  sharp(Buffer.from(ICON_SVG), { density: 72 * 4 })
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9, palette: size <= 256 })
    .toBuffer()

export const renderIcon = async () => {
  await writeFile(path.join(SITE_DIR, 'public', 'solora-combined-listings.svg'), ICON_SVG)
  await writeFile(path.join(SITE_DIR, 'public', 'solora-combined-listings-1200.png'), await rasterise(1200))
  await writeFile(path.join(SITE_DIR, 'public', 'solora-combined-listings.png'), await rasterise(256))
}
