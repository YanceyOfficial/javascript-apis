import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default {
  title: 'JavaScript API 全解析',
  tagline: 'I explain all apis of JavaScript.',
  url: 'https://js.yanceyleo.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  favicon: 'img/favicon.ico',

  organizationName: 'Yancey Inc.',
  projectName: 'javascript-apis',

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ecmascript',
        path: 'ecmascript-docs',
        editUrl:
          'https://github.com/YanceyOfficial/javascript-apis/edit/master',
        routeBasePath: 'ecmascript',
        sidebarPath: './sidebarsEcmaScript.js',

        showLastUpdateAuthor: true,
        showLastUpdateTime: true,

        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'nodejs',
        path: 'nodejs-docs',
        editUrl:
          'https://github.com/YanceyOfficial/javascript-apis/edit/master',
        routeBasePath: 'nodejs',
        sidebarPath: './sidebarsNodeJS.js',

        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],

    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/YanceyOfficial/javascript-apis/tree/master',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },

        theme: {
          customCss: './src/css/custom.css',
        },

        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },

        pages: {
          path: 'src/pages',
          routeBasePath: '/',
          include: ['**/*.{js,jsx}'],
        },
      },
    ],
  ],
}
