const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

module.exports = {
  title: 'JavaScript API 全解析',
  tagline: 'I explain all apis of JavaScript.',
  url: 'https://js.yanceyleo.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Yancey Inc.',
  projectName: 'javascript-apis',
  themes: ['@docusaurus/theme-live-codeblock'],
  scripts: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js',
    {
      src: '/js/gitalk.js',
      defer: true,
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css',
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity:
        'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
    '/css/gitalk.css',
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ecmascript',
        path: 'ecmascript-docs',
        editUrl: 'https://github.com/YanceyOfficial/javascript-apis/edit/master',
        routeBasePath: 'ecmascript',
        sidebarPath: require.resolve('./sidebarsEcmaScript.js'),
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
        editUrl: 'https://github.com/YanceyOfficial/javascript-apis/edit/master',
        routeBasePath: 'nodejs',
        sidebarPath: require.resolve('./sidebarsNodeJS.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
  ],
  themeConfig: {
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'referral-traffic',
      content:
        '⭐️ Want more technical articles? Please visit my <a target="_blank" rel="noopener noreferrer" href="https://yanceyleo.com">official website</a>! ⭐️',
    },
    navbar: {
      title: 'JavaScript API 全解析',
      logo: {
        alt: 'JavaScript API 全解析',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/ecmascript/Object/hasOwnProperty',
          label: 'ECMAScript',
          position: 'left',
          activeBaseRegex: '/ecmascript/',
        },
        {
          to: '/nodejs/dns/dns',
          label: 'Node.js',
          position: 'left',
          activeBaseRegex: '/nodejs/',
        },
        {
          href: 'https://yanceyleo.com',
          label: 'Official Blog',
          position: 'right',
        },
        {
          href: 'https://algorithm.yanceyleo.com',
          label: 'LeetCode Trip',
          position: 'right',
        },
        {
          href: 'https://github.com/YanceyOfficial/javascript-apis',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      copyright: `<a href="https://yanceyleo.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.</a>`,
    },
    googleAnalytics: {
      trackingID: 'UA-136329095-1',
      anonymizeIP: true,
    },
    algolia: {
      appId: 'VGOQNA6CS1',
      apiKey: '8f04c5ee88e63bf93bc7e828c6ce68bf',
      indexName: 'yanceyofficial_javascript-apis',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/YanceyOfficial/javascript-apis/tree/master',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
