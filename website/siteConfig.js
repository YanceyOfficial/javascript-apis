/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const katexPlugin = require('remarkable-katex')

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Yancey Leo',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.yanceyleo.com',
    pinned: true,
  },
]

const siteConfig = {
  title: 'JavaScript API 全解析', // Title for your website.
  tagline: 'I explain all apis of JavaScript.',
  url: 'https://js.yanceyleo.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'javascript-apis',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  organizationName: 'YanceyOfficial',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'ES/ecmascript', label: 'ECMAScript' },
    { doc: 'BOM/bom', label: 'BOM' },
    { doc: 'DOM/dom', label: 'DOM' },
    { page: 'about', label: 'About' },
    { href: 'https://github.com/YanceyOfficial', label: 'GitHub' },
    { blog: false },
    { search: true },
    { languages: true },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#2e8555',
    secondaryColor: '#205c3b',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.`,

  markdownPlugins: [
    function useRemarkableKatex(md) {
      md.use(katexPlugin)
    },
  ],

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
    '/js/gitalk.js',
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css',
    '/css/code-block-buttons.css',
    '/css/gitalk.css',
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/YanceyOfficial/javascript-apis',

  docsUrl: '',

  defaultVersionShown: '1.0.0',

  twitter: true,
  twitterUsername: 'YanceyOfficial',

  facebookAppId: 'yanceyleo',
  facebookComments: true,

  gitterUrl: 'https://gitter.im/yancey-official/community',

  algolia: {
    apiKey: 'a98607f4dad08fe71f299bd7a7069cbe',
    indexName: 'javascript-apis',
    appId: 'IKO6JIOZ69',
    algoliaOptions: {}, // Optional, if provided by Algolia
  },

  gaTrackingId: 'UA-136329095-1',
  gaGtag: true,

  scrollToTop: true,

  usePrism: ['jsx'],

  markdownPlugins: [],
}

module.exports = siteConfig
