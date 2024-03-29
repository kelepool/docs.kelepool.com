---
description: 您可赎回32ETH或其整数倍，每赎回32ETH关闭一个验证节点。
---

# 🔑 ETH大额赎回教程

## **1.选择币种连接钱包**
>确认质押前请先安装OneKey，TokenPocket，MetaMask任意钱包。
- [OneKey插件钱包安装](https://onekey.so/zh_CN/download?client=browserExtension)
- [TokenPocket插件钱包安装](https://extension.tokenpocket.pro/#/)
- [MetaMask插件钱包安装](https://metamask.io/download/)

1.进入首页点击导航“质押挖矿”进入质押挖矿页面

![](<../../.gitbook/assets/0213/1.png>)

2.进入质押主页，选择**ETH**，连接钱包

![下拉选择ETH](<../../.gitbook/assets/0213/2.png>)

3\. 点击“连接钱包”，使用浏览器工具栏中的图标打开钱包面板（此处以MetaMask为例），单击顶部工具栏中的网络下拉菜单，选择**以太坊主网**。

![选择以太坊主网](<../../.gitbook/assets/0213/5.png>)

## **2.大额赎回**
已生效的ETH大额质押的本金可以在“大额可赎回(ETH)”中赎回，点击图中的“赎回”按钮，即可进入赎回页面。
>注意：
>
>a. 大额赎回即为放弃验证者身份。
>
>b. 大额赎回前需确认提款凭证前缀是否为0x01，如前缀为0x00，您需要自行修改地址后，才可进行赎回操作，修改详情请[参考官方文档](https://notes.ethereum.org/@launchpad/withdrawals-guide#BLS-to-execution-with-ethdo)
>
>c. 关于大额质押收益：
>
>- 如您的提款凭证前缀为0x01，上海升级后，您的大额质押基础收益将由链上直接自动打到您的钱包地址。
>- 如您的提款凭证前缀为0x00，您需要自行修改地址后，收益才能打入。

![点击赎回](<../../.gitbook/assets/0413/2-1.png>)

1.赎回数量：输入赎回数量，需为32整数倍
- 预计到账时间：目前预计到账需要数天，具体以链上实际所需时间为准，链上所需时间受退出验证节点者排队数量影响，最长可达数月。
- 收款地址：赎回前请检查您的提款凭证前缀，当您的提款凭证前缀为0x01时，您可直接进行赎回。当您的凭证前缀为0x00时，需要用户自行修改地址后方进行赎回。

![赎回数量](<../../.gitbook/assets/0413/2-2.png>)

2.确认信息无误后，点击“确认赎回并签名”

![赎回数量](<../../.gitbook/assets/0413/2-3.png>)

3.赎回申请提交成功后，ETH不会立刻到账，用户可点击“查看赎回记录”获取赎回明细。

![赎回完成](<../../.gitbook/assets/0413/2-4.png>)

4.查看赎回记录

用户可通过查看“操作历史”页面查看赎回记录，刚提交完赎回申请时，交易状态应为“赎回中”，此时需等待链上排队完成赎回。当最终赎回完成时将生成“已到账”状态，即赎回金额已到达钱包地址，用户可登录钱包地址查看赎回金额。

![查看赎回记录](<../../.gitbook/assets/0413/2-5.png>)