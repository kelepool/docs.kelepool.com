# 涨姿势：钱包怎样安全的参与到 ETH Staking 浪潮中?

随着ETH2.0合并日期越来越近，质押的热度也在不断的创下新高。根据目前链上数据显示，以太坊链上质押总量已达到惊人的1350多万个ETH，将近42万个验证节点正在稳定运行，每天都有1000-2000个ETH被质押，这些节点在保证以太坊的安全同时，也在赚取丰厚的利润。

待ETH2.0合并完成后，链上手续费也会同时进入质押分红池，届时ETH质押收益会更加可观，预计年华收益将达到6%-10%左右，纵观目前市面上的知名DEFI质押平台，能安全稳定的达到此收益的屈指可数，就让我们拭目以待吧。

硬件钱包要实现ETH2.0质押主要有两种方式：

- 钱包内集成[EIP2334:BLS12-381](https://eips.ethereum.org/EIPS/eip-2334#eth2-specific-parameters)算法，从钱包内生成ETH2.0提款凭证（复杂）
- 使用官方提供的[ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式，将ETH1地址转换为ETH2提款凭证（简单）

作为币圈的安全堡垒，硬件钱包更受到质押大户的青睐，毕竟资金的安全才是第一位。市面上所有支持生成ETH地址的硬件钱包基本都支持第二种方式。


## 如何让钱包支持ETH质押？

作为硬件钱包或APP钱包厂商，如何才能简单便捷的让用户参与进来？我们可能希望给用户提供一个易用的质押功能，并适当的收取部分手续费，因此有以下两种选择：

- 自己研发质押平台（收款智能合约、数据采集器、收益统计服务、验证节点管理服务等等）
- 接入第三方质押平台（[可乐矿池](https://kelepool.com/pos/eth/mining)等）

第一种前期的研发的成本很高，如果按照官方CLI生成BLS提款密钥的的方式来做，还要确保用户提交了验证者密钥后不会自己运行验证节点（会被罚没），后期管理维护这些节点也需要大量的人力物力。

可乐矿池作为一站式质押管理平台，拥有完善的安全解决方案，健全的渠道质押分红的机制。同时也为开发人员提供了丰富的数据统计API，大幅度降低了接入ETH质押的难度。智能合约经过慢雾安全人员审计，无需担心资金安全。同时还有便捷的技术支持。

我们为开发人员提供了完善的数据统计接口（用户质押记录、操作记录、历史收益、节点状态等等）：

[开发文档 - 用户质押信息查询及收益统计](https://docs.kelepool.com/zh/developers/ethereum/api/)

## 如何接入可乐矿池平台API？

可乐矿池支持两种质押方式，大额质押拥有独立的链上验证者节点，小额质押与其他用户共享链上验证者节点。钱包APP厂商可帮助用户选择或者让用户自己选择质押方式。

- 大额质押：用户自己管理提款密钥，最低支持32ETH，最大支持3200ETH，质押量须是32的整数倍。
- 小额质押：可乐平台多签管理提款密钥，最低支持0.01ETH，最大支持100000000000ETH。

目前可乐矿池已经集成了（OneKey、Ledger、ETH Staking CLI、Metamask）等质押方式。

如果钱包APP决定让用户自己选择质押方式，就需要在钱包中提供两个质押入口（大额、小额），并告知用户两种质押方式的区别。

如果钱包APP希望自动帮助用户选择质押方式，也可以在用户质押时候判断质押数量是否大于32，如果大于32则走大额质押流程，反之则走小额质押流程。


可乐矿池官方网站：[官方网站](https://kelepool.com/pos/eth/mining)

可乐矿池开发文档：[开发文档](https://docs.kelepool.com/zh/)

可乐矿池技术支持：[Telegram技术支持](https://t.me/kelepoolcom)

Mainnet质押合约：[0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758](https://etherscan.io/address/0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758#code)

Ropsten质押合约：[0x09D93B9d2E7fb79f5Bf26687b35844cf1993DAFa](https://etherscan.io/address/0x09D93B9d2E7fb79f5Bf26687b35844cf1993DAFa#code)

智能合约审计报告：[慢雾审计报告](https://www.slowmist.com/security-audit-certificate.html?id=b75b9e523dcfbb47689c8ed65117a347efcdd5c5b4694cc50781d289781a71cb)


### 如何集成大额质押？

#### 第一步：ETH1地址转ETH2提款凭证

钱包APP需要使用官方提供的[ETH1_ADDRESS_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149)方式，将用户ETH1存款地址转换成ETH2的提款凭证，注意转换后的提款凭证都是小写字母，待ETH2.0提款功能上线后，用户将使用此地址的签名进行提款，请务必确保转换正确，具体转换方式如下：

- ETH2提款凭证 =  `0x01 + 11个00 + 去掉0x的ETH1地址`

```
转换例子：
ETH1存款地址：0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2提款凭证：0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
```
#### 第二步：请求可乐矿池API

##### （1）用户地址注册

此接口主要用于统计第三方各个用户的质押数量等，只需在用户第一次质押的时候调用，当然你也可以在每次用户质押时候调用。此接口主要用于渠道手续费分红，请务必在用户质押前调用。

```bash
POST https://test-api.kelepool.com/user/v2/anonymouslogin

{
    // 用户质押钱包地址
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22", 
    // 质押代币（eth）
    "token":"eth",
    // 数据来源便于商务合作统计（例如：钱包APP）
    "source":"钱包APP"
}
```

##### （2）生成合约大额质押需要的参数

此接口用于合约大额质押的参数生成，需要传入上面的转换好的ETH提款凭证。由于大额质押是用户自己控制提款密钥，但验证节点需要可乐矿池运营，因此需要调用此接口生成运营节点需要的一些参数，用户质押时需将验证节点参数一起提交至ETH2.0官方存款合约。

这里请求的参数里有个`count`，是通过用户质押量计算出来的，下边有计算例子。这里传入了`2`因此返回了两条验证节点信息，你可能会发现他们的`提款凭证`都是一样的，未来用户可以通过一个提款凭证对所有节点质押数量和收益提款。由于用户可能在质押时传入了35、100、89这种并非32的倍数数量，因此钱包APP需要计算一下有效质押数量，只允许用户质押32的倍数数量。

 - 验证节点数量 =`（用户质押ETH数量 - （用户质押ETH数量 % 32））/ 32`
 - 有效质押数量 = `（用户质押ETH数量 - （用户质押ETH数量 % 32））`
 - 大额质押手续费 = `0.05 * 验证节点数量`

假设用户质押了68ETH：
 - 验证节点数量 = （68 - 68 % 32）/ 32 = 2
 - 有效质押数量 = （68 - 68 % 32） = 64
 - 大额质押手续费 = 0.05 * 2 = 0.1ETH

```bash
POST https://test-api.kelepool.com/eth2/v2/validator/keypair

请求参数：
{
    // 上面转换好的ETH2提款凭证（去掉0x）
    "deposit_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
    // 验证节点数量，计算方式 =（用户质押ETH数量 - （用户质押ETH数量 % 32））/ 32
    "count":2
}

返回值：
{
    // 整型数字，等于0表示成功，大于0表示失败
    "code":0,
    // 失败后返回的消息
    "message":"success",
    "data":[
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
        },
        {
            "pubkey":"83909737754d15dd3ad1281a3f0e62baa64d3c0abb3ed218c3baf7ff250058a24fe1143a5243c3b015e3f93ed6af1e18",
            "withdrawal_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
            "signature":"b95af475d67e8438e49cfaad12dacd789c705938fd6a8fee93a1a170ef6322c2cf37c643d1d010b23734c04e9028b58d034435dd6c9f19610090bfdefb7522c69e99b0a7830f6d967f1d07e3ff30128c8b516d40232e5595ac91d746420da993",
            "deposit_data_root":"f08ca526395300d60ccc6db28d931ba129944f44d4bb92c773424e120dde222b",
            "network_name":"ropsten"
        }
    ]
}
```


#### 第三步：调用合约质押

得到上面返回的的验证者公钥数据后，我们就可以调用合约进行大额质押了。上面按质押量计算出验证节点数量为`2`，因此API接口返回了两条验证节点数据，我们调用合约时需要将这两条数据组合一下，再传入合约。具体请参考下边的js代码。

- 用户质押64ETH，得出`64 / 32 = 2`，那么用户需要额外准备`0.05 * 2 = 0.1ETH`的手续费
- 因此用户转入合约的数量变成了`64.1ETH`，低于或高于这个数量合约都会拒收
- 可乐矿池每个验证节点收取一次fee，运营fee的有效期为ETH2.0上线，之后可乐矿池将视情况收费

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
  address: "0x09D93B9d2E7fb79f5Bf26687b35844cf1993DAFa",// 可乐矿池【代理合约】，这里必须是代理合约！！！
  abi: [{"anonymous":false....　}] // 将上面的合约ABI数组放到这里,
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);


// 组装大额质押数据
let data = [] // /eth2/v2/validator/keypair API返回的data对象
let stakingPublicKey = ''
let stakingSignature = ''
let stakingCredentials = '0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606' // 用户提款凭证
let stakingRoot = []
for (let i = 0; i < data.length; i++) {
    let validator = data[i]
    stakingPublicKey += validator.pubkey // 拼接公钥字符串
    stakingSignature += validator.signature // 拼接签名字符串
    stakingRoot.push('0x' + validator.deposit_data_root) // 拼接默克尔树字符串
}

// 生成大额质押合约参数
let prefix = '0x'
let pubkey = ethers.utils.arrayify(prefix + stakingPublicKey)
let withdrawal_credentials = ethers.utils.arrayify(prefix + stakingCredentials)
let signature = ethers.utils.arrayify(prefix + stakingSignature)
let deposit_data_root = stakingRoot

// 执行合约大额质押方法，最低质押32ETH，这里我们质押64ETH，由于每个节点需要0.05ETH手续费，因此2个节点需要质押64.1ETH
let amount = ethers.utils.parseUnits('64.1', 'ether')
const tx = await contract.createValidator(1, pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // 调用者账号
    value: amount,// 质押金额
    gasLimit: 10000000 // 最大Gas限制
})
console.log(`大额质押交易哈希: ${tx.hash}`);
```


### 如何集成小额质押？

#### 第一步：用户地址注册

此接口主要用于统计第三方各个用户的质押数量等，只需在第一次使用可乐矿池API时调用，当然你也可以多次调用。此接口主要用于渠道手续费分红，请务必在用户质押前调用。

```bash
POST https://test-api.kelepool.com/user/v2/anonymouslogin

{
    // 用户质押钱包地址
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22", 
    // 质押代币（eth）
    "token":"eth",
    // 数据来源便于商务合作统计（例如：钱包APP）
    "source":"钱包APP"
}
```

#### 第二步：调用合约质押

小额质押非常简单，只需要将代币存入可乐矿池智能合约。用户最低可以质押0.01ETH，最大可以质押无限数量的ETH，待合约中小额总质押数量累计超过32ETH后，可乐矿池会使用[以太坊官方CLI工具](https://github.com/ethereum/staking-deposit-cli)在冷钱包中生成提款凭证，同时自动创建验证节点。用户的资金由可乐矿池管理及保障安全，等待未来ETH2.0正式上线后，可乐矿池会为用户开放提现接口。

- 假设我们打算质押`125.0172ETH`，质押后可乐矿池会立即创建`3个验证节点`（每个32ETH）
- 合约中将剩余`29.0172ETH`等待质押，待其他用户质押凑够`32ETH`后会再创建验证节点

``` javascript

// 导入库
import { ethers } from "ethers";

// 连接Metamask钱包
const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
let userAddress = await signer.getAddress();

// 初始化合约参数
const kelepool = {
  address: "0x09D93B9d2E7fb79f5Bf26687b35844cf1993DAFa",// 可乐矿池【代理合约】，这里必须是代理合约！！！
  abi: [{"anonymous":false....　}] // 将上面的合约ABI数组放到这里,
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);

// 执行合约小额质押方法，最低质押0.01 ETH，这里我们质押125.0172ETH
let amount = ethers.utils.parseUnits("125.0172", 'ether')
const tx = await contract.deposit({
    from: userAddress, // 调用者账号
    value: amount,// 质押金额
    gasLimit: 10000000 // 最大Gas限制
});
console.log(`小额质押交易哈希: ${tx.hash}`);


```
