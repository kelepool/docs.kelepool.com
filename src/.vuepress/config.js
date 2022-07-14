
const { path } = require('@vuepress/utils')
const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const getConfig = require("vuepress-bar");
const fs = require("fs");

module.exports = {
  lang: 'zh-CN',
  title: 'Kele Pool',
  description: 'Kele Pool Documentation - Decentralised Proof of Stake Protocol',
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Kele Pool',
      description: 'Kele Pool Documentation - Decentralised Proof of Stake Protocol',
      head: [
        ['meta', { name: 'keywords', content: 'ETH2.0 Staking, Pos Staking, Pow Mining, Mina Staking, Platon Staking'}],
        ['meta', { name: 'description', content: 'Kele Pool Documentation - Decentralised Proof of Stake Protocol'}],
      ],
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '可乐矿池',
      description: '可乐矿池文档 - Pow & Pos 一站式质押管理平台',
      head: [
        ['meta', { name: 'keywords', content: 'ETH2.0 质押, Pos 质押, Pow 挖矿, Mina 质押, Platon 质押'}],
        ['meta', { name: 'description', content: '可乐矿池文档 - Pow & Pos 一站式质押管理平台'}],
      ],
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
            link: '/en/guides/'
          },
          {
            text: 'Announcements',
            link: '/en/announcements/'
          },
          {
            text: 'Wiki',
            link: '/en/wiki/'
          },
          {
            text: 'Developers',
            link: '/en/developers/'
          },
          {
            text: 'Website',
            link: 'https://www.kelepool.com'
          },
        ],
        sidebar:{
          '/en/guides/': [
            {
              text: 'Guides',
              children: ['/en/guides/README.md'],
            },
          ],
          '/en/announcements/': [
            {
              text: 'Announcements',
              children: ['/en/announcements/README.md'],
            },
          ],
          '/en/wiki/': [
            {
              text: 'Wiki',
              children: ['/en/wiki/pos/staking-intro.md','/en/wiki/pos/staking-guide.md'],
            },
          ],
          '/en/developers/': [
            {
              text: 'Ethereum',
              collapsible: true,
              children:[
                '/en/developers/ethereum/introductions/README.md',
                '/en/developers/ethereum/contracts/README.md',
                '/en/developers/ethereum/api/README.md',
              ]
            },
            {
              text: 'Mina',
              collapsible: true,
              children:[
                '/en/developers/mina/api/README.md',
              ]
            },
            {
              text: 'PlatON',
              collapsible: true,
              children:[
                '/en/developers/platon/api/README.md',
              ]
            }
          ],
        }
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '语言',
        editLinkText: '在 GitHub 上编辑此页',
        navbar: [
          {
            text: '挖矿指南',
            link: '/zh/guides/'
          },
          {
            text: '公告',
            link: '/zh/announcements/'
          },
          {
            text: '百科',
            link: '/zh/wiki/'
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
          '/zh/guides/': [
            {
              text: '挖矿指南',
              children: ['/zh/guides/README.md'],
            },
          ],
          '/zh/announcements/': [
            {
              text: '公告',
              children: ['/zh/announcements/README.md'],
            },
          ],
          '/zh/wiki/': [
            {
              text: '百科',
              children: ['/zh/wiki/pos/staking-intro.md','/zh/wiki/pos/staking-guide.md'],
            },
          ],
          '/zh/developers/': [
            {
              text: 'Ethereum',
              collapsible: true,
              children:[
                '/zh/developers/ethereum/introductions/README.md',
                '/zh/developers/ethereum/contracts/README.md',
                '/zh/developers/ethereum/api/README.md',
              ]
            },
            {
              text: 'Mina',
              collapsible: true,
              children:[
                '/zh/developers/mina/api/README.md',
              ]
            },
            {
              text: 'PlatON',
              collapsible: true,
              children:[
                '/zh/developers/platon/api/README.md',
              ]
            }
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

// function getSideBar(folder, title) {
//   const extension = [".md"];
//   console.log("???")
//   const files = fs
//     .readdirSync(path.join(`${__dirname}/../${folder}`))
//     .filter(
//       (item) =>
//         item.toLowerCase() != "readme.md" &&
//         fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
//         extension.includes(path.extname(item))
//     );
//     //{ text: title,link:'', children: ["", ...files] }
// console.log(files)
//   return [{
//     text: '',
//     link: '',
//     children: [
//       {
//         text: 'github',
//         link: 'https://github.com',
//         children: [],
//       },
//       '/foo/bar.md',
//     ],
//   },];
// }

