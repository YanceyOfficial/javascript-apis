const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

module.exports = {
  title: 'JavaScript API 全解析',
  tagline: 'I explain all apis of JavaScript.',
  url: 'https://js.yanceyleo.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'YanceyOfficial', // Usually your GitHub org/user name.
  projectName: 'javascript-apis', // Usually your repo name.
  scripts: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
    '/js/gitalk.js',
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css',
    'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css',
  ],
  plugins: [
    '@docusaurus/plugin-ideal-image',
    {
      quality: 70,
      max: 1030, // max resized image's size.
      min: 640, // min resized image's size. if original is lower, use that size.
      steps: 2, // the max number of images generated between min and max (inclusive)
    },
  ],
  themeConfig: {
    navbar: {
      title: 'JavaScript API 全解析',
      logo: {
        alt: 'JavaScript API 全解析',
        src: 'img/logo.png',
        href: 'https://js.yanceyleo.com/docs/Object/hasOwnProperty', // default to siteConfig.baseUrl
        target: '_self', // by default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one)
      },
      links: [
        { to: 'blog', label: 'About', position: 'right' },
        {
          href: 'https://github.com/YanceyOfficial/javascript-apis',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yancey, Inc. and its affiliates.`,
    },
    googleAnalytics: {
      trackingID: 'UA-136329095-1',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    algolia: {
      apiKey: '3fab48c65c06ef486aa7fe5d484a76b2',
      indexName: 'yanceyofficial_javascript-apis',
      algoliaOptions: {}, // Optional, if provided by Algolia
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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
        },
        pages: {
          /**
           * Path to data on filesystem
           * relative to site dir
           * components in this directory will be automatically converted to pages
           */
          path: 'src/pages',
          /**
           * URL route for the blog section of your site
           * do not include trailing slash
           */
          routeBasePath: '',
          include: ['**/*.{js,jsx}'],
        },
      },
    ],
  ],
}
