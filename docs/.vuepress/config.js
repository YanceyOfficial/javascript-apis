module.exports = {
  title: 'JavaScript API 全解析',
  description: '全面、深入解析MDN推荐使用的JavaScript API',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'JavaScript,API',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: 'Yancey',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.6.0/dist/katex.min.css',
      },
    ],
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-136329095-1',
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/nprogress', true],
    ['@vuepress/active-header-links', true],
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-katex'));
    },
  },
  themeConfig: {
    //  algolia: {
    //     apiKey: '5304c2403a41a7c2d17a71016438d6fc',
    //     indexName: 'docsearch'
    //   }, 
    activeHeaderLinks: true,
    repo: 'YanceyOfficial/javascript-apis',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [{
        text: 'ECMAScript',
        link: '/ECMAScript/',
      },
      {
        text: 'BOM',
        link: '/BOM/',
      },
      {
        text: 'DOM',
        link: '/DOM/',
      },
      {
        text: '关于',
        link: '/about',
      },
      {
        text: '个人博客',
        link: 'https://www.yanceyleo.com',
      },
    ],

    sidebar: [{
        title: 'ECMAScript',
        collapsable: false,
        children: [
          // '/ECMAScript/',
          {
            title: 'String',
            collapsable: true,
            children: [
              '/ECMAScript/String/',
              {
                title: '构造方法',
                collapsable: false,
                children: [
                  '/ECMAScript/String/String.fromCharCode',
                  '/ECMAScript/String/String.fromCodePoint',
                ],
              },
              {
                title: '原型方法',
                collapsable: false,
                children: [
                  '/ECMAScript/String/charAt',
                  '/ECMAScript/String/charCodeAt',
                  '/ECMAScript/String/codePointAt',
                  '/ECMAScript/String/concat',
                  '/ECMAScript/String/normalize',
                  '/ECMAScript/String/padEnd',
                  '/ECMAScript/String/padStart',
                  '/ECMAScript/String/repeat',
                  '/ECMAScript/String/replace',
                  '/ECMAScript/String/slice',
                  '/ECMAScript/String/split',
                  '/ECMAScript/String/substr',
                  '/ECMAScript/String/substring',
                  '/ECMAScript/String/to...Case',
                  '/ECMAScript/String/trim',

                  '/ECMAScript/String/indexOf',
                  '/ECMAScript/String/lastIndexOf',
                  '/ECMAScript/String/match',
                  '/ECMAScript/String/search',

                  '/ECMAScript/String/endsWith',
                  '/ECMAScript/String/includes',
                  '/ECMAScript/String/startsWith',

                  '/ECMAScript/String/localeCompare',
                ],
              },
            ],
          },
          {
            title: 'Object',
            collapsable: true,
            children: [
              '/ECMAScript/Object/',
              {
                title: '构造方法',
                collapsable: false,
                children: [
                  '/ECMAScript/Object/Object.assign',
                  '/ECMAScript/Object/Object.create',
                  '/ECMAScript/Object/Object.defineProperty',
                  '/ECMAScript/Object/Object.defineProperties',
                  '/ECMAScript/Object/Object.keys',
                  '/ECMAScript/Object/Object.entries',
                  '/ECMAScript/Object/Object.values',
                  '/ECMAScript/Object/Object.fromEntries',
                  '/ECMAScript/Object/Object.preventExtensions',
                  '/ECMAScript/Object/Object.seal',
                  '/ECMAScript/Object/Object.freeze',
                  '/ECMAScript/Object/Object.isExtensible',
                  '/ECMAScript/Object/Object.isSealed',
                  '/ECMAScript/Object/Object.isFrozen',
                  '/ECMAScript/Object/Object.is',
                  '/ECMAScript/Object/Object.getOwnPropertyDescriptor',
                  '/ECMAScript/Object/Object.getOwnPropertyDescriptors',
                  '/ECMAScript/Object/Object.getOwnPropertyNames',
                  '/ECMAScript/Object/Object.getOwnPropertySymbols',
                  '/ECMAScript/Object/Object.getPrototypeOf',
                  '/ECMAScript/Object/Object.setPrototypeOf',
                ],
              },
              {
                title: '原型方法',
                collapsable: false,
                children: [
                  '/ECMAScript/Object/hasOwnProperty',
                  '/ECMAScript/Object/isPrototypeOf',
                  '/ECMAScript/Object/propertyIsEnumerable',
                ],
              },
            ],
          },
          {
            title: 'Array',
            collapsable: true,
            children: [
              '/ECMAScript/Array/',
              {
                title: '构造方法',
                collapsable: false,
                children: [
                  '/ECMAScript/Array/Array.of',
                  '/ECMAScript/Array/Array.from',
                  '/ECMAScript/Array/Array.isArray',
                ],
              },
              {
                title: '原型方法',
                collapsable: false,
                children: [
                  '/ECMAScript/Array/concat',
                  '/ECMAScript/Array/copyWithin',
                  '/ECMAScript/Array/slice',
                ],
              },

            ],
          },
          {
            title: 'Math',
            collapsable: true,
            children: [
              '/ECMAScript/Math/',
              {
                title: '构造方法',
                collapsable: false,
                children: [
                  '/ECMAScript/Math/Math.abs',
                  '/ECMAScript/Math/Math.max_min',
                  '/ECMAScript/Math/Math.random',
                  '/ECMAScript/Math/Math.formulas',
                  '/ECMAScript/Math/Math.sin',
                  '/ECMAScript/Math/Math.cos',
                  '/ECMAScript/Math/Math.tan',
                  '/ECMAScript/Math/Math.floor_ceil_round',
                  '/ECMAScript/Math/Math.fround',
                  '/ECMAScript/Math/Math.trunc',
                  '/ECMAScript/Math/Math.clz32',
                  '/ECMAScript/Math/Math.imul',
                  '/ECMAScript/Math/Math.sign',
                ],
              },
            ],
          },
        ]
      },
      {
        title: 'BOM',
        collapsable: false,
        children: [
          // '/BOM/',
        ]
      },
      {
        title: 'DOM',
        collapsable: false,
        children: [
          // '/DOM/',
        ]
      },
    ],
    displayAllHeaders: true,
    lastUpdated: '上次更新',
    sidebarDepth: 0,
  },
};