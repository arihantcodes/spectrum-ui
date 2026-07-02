import { siteConfig } from "@/config/site";
import { RoutesProps } from "@/types";
import { Component, FileText, ShieldUser } from "lucide-react";

// Define base path only once
const BASE_PATH = "/docs";

// Routes for page navigation and left sidebar sorting
export const ROUTES: RoutesProps[] = [
  {
    groupKey: "gettingStart",
    groupValue: "Getting Started",
    icon: FileText,
    children: [
      {
        label: "Installation",
        value: "installation",
        url: `${BASE_PATH}/installation`,
      },
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
    icon: Component,
    children: [
      {
        label: "Accordion",
        value: "accordion",
        url: `${BASE_PATH}/accordion`,
      },
      {
        label: "Alert",
        value: "alert",
        url: `${BASE_PATH}/alert`,
      },
      {
        label: "Animated SVG Chart",
        value: "animatedsvgchart",
        url: `${BASE_PATH}/animatedchart`,
      },
      {
        label: "Animated Testimonials",
        value: "animated-testimonials",
        url: `${BASE_PATH}/animatedtestimonials`,
      },
      {
        label: "Autosize Textarea",
        value: "autosize-textarea",
        url: `${BASE_PATH}/autosize-textarea`,
      },
      {
        label: "Bento Grid",
        value: "bento-grid",
        url: `${BASE_PATH}/bento-grid`,
        tag: {
          label: "new",
          color: "bg-lime-400",
        },
      },
      {
        label: "Button",
        value: "button",
        url: `${BASE_PATH}/button`,
      },
      {
        label: "Card",
        value: "card",
        url: `${BASE_PATH}/card`,
      },
      {
        label: "Datetime Picker",
        value: "datetime-picker",
        url: `${BASE_PATH}/datetime-picker`,
      },
      {
        label: "Dock",
        value: "dock",
        url: `${BASE_PATH}/dock`,
      },
      {
        label: "Dual Range Slider",
        value: "dual-range-slider",
        url: `${BASE_PATH}/dual-range-slider`,
      },
      {
        label: "Event Badge",
        value: "event-badge",
        url: `${BASE_PATH}/badge`,
        tag: {
          label: "new",
          color: "bg-lime-400",
        },
      },
      {
        label: "Event Calendar",
        value: "event-calendar",
        url: `${BASE_PATH}/eventcalendar`,
      },
      {
        label: "Feedback Card",
        value: "feedback-card",
        url: `${BASE_PATH}/feedback`,
      },
      {
        label: "Floating Label Input",
        value: "floating-label-input",
        url: `${BASE_PATH}/floating-label-input`,
      },
      {
        label: "Footer",
        value: "footer",
        url: `${BASE_PATH}/footer`,
      },
      {
        label: "HTTPS Status Code",
        value: "https-status-code",
        url: `${BASE_PATH}/statuscode`,
      },
      {
        label: "Image Preview",
        value: "image-preview",
        url: `${BASE_PATH}/imagepreview`,
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
        label: "MultiStep Form",
        value: "multi-step-form",
        url: `${BASE_PATH}/multistepform`,
        tag: {
          label: "new",
          color: "bg-lime-400",
        },
      },
      {
        label: "Multiple Selector",
        value: "multiple-selector",
        url: `${BASE_PATH}/multiple-selector`,
      },
      {
        label: "Navbar",
        value: "navbar",
        url: `${BASE_PATH}/navbar`,
      },
      {
        label: "Profile Dropdown",
        value: "profile-dropdown",
        url: `${BASE_PATH}/profile`,
        tag: {
          label: "new",
          color: "bg-lime-400",
        },
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
        label: "Scratch Card",
        value: "scratch-card",
        url: `${BASE_PATH}/scratch-card`,
        tag: {
          label: "new",
          color: "bg-lime-400",
        },
      },
      {
        label: "Skeleton",
        value: "skeleton",
        url: `${BASE_PATH}/skeleton`,
      },
      {
        label: "Spinner",
        value: "spinner",
        url: `${BASE_PATH}/spinner`,
      },
    ],
  },
  {
    groupKey: "founder",
    groupValue: "Founder",
    icon: ShieldUser,
    children: [
      {
        label: "Arihant Jain",
        value: "arihant-jain",
        url: siteConfig.links.twitter,
      },
    ],
  },
];

// Flatten routes for simpler navigation
// NOTE: This is no longer used in the search component , remove this if its not used anywhere else.
export const page_routes = ROUTES.map(({ children }) => {
  return children.map((link) => ({
    title: link.label,
    href: link.url,
  }));
}).flat();
