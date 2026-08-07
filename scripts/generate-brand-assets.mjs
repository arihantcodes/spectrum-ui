import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import JSZip from 'jszip';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'public', 'brand');

// The canonical Spectrum UI mark — same two paths as components/icon.tsx and
// app/icon.svg, on the tight 35.2821 x 40.1001 bounding box.
const MARK_W = 35.2821;
const MARK_H = 40.1001;
const MARK_PATHS = [
  'M17.641 33.4291L11.563 27.3511C7.26395 23.052 0 26.091 0 32.169V40.1001H35.2821V15.7881L17.641 33.4291Z',
  'M17.641 6.67098L23.719 12.749C28.0181 17.0481 35.2821 14.0091 35.2821 7.93105V0H0V24.312L17.641 6.67098Z',
];

// "SPECTRUM UI" outlined from GeistMono-Medium.ttf (node_modules/geist) at
// 64px with +2px tracking, baseline pre-positioned for the lockup below —
// the navbar brand treatment at 4x scale (28px chip / 16px text becomes
// 112px chip / 64px text). Regenerate with fontTools if the name or type
// treatment ever changes.
const WORDMARK_TEXT_PATH = 'M171.78 79.74Q166.85 79.74 163.17 77.76Q159.49 75.78 157.31 72.22Q155.14 68.67 154.75 63.94L161.66 63.49Q162.3 68.35 164.99 70.91Q167.68 73.47 172.03 73.47Q176.19 73.47 178.46 71.84Q180.74 70.21 180.74 67.14Q180.74 65.15 179.81 63.68Q178.88 62.21 176.35 60.93Q173.82 59.65 169.02 58.3Q164.35 57.02 161.44 55.39Q158.53 53.76 157.15 51.36Q155.78 48.96 155.78 45.44Q155.78 39.55 159.84 35.9Q163.9 32.26 171.07 32.26Q178.18 32.26 182.21 36.32Q186.24 40.38 186.88 46.98L179.97 47.36Q179.46 43.46 177.22 40.99Q174.98 38.53 170.88 38.53Q167.1 38.53 164.9 40.32Q162.69 42.11 162.69 45.12Q162.69 47.1 163.58 48.38Q164.48 49.66 166.72 50.69Q168.96 51.71 172.99 52.8Q178.43 54.27 181.63 56.19Q184.83 58.11 186.24 60.77Q187.65 63.42 187.65 67.14Q187.65 70.91 185.66 73.76Q183.68 76.61 180.13 78.18Q176.58 79.74 171.78 79.74ZM197.9 78.72V33.28H211.98Q216.72 33.28 220.27 35.01Q223.82 36.74 225.78 39.9Q227.73 43.07 227.73 47.42Q227.73 51.78 225.78 54.94Q223.82 58.11 220.27 59.81Q216.72 61.5 211.98 61.5H204.62V78.72ZM204.62 55.17H211.28Q216.14 55.17 218.45 53.18Q220.75 51.2 220.75 47.42Q220.75 43.58 218.45 41.6Q216.14 39.62 211.28 39.62H204.62ZM238.43 78.72V33.28H266.34V39.62H245.15V52.86H265.57V59.01H245.15V72.38H266.85V78.72ZM292.59 79.74Q287.09 79.74 283.28 76.86Q279.47 73.98 277.49 68.67Q275.5 63.36 275.5 56.06Q275.5 48.7 277.49 43.36Q279.47 38.02 283.28 35.14Q287.09 32.26 292.59 32.26Q298.8 32.26 303.02 36.32Q307.25 40.38 308.66 47.81L301.62 48.19Q300.66 43.46 298.26 40.99Q295.86 38.53 292.59 38.53Q287.66 38.53 285.07 43.1Q282.48 47.68 282.48 56.06Q282.48 64.45 285.07 68.96Q287.66 73.47 292.59 73.47Q296.11 73.47 298.61 70.78Q301.1 68.1 301.94 62.91L308.91 63.23Q307.76 71.04 303.44 75.39Q299.12 79.74 292.59 79.74ZM329.47 78.72V39.62H316.16V33.28H349.44V39.62H336.13V78.72ZM358.29 78.72V33.28H372.43Q379.6 33.28 383.76 36.93Q387.92 40.58 387.92 46.85Q387.92 50.94 385.65 53.79Q383.38 56.64 380.24 57.6Q383.57 58.24 385.26 60.19Q386.96 62.14 387.28 65.79L388.43 78.72H381.71L380.69 67.07Q380.43 63.68 378.8 62.34Q377.17 60.99 372.94 60.99H365.01V78.72ZM365.01 54.72H372.3Q376.53 54.72 378.77 52.74Q381.01 50.75 381.01 47.17Q381.01 43.52 378.77 41.57Q376.53 39.62 372.3 39.62H365.01ZM413.6 79.74Q406.37 79.74 402.24 75.3Q398.11 70.85 398.11 62.91V33.28H404.83V63.17Q404.83 68.16 407.07 70.82Q409.31 73.47 413.6 73.47Q417.89 73.47 420.13 70.82Q422.37 68.16 422.37 63.17V33.28H429.09V62.91Q429.09 70.85 424.96 75.3Q420.83 79.74 413.6 79.74ZM451.44 73.22 444.34 43.65V78.72H437.87V33.28H446.83L454 62.66L461.17 33.28H470.13V78.72H463.66V43.65L456.56 73.22ZM534.8 79.74Q527.57 79.74 523.44 75.3Q519.31 70.85 519.31 62.91V33.28H526.03V63.17Q526.03 68.16 528.27 70.82Q530.51 73.47 534.8 73.47Q539.09 73.47 541.33 70.82Q543.57 68.16 543.57 63.17V33.28H550.29V62.91Q550.29 70.85 546.16 75.3Q542.03 79.74 534.8 79.74ZM560.99 78.72V72.38H571.87V39.62H560.99V33.28H589.41V39.62H578.53V72.38H589.41V78.72Z';

// Lockup geometry (all px): chip + gap + 11 mono glyphs.
const CHIP = 112;
const CHIP_RADIUS = 24;
const GAP = 40;
const TEXT_WIDTH = 442.4;
const WORDMARK_W = CHIP + GAP + TEXT_WIDTH; // 594.4
const WORDMARK_H = CHIP;

const INK = '#0A0A0A';
const PAPER = '#FFFFFF';

function markSvg({ fill, width, height }) {
  const size =
    width && height ? ` width="${width}" height="${height}"` : ` width="${MARK_W}" height="${MARK_H}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg"${size} viewBox="0 0 ${MARK_W} ${MARK_H}" fill="none">
  <path d="${MARK_PATHS[0]}" fill="${fill}"/>
  <path d="${MARK_PATHS[1]}" fill="${fill}"/>
</svg>
`;
}

function wordmarkSvg({ chip, glyph, text, width, height }) {
  const size =
    width && height ? ` width="${width}" height="${height}"` : ` width="${WORDMARK_W}" height="${WORDMARK_H}"`;
  // Mark scaled to a 64px-tall glyph centred in the chip.
  const glyphScale = 64 / MARK_H;
  const glyphX = (CHIP - MARK_W * glyphScale) / 2;
  const glyphY = (CHIP - 64) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg"${size} viewBox="0 0 ${WORDMARK_W} ${WORDMARK_H}" fill="none">
  <rect width="${CHIP}" height="${CHIP}" rx="${CHIP_RADIUS}" fill="${chip}"/>
  <g transform="translate(${glyphX.toFixed(2)} ${glyphY}) scale(${glyphScale.toFixed(5)})">
    <path d="${MARK_PATHS[0]}" fill="${glyph}"/>
    <path d="${MARK_PATHS[1]}" fill="${glyph}"/>
  </g>
  <path d="${WORDMARK_TEXT_PATH}" fill="${text}"/>
</svg>
`;
}

const PNG_MARK = { width: 901, height: 1024 };
const PNG_WORDMARK = { width: 2400, height: 452 };

const ASSETS = [
  {
    file: 'spectrum-ui-mark-dark.svg',
    svg: markSvg({ fill: INK }),
  },
  {
    file: 'spectrum-ui-mark-dark.png',
    svg: markSvg({ fill: INK, ...PNG_MARK }),
  },
  {
    file: 'spectrum-ui-mark-light.svg',
    svg: markSvg({ fill: PAPER }),
  },
  {
    file: 'spectrum-ui-mark-light.png',
    svg: markSvg({ fill: PAPER, ...PNG_MARK }),
  },
  {
    file: 'spectrum-ui-wordmark-dark.svg',
    svg: wordmarkSvg({ chip: INK, glyph: PAPER, text: INK }),
  },
  {
    file: 'spectrum-ui-wordmark-dark.png',
    svg: wordmarkSvg({ chip: INK, glyph: PAPER, text: INK, ...PNG_WORDMARK }),
  },
  {
    file: 'spectrum-ui-wordmark-light.svg',
    svg: wordmarkSvg({ chip: PAPER, glyph: INK, text: PAPER }),
  },
  {
    file: 'spectrum-ui-wordmark-light.png',
    svg: wordmarkSvg({ chip: PAPER, glyph: INK, text: PAPER, ...PNG_WORDMARK }),
  },
];

const README = `Spectrum UI brand assets
========================

Logo mark and wordmark, each in dark (for light backgrounds) and light
(for dark backgrounds), as SVG and transparent PNG.

Please keep the mark's shape, proportions, and colors as shipped — don't
redraw, recolor, or add effects.

Website  https://ui.spectrumhq.in
Brand    https://ui.spectrumhq.in/brandkit
GitHub   https://github.com/arihantcodes/spectrum-ui
X        https://x.com/arihantcodes
`;

async function main() {
  mkdirSync(outputDir, { recursive: true });

  const zip = new JSZip();
  // Fixed timestamp so re-running the generator never dirties the zip.
  const zipDate = new Date('2026-08-07T00:00:00Z');
  zip.file('README.txt', README, { date: zipDate });

  for (const asset of ASSETS) {
    let contents;
    if (asset.file.endsWith('.png')) {
      contents = await sharp(Buffer.from(asset.svg)).png().toBuffer();
    } else {
      contents = Buffer.from(asset.svg);
    }
    writeFileSync(path.join(outputDir, asset.file), contents);
    zip.file(asset.file, contents, { date: zipDate });
    console.log(`wrote public/brand/${asset.file} (${contents.length} bytes)`);
  }

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  writeFileSync(path.join(outputDir, 'spectrum-ui-brand-kit.zip'), zipBuffer);
  console.log(`wrote public/brand/spectrum-ui-brand-kit.zip (${zipBuffer.length} bytes)`);
}

await main();
