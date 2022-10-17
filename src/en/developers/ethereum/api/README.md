# How to query user staking information?

Cola Mining Pool has opened all ETH2.0 revenue query interfaces. Developers can use wallet addresses to query users' pledge amount, total revenue, age, curve (hours, days), node status, operation history, historical revenue and other data.

## API Node

[Kele Pool Mainnet API：https://api.kelepool.com](https://api.kelepool.com)

[Kele Pool Goerli API：https://test-api.kelepool.com](https://test-api.kelepool.com)

> Generic request returns result:
> - `code` : an integer number, equal to 0 for success, greater than 0 for failure
> - `message` : the message to return after failure


## API Authorization
Third-party developers need to contact Kele Pool to apply for a long-term valid signature `authority_key` and `token`, the third party can use these two keys for signature and data source confirmation.

### 1. Authorization step
- Contact Kele Pool to apply for `authority_key` and `token`
- If the user is calling the Kele Pool API for the first time, he needs to call `/user/v2/anonymouslogin` in advance to [register the user address](#User Address Registration)
- Use `authority_key` and `token` to sign each interface of Kele Pool and put it in the Header for verification

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

## User Address Registration
#### POST [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

This interface is called when third-party users use the Kele Pool API for the first time. It is mainly used to count the pledge amount of each third-party user, etc., and there is no need to call it again after that.

> Request parameters:
> - `payee_addr` : User pledge wallet address
> - `token` : the pledged token (eth)
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
> - `address` : user's pledge wallet address
> - `interval` : returns yield curve type hour=hour, day=day

```bash
https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day
```

> Response Result:
> - `total_amount` : total amount staked (ETH)
> - `staked_amount` : Amount taken (ETH)
> - `staking_amount` : Amount to take effect (ETH)
> - `ongoing_amount` : Amount to withdraw (ETH)
> - `total_reward` : total reward (ETH)
> - `staked_days` : total number of days staked
> - `total_validaters` : total number of validators
> - `unactived_validater` : the number of nodes to be valid
> - `actived_validater` : Number of active nodes
> - `closed_validater` : number of closed nodes
> - `reward` : the reward (ETH) on the graph
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
            "ongoing_amount":0
        },
        "income":{
            "total_reward":0.82885946,
            "staked_days":34
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
                "snap_time":"2022-06-13 00:00:00"
            },
            {
                "reward":"0.02423282",
                "snap_time":"2022-06-14 00:00:00"
            }
        ]
    }
}
```

## Platform Data Overview
#### GET [/eth2/v2/global](https://test-api.kelepool.com/eth2/v2/global)

> Request parameters:
> - None

```bash
https://test-api.kelepool.com/eth2/v2/global
```

> Response Result:
> - `whale_fee` : large staking fee (ETH)
> - `retail_fee` : Small pledge fee (%)
> - `online_ratio` : node online ratio (%)
> - `reward_cycle` : Calculate the time of dividend income
> - `reward_total` : total platform revenue (ETH)
> - `staking_ratio` : ETH network staking ratio (%)
> - `staking_total` : The total amount of staking on the platform (ETH)
> - `validator_total` : The total number of validator nodes on the platform
> - `predicted_reward` : pledge income (%)
> - `whale_min_amount` : Minimum stake amount for large amount (ETH)
> - `retail_min_amount` : Small minimum stake amount (ETH)
> - `retail_deposit_far` : How much ETH is left for the small pledge to create a validator
> - `withdraw_predicted_hour` : How long will the withdrawal take to the account
> - `validator_alive_predicted_hour` : how many hours after the validator is created by the pledge now, the validator will take effect
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
        "predicted_reward":0.04189544090093631,
        "whale_min_amount":32,
        "retail_min_amount":0.01,
        "retail_deposit_far":27.6,
        "withdraw_predicted_hour":216,
        "validator_alive_predicted_hour":24
    }
}
```


## User Earnings History
#### GET [/eth2/v2/miner/income/query](https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address` User wallet address

```bash
https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
```

> Response Result:
> - `date` : dividend date
> - `reward` : the reward generated by the contemporary
> - `deposit` : this field is not used
> - `balance` : the total account balance for the day
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

## Validator Node Status
#### GET [/eth2/v2/miner/validator/query](https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address` User wallet address

```bash
https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
```

> Response Result:
> - `identifer` : the verification node number (only after the verification node takes effect)
> - `public_key` : validating node public key
> - `amount` : amount to stake
> - `status` : node status 1: not active, 2: active, 5: exited
> - `effective_time`: effective time, format: %Y-%m-%d %H:%M:%S, null if not effective
> - `address` ETH1 deposit address
> - `deposit_credentials` : ETH2 withdrawal credentials
> - `type` : pledge account type 0: small pledge, 1: large pledge
```json
{
    "code":0,
    "message":"success",
    "data":[
        {
            "identifer":0,
            "public_key":"852bf5000e370c1baa849defefc30a99c76ac1b41d2991b39e3f631bac3d11f9cbb961d3b17d5c4255137dc902dbbb6f",
            "amount":0.07,
            "status":1,
            "effective_time":null,
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"",
            "type":0
        },
        {
            "identifer":118838,
            "public_key":"8333ce3b794a6a4fd5045f2853884aef34f1a9a3aaf4dcf09af474e67d01865ae5e7e23f77dac7e41313d665afbe5a12",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1
        },
        {
            "identifer":119856,
            "public_key":"b7701b5a7dd2ceccd7f51daef59dbc74fb2273f2682df98feedb89464b4ff07f857707378f16677e5b80ef1b6257c582",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1
        }
    ]
}
```

## User Operation History
#### GET [/eth2/v2/op_history](https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> Request parameters:
> - `address` User wallet address

```bash
https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
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


## Generate Validator Public Key
#### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> Request parameters:
> - `deposit_credentials` : User withdrawal credentials
> - `count` : Generate the number of validating nodes. When staking in batches, the number of `count` parameters can be obtained according to `staking quantity / 32`.

```bash
https://test-api.kelepool.com/eth2/v2/validator/keypair

{
    "deposit_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
    "count":2
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