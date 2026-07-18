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
      { label: 'Accordion', value: 'accordion', url: '/docs/accordion' },
      { label: 'Alert', value: 'alert', url: '/docs/alert' },
      {
        label: 'Progress With Value',
        value: 'progress-with-value',
        url: '/docs/progress-with-value',
      },

      {
        label: '3D Tilt Card',
        value: 'tilt-card',
        url: '/docs/tilt-card',
        new: true,
      },
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
        label: 'Animated Switch',
        value: 'animated-switch',
        url: '/docs/animated-switch',

      },
 
      {
        label: 'Autosize Textarea',
        value: 'autosize-textarea',
        url: '/docs/autosize-textarea',
      },
      {
        label: 'Avatar Stack',
        value: 'avatar-stack',
        url: '/docs/avatar-stack',
        new: true,
      },
      { label: 'Button', value: 'button', url: '/docs/button' },
      { label: 'Card', value: 'card', url: '/docs/card' },
      // {
      //   label: 'Command Palette',
      //   value: 'command-palette',
      //   url: '/docs/command-palette',
      //   new: true,
      // },
      {
        label: 'Datetime Picker',
        value: 'datetime-picker',
        url: '/docs/datetime-picker',
      },
      {
        label: 'Dual Range Slider',
        value: 'dual-range-slider',
        url: '/docs/dual-range-slider',
      },
      {
        label: 'Event Badge',
        value: 'eventbadge',
        url: '/docs/badge',

      },
      {
        label: 'Face Rating',
        value: 'face-rating',
        url: '/docs/face-rating',
        new: true,
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
      {
        label: 'Follow Button',
        value: 'follow-button',
        url: '/docs/follow-button',
        new: true,
      },
      {
        label: 'Hold to Confirm',
        value: 'hold-to-confirm',
        url: '/docs/hold-to-confirm',
        new: true,
      },
      // { label: 'Footer', value: 'footer', url: '/docs/footer' },
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
      {
        label: 'Kanban Board',
        value: 'kanban',
        url: '/docs/kanban',

      } ,
      {
        label: 'Kbd Key',
        value: 'kbd-key',
        url: '/docs/kbd-key',

      },
      {
        label: 'Like Button',
        value: 'like-button',
        url: '/docs/like-button',
        new: true,
      },
      {
        label: 'Loading Button',
        value: 'loading-button',
        url: '/docs/loading-button',
      },
      {
        label: 'Morph Button',
        value: 'morph-button',
        url: '/docs/morph-button',

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
      {
        label: 'Notification Bell',
        value: 'notification-bell',
        url: '/docs/notification-bell',
        new: true,
      },
      {
        label: 'Password Strength',
        value: 'password-strength',
        url: '/docs/password-strength',
        new: true,
      },
      {
        label: 'Profile Dropdown',
        value: 'profile-dropdown',
        url: '/docs/profile',

      },
      {
        label: 'Quantity Stepper',
        value: 'quantity-stepper',
        url: '/docs/quantity-stepper',

      },
      {
        label: 'Reaction Bar',
        value: 'reaction-bar',
        url: '/docs/reaction-bar',
        new: true,
      },
      {
        label: 'Scratch Card',
        value: 'scratch-card',
        url: '/docs/scratch-card',
        new: true,
      },
      {
        label: 'Share Button',
        value: 'share-button',
        url: '/docs/share-button',
       
      },
      { label: 'Spinner', value: 'spinner', url: '/docs/spinner' },
      {
        label: 'Star Rating',
        value: 'star-rating',
        url: '/docs/star-rating',
        new: true,
      },
      {
        label: 'Status Badge',
        value: 'status-badge',
        url: '/docs/status-badge',

      },
      {
        label: 'Swipe to Delete',
        value: 'swipe-to-delete',
        url: '/docs/swipe-to-delete',
        new: true,
      },
      {
        label: 'Task Checkbox',
        value: 'task-checkbox',
        url: '/docs/task-checkbox',
        new: true,
      },
      {
        label: 'Undo Pill',
        value: 'undo-pill',
        url: '/docs/undo-pill',
        new: true,
      },
    ],
  },
];
