# 涨姿势：钱包怎样安全的参与到 ETH Staking 浪潮中?

随着ETH2.0合并日期越来越近，质押的热度也在不断的创下新高。根据目前链上数据显示，以太坊链上质押总量已达到惊人的`1350多万个ETH`，将近`42万个验证节点`正在稳定运行，每天都有`1000-2000个ETH`被质押，这些节点在保证以太坊的安全同时，也在赚取丰厚的利润。

在ETH2.0合并完成后，链上GAS费也会作为质押分红奖励，届时质押收益会更加可观，预计年华收益将达到`6%-10%`左右，纵观目前市面上的知名质押平台，能安全稳定达到此收益的几乎屈指可数。

用户在质押32ETH后将会获得一个链上验证者，验证者首先进入质押排队系统，大约`24小时-14天`左右激活，这个过程要看目前质押队列的数量，验证者在激活后每个周期（6.4分钟）都会获得质押收益。

为了实现上述质押流程，需要为用户生成`提款凭证`，提款凭证是用户未来提取质押本金及收益的凭据，也是创建链上验证者最重要的参数之一。

生成ETH2.0提款凭证主要有两种方式：

- 钱包集成[EIP2334:BLS12-381](https://eips.ethereum.org/EIPS/eip-2334#eth2-specific-parameters)算法，从钱包内生成ETH2.0提款凭证（复杂）
- 使用官方提供的[ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式，将ETH1.0地址转换为ETH2.0提款凭证（简单）

经过查找，目前市面上Ledger硬件钱包实现了`EIP2334:BLS12-381`算法，可能受限于开发复杂度或其他方面的缘故，大部分硬件钱包都尚未对此算法进行支持。不过不用担心，好消息是还有`ETH1_WITHDRAWAL_PREFIX`这种方式，基本上所有能生成ETH地址的钱包都可以完美支持。

接下来就来看看如何使用这两种方式，让每个钱包都能无缝集成ETH2.0质押体系。

## 如何使用EIP2334:BLS12-381方式生成提款凭证？

该规范主要定义了密钥树中密钥的用途，是将[EIP-2333](https://eips.ethereum.org/EIPS/eip-2333)生成的密钥分配给特定用途的标准。它定义了一个Path字符串，该字符串为EIP-2333生成的密钥树时要使用的索引。此规范不仅被设计为ETH2.0的标准，也被其他社区广泛采用。

为了保证用户质押的资金安全，每个验证者都有两个密钥对，一个用于资金提款和转账（`提款密钥`），另一个用于验证者的签名（`签名密钥`），验证者可以执行的操作被分成由两套不同的密钥来发起。

（1）`提款密钥`：提款密钥用于用户质押本金、收益的提取，需要在ETH2.0官方提款功能上线后使用。该密钥关系到用户的资金的安全，因此需要保存在硬件钱包、冷钱包中。

（2）`签名密钥`：签名密钥是指一个验证者在签名消息和提议区块的时候要用到的密钥。因为验证者每一个时段（epoch）都要签署至少一条消息，所以签名密钥需要存放在第三方的联网服务器上。

#### （1）基本原理
EIP2334路径由整数定义，由分隔符号/表示层级关系。路径中有4个级别（加上主节点），并且必须至少使用4个层级（包括主节点在内总共5个）。

```
M / Purpose / Coin_Type /  Account / User


1.M 表示树的主节点（或根），分隔符/将树分成多个深度，路径中使用的符号在EIP-2333中指定。

2.Purpose 被设定为12381，是新的曲线（BLS12-381）的名称。

3.Coin_Type 被设定为3600，因为它是ETH1.0的coin_type(3600==60^2)的平方。

4.Account 它为用户提供不同密钥集的能力，可以为单个用户实现不同帐户的级别。

5.User 提供一组相关密钥，如果单个帐户有许多相关的用途，出于安全原因应该保持独立。

```


开发过HD Ｗallet的同学可能对这个比较了解，修改最后层级0将生成不同的密钥对，获得提款密钥对后我们就可以提取公钥，作为用户的ETH2.0的`提款凭证`：

```
提款密钥的路径：m/12381/3600/i/0

签名密钥的路径：m/12381/3600/i/0/0
```

#### （2）具体如何实现？

具体的算法由于篇幅原因不在这里继续展开，实现完整的算法还需要熟悉[EIP-2333](https://eips.ethereum.org/EIPS/eip-2333)，官方已经提供了此算法的Python实现，可根据钱包自身的开发语言自行转换：

[https://github.com/ethereum/staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)



## 如何使用ETH1_WITHDRAWAL_PREFIX方式生成提款凭证？
为了让ETH1.0钱包地址可以平滑的过度到ETH2.0质押体系，官方提供了一种新的方式来将ETH1.0地址转换为ETH2.0提款凭证。也就是上面提到的[ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式。

这种方式支持所有能生成ETH1.0地址的APP钱包、硬件钱包、WEB钱包等等，只需要将用户的ETH1.0地址稍作变换，就可以得到一个ETH2.0的提款凭证。

转换后的提款凭证都是小写字母，待ETH2.0提款功能上线后，用户将使用ETH1.0地址的签名，进行ETH2.0质押金额的提款，请务必确保转换正确。

具体转换方式如下：

```
ETH2提款凭证 = 0x01 + 11个00 + 去掉0x的ETH1.0地址

转换例子：
ETH1.0存款地址：0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2.0提款凭证：0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
```

这种方式相比上面的方式要简单许多，任何支持ETH1.0地址生成的钱包都能很容易的接入，接下来就来看看如何使用生成的ETH2.0提款凭证。

## 如何让钱包支持ETH2.0质押？

通过上面两种方式生成ETH2.0提款凭证后也只是完成了用户那边的准备工作。运行ETH2节点还需要生成验证者节点的签名密钥对，这个签名密钥对必须和用户的提款凭证进行签名关联才能在服务器上运行验证者客户端软件帮助用户获得质押收益。


#### （1）验证节点签名密钥对生成服务

这个服务只有一个功能，就是让用户传入提款凭证，在服务端生成此凭证的验证节点签名密钥对，同时返回签名后的一些参数给用户端，用户通过钱包调用ETH2.0官方质押合约时传入即可。

由于官方已经提供了密钥对生成的相关工具源码，可以直接改造一下官方提供的[ETH-Staking-Deposit-CLI](https://github.com/ethereum/staking-deposit-cli)工具降低开发成本。

为什么需要这样一个后端服务？不能让用户自己使用这个工具生成验证者密钥后，再上传到钱包这边吗？当然可以，但钱包作为节点运营方，一方面要让用户的质押流程足够简单，另一方面要确保验证验证节点密钥的安全。验证节点密钥如果被两个客户端同时运行，ETH链上会立即因为安全原因惩罚、甚至罚没节点。验证节点密钥如果在用户手中就很难确定到底是谁导致的罚没。

最终改造完成后，传入用户的提款凭证，会生成两个文件，其中`keystore-*.json`是要在服务器上运行的验证节点签名密钥，需要节点运营商安全保管。而`deposit_*.json`则是要传入官方质押存款合约的参数，需要返回给前端，调用质押合约需要这些参数，其内容结构大致如下：

```json
{
    // 验证者公钥
    "pubkey":"86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231",
    // 提款凭证
    "withdrawal_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
    // 验证者签名
    "signature":"a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f",
    // 默克尔树根
    "deposit_data_root":"ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5",
    // ETH网络
    "network_name":"ropsten"
}
```

#### （2）调用ETH2.0官方存款合约质押

到这里为止，质押所需的数据就都有了，上面这个JSON对象里就是官方质押存款合约需要传入的参数，现在就来调用合约完成质押流程。

ETH2.0 官方存款合约：[0x00000000219ab540356cbb839cbe05303d7705fa](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa)

下面以javascript为例，调用官方合约质押创建验证节点：

```javascript


// 导入库
import { ethers } from "ethers";

// 连接Metamask钱包
const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
let userAddress = await signer.getAddress();

// 初始化合约参数
const kelepool = {
  address: "0x00000000219ab540356cbb839cbe05303d7705fa",// 官方合约
  abi: [{"anonymous":false....　}] // 官方合约ABI，具体参考合约连接
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);


// 组装质押数据（支持一个用户同时创建多个验证者节点）
let data = {
    // 验证者公钥
    "pubkey":"86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231",
    // 提款凭证
    "withdrawal_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
    // 验证者签名
    "signature":"a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f",
    // 默克尔树根
    "deposit_data_root":"ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5",
    // ETH网络（主网要用mainnet）
    "network_name":"ropsten"
} 

// 生成质押合约参数
let prefix = '0x'
let pubkey = ethers.utils.arrayify(prefix + data.pubkey)
let withdrawal_credentials = ethers.utils.arrayify(prefix + data.withdrawal_credentials)
let signature = ethers.utils.arrayify(prefix + data.signature)
let deposit_data_root = data.deposit_data_root

// 执行合约质押方法，如果上面的验证节点数量为N，质押数量必须是32ETH*N的整数倍
let amount = ethers.utils.parseUnits('32', 'ether')
const tx = await contract.deposit(pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // 调用者账号
    value: amount,// 质押金额
    gasLimit: 10000000 // 最大Gas限制
})
console.log(`交易哈希: ${tx.hash}`);
```


#### （3）运行验证节点客户端

调用合约质押完成后，在ETH2.0链上就已经拥有了一个验证者，余额是32ETH，它可能还需要24小时-14天左右生效，具体要参考质押队列数量。

现在要运行一个验证者客户端，执行区块签名并保护ETH网络的安全，同时获得网络奖励的收益。

选择一个客户端来运行验证节点：

- Nimbus

- Prysm

- Lighthouse

- Teku


这里使用`Lighthouse`来运行验证节点，使用Docker会让整个流程变得简单：

详细安装方法请参考官方教程：

[https://lighthouse-book.sigmaprime.io/mainnet-validator.html](https://lighthouse-book.sigmaprime.io/mainnet-validator.html)

启动信标链：
```
$ docker run \
    --network host \
    -v $HOME/.lighthouse:/root/.lighthouse sigp/lighthouse \
    lighthouse --network mainnet bn --staking --http-address 0.0.0.0
```

启动验证者：
```

$ docker run \
    --network host \
    -v $HOME/.lighthouse:/root/.lighthouse \
    sigp/lighthouse \
    lighthouse --network mainnet vc


$ docker run -it \
    -v $HOME/.lighthouse:/root/.lighthouse \
    -v $(pwd)/validator_keys:/root/validator_keys \
    sigp/lighthouse \
    lighthouse --network mainnet account validator import --directory /root/validator_keys

```

这里要注意将验证者密钥存放在/root/validator_keys中，docker会自动导入你的密钥。

#### （4）查询节点状态

最终就可以在官方的验证者节点浏览器上查询状态：

[https://beaconcha.in/validator/验证者节点公钥](https://beaconcha.in/validator/800003d8af8aa481646da46d0d00ed2659a5bb303e0d88edf468abc1259a1f23ccf12eaeaa3f80511cfeaf256904a72a)

## 归纳总结

以上就是ETH2.0的整个质押流程，如果过程中不出意外，你的验证者节点将在（24小时-14天）左右激活，具体要看目前质押排队情况。验证者激活后，每6.4分钟都会看到有收益进入余额。

目前也有一些平台提供了一站式的接入服务，钱包方只需要简单的集成一下，就可以拥有上面的全部功能，例如[可乐矿池](https://docs.kelepool.com/zh/developers/ethereum/api/Hardware.html)，大家可以根据自身需要进行选择。

