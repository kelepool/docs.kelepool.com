# How to query user staking information?

Cola Mining Pool has opened all ETH2.0 revenue query interfaces. Developers can use wallet addresses to query users' staking amount, total revenue, APR, curve (hours, days), node status, operation history, historical revenue and other data.

## API Node

[Kele Pool Mainnet API：https://api.kelepool.com](https://api.kelepool.com)

[Kele Pool Goerli API：https://test-api.kelepool.com](https://test-api.kelepool.com)

> Generic request returns result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure


## API Authorization
Third-party developers need to contact Kele Pool to apply for a long-term valid signature `authority_key` and `token`, the third party can use these two keys for signature and data source confirmation.

### 1. Authorization step
- Prepare an eth address as the receiving address of the partner's mev fee (the address is recommended for collection, and the flow of funds is clearer)
- Choose a `graffiti` logo as the name of the node on the network, such as BXKelePool
- Contact Cola Pool to apply for `authority_key` and `token`/`source`
- If the user is calling the Coke Pool API for the first time, he needs to call `/user/v2/anonymouslogin` in advance to [user address registration] (#user address registration), and pass the agreed source parameter value (partner source identification )
- Use `authority_key` and `token` to sign each interface of the Coke mining pool and put it in the Header for verification

### 2. How to use

- Add Kele-ThirdParty-Authority=`token` in the request header
- Add Kele-ThirdParty-Sign = `sign` to the request header
    - The logic for getting `sign` is as follows:
    - Arrange request parameters in ascending lexicographical order and use '&' to concatenate
    - Sign with `authority_key` with `hmac_blake2b`, get `sign`

```json
Only for test : authority_key & token

{
    "authority_key": "2fb8098e1cac29c559191993e606e692b7d15314164ac8c55bcaa5a05b635843f067a35bf50ab9707675f7dff7dae934f6b2c189311e9c53ba874f572643b8ed",
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6Im9uZWtleSIsInZlcnNpb24iOiIwIiwiZXhwIjoxODMwNTcwNTU4fQ.gNdTZxcThOBKJB2oGFUAC1vxP9FRXQBPPx36jpgZRWc"
}
```


### 3.Python Sample code
```python

import hashlib
import hmac
import requests


url = 'https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0xf48b98bbeeb81033a227f576da98a32c3a2d8515'
params = {
    'address':'0xf48b98bbeeb81033a227f576da98a32c3a2d8515'
}

# url = 'https://test-api.kelepool.com/eth2/v2/partner/validator'
# params = {

# }

sign_str = '&'.join(['%s=%s' % (k, params[k]) for k in sorted(params)])

authority_key='dccc6ce732fe9011ee4e12b2e0de8ecbe743f630f3ff02bceb23052d9afa692d50540d6221f095427f903db80f781dd6cfaef8c6678ad5bbcc74475cd76cf629'
token='eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6Ik9uZUtleSIsInZlcnNpb24iOiIwIiwiZXhwIjoxODM3MDYzMjE0fQ.Z22fUeKbo6AmrsvvJ2nrrDjXQCcMwFd7GtIIAGUe6DU'

sign=hmac.new(authority_key.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.blake2b).hexdigest()
headers = {
'Content-Type': 'application/json', 
'Accept':'application/json',
'Kele-ThirdParty-Authority':token,
'Kele-ThirdParty-Sign':sign
}

r_json = requests.get(url,params=params,headers=headers)
print()
print("paramters: "+sign_str)
print()
print("signature: "+sign)
print()
print("response: "+r_json.text)

```

### 4.NodeJs Sample code

- yarn add sodium-universal
- yarn add request

```javascript


var { sodium_malloc, sodium_memzero } = require('sodium-universal/memory')
var { crypto_generichash, crypto_generichash_batch } = require('sodium-universal/crypto_generichash')

// calculate signature
function hmac (data, key) {
  var mac = Buffer.alloc(64)
  var scratch = sodium_malloc(128 * 3)
  var hmacKey = scratch.subarray(128 * 0, 128 * 1)
  var outerKeyPad = scratch.subarray(128 * 1, 128 * 2)
  var innerKeyPad = scratch.subarray(128 * 2, 128 * 3)
  if (key.byteLength > 128) {
    crypto_generichash(hmacKey.subarray(0, 64), key)
    sodium_memzero(hmacKey.subarray(64))
  } else {
    hmacKey.set(key)
    sodium_memzero(hmacKey.subarray(key.byteLength))
  }
  for (var i = 0; i < hmacKey.byteLength; i++) {
    outerKeyPad[i] = 0x5c ^ hmacKey[i]
    innerKeyPad[i] = 0x36 ^ hmacKey[i]
  }
  sodium_memzero(hmacKey)
  crypto_generichash_batch(mac, [innerKeyPad].concat(data))
  sodium_memzero(innerKeyPad)
  crypto_generichash_batch(mac, [outerKeyPad].concat(mac))
  sodium_memzero(outerKeyPad)
  return mac.toString('hex')
}

// contact paramaters
function combines(data){
  var builder = []
  Object.entries(data).sort((a,b)=> (a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))).forEach((item,index)=>{
    builder.push(item[0] +'=' + item[1])
  })
  return builder.join("&")
}

// request
function execute(){

  var params = {
    'address':'0xf48b98bbeeb81033a227f576da98a32c3a2d8515'
  }
  var url = 'https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0xf48b98bbeeb81033a227f576da98a32c3a2d8515'

  // var url = 'https://test-api.kelepool.com/eth2/v2/partner/validator'
  // var params = {}

  var authority_key='dccc6ce732fe9011ee4e12b2e0de8ecbe743f630f3ff02bceb23052d9afa692d50540d6221f095427f903db80f781dd6cfaef8c6678ad5bbcc74475cd76cf629'
  var token='eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6Ik9uZUtleSIsInZlcnNpb24iOiIwIiwiZXhwIjoxODM3MDYzMjE0fQ.Z22fUeKbo6AmrsvvJ2nrrDjXQCcMwFd7GtIIAGUe6DU'
  var parameters = combines(params)
  var key = Buffer.from(authority_key,'utf8')
  var data = Buffer.from(parameters,'utf8')
  var signature = hmac(data, key)

  console.log("paramaters: "+parameters)
  console.log("signature: "+signature)

  const request = require('request');
  request({
    url: url,
    headers: {
      'Content-Type': 'application/json', 
      'Accept':'application/json',
      'Kele-ThirdParty-Authority':token,
      'Kele-ThirdParty-Sign':signature
    }
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log(data);

    }
  });
}


execute();

```



## ETH private key signature authorization

### 1.How to use

- Add Kele-Private-Sign=`Kele-Private-Sign` in the request header
- Add "_pirv_sign_raw":"sign input data" to the request json body

- _pirv_sign_raw Information (Input data signed as a private key after json stringfy)
```json
{
    "sign_time":1651200959, // signature time
    "token":"eth", // signature algorithm
    "addr":"0x71c7aDBF701f5724291953561790c9c4e870b029",// signer
    "url":"/eth2/v2/miner/unstake", // request api routing
    "method":"post", // request api method
    "api_param":{ // request api parameters
        "source":"kelepool",
        "type":"retail",
        "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
        "unstake_amt":"123.3244"
    }
}
```

Sample api request body
```json
{
    "_pirv_sign_raw":"{\"sign_time\":1651200959,\"token\":\"eth\",\"addr\":\"0x71c7aDBF701f5724291953561790c9c4e870b029\",\"url\":\"/eth2/v2/miner/unstake\",\"method\":\"post\",\"api_param\":{\"source\":\"kelepool\",\"type\":\"retail\",\"address\":\"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87\",\"unstake_amt\":\"123.3244\"}}"
    "source":"kelepool",
    "type":"retail",
    "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
    "unstake_amt":"123.3244"
}
```


### 2.Sample Python signature

```python

import web3
from eth_account.messages import encode_defunct

priv = '0x004a79ef53fc93c919201f4bfe00ee28cc701627899da0147dee6e4adf0ec52b'
addr = '0xaF73D1072794A386F9505906299F3E2e963581ce'
input = 'input msg 6a957501785f6c211e606c1fd945169a3f35691f3b9be11146146200e99a8bcd'
# https://eips.ethereum.org/EIPS/eip-191
sign_str = web3.eth.Account.sign_message(encode_defunct(input.encode()), priv).signature.hex()
print("sign_str",sign_str) # 0x011bb13f789dcdbbb0e407e071751ae2d6b4726525cdc8791b9af96efd77f95262143b64faca866843c24031411ac95a1ad7fb69ed0ca502580b030b00e624fc1c

# Signature verification
signer = web3.eth.Account.recover_message(encode_defunct(input.encode()), signature=bytes.fromhex(sign_str[2:]))
print(signer, addr) # 0xaF73D1072794A386F9505906299F3E2e963581ce 0xaF73D1072794A386F9505906299F3E2e963581ce
```


### 3.Sample JS signature

```js
// npm install ethers

import { ethers } from 'ethers'

const privKey = '57973a896b37e2ed2228162e4d0d448795f3b2515c198bf4c19812c3f1ee94f0'

const message = 'hello sign message'

const signer = new ethers.Wallet(privKey)

// Signing the message
const sig = await signer.signMessage(message)
console.log(sig)
// 0x4c89155fd4068e96f3f58a39330f1e58a705bee289d0af1ccf4fd8299851fc1e4b372dce0b80c5c9d47729242ac56f8f2b72ba59ba8225765693f5e6fc2478081c

const address = await signer.getAddress()

console.log('Does it match the address', address == ethers.utils.verifyMessage(message, sig))
// Does it match the address true
```

## User Address Registration
#### POST [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

This interface only needs to be called when the user stakings for the first time. Of course, you can also call it every time the user stakings. Note that this interface must be called before the user stakings.

> Request parameters:
> - `payee_addr` : User staking wallet address
> - `token` : the staked token (eth)
> - `source` : The data source is convenient for business cooperation statistics (eg: ThirdParty)

```bash
https://test-api.kelepool.com/user/v2/anonymouslogin

{
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22",
    "token":"eth",
    "source":"ThirdParty"
}
```

> Request return value:
> - Judging that `code` is 0 means success, otherwise the registration fails
> - return `token` is not a required field for authentication, ignore it
> - Other fields returned are ignored and not used as registered address
```bash
{
   "code":0,
   "message":"success"
}
```

## User Staking Overview
#### GET [/eth2/v2/miner/dashboard](https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day)

> Request parameters:
> - `address` : user's staking wallet address
> - `interval` : returns yield curve type hour=hour, day=day
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day&num2str=1
```

> Response Result:
> - `total_amount` : total amount staked (ETH)
> - `staked_amount` : Amount taken (ETH)
> - `staking_amount` : Amount to take effect (ETH)
> - `ongoing_amount` ：withdrawable amount（recommended to use withdrawable）
> - `withdrawable` ：withdrawable amount（ETH）
> - `retail_staked` ：amount of retail staked（ETH）
> - `retail_unstaking` ：amount of retail unstaking（ETH）
> - `whale_staked` ：amount of whale staked（ETH）
> - `whale_unstaking` ：amount of whale unstaking（ETH）
> - `total_reward` : consensus total reward (ETH)
> - `mev_total_reward` : mev total reward (ETH)
> - `staked_days` : total number of days staked
> - `apr` ：estimate total APR
> - `apr_detail`.`basic` ：estimate consensus APR
> - `apr_detail`.`mev` ：estimate mev APR
> - `total_validaters` : total number of validators
> - `unactived_validater` : the number of nodes to be valid
> - `actived_validater` : Number of active nodes
> - `closed_validater` : number of closed nodes
> - `reward` : the consensus reward (ETH) on the graph
> - `mev_reward` : the mev reward (ETH) on the graph (It should be noted that mev revenue is settled immediately and consensus revenue is settled daily. The settlement progress of the two is different)
> - `snap_time` : time on the graph
```json
{
    "code":0,
    "message":"success",
    "data":{
        "amount":{
            "total_amount":173.3,
            "staked_amount":173.23,
            "staking_amount":0.07,
            "ongoing_amount":0,
            "withdrawable":"0.123",
            "retail_staked":"0.123",
            "retail_unstaking":"0.123",
            "whale_staked":"0.123",
            "whale_unstaking":"0.123"
        },
        "income":{
            "total_reward":0.82885946,
            "mev_total_reward": 0.006513841990230327,
            "staked_days":34,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            }
        },
        "validater":{
            "total_validaters":8,
            "unactived_validater":1,
            "actived_validater":7,
            "closed_validater":0
        },
        "income_curve":[
            {
                "reward":"0.02563727",
                "mev_reward": "0.000145631351140014",
                "snap_time":"2022-06-13 00:00:00"
            },
            {
                "reward":"0.02423282",
                "mev_reward": "0.000145631351140014",
                "snap_time":"2022-06-14 00:00:00"
            }
        ]
    }
}
```

## Platform Data Overview
#### GET [/eth2/v2/global](https://test-api.kelepool.com/eth2/v2/global)

> Request parameters:
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/global&num2str=1
```

> Response Result:
> - `whale_fee` : large staking fee (ETH)
> - `retail_fee` : Small staking fee (%)
> - `online_ratio` : node online ratio (%)
> - `reward_cycle` : Calculate the time of dividend income
> - `reward_total` : total platform revenue (ETH)
> - `staking_ratio` : ETH network staking ratio (%)
> - `staking_total` : The total amount of staking on the platform (ETH)
> - `validator_total` : The total number of validator nodes on the platform
> - `predicted_reward` : estimate total APR
> - `apr_detail`.`basic` ：estimate consensus APR
> - `apr_detail`.`mev` ：estimate mev APR
> - `whale_min_amount` : Minimum stake amount for large amount (ETH)
> - `retail_min_amount` : Small minimum stake amount (ETH)
> - `retail_deposit_far` : How much ETH is left for the small staking to create a validator
> - `withdraw_predicted_hour` : How long will the withdrawal take to the account
> - `validator_alive_predicted_hour` : how many hours after the validator is created by the staking now, the validator will take effect
```json
{
    "code":0,
    "message":"success",
    "data":{
        "whale_fee":0.05,
        "retail_fee":0.1,
        "online_ratio":1,
        "reward_cycle":"00:00-24:00 (UTC+0)",
        "reward_total":1.72538703,
        "staking_ratio":0.13682066,
        "staking_total":486.03,
        "validator_total":15,
        "predicted_reward":0.0487,
        "whale_min_amount":32,
        "retail_min_amount":0.01,
        "retail_deposit_far":27.6,
        "withdraw_predicted_hour":216,
        "validator_alive_predicted_hour":24,
        "apr_detail":{
                "basic":0.0367,
                "mev":0.012
        }
    }
}
```

## Earnings history list

### Consensus Benefits
#### GET [/eth2/v2/miner/income/query](https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address`: user staking wallet address
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&num2str=1
```

> Request return value:
> - `date` : dividend date
> - `reward` : accumulated earnings as of the current day
> - `deposit` : the cumulative recharge principal as of the current day
> - `balance`: the total balance of the account as of the day (accumulated recharge principal as of the day + accumulated income as of the day)
```json
{
    "code":0,
    "message":"success",
    "data":[
        {
            "date":"2022-07-09 00:00:00",
            "reward":0.0172946,
            "deposit":173.3,
            "balance":174.12885933
        },
        {
            "date":"2022-07-08 00:00:00",
            "reward":0.03071118,
            "deposit":173.3,
            "balance":174.11156473
        }
    ]
}
```

### MEV Earnings

- Large staked nodes from partners will be independently deployed according to the private pool model, and the mev income obtained by the nodes will be settled independently
- mev revenue is credited to the staking address
- The mev handling fee is credited to the partner's dedicated address, and the handling fee ratio is configurable
- Small stakings from partners, unified as the overall settlement of Coke's retail investors

#### GET [/eth2/v2/mev_reward](https://test-api.kelepool.com/eth2/v2/mev_reward?page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689)

> Request parameters:
> - `page_number`/`page_size`: page number, page size
> - `address`: user staking wallet address / partner mev fee address
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/mev_reward?page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689&num2str=1
```

> Request return value:
> - `amount` : the amount of a single income
> - `balance` : account balance
> - `total_reward` : historical cumulative reward
> - `staked_amt` : staked amount
> - `record_type`: record type (reward:reward record withdrawal:withdrawal record)
> - `height` mev reward block height
> - `mev_addr`: node mev receiving address
> - `trx_id`: transaction id (mev reward/withdrawal)
> - `time` : settlement time utc8

```json
{
    "code":0,
    "message":"success",
    "data":{
        "total":1428,
        "page_size":1,
        "page_number":1,
        "data":[
            {
                "amount":"0.03249061",
                "balance":"40.32607236",
                "total_reward":"40.32607236",
                "staked_amt":"96.00000000",
                "record_type":"reward",
                "height":16612641,
                "mev_addr":"0x4675c7e5baafbffbca748158becba61ef3b0a263",
                "trx_id":"0x3de7acf868ee76a82a9e70c8d8d6c30f57b1a13d2967b1dfb365d5d1dc1870c3",
                "time":"2023-02-12 20:24:33"
            }
        ]
    }
}
```

## Validator Node Status
#### GET [/eth2/v2/miner/validator/query](https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address` User wallet address
> - `page_size` Page Size
> - `page_number` Page Number
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&num2str=1
```

> Response Result:
> - `identifer` : the verification node number (only after the verification node takes effect)
> - `public_key` : validating node public key
> - `amount` : amount to stake
> - `staked_amount` ：current effective amount of staked (may have been partially unstaked)
> - `status` : node status 1: not active, 2: active, 5: exited
> - `effective_time`: effective time, format: %Y-%m-%d %H:%M:%S, null if not effective
> - `address` ETH1 deposit address
> - `deposit_credentials` : ETH2 withdrawal credentials
> - `type` : staking account type 0: small staking, 1: large staking
> - `reward` :node consensus benefits
> - `mev_reward` :node mev benefits
> - `settle`.`reward` :cumulative consensus income after deduction of fees
> - `settle`.`mev_reward` :cumulative mev income after deduction of fees
> - `settle`.`7d_reward` :consensus income for the past 7 days after deducting fees
> - `settle`.`7d_mev_reward` :mev income for the past 7 days after deducting fees
> - `apr` :estimate total APR
> - `apr_detail`.`basic` :estimate consensus APR
> - `apr_detail`.`mev` :estimate mev APR
```json
{
    "code":0,
    "message":"success",
    "page_size":0,
    "page_number":0,
    "total_count":0,
    "data":[
        {
            "identifer":0,
            "public_key":"852bf5000e370c1baa849defefc30a99c76ac1b41d2991b39e3f631bac3d11f9cbb961d3b17d5c4255137dc902dbbb6f",
            "amount":0.07,
            "staked_amount":"0.07",
            "status":1,
            "effective_time":null,
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"",
            "type":0,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        },
        {
            "identifer":118838,
            "public_key":"8333ce3b794a6a4fd5045f2853884aef34f1a9a3aaf4dcf09af474e67d01865ae5e7e23f77dac7e41313d665afbe5a12",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        },
        {
            "identifer":119856,
            "public_key":"b7701b5a7dd2ceccd7f51daef59dbc74fb2273f2682df98feedb89464b4ff07f857707378f16677e5b80ef1b6257c582",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        }
    ]
}
```

## User Operation History

#### GET [/eth2/v4/op_history](https://test-api.kelepool.com/eth2/v4/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=1,2,3,4)

> Request parameters:
> - `address` : User wallet address
> - `op_type` : query record type，default:0,6; 0: deposit 1: stakeing 2: effective staked 3:wait unstake 4: unstakeing  5: unstaked  6: withdrawing 7:withdrawal done 8:on chain node automatic transfer
> - `op_type` : query record type，default:1,2,3,4; 1: stake 2: unstake 3: withdrawal 4:on chain node automatic transfer
> - `page_size` : Page Size
> - `page_number` : Page Number
> - `num2str` : whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v4/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=0,1,2,3,4,5,6,7,8&num2str=1
```


> Response Result:
> - `transaction_id` : Transaction Hash
> - `amount` : Amount(ETH)
> - `op_type` : opertion type
> - `history_time` : operation time

```json
{
    "code":0,
    "message":"success",
    "data": {
        "total":30,
        "page_size":20,
        "page_number":1,
        "data":[
            {
                "transaction_id":"0x2090670ba4810ebd4683e98dee19a26128c1e5263c6e9cf7ea637cf1a006b28f",
                "amount":0.01,
                "op_type":0,
                "history_time":"2023-03-22 06:49:33"
            }
        ]
    }
}
```

#### GET [/eth2/v3/op_history](https://test-api.kelepool.com/eth2/v3/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=0,1,2,3,4,5,6)

> Request parameters:
> - `address` User wallet address
> - `op_type` ：query record typ，default:0,6; 0: deposit 1: stakeing 2: effective staked 3:wait unstake 4: unstakeing  5: unstaked  6: withdrawing 7:withdrawal done 8:on chain node automatic transfer
> - `page_size` Page Size
> - `page_number` Page Number
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v3/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=0,1,2,3,4,5,6,7,8&num2str=1
```


> Response Result:
> - `transaction_id` : Transaction Hash
> - `amount` : Amount(ETH)
> - `op_type` : opertion type
> - `history_time` operation time

```json
{
    "code":0,
    "message":"success",
    "page_size":20,
    "page_number":1,
    "total_count":30
    "data":[
        {
            "transaction_id":"0x2090670ba4810ebd4683e98dee19a26128c1e5263c6e9cf7ea637cf1a006b28f",
            "amount":0.01,
            "op_type":0,
            "history_time":"2023-03-22 06:49:33"
        }
    ]
}
```

#### GET [/eth2/v2/op_history](https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address` User wallet address
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&num2str=1
```

> Response Result:
> - `address` User wallet address
> - `transaction_id` : Transaction Hash
> - `amount` : Amount to stake (ETH)
> - `type` : this field is not used
> - `status` : this field is not used
> - `history_time` operation time
> - `unactive_amount` : Amount to take effect (ETH)
> - `active_amount` : Active amount (ETH)
```json
{
    "code":0,
    "message":"success",
    "data":[
        {
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "transaction_id":"0x03eae6e5048b53d867ba26147940255ebdd1f3488020885ff0a9929460a599e5",
            "amount":0.01,
            "type":0,
            "status":0,
            "history_time":"2022-06-10 10:23:59",
            "unactive_amount":0,
            "active_amount":0.01
        },
        {
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "transaction_id":"0xb3bb11cbd3cbb85d49e5920c719bfe0ff2cc3574292dc5e79117b3071ca78453",
            "amount":32,
            "type":1,
            "status":0,
            "history_time":"2022-06-10 10:23:51",
            "unactive_amount":0,
            "active_amount":32
        }
    ]
}
```


## User Unstake

### Query the amount that can be unstake

#### GET [/eth2/v2/miner/unstake](https://test-api.kelepool.com/eth2/v2/miner/unstake?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87)


> Request parameters：
> - `address` ：User wallet address
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/miner/unstake?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&num2str=1
```

> Response Result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure
> - `retail_staked` ：amount of retail staked（ETH）
> - `retail_unstaking` ：amount of retail unstaking（ETH）
> - `whale_staked` ：amount of whale staked（ETH）
> - `whale_unstaking` ：amount of whale unstaking（ETH）
> - `estimate_use_sec` ：Estimated unstaking time, seconds
> - `fast_fee_ratio` ：Quick unstak fee 5%

```json
{
    "code":0,
    "message":"success",
    "data":{
        "retail_staked":"0.123",
        "retail_unstaking":"0.123",
        "whale_staked":"0.123",
        "whale_unstaking":"0.123",
        "estimate_use_sec":1234,
        "fast_fee_ratio":0.05,
  }
}
```

### User unstake 

- Step 1: user private key signature, see the eth private key signature section
- Step 2: sign the entire json body with an auth token

#### POST [/eth2/v2/miner/unstake](https://test-api.kelepool.com/eth2/v2/miner/unstake)

> - Request parameters
> - `type` ：unstake type;  retail:retail staked; retail_fast:no need to wait,but has fee; whale:whale staked
> - `address` ：User wallet address
> - `unstake_amt` ：unstake amount

```bash
https://test-api.kelepool.com/eth2/v2/miner/unstake

{
    "type":"retail",
    "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
    "unstake_amt":"123.3244"
}
```

> Response Result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure
> - `withdrawable` : withdrawable amount

```json
{
    "code":0,
    "message":"success",
    "data":{
        "withdrawable":"123.3244"
    }
}
```

## User Withdrawal

### Query the amount that can be withdrawal

#### GET [/eth2/v2/miner/withdrawal](https://test-api.kelepool.com/eth2/v2/miner/withdrawal?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87)


> Request parameters：
> - `address` ：User wallet address

```bash
https://test-api.kelepool.com/eth2/v2/miner/withdrawal?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87
```

> Response Result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure
> - `balance` ：amount that can be withdrawn
> - `user_fee` ：estimated on-chain tx fee
> - `fee_free_threshold` ：minimum withdrawal amount for exemption from tx fees
> - `pay_addr` : user wallet address

```json
{
    "code":0,
    "message":"success",
    "data":{
        "balance":"123.248",
        "user_fee":"0.12",
        "fee_free_threshold": "0.1",
        "pay_addr": "0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
    }
}
```

### user withdrawal

#### POST [/eth2/v2/miner/withdrawal](https://test-api.kelepool.com/eth2/v2/miner/withdrawal)

> Request parameters：
> - `address` ：User wallet address
> - `amount` ：withdrawal amount

```bash
https://test-api.kelepool.com/eth2/v2/miner/withdrawal

{
    "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
    "amount":"12.23",
}
```

> Response Result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure
```json
{
    "code":0,
    "message":"success",
    "data":{}
}
```


## Generate Validator Public Key
#### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> Request parameters:
> - `deposit_credentials` : User withdrawal credentials
> - `count` : Generate the number of validating nodes. When staking in batches, the number of `count` parameters can be obtained according to `staking quantity / 32`.
> - `recreate` ：Whether to regenerate a new keystore. (0=no, 1=yes)

```bash
https://test-api.kelepool.com/eth2/v2/validator/keypair

{
    "deposit_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
    "count":2,
    "recreate":0
}
```

> Response Result:
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



## Query the public key of the verifier
#### GET [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair?deposit_credentials=001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb&is_us)

> Request parameters:
> - `deposit_credentials`: User withdrawal credentials
> - `is_used` : usage status (0=not used, 1=used)

```bash

https://test-api.kelepool.com/eth2/v2/validator/keypair?deposit_credentials=001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb&is_used=0

```

> Request return value:
> - `code`: integer number, equal to 0 means success, greater than 0 means failure
> - `message` : the message to return on failure
> - `pubkey`: validator public key
> - `withdrawal_credentials` : withdrawal credentials
> - `signature` : the verifier signature
> - `deposit_data_root` : Merkle root
> - `network_name`: ETH network name
> - `create_time` : creation time
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
            "network_name":"Goerli",
            "create_time":"2022-06-02 17:52:50"
        },
        {
            "pubkey":"83909737754d15dd3ad1281a3f0e62baa64d3c0abb3ed218c3baf7ff250058a24fe1143a5243c3b015e3f93ed6af1e18",
            "withdrawal_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
            "signature":"b95af475d67e8438e49cfaad12dacd789c705938fd6a8fee93a1a170ef6322c2cf37c643d1d010b23734c04e9028b58d034435dd6c9f19610090bfdefb7522c69e99b0a7830f6d967f1d07e3ff30128c8b516d40232e5595ac91d746420da993",
            "deposit_data_root":"f08ca526395300d60ccc6db28d931ba129944f44d4bb92c773424e120dde222b",
            "network_name":"Goerli",
            "create_time":"2022-06-02 17:52:50"
        }
    ]
}
```


## Partner staking overview
#### GET [/eth2/v2/partner/dashboard](https://test-api.kelepool.com/eth2/v2/partner/dashboard)

> Request parameters:
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/partner/dashboard?num2str=1
```

> Request return value:
> - `total_amount`: total amount of stake (ETH)
> - `staked_amount`: staked amount (ETH)
> - `staking_amount`: Amount to take effect (ETH)
> - `ongoing_amount` : amount to be withdrawn (ETH)
> - `total_reward` : total reward (ETH)
> - `total_validaters` : total number of validators
> - `unactive_validater`: the number of nodes to be validated
> - `actived_validater`: the number of active nodes
> - `closed_validater` : number of closed nodes
```json
{
    "code":0,
    "message":"success",
    "data":{
        "staking":{
            "total_amount":173.3,
            "staked_amount":173.23,
            "staking_amount":0.07,
            "ongoing_amount":0,
            "total_reward":0.82885946,
        },
        "validater":{
            "total_validaters":8,
            "unactived_validater":1,
            "actived_validater":7,
            "closed_validater":0
        }
    }
}
```


## Partner reward history list
#### GET [/eth2/v2/partner/income](https://test-api.kelepool.com/eth2/v2/partner/income)

> Request parameters:
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/partner/income?num2str=1
```

> Request return value:
> - `date` : dividend date
> - `reward` : accumulated earnings as of the current day
> - `deposit` : the cumulative recharge principal as of the current day
> - `balance`: the total balance of the account as of the day (accumulated recharge principal as of the day + accumulated income as of the day)
```json
{
    "code":0,
    "message":"success",
    "data":[
        {
            "date":"2022-07-09 00:00:00",
            "reward":0.0172946,
            "deposit":173.3,
            "balance":174.12885933
        },
        {
            "date":"2022-07-08 00:00:00",
            "reward":0.03071118,
            "deposit":173.3,
            "balance":174.11156473
        }
    ]
}
```


## List of partner verification nodes
#### GET [/eth2/v2/partner/validator](https://test-api.kelepool.com/eth2/v2/partner/validator)

> Request parameters:
> - `page_size` Page Size
> - `page_number` Page Number
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/partner/validator?num2str=1
```

> Request return value:
> - `identifer`: validator ID (only after the validator takes effect)
> - `public_key` : validator public key
> - `amount` : the staked amount
> - `status` : 0: pending 1: staking, 2: effective, 3: exiting, 4: withdrawing, 5: withdrawn
> - `effective_time`: effective time, format: %Y-%m-%d %H:%M:%S, null if not effective
> - `address` ETH1 deposit address
> - `deposit_credentials`: ETH2 withdrawal credentials
> - `type`: staking account type 0: small staking, 1: large staking
> - `reward` :node consensus benefits
> - `mev_reward` :node mev benefits
> - `settle`.`reward` :cumulative consensus income after deduction of fees
> - `settle`.`mev_reward` :cumulative mev income after deduction of fees
> - `settle`.`7d_reward` :consensus income for the past 7 days after deducting fees
> - `settle`.`7d_mev_reward` :mev income for the past 7 days after deducting fees
> - `apr` : estimate total APR
> - `apr_detail`.`basic`:estimate consensus APR
> - `apr_detail`.`mev`:estimate mev APR

```json
{
    "code":0,
    "message":"success",
    "page_size":0,
    "page_number":0,
    "total_count":0,
    "data":[
        {
            "identifer":0,
            "public_key":"852bf5000e370c1baa849defefc30a99c76ac1b41d2991b39e3f631bac3d11f9cbb961d3b17d5c4255137dc902dbbb6f",
            "amount":0.07,
            "status":1,
            "effective_time":null,
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"",
            "type":0,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        },
        {
            "identifer":118838,
            "public_key":"8333ce3b794a6a4fd5045f2853884aef34f1a9a3aaf4dcf09af474e67d01865ae5e7e23f77dac7e41313d665afbe5a12",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        },
        {
            "identifer":119856,
            "public_key":"b7701b5a7dd2ceccd7f51daef59dbc74fb2273f2682df98feedb89464b4ff07f857707378f16677e5b80ef1b6257c582",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1,
            "reward": 0.5368926599999995,
            "mev_reward":0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            },
            "settle":{
                "reward":"0.123",
                "mev_reward":"0.123",
                "7d_reward":"0.123",
                "7d_mev_reward":"0.123",
            }
        }
    ]
}
```


## Node reward line chart
#### GET [/eth2/v2/validator_reward](https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> Request parameters:
> - `pubkey` : validator public key
> - `timezone`: the time zone
> - `unit`: statistical unit (day/hour)
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317aeec53903abb804acef4d8eed7ea&num2str=1
```

> Request return value:
> - [recording period, cumulative total node rewards, staking amount, total node balance]

```json
{
    "code":0,
    "message":"success",
    "data":{
        "total":3,
        "page_size":5,
        "page_number":1,
        "data":[
            [
                "2023-02-08",
                "0.00639918",
                "32.00",
                "32.00639918"
            ]
        ]
    }
}
```

## Node penalty record
#### GET [/eth2/v2/slashes/history](https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=2&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> Request parameters:
> - `pubkey` : validator public key
> - `num2str` ：whether to convert all returned fields to string type

```bash
https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=20&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b879eabecdf&num2str=1
```

> Request return value:
> - `epoch`: node period
> - `slash_amount` : the penalty amount
> - `snap_time` : the cycle time

```json
{
    "code":0,
    "message":"success",
    "data":{
        "total":0,
        "page_size":1,
        "page_number":2,
        "data":[
            {
                "epoch":27551,
                "slash_amount":"0.00240799",
                "snap_time":"2023-02-09 11:40:16"
            }
        ]
    }
}
```

## Set partner fee and payment address

1. Partners can contact Coke Mining Pool to set up large pledge procedures, channel marks, payment address, fee type, etc. After the pledge is completed, the contract will automatically transfer the handling fee to the payment address set by the partner. Kele Pool currently charges 0.05ETH as a handling fee for 32ETH staking. 


- If the source when the user pledges matches the partner channel flag set by the partner, the contract will require the user to pay the partner fee

- Partners can query their own handling fee information through the contract's getPartnerInfo

- The partner does not set the handling fee or the handling fee is set to 0. By default, each node charges 0.05 handling fee


2. There are two ways to collect the handling fee (take the user as a pledge of 10 verification nodes at a time, and the partner sets a handling fee of 0.1ETH as an example)

- Charged according to the number of nodes: the contract will charge 1.5ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 1ETH will be automatically transferred to the partner

- Charged per pledge: the contract will charge 0.6ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 0.1ETH will be automatically transferred to the partner