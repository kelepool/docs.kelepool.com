# 如何调用智能合约质押？

## 1.合约简介

合约的两个主要功能是大额质押、小额质押。开发人员可通过javascript来调用可乐矿池的合约进行质押，合约采用了开源项目[Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)的可升级方案，因此`一定要调用代理合约来质押`，逻辑合约在ETH2.0上线或功能变更时会被更新替换。

Mainnet主网代理合约：[0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758](https://etherscan.io/address/0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758#code)

Goerli测试网代理合约：[0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7](https://etherscan.io/address/0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7#code)

合约开源代码：[https://github.com/kelepool/ethstaking](https://github.com/kelepool/ethstaking)

合约审计报告：[慢雾审计报告](https://www.slowmist.com/security-audit-certificate.html?id=b75b9e523dcfbb47689c8ed65117a347efcdd5c5b4694cc50781d289781a71cb)


## 2.安装必要的库

我们需要使用一个ETH的库：`ethers`、`web3.js`，你可以选择其中任意一个，这里我们选择`ethers`来调用可乐矿池的合约，下边我们以`Javascript`为例，来调用`Metamask钱包`实现可乐矿池的质押。

``` bash
npm install --save ethers
```

## 3.获取合约ABI

下边这个就是可乐矿池ETH质押合约的ABI数据，后边调用合约时都需要这个数据，本质上就是一个JSON字符串，这个数据在`Etherscan`上查看[逻辑合约](https://etherscan.io/address/0x3b27417d971d6aec8a8406143c507095f729bff0#code)时也能获得：

``` json
[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"OnDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnFeeTakeOut","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"foundation","type":"address"}],"name":"OnFoundationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnMinimumChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"OnOperatorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"ownership","type":"address"}],"name":"OnOwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"OnStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"role","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"OnValidatorCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"CREDENTIALS_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSIT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ETH2_DEPOSIT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VALIDATORS","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PUBKEY_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SIGNATURE_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"changeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"foundation","type":"address"}],"name":"changeFoundation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"changeMinimum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"changeOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"bytes","name":"pubkeys","type":"bytes"},{"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"internalType":"bytes","name":"signatures","type":"bytes"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"createValidator","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getSystemInfo","outputs":[{"components":[{"internalType":"bool","name":"status","type":"bool"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"foundation","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"minimum","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"devfee","type":"uint256"}],"internalType":"struct KelePoolStaking.System","name":"system","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"micros","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"takeOutFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whales","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

``` 

## 4.小额质押
用户最低可以质押0.01ETH，最大可以质押无限数量的ETH，待合约中小额总质押数量累计超过32ETH后，可乐矿池会使用[以太坊官方CLI工具](https://github.com/ethereum/staking-deposit-cli)在冷钱包中生成提款凭证，同时自动创建验证节点。用户的资金由可乐矿池管理及保障安全，等待未来ETH2.0正式上线后，可乐矿池会为用户开放提现接口。

- 小额质押非常简单，只需要将代币存入可乐矿池智能合约
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
  address: "0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758",// 可乐矿池【代理合约】，这里必须是代理合约！！！
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

## 5.大额质押
用户最低需要质押32ETH，最大可质押3200ETH（依据Gas情况而论），每次质押数量必须是32+fee的整数倍，fee目前0.05ETH，可乐矿池将收取fee作为节点运营费用。

大额质押主要分为三个步骤：

- 生成提款凭证
- 生成验证者公钥
- 执行大额质押

### （1）生成提款凭证

大额质押需要用户使用[以太坊官方CLI工具](https://github.com/ethereum/staking-deposit-cli)生成提款凭证。工具会生成`deposit_*.json`或`keystore-*.json`两个文件，用户一定要保存好自己的助记词，有了助记词可以随时重新生成这两个文件。

可乐矿池只需要`deposit_*.json`文件中的`withdrawal_credentials`属性值，此属性将作为ETH2.0提款凭证。生成的相关教程可查看[这里](https://kelepool.gitbook.io/help-center-zh/pos/FAQ/eth-deposit-cli)或者[这里](https://hackmd.io/urta4YBdTrqSaNqiHgP7Cw)。

下边是我们用以太坊官方CLI工具生成的deposit_*.json例子：

```json
[
    {
        "pubkey":"aa382e5b26eb8a73a305471adcf6e5188835717c31f3e12e5964028216465ce53a33c4f8ff5d28d4d047f4a77c49d349",
        "withdrawal_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
        "amount":32000000000,
        "signature":"a8b1a4a5228e4aa5fba6fd170fdf0c868c7dc824fdf2c4b53ee94175cbdda1088c5cba512f398ea69c7b3e8e9e2cd0ff017af046b10a4a1513835d335d8554ae0240b4cdfac4297077b10f742aa797eaf3a99f8758ebd51a864dc593f5ec1e3c",
        "deposit_message_root":"b771a2be82e825dd7a3df7732e72ab0f4a89d85e62c802651f01d12c08f98a9e",
        "deposit_data_root":"e43a0337b5e485a7bb4ad50969c54c88fc5756a1b6502b6499d16fcd2f30b061",
        "fork_version":"80000069",
        "network_name":"Goerli",
        "deposit_cli_version":"2.2.0"
    }
]
```

### （2）生成验证者公钥
验证者公钥主要用于可乐矿池运行ETH2.0节点，为了防止同一个验证者在不同的地方运行导致惩罚，可乐矿池将根据用户的提款凭证创建验证者公钥。

从上一步拿到`deposit_*.json`文件中的`withdrawal_credentials`属性值后，我们就可以请求可乐矿池的API来生成验证节点公钥了。

[Mainnet主网API：https://api.kelepool.com](https://api.kelepool.com)

[Goerli测试网API：https://test-api.kelepool.com](https://test-api.kelepool.com)

#### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> 请求参数：
> - `deposit_credentials` ：用户提款凭证
> - `count` ：生成验证节点数量，批量质押时可根据`质押数量 / 32` 得出`count`参数的数量。

```bash
https://test-api.kelepool.com/eth2/v2/validator/keypair

{
    "deposit_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
    "count":2
}
```


> 请求返回值：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `pubkey` ：验证者公钥
> - `withdrawal_credentials` ：提款凭证
> - `signature` ：验证者签名
> - `deposit_data_root` ：默克尔树根
> - `network_name` ：ETH网络名称
```json
{
    "code":0,
    "message":"success",
    "data":[
        {
            "pubkey":"86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231",
            "withdrawal_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
            "signature":"a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f",
            "deposit_data_root":"ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5",
            "network_name":"Goerli"
        },
        {
            "pubkey":"83909737754d15dd3ad1281a3f0e62baa64d3c0abb3ed218c3baf7ff250058a24fe1143a5243c3b015e3f93ed6af1e18",
            "withdrawal_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
            "signature":"b95af475d67e8438e49cfaad12dacd789c705938fd6a8fee93a1a170ef6322c2cf37c643d1d010b23734c04e9028b58d034435dd6c9f19610090bfdefb7522c69e99b0a7830f6d967f1d07e3ff30128c8b516d40232e5595ac91d746420da993",
            "deposit_data_root":"f08ca526395300d60ccc6db28d931ba129944f44d4bb92c773424e120dde222b",
            "network_name":"Goerli"
        }
    ]
}
```

### （3）执行大额质押

得到上面获得的验证者公钥后，我们就可以进行大额质押了，首先我们还是要按小额质押例子，写出基本的钱包操作代码。

与小额质押不同的地方，主要是传入的参数多了一些，同时在批量质押的时候还需要我们组装数据。首先我们要循环上面API返回的验证者公钥数组，将数组中的`pubkey`与`signature`及`deposit_data_root`各个字符串拼接起来，按合约ABI接口组装参数。

- 假设我们要质押96ETH，得出`96 / 32 = 3`，那么我们需要额外准备`0.05 * 3 = 0.15ETH`的fee
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
  address: "0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758",// 可乐矿池【代理合约】，这里必须是代理合约！！！
  abi: [{"anonymous":false....　}] // 将上面的合约ABI数组放到这里,
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);


// 组装大额质押数据
let data = [] // API返回的data对象
let stakingPublicKey = ''
let stakingSignature = ''
let stakingCredentials = '001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb' // 用户提款凭证
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

// 执行合约小额质押方法，最低质押32ETH，这里我们质押96ETH，由于每个节点需要0.05ETH手续费，因此3个节点需要质押96.15ETH
let amount = ethers.utils.parseUnits('96.15', 'ether')
const tx = await contract.createValidator(1, pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // 调用者账号
    value: amount,// 质押金额
    gasLimit: 10000000 // 最大Gas限制
})
console.log(`大额质押交易哈希: ${tx.hash}`);


```


