
const { path } = require('@vuepress/utils')
const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const getConfig = require("vuepress-bar");
const fs = require("fs");
const { sitemapPlugin } = require("vuepress-plugin-sitemap2");

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
              children: [
              {
                    text: '💰Staking',
                    collapsible: true,
                    children:[
                      '/en/guides/staking/beginner-guide/stake-amount-32-eth.md',
                      '/en/guides/staking/beginner-guide/stake-amount-32-eth-1.md',
                    ]
                  }, {
                    text: '⛏Mining',
                    collapsible: true,
                    children:[
                      '/en/guides/pow/beginner-guide/1account-registration-and-login.md',
                      '/en/guides/pow/beginner-guide/2add-and-change-sub-accounts.md',
                      '/en/guides/pow/beginner-guide/3check-earnings-and-payment-status.md',
                      '/en/guides/pow/beginner-guide/4check-hashrate-and-worker-status.md',
                      '/en/guides/pow/beginner-guide/5create-edit-and-delete-observer-addresses.md',
                      '/en/guides/pow/beginner-guide/7set-hashrate-alert.md',
                      '/en/guides/pow/beginner-guide/8set-payment-address.md',
                      '/en/guides/pow/beginner-guide/9supported-currencies-tokens.md',
                      '/en/guides/pow/beginner-guide/6invite-friends-to-get-rewards.md',
                    ]
                  },{
                    text: '🔐Anonymous Mining',
                    link: '/en/guides/anonymous-mining.md',
                  },
              ],
            },
          ],
          '/en/announcements/': [
            {
              text: 'Announcements',
              children: ['/en/announcements/README.md',
                         '/en/announcements/20220831.md'
                        ],
            },
          ],
          '/en/wiki/': [
            {
              text: 'Wiki',
              children: ['/en/wiki/pos/staking-intro.md',
                         '/en/wiki/pos/staking-guide.md',
                         '/en/wiki/pos/staking-difference.md',
                         '/en/wiki/pos/kelepool.md',
                         '/en/wiki/pos/merge.md',
                         '/en/wiki/pos/fork.md'
                        ],
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
                '/en/developers/ethereum/api/Hardware.md',
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
              children: [
                {
                  text: 'POS质押挖矿',
                  children:[{
                    text: '📗 新手入门',
                    collapsible: true,
                    children:[
                      '/zh/guides/pos/how-to-stake/cha-kan-shou-yi.md',
                      '/zh/guides/pos/how-to-stake/cha-kan-yan-zheng-jie-dian.md',
                      '/zh/guides/pos/how-to-stake/cha-kan-zhi-ya-jin-du.md',
                      '/zh/guides/pos/how-to-stake/ru-he-jie-chu-zhi-ya.md',
                      '/zh/guides/pos/how-to-stake/Stake.md',
                      '/zh/guides/pos/how-to-stake/Staking.md',
                      '/zh/guides/pos/how-to-stake/Supported networks.md',
                    ]
                  },{
                    text: '🪙 ETH质押教程',
                    collapsible: true,
                    children:[
                      '/zh/guides/pos/eth/whale.md',
                      '/zh/guides/pos/eth/micro.md',
                    ]
                  },
                  {
                    text: '🪙 MINA委托教程',
                    collapsible: true,
                    children:[
                      '/zh/guides/pos/mina/ledger-install-mina-app.md',
                    ]
                  },
                  {
                    text: '❓ 常见问题',
                    collapsible: true,
                    children:[
                      '/zh/guides/pos/faq/eth-deposit-cli.md',
                    ]
                  },]
                },
                {
                  text: 'POW矿池挖矿',
                  children:[{
                    text: '📗 新手入门',
                    collapsible: true,
                    children:[
                      '/zh/guides/pow/how-to-mining/account.md',
                      '/zh/guides/pow/how-to-mining/cha-kan-shou-yi-zhi-fu-zhuang-tai.md',
                      '/zh/guides/pow/how-to-mining/cha-kan-suan-li-kuang-ji-qing-kuang.md',
                      '/zh/guides/pow/how-to-mining/zi-zhu-ti-bi.md',
                      '/zh/guides/pow/how-to-mining/chuang-jian-xiu-gai-shan-chu-guan-cha-zhe-di-zhi.md',
                      '/zh/guides/pow/how-to-mining/collection.md',
                      '/zh/guides/pow/how-to-mining/Supported currency.md',
                      '/zh/guides/pow/how-to-mining/warning.md',
                      '/zh/guides/pow/how-to-mining/yao-qing-hao-you-huo-qu-jiang-li.md',
                      '/zh/guides/pow/how-to-mining/zhang-hu-zhu-ce-ji-deng-lu.md',
                    ]
                  },{
                    text: '🪜 矿梯使用教程',
                    link: '/zh/guides/pow/ladder.md',
                  },
                  {
                    text: '🔑 匿名挖矿教程',
                    link: '/zh/guides/pow/anonymous.md',
                  },
                  {
                    text: '📈 币种挖矿教程',
                    collapsible: true,
                    children:[
                      '/zh/guides/pow/mining/BTC.md',
                      '/zh/guides/pow/mining/CKB.md',
                      '/zh/guides/pow/mining/ETC.md',
                      '/zh/guides/pow/mining/HNS.md',
                      '/zh/guides/pow/mining/KDA.md',
                      '/zh/guides/pow/mining/LTC.md',
                      '/zh/guides/pow/mining/STC.md',
                      '/zh/guides/pow/mining/RVN.md',
                    ]
                  },
                  {
                    text: '💰 其他挖矿工具教程',
                    collapsible: true,
                    children:[
                      '/zh/guides/pow/bixin/aceminer-wa-kuang-jiao-cheng.md',
                      '/zh/guides/pow/bixin/hiveos-wa-kuang-jiao-cheng.md',
                      '/zh/guides/pow/bixin/mineros-wa-kuang-jiao-cheng.md',
                      '/zh/guides/pow/bixin/kai-yuan-kuang-gong-wa-kuang-jiao-cheng.md',
                      '/zh/guides/pow/bixin/qing-song-kuang-gong-shi-yong-jiao-cheng.md',
                      '/zh/guides/pow/bixin/stcbox-ka-shua-liu-cheng.md',
                      '/zh/guides/pow/bixin/stcbox1.md',
                    ]
                  },
                  {
                    text: '❓ 常见问题',
                    collapsible: true,
                    children:[
                      '/zh/guides/pow/faq/dns-shi-shi-mo-ru-he-xuan-ze-yi-ge-wen-ding-de-dns.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-ge-ge-bi-zhong-fei-shuai-shi-duo-shao.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-shi-mo-shi-jian-jie-suan-da-bi.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-shi-yong-na-zhong-shou-yi-mo-shi.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-ti-bi-di-zhi-ke-yi-yong-jiao-yi-suo-di-zhi-ma.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-ti-bi-qi-fueshi-duo-shao.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-ti-bi-shou-xu-fei-shi-duo-shao.md',
                      '/zh/guides/pow/faq/ke-le-kuang-chi-zai-hai-wai-you-mei-you-wa-kuang-di-zhi.md',
                      '/zh/guides/pow/faq/kuang-ti-lian-jie-bu-shang-shi-shi-mo-yuan-yin.md',
                      '/zh/guides/pow/faq/lian-jie-shang-kuang-chi-hou-duo-jiu-ke-yi-kan-dao-suan-li.md',
                      '/zh/guides/pow/faq/mei-dao-qi-fueke-yi-ti-bi-ma.md',
                      '/zh/guides/pow/faq/ru-he-pei-zhi-qi-fuedu.md',
                      '/zh/guides/pow/faq/vpn-he-kuang-ti-you-shi-mo-qu-bie.md',
                      '/zh/guides/pow/faq/wei-shi-mo-ke-le-kuang-chi-wang-zhan-da-bu-kai.md',
                      '/zh/guides/pow/faq/wei-shi-mo-wo-wa-de-bi-mei-you-zhi-fu.md',
                    ]
                  }
                  ]
                },
                {
                  text: '条款',
                  children:[{
                    text: '📗 服务条款',
                    collapsible: true,
                    children:[
                      '/zh/guides/terms/terms-of-service.md',
                    ]
                  },{
                    text: '🪜 ETH安全审计',
                    link: '/zh/guides/terms/eth-an-quan-shen-ji.md',
                  },
                  ]
                },
              ],
            },
          ],
          '/zh/announcements/': [
            {
              text: '公告',
              children: ['/zh/announcements/README.md',
                         '/zh/announcements/20220831.md'
                        ],
            },
          ],
          '/zh/wiki/': [
            {
              text: '百科',
              children: [
                '/zh/wiki/platform.md',
                '/zh/wiki/pos/staking-intro.md',
                '/zh/wiki/pos/staking-guide.md',
                '/zh/wiki/pos/staking-difference.md',
                '/zh/wiki/pos/knowledge.md',
                '/zh/wiki/pos/kelepool.md',
                '/zh/wiki/pos/merge.md',
                '/zh/wiki/pos/fork.md',
                '/zh/wiki/pos/aleo.md'
              ],
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
                '/zh/developers/ethereum/api/Hardware.md'
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
    },
  },
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    sitemapPlugin({hostname: "https://docs.kelepool.com",}),
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

