# How to use hardware wallet to integrate kelepool?

First of all, Hardware wallet needs to help users to judge, or let users choose the following two pledge methods. If Hardware wallet decides to let users choose the pledge method, it needs to provide two pledge entries (large amount and small amount) and inform the user of the difference.

If Hardware wallet wants to automatically help users choose the pledge method, it can also judge whether the pledge amount is greater than 32 when the user pledges.

- Large amount pledge: The user manages the withdrawal certificate by himself, the minimum support is 32ETH, the maximum support is 3200ETH, and the pledge amount must be an integer multiple of 32.
- Small amount pledge: Coke platform multi-signature management withdrawal certificate, the minimum support is 0.01ETH, and the maximum support is 100000000000ETH.

Mainnet contract：[0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758](https://etherscan.io/address/0xACBA4cFE7F30E64dA787c6Dc7Dc34f623570e758#code)

Goerli contract：[0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7](https://etherscan.io/address/0xdCAe38cC28606e61B1e54D8b4b134588e4ca7Ab7#code)

## Stake ≥ 32 ETH

### Step 1: Transfer ETH1 address to ETH2 withdrawal certificate

Hardware wallet needs to use the officially provided [ETH1_ADDRESS_WITHDRAWAL_PREFIX](https://github.com/ethereum/consensus-specs/pull/2149) method to convert the user's ETH1 deposit address into an ETH2 withdrawal certificate. The specific conversion method is as follows:

- ETH2 withdrawal voucher = `0x01 + 11 00 + ETH1 address with 0x removed`

````
Example:
ETH1 deposit address: 0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2 withdrawal certificate: 0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
````

### Step 2: Request the Kele Pool API

#### (1) User address registration

##### [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

This interface is mainly used to count the pledge amount of each third-party user, etc. It only needs to be called when the Coke Pool API is used for the first time. Of course, you can also call it multiple times.

```bash
POST https://test-api.kelepool.com/user/v2/anonymouslogin

{
    // User pledge wallet address
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22", 
    // the pledged token (eth)
    "token":"eth",
    // The data source is convenient for business cooperation statistics (eg: Hardware wallet)
    "source":"Hardware wallet"
}
```

#### （2）Parameters required to generate large-amount pledge of contracts

##### [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)
This interface is used to generate parameters for large-amount pledge of the contract, and the converted ETH withdrawal certificate needs to be passed in. Since the large-amount pledge is that the user controls the withdrawal key, but the verification node needs the Kele Pool to operate, it is necessary to call this interface to generate some parameters required by the operation node. When the user pledges, the verification node parameters must be submitted to the ETH2.0 official deposit contract.

There is a `count` in the requested parameter here, which is calculated by the user's pledge amount. There are calculation examples below. Here, `2` is passed in, so two pieces of verification node information are returned. You may find that their `withdrawal certificate` is the same. In the future, users can withdraw the pledge amount and income of all nodes through a withdrawal certificate. Since users may pass in 35, 100, and 89, which are not multiples of 32, when staking, Hardware wallet needs to calculate the effective number of pledges, and only allows users to pledge multiples of 32.

 - Number of validating nodes = `(The amount of ETH pledged by users - (the amount of ETH pledged by users % 32)) / 32`
 - Effective pledge amount = `(user pledged ETH amount - (user pledged ETH amount % 32))`
 - Large staking fee = `0.05 * number of validators`

Suppose the user pledged 68ETH:
 - Number of validators = (68 - 68 % 32) / 32 = 2
 - Number of valid pledges = (68 - 68 % 32) = 64
 - Large pledge fee = 0.05 * 2 = 0.1ETH

```bash
POST https://test-api.kelepool.com/eth2/v2/validator/keypair

Request parameters:
{
    // The converted ETH2 withdrawal certificate above (remove 0x)
    "deposit_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
    // Number of validating nodes, calculation method = (number of ETH pledged by users - (number of ETH pledged by users % 32)) / 32
    "count":2
}

```json

Response Result:
{
    // an integer number, equal to 0 for success, greater than 0 for failure
    "code":0,
    // the message to return after failure
    "message":"success",
    "data":[
        {
            // validator public key
            "pubkey":"86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231",
            // Withdrawal Credentials
            "withdrawal_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
            // Validator signature
            "signature":"a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f",
            //  Merkle tree root
            "deposit_data_root":"ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5",
            // ETH network name
            "network_name":"Goerli"
        },
        {
            "pubkey":"83909737754d15dd3ad1281a3f0e62baa64d3c0abb3ed218c3baf7ff250058a24fe1143a5243c3b015e3f93ed6af1e18",
            "withdrawal_credentials":"0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606",
            "signature":"b95af475d67e8438e49cfaad12dacd789c705938fd6a8fee93a1a170ef6322c2cf37c643d1d010b23734c04e9028b58d034435dd6c9f19610090bfdefb7522c69e99b0a7830f6d967f1d07e3ff30128c8b516d40232e5595ac91d746420da993",
            "deposit_data_root":"f08ca526395300d60ccc6db28d931ba129944f44d4bb92c773424e120dde222b",
            "network_name":"Goerli"
        }
    ]
}
```

### Step 3: Call contract pledge

After getting the validator's public key data returned above, we can call the contract to pledge a large amount. The number of verification nodes calculated according to the pledge amount above is `2`, so the API interface returns two pieces of verification node data. We need to combine these two data when calling the contract, and then pass it into the contract. For details, please refer to the js code below.

- The user pledges 64ETH and gets `64 / 32 = 2`, then the user needs to prepare an additional fee of `0.05 * 2 = 0.1ETH`
- Therefore, the amount transferred by the user to the contract becomes `64.1ETH`, and contracts below or above this amount will be rejected
- Kele Pool charges a fee for each verification node. The validity period of the operating fee is when ETH2.0 goes online. After that, Kele Pool will charge according to the situation.

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


// Assemble large pledge data
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
// execure large staking, at least 32ETH,we staking 64ETH here, it needs 0.05ETH fee for every validator,so we have to add more 0.ETH for kelepool fee.
let amount = ethers.utils.parseUnits('64.1', 'ether')
const tx = await contract.createValidator(1, pubkey, withdrawal_credentials, signature, deposit_data_root, {
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
})
console.log(`transaction id: ${tx.hash}`);


```


## Stake ＜ 32 ETH

#### (1) User address registration

##### [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

This interface is mainly used to count the pledge amount of each third-party user, etc. It only needs to be called when the Coke Pool API is used for the first time. Of course, you can also call it multiple times.

```bash
POST https://test-api.kelepool.com/user/v2/anonymouslogin

{
    // User pledge wallet address
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22", 
    // the pledged token (eth)
    "token":"eth",
    // The data source is convenient for business cooperation statistics (eg: Hardware wallet)
    "source":"Hardware wallet"
}
```

### Step 2: Call contract pledge

Small stakes are as simple as depositing tokens into the Cola Pool smart contract. Users can pledge a minimum of 0.01ETH and a maximum amount of ETH. When the total amount of small pledges in the contract exceeds 32ETH, the Cola Pool will use the [Ethereum official CLI tool](https://github.com/ethereum /staking-deposit-cli) generates withdrawal credentials in the cold wallet and automatically creates a verification node. The user's funds are managed and secured by the cola mining pool. After the official launch of ETH2.0 in the future, the cola mining pool will open the withdrawal interface for users.

- Suppose we intend to pledge `125.0172ETH`, after the pledge, Cola Pool will immediately create `3 validators' (32ETH each)
- The remaining `29.0172ETH` will be pledged in the contract, and a verification node will be created after other users pledge enough `32ETH`

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
const tx = await contract.deposit({
    from: userAddress, // user wallet address
    value: amount,// staking amount
    gasLimit: 10000000 // max gas limit
});
console.log(`transition hash: ${tx.hash}`);


```