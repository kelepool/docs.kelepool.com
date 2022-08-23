---
description: 您可质押32ETH或其整数倍，每质押32ETH生成一个验证节点，每一个验证节点收取0.05ETH作为服务费，用来维护节点运营。您质押后自己掌管私钥。
---

# 🔑 ETH大额质押教程

## **使用deposit文件上传提款凭证质押流程**

<iframe width="560" height="315" src="https://www.youtube.com/embed/eeqLyvS-mzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## **使用Ledger钱包上传提款凭证质押流程**

<iframe width="560" height="315" src="https://www.youtube.com/embed/1l22pi0MPkc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## **1.选择币种连接钱包**

确认质押前请先安装MetaMask钱包，通过[MetaMask](https://metamask.io/faqs/)官网查看安装教程

1. 进入首页点击“质押挖矿”或通过导航"质押挖矿"选择ETH

![](<../../.gitbook/assets/image(89).png>)

2\. 进入质押主页，选择**ETH**

![下拉选择ETH](<../../.gitbook/assets/image(265).png>)

3\. 点击“连接钱包”，使用浏览器工具栏中的图标打开MetaMask面板，单击顶部工具栏中的网络下拉菜单，选择**以太坊主网**。

![连接钱包](<../../.gitbook/assets/image(230).png>)

![](<../../.gitbook/assets/image(222).png>)

![](<../../.gitbook/assets/image(286).png>) 

## **2.立即质押**

点击大额质押中的“立即质押”按钮，进入质押页面，请确保您的账户中至少有32ETH。

1. 设置质押数量，需为32整数倍
2. 信息确认
   * 验证节点数：每质押32ETH创建1个验证节点。
   * 生效时间：该时间为实时计算的预估时间，交易排队影响较大，具体以实际生效时间为准。
   * 服务费：每生成1个验证节点收取0.05ETH服务费。
   * 预估年利率：Ethereum主网年利率，该数据为预估值，与质押率成反比。具体是实际收益率为准。

![输入质押数量，确认质押信息](<../../.gitbook/assets/image(37).png>)

## **3.上传提款凭证**

支持两种方法上传提款凭证，官方工具上传，Ledger钱包上传

**方法一：使用官方工具上传**

使用ETH2.0官方工具CLI生成deposit\*.json文件，生成方法[查看教程](https://docs.kelepool.com/zh/guides/pos/FAQ/eth-deposit-cli.html)。

1. 点击上传提款凭证，该凭证中包含与提款凭证相关的公钥信息，不包含任何私钥，可以放心上传。
2. 点击下一步，进入审查协议页面。

![点击此处上传提款凭证](<../../.gitbook/assets/image(220).png>)

![上传成功，点击下一步](<../../.gitbook/assets/image(20).png>)

![签署协议](<../../.gitbook/assets/image(1).png>)

![完成签名](<../../.gitbook/assets/image(254).png>)

![确认质押信息](<../../.gitbook/assets/image(280).png>)

**方法二：使用Ledger钱包**

您的Ledger固件需更新至最新版本，Nano X更新至1.2.4-5或以上版本。Nano S更新至2.0.0或以上版本。Ethereum App要求1.6.1或以上版本。

1. 通过USB连接Ledger钱包，并打开Ethereum App应用程序

****

2\. 点击“获取ETH2提款凭证”，通过Ledger钱包完成确认操作，生成提款凭证用于后续提款。

![获取ETH2提款凭证](<../../.gitbook/assets/image(271).png>)

![ 按提示在Ledger钱包确认](<../../.gitbook/assets/image(289).png>)

3\. 点击“验证信息”通过Ledger钱包完成信息验证，该流程为验证您Ledger钱包中显示的ETH2提款公钥及ETH2提款凭证信息是否与平台显示的信息一致。

![点击验证信息](<../../.gitbook/assets/image(235).png>)

![通过钱包验证](<../../.gitbook/assets/image(276).png>)

![验证成功，点击下一步](<../../.gitbook/assets/image(278).png>)

4.点击下一步，进入审查协议页面。



## **4.审查协议**

审查协议信息，确认信息无误，通过MetaMask签名。

![签署协议](<../../.gitbook/assets/image(48).png>)

****

## **5.确认并广播**

在正式质押签名前，核对关键信息是否正确，主要信息为质押数量、Gas费、服务费、验证节点数、ETH1存款地址、ETH2提款凭证

信息确认

* 质押数量：您存入平台智能合约的数量。
* Gas费：当前交易支付给矿工的手续费，该费用为预估数据，具体以实际支付费用为准。
* 服务费：根据质押数量计算，每生成1个节点收取0.05ETH。
* 验证节点数：您每质押32ETH生成一个验证节点。
* ETH1存款地址：您在质押时使用的钱包地址。
* ETH2提款凭证：您通过官方CLI工具生成或Ledger钱包上传的提款凭证，确认该信息与上传信息一致。

![](<../../.gitbook/assets/image(196).png>)

确认以上信息无误，点击“确认质押并签名”，通过MetaMask完成签名。该交易上传，等待矿工打包，受交易排队影响，该过程需要几分钟到几小时不等；您可使用钱包地址在[Etherscan](https://etherscan.io/)查看您当前交易进度。

## **6.存款交易成功**

交易成功后，可点击查看数据进入总览页面查看数据，或使用交易ID在[Etherscan](https://etherscan.io/)查询交易信息。

![](<../../.gitbook/assets/image(55).png>)

## **7.查看质押进度**

存款交易完成后**，**受交易排队影响，不会立即生效，以实际生效时间为准。

1. 通过查看“总览-资金”或“总览-操作历史”页面中的待生效、已生效查看进度，待生效表示这部分资金尚未产生收益，已生效表示这部分资金开始产生收益。

## **8.查看收益明细**

存款交易完成后不会立即产生收益，待质押资金生效后即可产生收益，可通过“总览-收益”查看收益数据，或菜单“收益”查看收益明细

1. “总览-收益”为总收益数据，可查看累计收益、年利率、质押时长。也可按小时或天查看收益趋势。
   * 累计收益：首次质押生效至昨天的收益金额
   * 年利率：您获得收益的年利率
   * 质押时长：首次质押生效至当前的质押时长
2. 可通过菜单“收益”查看每日收益，收益结算周期为00:00-24:00 (UTC+0)，国内用户次日早8点后可查看上一日收益。

## **9.查看验证节点**

存款交易成功后节点不会立即生效，需等待一段时间，具体生效时间受交易排队影响，以实际生效时间为准。

可通过菜单“验证节点”查看节点信息，或通过验证节点公钥在[信标链](https://mainnet.beaconcha.in/)查询。
