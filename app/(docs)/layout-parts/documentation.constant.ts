interface Documentation {
  groupKey: string;
  groupValue: string;
  children: DocumentationChild[];
}

interface DocumentationChild {
  label: string;
  value: string;
  url: string;
  new?: boolean;
}

export const DOCS: Documentation[] = [
  {
    groupKey: 'Follow for more updates',
    groupValue: 'Follow for more updates',
    children: [
      {
        label: 'Twitter @arihantcodes',
        value: 'Twitter @arihantcodes',
        url: 'https://x.com/arihantCodes',
      },
    ],
  },
  {
    groupKey: 'gettingStart',
    groupValue: 'Getting Started',
    children: [
      {
        label: 'Introduction',
        value: 'introduction',
        url: '/docs',
      },
      {
        label: 'Installation',
        value: 'installation',
        url: '/docs/installation',
      },
    ],
  },
  {
    groupKey: 'integrations',
    groupValue: 'Integrations',
    children: [
      {
        label: 'MCP Server',
        value: 'mcp',
        url: '/docs/mcp',
        new: true,
      },
    ],
  },
  {
    groupKey: 'components',
    groupValue: 'Components',
    children: [
      { label: 'Alert', value: 'alert', url: '/docs/alert' },
      
      {
        label: 'Animated Card',
        value: 'animatedcard',
        url: '/docs/animatedcard',

      },
      {
        label: 'Animated Drawer',
        value: 'animateddrawer',
        url: '/docs/animateddrawer',
        new: true,
      },

      {
        label: 'Animated SVG Chart',
        value: 'animatedchart',
        url: '/docs/animatedchart',
      },
      {
        label: 'Animated Text',
        value: 'animatedtext',
        url: '/docs/animatedtext',
        new: true,
      },
      {
        label: 'Animated Testimonials',
        value: 'animatedtestimonials',
        url: '/docs/animatedtestimonials',
      },
      {
        label: 'Autosize Textarea',
        value: 'autosize-textarea',
        url: '/docs/autosize-textarea',
      },
      { label: 'Button', value: 'button', url: '/docs/button' },
      { label: 'Card', value: 'card', url: '/docs/card' },
      {
        label: 'Command Palette',
        value: 'command-palette',
        url: '/docs/command-palette',
        new: true,
      },
      {
        label: 'Datetime Picker',
        value: 'datetime-picker',
        url: '/docs/datetime-picker',
      },
      // {
      //   label: "Disclose Image",
      //   value: "discloseimage",
      //   url: "/docs/discloseimage",
      // },
      {
        label: 'Dual Range Slider',
        value: 'dual-range-slider',
        url: '/docs/dual-range-slider',
      },
      {
        label: 'Event Calendar',
        value: 'eventcalendar',
        url: '/docs/eventcalendar',
      },
      {
        label: 'Event Badge',
        value: 'eventbadge',
        url: '/docs/badge',

      },
      {
        label: 'Feedback Card',
        value: 'feedback',
        url: '/docs/feedback',
      },
      {
        label: 'Floating Label Input',
        value: 'floating-label-input',
        url: '/docs/floating-label-input',
      },
      { label: 'Footer', value: 'footer', url: '/docs/footer' },
      {
        label: 'GitHub Card',
        value: 'github-card',
        url: '/docs/github-card',

      },
      {
        label: 'HTTP Status Code',
        value: 'statuscode',
        url: '/docs/statuscode',
      },
      {
        label: 'Image Preview',
        value: 'imagepreview',
        url: '/docs/imagepreview',
      },
      {
        label:'Input Model',
        value: 'inputmodel',
        url: '/docs/input-model',

      },
      {
        label: 'Infinite Scroll',
        value: 'infiniteScroll',
        url: '/docs/infinite-scroll',
      },
      { label: 'Input', value: 'input', url: '/docs/input' },
      {
        label: 'Kanban Board',
        value: 'kanban',
        url: '/docs/kanban',
        new: true,
      } ,
      {
        label: 'Loading Button',
        value: 'loading-button',
        url: '/docs/loading-button',
      },
      {
        label: 'Multiple Selector',
        value: 'multipleSelector',
        url: '/docs/multiple-selector',
      },
      {
        label: 'Multistep Form',
        value: 'multistepform',
        url: '/docs/multistepform',
      },
      {
        label:'Login Card',
        value: 'login-card',
        url: '/docs/login',


      },
      { label: 'Navbar', value: 'navbar', url: '/docs/navbar' },
      {
        label: 'Profile Dropdown',
        value: 'profile-dropdown',
        url: '/docs/profile',

      },
      {
        label: 'Product Card',
        value: 'product-card',
        url: '/docs/product-card',

      },
     
      {
        label: 'Responsive Modal',
        value: 'responsive-modal',
        url: '/docs/responsive-modal',
      },
      { label: 'Spinner', value: 'spinner', url: '/docs/spinner' },
      {
        label: 'Skeleton',
        value: 'skeleton',
        url: '/docs/skeleton',
      },
      {
        label: 'Status Badge',
        value: 'status-badge',
        url: '/docs/status-badge',

      },
      {
        label: 'Testimonials',
        value: 'testimonials',
        url: '/docs/testimonials',
        new: true,
      
      }

    ],
  },
];
