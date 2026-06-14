import { Props } from "@/app/(docs)/docs/components/props-table/props-table";

export const dockProp: Props[] = [
  {
    prop: "children",
    required: true,
    description: "The icons or elements to render inside the Dock.",
    type: "ReactNode",
  },
  {
    prop: "className",
    required: false,
    description: "Custom CSS class name for the Dock container wrapper.",
    type: "string",
  },
  {
    prop: "magnification",
    required: false,
    description: "The maximum width/height of the icon on hover in pixels.",
    type: "number",
    default: "80",
  },
  {
    prop: "distance",
    required: false,
    description: "The mouse proximity distance (in pixels) within which magnification is triggered.",
    type: "number",
    default: "140",
  },
];

export const dockIconProp: Props[] = [
  {
    prop: "children",
    required: true,
    description: "The icon node (usually an SVG or Lucide component).",
    type: "ReactNode",
  },
  {
    prop: "label",
    required: true,
    description: "The tooltip label display text shown on hover.",
    type: "string",
  },
  {
    prop: "onClick",
    required: false,
    description: "Callback function triggered when the icon is clicked.",
    type: "() => void",
  },
  {
    prop: "className",
    required: false,
    description: "Custom CSS class name for the Dock item wrapper.",
    type: "string",
  },
];
