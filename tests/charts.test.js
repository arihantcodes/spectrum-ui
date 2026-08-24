/**
 * Guards the Charts library against the failure that shipped in #137: every
 * chart rendered with no axes, no gridlines and no tick labels, and the
 * candlestick rendered nothing at all.
 *
 * Recharts dispatches its children by `getDisplayName(child.type)`. Anything
 * that is not the literal `XAxis` / `YAxis` / `CartesianGrid` element as a
 * DIRECT child — a styled wrapper component, or a `<>…</>` fragment — matches
 * nothing and is silently dropped. TypeScript and ESLint both pass while the
 * chart loses its axes, so the invariant has to be asserted here.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { BarChart, Bar, XAxis, YAxis, CartesianGrid } = require('recharts');

const projectRoot = path.resolve(__dirname, '..');
const chartsDir = path.join(projectRoot, 'app', 'registry', 'charts');

/* -- 1. The mechanism, pinned ------------------------------------------- */

const data = [
  { month: 'Jan', v: 10 },
  { month: 'Feb', v: 30 },
  { month: 'Mar', v: 20 },
];
const h = React.createElement;
const count = (markup, cls) => (markup.match(new RegExp(cls, 'g')) || []).length;

function WrappedXAxis(props) {
  return h(XAxis, { axisLine: false, ...props });
}

const wrapped = renderToStaticMarkup(
  h(
    BarChart,
    { width: 400, height: 200, data },
    h(WrappedXAxis, { dataKey: 'month' }),
    h(Bar, { dataKey: 'v', isAnimationActive: false }),
  ),
);
const fragmented = renderToStaticMarkup(
  h(
    BarChart,
    { width: 400, height: 200, data },
    h(React.Fragment, null, h(XAxis, { dataKey: 'month' })),
    h(Bar, { dataKey: 'v', isAnimationActive: false }),
  ),
);
const direct = renderToStaticMarkup(
  h(
    BarChart,
    { width: 400, height: 200, data },
    h(CartesianGrid, { vertical: false }),
    h(XAxis, { dataKey: 'month', axisLine: false }),
    h(Bar, { dataKey: 'v', isAnimationActive: false }),
  ),
);

assert.equal(count(wrapped, 'recharts-xAxis'), 0, 'A wrapped axis is dropped by Recharts');
assert.equal(count(fragmented, 'recharts-xAxis'), 0, 'A fragment-wrapped axis is dropped too');
assert.ok(count(direct, 'recharts-xAxis') >= 1, 'A direct axis renders');
assert.ok(count(direct, 'recharts-cartesian-grid') >= 1, 'A direct grid renders');
assert.ok(
  count(direct, 'recharts-cartesian-axis-tick-value') >= data.length,
  'A direct axis renders one tick label per category',
);

/* -- 2. No chart may reintroduce an axis wrapper ------------------------- */

const chartFiles = fs
  .readdirSync(chartsDir)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => ({ file, source: fs.readFileSync(path.join(chartsDir, file), 'utf8') }));

assert.ok(chartFiles.length > 0, 'Expected chart sources in app/registry/charts');

for (const { file, source } of chartFiles) {
  const code = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  for (const wrapper of ['ChartXAxis', 'ChartYAxis', 'ChartGrid']) {
    assert.ok(
      !new RegExp(`function\\s+${wrapper}\\b`).test(code),
      `${file}: ${wrapper} must be a prop object, not a component — Recharts drops wrapper components`,
    );
    assert.ok(
      !new RegExp(`<${wrapper}\\b`).test(code),
      `${file}: <${wrapper}> is dropped by Recharts; spread the prop object onto the real element`,
    );
  }

  // Axes and grids must never sit inside a fragment: same dispatch failure.
  for (const fragment of code.match(/<>[\s\S]*?<\/>/g) || []) {
    for (const element of ['XAxis', 'YAxis', 'CartesianGrid']) {
      assert.ok(
        !new RegExp(`<${element}\\b`).test(fragment),
        `${file}: <${element}> inside a <>…</> fragment is dropped by Recharts — hoist it to a direct child and switch its props instead`,
      );
    }
  }
}

/* -- 3. Cartesian charts must actually declare axes ---------------------- */

const CARTESIAN = [
  'bar-chart.tsx',
  'line-chart.tsx',
  'area-chart.tsx',
  'composed-chart.tsx',
  'candlestick-chart.tsx',
  'price-chart.tsx',
];

for (const file of CARTESIAN) {
  const source = fs.readFileSync(path.join(chartsDir, file), 'utf8');
  for (const element of ['XAxis', 'YAxis', 'CartesianGrid']) {
    assert.ok(
      new RegExp(`<${element}[\\s\\n{/>]`).test(source),
      `${file}: must render a real <${element}>`,
    );
  }
}

/* -- 4. Up and down must be visually distinct ---------------------------- */

const kit = fs.readFileSync(path.join(chartsDir, 'chart-kit.tsx'), 'utf8');
const up = kit.match(/--spectrum-chart-up:(#[0-9a-fA-F]{3,8})/g) || [];
const down = kit.match(/--spectrum-chart-down:(#[0-9a-fA-F]{3,8})/g) || [];
assert.ok(up.length > 0 && down.length > 0, 'chart-kit must define literal up/down colors');
for (let i = 0; i < Math.min(up.length, down.length); i += 1) {
  assert.notEqual(
    up[i].split(':')[1],
    down[i].split(':')[1],
    'Gain and loss must not resolve to the same color',
  );
}

/* -- 5. The SVG market family stays dependency-free ---------------------- */

const SVG_CHARTS = [
  'market-chart',
  'indicator-chart',
  'depth-chart',
  'order-book',
  'portfolio-chart',
  'market-heatmap',
  'calendar-heatmap',
  'cohort-chart',
  'stat-cards',
  'histogram-chart',
];

for (const name of SVG_CHARTS) {
  const source = fs.readFileSync(path.join(chartsDir, `${name}.tsx`), 'utf8');
  assert.ok(
    !/from\s+'recharts'/.test(source),
    `${name} owns its renderer; pulling in Recharts reintroduces the Customized trap`,
  );

  const payloadPath = path.join(projectRoot, 'public', 'r', `${name}.json`);
  assert.ok(fs.existsSync(payloadPath), `${name} registry payload must exist`);
  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  assert.ok(
    !payload.dependencies || payload.dependencies.length === 0,
    `${name} must not declare charting dependencies`,
  );
  assert.ok(
    payload.files.some((file) => file.path.endsWith('chart-engine.tsx')),
    `${name} must ship chart-engine alongside it or it will not compile once installed`,
  );
}

/* -- 5b. Token classes must define every token the charts reference ------ */

// UP / DOWN resolved to undefined CSS vars under `seriesVarsClassName`, so the
// gauge arc, the waterfall deltas and the funnel drop-off labels all painted
// black. Nothing in TypeScript or ESLint can see a missing custom property.
const engine = fs.readFileSync(path.join(chartsDir, 'chart-engine.tsx'), 'utf8');
const REQUIRED_TOKENS = ['--spectrum-chart-up', '--spectrum-chart-down', '--spectrum-chart-surface'];

for (const varsName of ['marketVarsClassName', 'seriesVarsClassName']) {
  const declaration = engine.match(new RegExp(`export const ${varsName}\\s*=\\s*\n?\\s*'([^']+)'`));
  assert.ok(declaration, `chart-engine must export ${varsName}`);
  for (const token of REQUIRED_TOKENS) {
    assert.ok(
      declaration[1].includes(`${token}:`),
      `${varsName} must define ${token} — charts using UP/DOWN/SURFACE under it paint with an invalid value`,
    );
    assert.ok(
      declaration[1].includes(`dark:[${token}:`),
      `${varsName} must define ${token} for dark mode too`,
    );
  }
}

// Any chart that references a token constant must apply a class that defines it.
for (const name of SVG_CHARTS) {
  const source = fs.readFileSync(path.join(chartsDir, `${name}.tsx`), 'utf8');
  if (!/\b(UP|DOWN|SURFACE)\b/.test(source)) continue;
  assert.ok(
    /marketVarsClassName|seriesVarsClassName/.test(source),
    `${name} uses UP/DOWN/SURFACE but applies no token class`,
  );
}

/* -- 5c. Every chart must expose the four states ------------------------- */

// A chart with no loading or empty state is a chart that renders a blank frame
// the first time a real API is slow or returns nothing.
for (const name of SVG_CHARTS) {
  const source = fs.readFileSync(path.join(chartsDir, `${name}.tsx`), 'utf8');
  assert.ok(
    /status\?: ChartStatus/.test(source),
    `${name} must accept a \`status\` prop`,
  );
  assert.ok(
    /<ChartState/.test(source),
    `${name} must route through <ChartState> so loading/empty/error stay consistent`,
  );
}

// Scrubbing charts block only the axis they scrub on, or a drag across the
// chart traps the page scroll on touch devices.
for (const name of SVG_CHARTS) {
  const source = fs.readFileSync(path.join(chartsDir, `${name}.tsx`), 'utf8');
  assert.ok(
    !/touch-none/.test(source),
    `${name}: touch-none swallows vertical page scroll — use touch-pan-y`,
  );
}

/* -- 6. Every catalogued chart resolves to a page and a registry item ---- */

const catalogSource = fs.readFileSync(path.join(projectRoot, 'lib', 'chart-library.ts'), 'utf8');
const slugs = [...catalogSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const registryNames = [...catalogSource.matchAll(/registryName:\s*'([^']+)'/g)].map((m) => m[1]);
assert.equal(slugs.length, registryNames.length, 'Every chart needs a registryName');

const registry = JSON.parse(fs.readFileSync(path.join(projectRoot, 'registry.json'), 'utf8'));
const registered = new Set(registry.items.map((item) => item.name));

for (let i = 0; i < slugs.length; i += 1) {
  const page = path.join(projectRoot, 'app', 'charts', '(library)', slugs[i], 'page.tsx');
  assert.ok(fs.existsSync(page), `/charts/${slugs[i]} must have a page.tsx`);
  assert.ok(
    registered.has(registryNames[i]),
    `${registryNames[i]} must be in registry.json or the CLI 404s`,
  );
}

/* -- 7. The /charts index must cover every catalogued chart ------------- */

// A missing cell is invisible in review — the grid just renders one fewer
// tile, and in a 2-up layout it also leaves a hole in the last row.
const indexSource = fs.readFileSync(
  path.join(projectRoot, 'app', 'charts', 'charts-index.tsx'),
  'utf8',
);
const indexSlugs = new Set(
  [...indexSource.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]),
);
// Guide routes explain the system rather than showing a chart.
const GUIDE_ROUTES = new Set(['states', 'data']);

for (const slug of slugs) {
  if (GUIDE_ROUTES.has(slug)) continue;
  assert.ok(
    indexSlugs.has(slug),
    `/charts index is missing a cell for "${slug}" — every catalogued chart needs one`,
  );
}
assert.equal(
  indexSlugs.size % 2,
  0,
  `The /charts index has ${indexSlugs.size} cells; an odd count leaves a hole in the 2-up grid`,
);

console.log(
  `Charts validated: ${chartFiles.length} sources, ${CARTESIAN.length} cartesian charts with axes, ` +
    `${SVG_CHARTS.length} dependency-free SVG charts, ${slugs.length} catalogued routes, ` +
    `${indexSlugs.size} index cells`,
);
