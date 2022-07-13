
const { path } = require('@vuepress/utils')
const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

module.exports = {
  lang: 'zh-CN',
  title: 'Kele Pool',
  description: 'Kele Pool Documentation - Decentralised Proof of Stake Protocol',
  head: [
    ['meta', { name: '', content: '' }],
    ['link', { rel: '', href: '' }],
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Kele Pool',
      description: 'Kele Pool Documentation - Decentralised Proof of Stake Protocol',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '可乐矿池',
      description: '可乐矿池文档 - Pow & Pos 一站式质押管理平台',
    },
  },
  prev: true,
  next: true,
  theme: defaultTheme({
    docsDir: 'src',
    docsBranch: 'main',
    repo: 'kelepool/docs.kelepool.com',
    logo: '/images/logo.png',
    colorMode:'light',
    colorModeSwitch:false,
    editLink:true,
    contributors:false,
    lastUpdated: false,
    locales: {
      '/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        navbar: [
          {
            text: 'Guides',
            link: '/guides/'
          },
          {
            text: 'For Developers',
            link: '/developers/'
          },
          {
            text: 'Website',
            link: 'https://www.kelepool.com'
          },
        ],
        sidebar:{
          '/guides/': [
            {
              text: 'Guide',
              children: [{
                text: 'github',
                link: 'https://github.com',
                children: [],
              },],
            },
          ],
          '/developers/': [
            {
              text: 'Developers',
              children: [{
                text: 'github',
                link: 'https://github.com',
                children: [],
              },],
            },
          ],
        }
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '语言',
        editLinkText: '在 GitHub 上编辑此页',
        navbar: [
          {
            text: '指南',
            link: '/zh/guides/'
          },
          {
            text: '开发者文档',
            link: '/zh/developers/'
          },
          {
            text: '官方网站',
            link: 'https://www.kelepool.com'
          },
        ],
        sidebar:{
          '/guides/': [

          ],
          '/developers/': [

          ],
        }
      },
    },

  }),
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), {
        root: `${__dirname}/../`,
      }),
        md.use(require('markdown-it-html5-embed'), {
          html5embed: {
            useImageSyntax: true,
            useLinkSyntax: false
          }
        })
    }
  },
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ]
}
