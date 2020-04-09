export default {
  "plugins": [
    "@docusaurus/plugin-ideal-image",
    {
      "quality": 70,
      "max": 1030,
      "min": 640,
      "steps": 2
    }
  ],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "JavaScript API 全解析",
      "logo": {
        "alt": "JavaScript API 全解析",
        "src": "img/logo.png",
        "href": "/docs/Object/hasOwnProperty",
        "target": "_self"
      },
      "links": [
        {
          "to": "blog",
          "label": "About",
          "position": "right"
        },
        {
          "href": "https://github.com/YanceyOfficial/javascript-apis",
          "label": "GitHub",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "copyright": "Copyright © 2020 Yancey, Inc. and its affiliates."
    },
    "googleAnalytics": {
      "trackingID": "UA-136329095-1",
      "anonymizeIP": true
    },
    "algolia": {
      "apiKey": "3fab48c65c06ef486aa7fe5d484a76b2",
      "indexName": "yanceyofficial_javascript-apis",
      "algoliaOptions": {}
    }
  },
  "title": "JavaScript API 全解析",
  "tagline": "I explain all apis of JavaScript.",
  "url": "https://js.yanceyleo.com",
  "baseUrl": "/",
  "favicon": "img/favicon.ico",
  "organizationName": "YanceyOfficial",
  "projectName": "javascript-apis",
  "scripts": [
    "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js",
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/gitalk.js"
  ],
  "stylesheets": [
    "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css",
    "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
  ],
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/yanceyleo/code/project/javascript-apis/sidebars.js",
          "editUrl": "https://github.com/YanceyOfficial/javascript-apis/tree/master",
          "remarkPlugins": [
            null
          ],
          "rehypePlugins": [
            null
          ],
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true
        },
        "theme": {
          "customCss": "/Users/yanceyleo/code/project/javascript-apis/src/css/custom.css"
        },
        "sitemap": {
          "cacheTime": 600000,
          "changefreq": "weekly",
          "priority": 0.5
        },
        "pages": {
          "path": "src/pages",
          "routeBasePath": "",
          "include": [
            "**/*.{js,jsx}"
          ]
        }
      }
    ]
  ]
};