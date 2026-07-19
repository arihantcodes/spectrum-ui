export const faqs: Array<{ question: string; answer: string }> = [
  {
    question: 'Do I need to use an AI assistant?',
    answer:
      'No. Every public component can be browsed and copied from the site. The MCP server is an optional way to browse, search, and install components from a compatible AI assistant.',
  },
  {
    question: 'Which editors and assistants does it work with?',
    answer:
      'Use any editor or assistant that supports the Model Context Protocol. The MCP guide lists the current setup examples and configuration steps.',
  },
  {
    question: 'What can I do with the copied code?',
    answer:
      'The public component source is copied into your repository as React, TypeScript, and Tailwind CSS files. You can modify and distribute it under the Apache License 2.0 terms.',
  },
  {
    question: 'Is it built for shadcn/ui projects?',
    answer:
      'Yes. Spectrum UI is designed for projects that use shadcn/ui conventions. Each component page lists the source and dependencies needed for that specific component.',
  },
  {
    question: 'How is the MCP server different from copying from the docs?',
    answer:
      'The MCP server lets a compatible assistant browse and search the component registry, then add selected source files to your project. You can still copy the same public component source from the docs.',
  },
  {
    question: 'Will updates overwrite components in my project?',
    answer:
      'No automatic updater edits the component files in your repository. You decide whether to install a newer version and how to merge its changes.',
  },
  {
    question: 'Can I use Spectrum UI in commercial projects?',
    answer:
      'Yes. The public component source is available under the Apache License 2.0, including for commercial use, subject to the LICENSE terms. Spectrum UI Pro products use separate purchase terms.',
  },
  {
    question: 'Is Spectrum UI free?',
    answer:
      'The public component library is free and open source under the Apache License 2.0. Spectrum UI Pro products are separate paid offerings.',
  },
];
