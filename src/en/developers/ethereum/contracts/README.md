# How to use smart contract to stake?

## 1.Introduction

The two main functions of the contract are large staking and small staking. Developers can use javascript to call the contract of the cola mining pool for staking. The contract adopts the upgradeable scheme of the open source project [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), so `be sure to call the proxy contract To stake `, the logic contract will be updated and replaced when ETH2.0 is launched or the function changes.

```
Notice:

1. In order to improve the statistical accuracy of the channel staking amount, the V2 version of the staking contract supports the transmission of source channel parameters.

2. This version adds a contract calling method (depoositV2/createValidatorV2)

3. It will not affect the third-party channels that have been connected to the earlier V1 version before, and the third-party channels can be upgraded on demand.

4. When the V1 version is still used or the source is not passed when using the V2 contract, the system defaults to counting income and dividends according to the registered address.

5. If you use the V2 version, you need to update the ABI and calling method at the same time, and the contract address remains unchanged. For details, please refer to the code for calling the contract below.

```


Mainnet contract:[0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758](https://etherscan.io/address/0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758#code)

Goerli contract:[0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7](https://goerli.etherscan.io/address/0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7#code)

Contract source code:[https://github.com/kelepool/ethstaking](https://github.com/kelepool/ethstaking)

Contract Audit Report:[Slowmist](https://www.slowmist.com/security-audit-certificate.html?id=b75b9e523dcfbb47689c8ed65117a347efcdd5c5b4694cc50781d289781a71cb)


## 2.Install libraries

We need to use an ETH library: `ethers`, `web3.js`, you can choose any of them, here we choose `ethers` to call the contract of the cola mining pool, below we take `Javascript` as an example to call `Metamask Wallet` implements cola mining pool staking.

``` bash
npm install --save ethers
```

## 3.Get contract ABI

The following is the ABI data of the cola mining pool ETH staking contract. This data is required when calling the contract later. It is essentially a JSON string. This data can be viewed on `Etherscan` [Logical Contract](https://etherscan.io/address/0x2ba03c98fee1f538ff158766c2870196198e8e1d#code) can also get:

``` json
[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"OnDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"source","type":"bytes32"}],"name":"OnDepositV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnFeeTakeOut","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"foundation","type":"address"}],"name":"OnFoundationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnMinimumChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"OnOperatorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"ownership","type":"address"}],"name":"OnOwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"OnStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"refund","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"gasFee","type":"uint256"}],"name":"OnUserRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"role","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"OnValidatorCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"role","type":"uint8"},{"indexed":false,"internalType":"bytes32","name":"source","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"OnValidatorCreatedV2","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"CREDENTIALS_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSIT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ETH2_DEPOSIT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VALIDATORS","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PUBKEY_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SIGNATURE_LENGTH","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"changeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"foundation","type":"address"}],"name":"changeFoundation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"changeMinimum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"changeOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"bytes","name":"pubkeys","type":"bytes"},{"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"internalType":"bytes","name":"signatures","type":"bytes"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"createValidator","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"bytes32","name":"source","type":"bytes32"},{"internalType":"bytes","name":"pubkeys","type":"bytes"},{"internalType":"bytes","name":"withdrawal_credentials","type":"bytes"},{"internalType":"bytes","name":"signatures","type":"bytes"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"createValidatorV2","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"source","type":"bytes32"}],"name":"depositV2","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getSystemInfo","outputs":[{"components":[{"internalType":"bool","name":"status","type":"bool"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"foundation","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"minimum","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"devfee","type":"uint256"}],"internalType":"struct KelePoolStaking.System","name":"system","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"micros","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"takeOutFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whales","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

``` 

## 4.Stake ＜ 32 ETH
Users can staking a minimum of 0.01ETH and a maximum amount of ETH. When the total amount of small stakings in the contract exceeds 32ETH, the Kele Pool will use the [Ethereum official CLI tool](https://github.com/ethereum/staking-deposit-cli) generates withdrawal credentials in the cold wallet and automatically creates a verification node. The user's funds are managed and secured by the cola mining pool. After the official launch of ETH2.0 in the future, the cola mining pool will open the withdrawal interface for users.

- Small staking is as simple as depositing tokens into the Kele Pool smart contract
- Suppose we intend to staking `125.0172ETH`, after the staking, Kele Pool will immediately create `3 validating nodes` (32ETH each)
- The remaining `29.0172ETH` in the contract will be staked, and a verification node will be created after other users staking enough `32ETH`

``` javascript

// import libraries
import { ethers } from "ethers";

// connect metamask
const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
let userAddress = await signer.getAddress();

// initialize
const kelepool = {
  address: "0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758",// The proxy contract of kelepool
  abi: [{"anonymous":false....　}] // contract abi
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);

// execute small staking, at least 0.01ETH, we staking 125.0172ETH
let amount = ethers.utils.parseUnits("125.0172", 'ether')

// The following is the V1 version (deprecated), and the source channel parameter cannot be passed.
// The source channel parameter is the identifier assigned to the third-party channel by Coke Mining Pool, which is used to distinguish which channel received the staked amount during dividend statistics.
// To use the V1 version, you must request before the user stakings: the user address registration interface (/user/v2/anonymouslogin) establishes the association between the user address and the source channel, so that we can distinguish the channel staking amount.
const tx = await contract.deposit({
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
});

// The following is the V2 version (recommended), which can pass source channel parameters.
// The source channel parameter is the identifier assigned to the third-party channel by Coke Mining Pool, which is used to distinguish which channel received the staked amount during dividend statistics.
// It doesn't matter if you have connected to the V1 version before. After updating to the V2 version, the user's staking will be written to the source passed from the contract first.
let source = ethers.utils.arrayify(ethers.utils.formatBytes32String("ThirdParty"))
const tx = await contract.depositV2(source,{
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
});

console.log(`transition hash: ${tx.hash}`);


```

## 5.Stake ≥ 32 ETH
The user needs to staking at least 32ETH, and the maximum can be staked 3200ETH (depending on the gas situation). The amount of each staking must be an integer multiple of 32+fee. The fee is currently 0.05ETH, and the cola mining pool will charge the fee as the node operation fee.

Large-amount staking is mainly divided into three steps:

- Generate withdrawal credentials
- Generate validator public key
- Execute large stakes

### (1) Generate withdrawal certificate

#### 1.1 Use ETH1 address to generate withdrawal certificate (simple, recommended)

In order to allow the ETH1.0 wallet address to transition smoothly to the ETH2.0 pledge system, the official provides a new way to convert the ETH1.0 address into an ETH2.0 withdrawal certificate. That is the method of [ETH1_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149) mentioned above.

This method supports all APP wallets, hardware wallets, WEB wallets, etc. that can generate ETH1.0 addresses. You only need to slightly change the user's ETH1.0 address to get an ETH2.0 withdrawal certificate.

The converted withdrawal vouchers are all lowercase letters. After the ETH2.0 withdrawal function is launched, the user will use the signature of the ETH1.0 address to withdraw the ETH2.0 pledged amount. Please make sure that the conversion is correct.

The specific conversion method is as follows:

```
ETH2 withdrawal certificate = 0x01 + 11 00 + ETH1.0 address without 0x

Conversion example:
ETH1.0 deposit address: 0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2.0 withdrawal certificate: 0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
```

This method is much simpler than the above method. Any wallet that supports ETH1.0 address generation can be easily accessed. Next, let’s take a look at how to use the generated ETH2.0 withdrawal certificate.


#### 1.2 Use the official CLI to generate a withdrawal certificate (complex, suitable for users with technical knowledge)

Large pledges require users to use the [Ethereum official CLI tool](https://github.com/ethereum/staking-deposit-cli) to generate a withdrawal certificate. The tool will generate two files `deposit_*.json` or `keystore-*.json`, users must save their own mnemonic words, and these two files can be regenerated at any time with the mnemonic words.

Cola Pool only needs the `withdrawal_credentials` attribute value in the `deposit_*.json` file, which will be used as the ETH2.0 withdrawal credential. The generated related tutorials can be viewed [here](https://kelepool.gitbook.io/help-center-zh/pos/FAQ/eth-deposit-cli) or [here](https://hackmd.io/urta4YBdTrqSaNqiHgP7Cw ).

The following is an example of deposit_*.json generated by the official Ethereum CLI tool:

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



### （2）Generate validator public key
The validator's public key is mainly used for the cola mining pool to run the ETH2.0 node. In order to prevent the same validator from running in different places and causing penalties, the cola mining pool will create the validator's public key according to the user's withdrawal certificate.

After getting the `withdrawal_credentials` attribute value in the `deposit_*.json` file from the previous step, we can request the API of the cola mining pool to generate the public key of the verification node.

[Kele Pool Mainnet API：https://api.kelepool.com](https://api.kelepool.com)

[Kele Pool Goerli API：https://test-api.kelepool.com](https://test-api.kelepool.com)

#### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> Request parameters:
> - `deposit_credentials` ：user withdrawal credentials
> - `count` ：Generate the number of validating nodes. When staking in batches, the number of `count` parameters can be obtained according to `staking quantity / 32`.
> - `recreate` ：Whether to retrieve the previously generated unused keystore. (0=yes, 1=no)
    

```bash
https://test-api.kelepool.com/eth2/v2/validator/keypair

{
    "deposit_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
    "count":2,
    "recreate":0
}
```


> Response Result：
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure
> - `pubkey` : validator public key
> - `withdrawal_credentials` : Withdrawal Credentials
> - `signature` : Validator signature
> - `deposit_data_root` : Merkle tree root
> - `network_name` : ETH network name
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

### （3）Execute large stakes
After obtaining the public key of the validator obtained above, we can make a large staking. First, we still need to write the basic wallet operation code according to the small staking example.

The difference from the small staking is that there are more parameters passed in, and we also need to assemble the data during batch staking. First, we need to loop the validator public key array returned by the above API, concatenate the `pubkey`, `signature` and `deposit_data_root` strings in the array, and assemble the parameters according to the contract ABI interface.

- Suppose we want to staking 96ETH and get `96 / 32 = 3`, then we need to prepare an additional fee of `0.05 * 3 = 0.15ETH`
- Cola Mining Pool charges a fee for each verification node. The validity period of the operating fee is when ETH2.0 goes online. After that, Cola Mining Pool will charge according to the situation.
```javascript


// import libraries
import { ethers } from "ethers";

// connect metamask
const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
let userAddress = await signer.getAddress();

// initialize
const kelepool = {
  address: "0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758",// // The proxy contract of kelepool
  abi: [{"anonymous":false....　}] // Contract ABI
};
const contract = new ethers.Contract(kelepool.address, kelepool.abi, signer);


// Assemble large staking data
let data = [] // The data object returned by the API
let stakingPublicKey = ''
let stakingSignature = ''
let stakingCredentials = '001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb' // user withdrawal credentials
let stakingRoot = []
for (let i = 0; i < data.length; i++) {
    let validator = data[i]
    stakingPublicKey += validator.pubkey // Concatenate the public key string
    stakingSignature += validator.signature // Concatenate the signature string
    stakingRoot.push('0x' + validator.deposit_data_root) // Concatenate the deposit_data_root string
}

// convert data
let prefix = '0x'
let pubkey = ethers.utils.arrayify(prefix + stakingPublicKey)
let withdrawal_credentials = ethers.utils.arrayify(prefix + stakingCredentials)
let signature = ethers.utils.arrayify(prefix + stakingSignature)
let deposit_data_root = stakingRoot
// execure large staking, at least 32ETH,we staking 96ETH here, it needs 0.05ETH fee for every validator,so we have to add more 0.15ETH for kelepool fee.
let amount = ethers.utils.parseUnits('96.15', 'ether')

// The following is the V1 version (deprecated), and the source channel parameter cannot be passed.
// The source channel parameter is the identifier assigned to the third-party channel by Coke Mining Pool, which is used to distinguish which channel received the staked amount during dividend statistics.
// To use the V1 version, you must request before the user stakings: the user address registration interface (/user/v2/anonymouslogin) establishes the association between the user address and the source channel, so that we can distinguish the channel staking amount.
const tx = await contract.createValidator(1, pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
})

// The following is the V2 version (recommended), which can pass source channel parameters.
// The source channel parameter is the identifier assigned to the third-party channel by Coke Mining Pool, which is used to distinguish which channel received the staked amount during dividend statistics.
// It doesn't matter if you have connected to the V1 version before. After updating to the V2 version, the user's staking will be written to the source passed from the contract first.
let source = ethers.utils.arrayify(ethers.utils.formatBytes32String("ThirdParty"))
const tx = await contract.createValidatorV2(1, source, pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
})
console.log(`transaction id: ${tx.hash}`);


```


### (4) Set partner fee and payment address

Kele Pool currently charges 0.05ETH as a handling fee for large pledges. Partners can also contact us to set up additional handling fees and payment addresses. After the user's large pledge is completed, the contract will automatically transfer the partner's handling fee to the set receiving address.