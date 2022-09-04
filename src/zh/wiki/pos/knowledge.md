# 涨姿势：钱包怎样安全的参与到 ETH Staking 浪潮中?

随着ETH2.0合并日期越来越近，质押的热度也在不断的创下新高。根据目前链上数据显示，以太坊链上质押总量已达到惊人的1350多万个ETH，将近42万个验证节点正在稳定运行，每天都有1000-2000个ETH被质押，这些节点在保证以太坊的安全同时，也在赚取丰厚的利润。

待ETH2.0合并完成后，链上手续费也会同时进入质押分红池，届时ETH质押收益会更加可观，预计年华收益将达到6%-10%左右，纵观目前市面上的知名DEFI质押平台，能安全稳定的达到此收益的屈指可数，就让我们拭目以待吧。

钱包要实现ETH2.0质押主要有两种方式：

- 钱包内集成[EIP2334:BLS12-381](https://eips.ethereum.org/EIPS/eip-2334#eth2-specific-parameters)算法，从钱包内生成ETH2.0提款凭证（复杂）
- 使用官方提供的[ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式，将ETH1地址转换为ETH2提款凭证（简单）

作为币圈的安全堡垒，硬件钱包更受到质押大户的青睐，毕竟资金的安全才是第一位。经过调研，目前市面上只有Ledger硬件钱包实现了`EIP2334:BLS12-381`，支持从钱包内生成ETH2.0提款密钥。而市面上所有支持生成ETH地址的硬件钱包都支持`ETH1_WITHDRAWAL_PREFIX`这种方式生成ETH2.0提款密钥。

## 什么是EIP2334？

该EIP定义了密钥树中给定密钥或其族的用途，是将EIP-2333生成的密钥分配给特定用途的标准。它定义了Path一个字符串，该字符串解析为在遍历EIP-2333生成的密钥树时要使用的索引。此规范不仅被设计为ETH2.0标准，而且被更广泛的社区采用。

为了保证用户质押的资金安全，每个验证者都有两个密钥，一个用于资金提款和转账（`提款密钥`），另一个用于验证者的签名（`签名密钥`）。

因为验证者客户端软件是联网的，因此有签名密钥丢失被盗的可能。为降低此类事件会造成的影响，验证者可以执行的操作被分成由两套不同的密钥来发起。

（1）`提款密钥`：提款密钥用于用户质押本金、收益的提取，需要在ETH2.0官方提款功能上线后使用。该密钥关系到用户的资金的安全，因此需要保存在硬件钱包、冷钱包中。

（2）`签名密钥`：签名密钥是指一个验证者在签名消息和提议区块的时候要用到的密钥。因为验证者每一个时段（epoch）都要签署至少一条消息，所以签名密钥需要提供给第三方或自己运行的服务器上。

#### （1）基本原理
EIP2334遍历键树的路径由整数（表示同级索引）定义，由整数（表示同级索引）分隔/表示祖先关系。路径中有4个级别（加上主节点），并且必须至少使用4个（包括主节点在内的5个）。

```
M / Purpose / Coin_Type /  Account / User
```

`M` 表示树的主节点（或根）/将树分成多个深度，路径中使用的符号在EIP-2333中指定。

`Purpose` 被设定为12381，是新的曲线（BLS12-381）的名称。

`Coin_Type` 被设定为3600，之所以选择它，是因为它是Eth1.0的coin_type(3600==60^2)的平方，从而表明它是货币Ether的第二次实例化。

`Account` 它为用户提供用于不同目的的不同密钥集的能力，这是应该为单个用户实施不同帐户的级别。

`User` 此级别旨在提供一组可用于任何目的的相关密钥。这个想法是单个帐户有许多相关的用途，但出于安全原因应该保持独立。

#### （2）ETH2.0密钥路径
使用过HD Ｗallet的同学可能对这个比较了解：

取款密钥的路径：`m/12381/3600/i/0`

签名密钥的路径：`m/12381/3600/i/0/0`

#### （3）具体如何实现？

目前官方已经提供了此算法的Python实现，可根据钱包自身的开发语言自行转换：

[https://github.com/ethereum/staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)

硬件钱包或钱包APP可以实现此算法，来支持ETH2.0提款凭证密钥对的生成。钱包需要为用户提供提款凭证的公钥，同时确保提款私钥的安全。用户获得提款公钥后，即可通过官方的存款合约，进行32ETH官网验证节点的创建。

## 什么是ETH1_WITHDRAWAL_PREFIX？
为了让ETH1.0钱包地址可以平滑的过度到ETH2.0质押体系，官方提供了一种新的方式来将ETH1.0地址转换为ETH2.0提款凭证。也就是上面我们提到的[ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式。

转换后的提款凭证都是小写字母，待ETH2.0提款功能上线后，用户将使用ETH1地址的签名进行ETH2.0质押金额的提款，请务必确保转换正确，具体转换方式如下：

```
ETH2提款凭证 = 0x01 + 11个00 + 去掉0x的ETH1地址

转换例子：
ETH1存款地址：0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2提款凭证：0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
```

这种方式相比上面的方式要简单许多，任何支持ETH1.0地址生成的钱包都能很容易的接入，接下来我们就来看看如何使用生成的ETH2.0提款凭证。

## 如何让钱包支持ETH质押？

通过上面两种方式生成ETH2.0提款凭证后，也只是完成了前期的准备工作，我们还需要使用提款凭证来生成用户的验证者密钥对，这一步我们可以开发一个后台服务来实现。


#### （1）改造官方CLI
为了实现这个服务，我们需要改造一下官方提供的[ETH-Staking-Deposit-CLI](https://github.com/ethereum/staking-deposit-cli)工具。

- 传入提款凭证，生成验证者节点密钥对

到这里可能很多人不太了解，让用户自己使用这个工具生成验证者密钥传给我不行吗？行是行，但作为节点运营方，一方面我们要让用户的质押流程足够简单，另一方面要确保验证节点密钥的安全。我们没办法确保用户不会自己搞一个验证节点来跑，到时候出现亏损和罚没，这个损失谁来承担呢？

最终我们可以通过官方的CLI，传入用户的提款凭证，会生成两个文件，其中`keystore-*.json`是我们要在服务器上运行的验证节点签名密钥，需要安全保管。而`deposit_*.json`则是我们要传入官方质押存款合约的参数，可公开，其内容结构大致如下：

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

#### （2）调用ETH官方存款合约质押

到这里为止，ETH2.0质押所需的数据我们就都有了，上面这个JSON对象里就是官方质押存款合约需要传入的参数，现在我们就来调用合约完成质押流程。

ETH2.0 官方存款合约：[0x00000000219ab540356cbb839cbe05303d7705fa](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa)

下面我们以javascript为例，调用官方合约质押创建验证节点：

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

上面质押完成后，我们在ETH2.0链上就已经拥有了一个验证者，余额是32ETH，现在我们要运行一个验证者的节点，执行区块签名并保护ETH网络的安全，同时获得网络奖励的收益。我们需要选择一个客户端来运行验证节点：

- Nimbus

- Prysm

- Lighthouse

- Teku


这里我们使用`Lighthouse`来跑我们的验证节点，使用docker会让整个流程变得简单：

```
docker run -it \
    -v $HOME/.lighthouse:/root/.lighthouse \
    -v $(pwd)/validator_keys:/root/validator_keys \
    sigp/lighthouse \
    lighthouse --network mainnet account validator import --directory /root/validator_keys

```

这里要注意将验证者密钥存放在/root/validator_keys中，docker会自动导入你的密钥。

最终我们就可以在官方的验证者节点浏览器上查询节点状态：

[https://beaconcha.in/validator/验证者节点公钥](https://beaconcha.in/validator/800003d8af8aa481646da46d0d00ed2659a5bb303e0d88edf468abc1259a1f23ccf12eaeaa3f80511cfeaf256904a72a)

## 归纳总结

以上就是整个ETH的质押流程，如果中间不出任何意外，在验证者节点激活后（大约6-14天左右），具体要看目前质押排队情况，我们每6.4分钟都会看到有收益进入余额。

对于一个运营商来说，这只是最基本的流程。实际我们可能还要做很多工作，让整个流程机制更健全，才能实现产品化运作：

- 收款智能合约（收取手续费）

- 数据采集器（采集节点状态）

- 收益统计服务（计算用户收益）

- 验证节点管理服务等等（管理节点）

作为硬件钱包或APP钱包厂商，如何才能简单便捷的让用户参与进来？我们可能希望给用户提供一个易用的质押功能，并适当的收取部分手续费，并不想去开发一套这么复杂的质押系统。

目前也有一些平台提供了完整的接口和API，钱包方只需要简单的集成一下，就可以拥有上面的全部功能，例如（[可乐矿池](https://docs.kelepool.com/zh/developers/ethereum/api/Hardware.html)等等），大家可以根据自身需要进行选择。

