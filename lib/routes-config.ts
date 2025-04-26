// Define base path only once
const BASE_PATH = "";

// Routes for page navigation and left sidebar sorting
export const ROUTES = [
  {
    groupKey: "gettingStart",
    groupValue: "Getting Started",
    children: [
      {
        label: "Introduction",
        value: "introduction",
        url: `${BASE_PATH}`,
      },
    ],
  },
  {
    groupKey: "components",
    groupValue: "Components",
    children: [
      {
        label: "Autosize Textarea",
        value: "autosize-textarea",
        url: `${BASE_PATH}/autosize-textarea`,
      },
      {
        label: "Datetime Picker",
        value: "datetime-picker",
        url: `${BASE_PATH}/datetime-picker`,
      },
      {
        label: "Dual Range Slider",
        value: "dual-range-slider",
        url: `${BASE_PATH}/dual-range-slider`,
      },
      {
        label: "Floating Label Input",
        value: "floating-label-input",
        url: `${BASE_PATH}/floating-label-input`,
      },
      {
        label: "Infinite Scroll",
        value: "infiniteScroll",
        url: `${BASE_PATH}/infinite-scroll`,
      },
      {
        label: "Loading Button",
        value: "loading-button",
        url: `${BASE_PATH}/loading-button`,
      },
      {
        label: "Progress With Value",
        value: "progress-with-value",
        url: `${BASE_PATH}/progress-with-value`,
      },
      {
        label: "Responsive Modal",
        value: "responsive-modal",
        url: `${BASE_PATH}/responsive-modal`,
      },
      {
        label: "Multiple Selector",
        value: "multipleSelector",
        url: `${BASE_PATH}/multiple-selector`,
      },
      { label: "Spinner", value: "spinner", url: `${BASE_PATH}/spinner` },
      { label: "Skeleton", value: "skeleton", url: `${BASE_PATH}/skeleton` },
      { label: "Accordion", value: "accordion", url: `${BASE_PATH}/accordion` },
    ],
  },
];

// Flatten routes for simpler navigation
export const page_routes = ROUTES.map(({ children }) => {
  return children.map((link) => ({
    title: link.label,
    href: link.url,
  }));
}).flat();

// this flat will combile the array of arrays (nested array) into the single array

/*
example 
[
  [ { title: 'Introduction', href: '' } ],
  [ { title: 'Autosize Textarea', href: '/autosize-textarea' }, { title: 'Datetime Picker', href: '/datetime-picker' }, ... ]
]

converted-to

[
  { title: 'Introduction', href: '' },
  { title: 'Autosize Textarea', href: '/autosize-textarea' },
  { title: 'Datetime Picker', href: '/datetime-picker' },
  ...
]


*/