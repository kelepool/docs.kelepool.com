# 如何查询用户质押信息？

可乐矿池开放了全部ETH2.0的收益查询接口，开发人员可以使用钱包地址查询用户的质押量、总收益、年化、曲线（小时、天）、节点状态、操作历史、历史收益等数据。

## API查询节点

[可乐矿池Mainnet主网API：https://api.kelepool.com](https://api.kelepool.com)

[可乐矿池Goerli测试网API：https://test-api.kelepool.com](https://test-api.kelepool.com)

> 通用的请求返回结果：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息

## API授权认证

第三方开发人员需要联系可乐矿池，申请一个长时间有效的签名 `authority_key` 以及 `token`，第三方可以用这两个key进行签名以及数据来源的确认。

### 1.授权步骤
- 准备一个eth地址，作为合作商mev手续费收款地址(地址建议收款专用，资金流水更清晰)
- 选择一个`graffiti`标识，作为节点在网络上的名字,如BXKelePool
- 联系可乐矿池申请`authority_key` 以及 `token`/`source`
- 如果用户是第一次调用可乐矿池API，则需提前调用`/user/v2/anonymouslogin` 进行[用户地址注册](#用户地址注册),并传递约定的source参数值(合作商来源标识)
- 调用可乐矿池每个接口时使用 `authority_key` 以及 `token` 签名并放入Header中验证

### 2.使用方式

- 在请求的 header 中添加 Kele-ThirdParty-Authority = `token`
- 在请求的 header 中添加 Kele-ThirdParty-Sign = `sign`
    - 获取 `sign` 逻辑如下：
    - 将请求参数按字典序升序排列，并用 '&' 前后拼接
    - 用 `hmac_blake2b` 以 `authority_key` 进行签名，得到 `sign`

```json
用于测试的 authority_key 及 token ：

{
    "authority_key": "2fb8098e1cac29c559191993e606e692b7d15314164ac8c55bcaa5a05b635843f067a35bf50ab9707675f7dff7dae934f6b2c189311e9c53ba874f572643b8ed",
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6Im9uZWtleSIsInZlcnNpb24iOiIwIiwiZXhwIjoxODMwNTcwNTU4fQ.gNdTZxcThOBKJB2oGFUAC1vxP9FRXQBPPx36jpgZRWc"
}
```

### 3.Python示例代码
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

### 4.NodeJs示例代码

安装下面两个库，然后直接运行代码即可。

- yarn add sodium-universal
- yarn add request

```javascript


var { sodium_malloc, sodium_memzero } = require('sodium-universal/memory')
var { crypto_generichash, crypto_generichash_batch } = require('sodium-universal/crypto_generichash')

// 计算消息签名
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

// 拼接请求参数
function combines(data){
  var builder = []
  Object.entries(data).sort((a,b)=> (a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))).forEach((item,index)=>{
    builder.push(item[0] +'=' + item[1])
  })
  return builder.join("&")
}

// 发送请求
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

## ETH私钥签名认证

### 1.使用方式

- 在请求的 header 中添加 Kele-Private-Sign = `sign_hash`
- 在请求的json body中添加签名原始信息字段"_pirv_sign_raw":"sign input data"

- _pirv_sign_raw 内部信息约定 (json stringfy后作为私钥签名的input data)
```json
{
    "sign_time":1651200959, // 签名时间
    "token":"eth", // 签名币种
    "addr":"0x71c7aDBF701f5724291953561790c9c4e870b029",// 签名钱包地址
    "url":"/eth2/v2/miner/unstake", // 请求api路由
    "method":"post", // 请求api方法
    "api_param":{ // 请求api参数
        "source":"kelepool",
        "type":"retail",
        "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
        "unstake_amt":"123.3244"
    }
}
```

api请求body样例
```json
{
    "_pirv_sign_raw":"{\"sign_time\":1651200959,\"token\":\"eth\",\"addr\":\"0x71c7aDBF701f5724291953561790c9c4e870b029\",\"url\":\"/eth2/v2/miner/unstake\",\"method\":\"post\",\"api_param\":{\"source\":\"kelepool\",\"type\":\"retail\",\"address\":\"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87\",\"unstake_amt\":\"123.3244\"}}"
}
```


### 2.Python签名样例

```python

import hashlib
import hmac
import json
import time
import requests
import web3
from eth_account.messages import encode_defunct

url = 'https://test-api.kelepool.com/eth2/v2/miner/unstake'

authority_key='6b0a8e85c994cd11129f10e7e85e7c509fe359f9aa79f8f191810deb7cfb3a209d75702d306fa6cae81a32594740e58b7fdfdad36ade22819dfcf7e396dc9880'
token="eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6InRva2VucG9ja2V0IiwidmVyc2lvbiI6IjAiLCJleHAiOjE4NTQ1MDY3NDF9.GuKpXkwGeJMdzcXwnsl_TkDgwfWotibJ7d1BXkx9mC4"

priv = '0x1b988751b225c7c0448d5668a9f2b2d20f9c1df34d8643a66bac63013ba97bbf'
addr = '0x71743fe0B3474f7A3498E2c95b00a92C680e56FB'

# 1. 用户私钥签名，用于证实用户身份(这里是这个API本身的参数)
api_params = {
    "type": "retail",
    "address": addr,
    "unstake_amt": "0.1"
}

sign_obj = {
    "sign_time":int(time.time()), # 签名时间 下边的返回结果是用1681709412时间生成的，正常需要用最新时间，不然时间会检验错误
    "token":"eth", # 签名币种
    "addr": addr,# 签名钱包地址
    "url":"/eth2/v2/miner/unstake", # 请求api路由
    "method":"post", # 请求api方法
    "api_param" : api_params
}

# https://eips.ethereum.org/EIPS/eip-191
sign_obj_str = json.dumps(sign_obj)
user_sign_str = web3.eth.Account.sign_message(encode_defunct(sign_obj_str.encode()), priv).signature.hex()
print("user_sign_str: ", user_sign_str) 
# user_sign_str:  0x7a6f1e5fbbd5069a96a160645a43597e081628459b8f9b0fda164b1fddf3e7ca340a78dfce5f2c845f32502ecc5b574cef348dd666d3daf8b94684de59ebc9f31b

params = {
    "_pirv_sign_raw":sign_obj_str
}
sign_str = '&'.join(['%s=%s' % (k, params[k]) for k in sorted(params)])

# 2.渠道token签名，用于证实渠道身份
sign=hmac.new(authority_key.encode(), sign_str.encode('utf-8'), digestmod=hashlib.blake2b).hexdigest()

# 3. 发起请求
headers = {
    'Content-Type': 'application/json', 
    'Accept':'application/json',
    'Kele-ThirdParty-Authority':token,
    'Kele-ThirdParty-Sign':sign,
    'Kele-Private-Sign':user_sign_str
}

r_json = requests.post(url,params=None,json=params,headers=headers)

print("sign_str: "+sign_str)
# sign_str: _pirv_sign_raw={"sign_time": 1681726933, "token": "eth", "addr": "0x71743fe0B3474f7A3498E2c95b00a92C680e56FB", "url": "/eth2/v2/miner/unstake", "method": "post", "api_param": {"type": "retail", "address": "0x71743fe0B3474f7A3498E2c95b00a92C680e56FB", "unstake_amt": "0.1"}}

print("signature: "+sign)
# signature: deaac807d83278472d1fbf7772b9ab93dbc31aeb398a93cb69fe827ac63a5b8e79452b48b44e89783f210e6244914b88b4a2b590f2f1a38df8e6f61d61c7e342

print("response: "+r_json.text)

```

### 3.JS签名样例

```js
import { ethers } from 'ethers'
import sodiumUniversalMemory from 'sodium-universal/memory.js' 
import sodiumUniversalCryptoGenerichash from 'sodium-universal/crypto_generichash.js'
import request from 'request'
import got from 'got'

const { sodium_malloc, sodium_memzero } = sodiumUniversalMemory

const { crypto_generichash, crypto_generichash_batch } = sodiumUniversalCryptoGenerichash

const url = 'https://test-api.kelepool.com/eth2/v2/miner/unstake'

const privKey = '0x1b988751b225c7c0448d5668a9f2b2d20f9c1df34d8643a66bac63013ba97bbf'

const authority_key = '6b0a8e85c994cd11129f10e7e85e7c509fe359f9aa79f8f191810deb7cfb3a209d75702d306fa6cae81a32594740e58b7fdfdad36ade22819dfcf7e396dc9880'

const token = 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiZnVsbCIsIm9wZW5pZCI6InRva2VucG9ja2V0IiwidmVyc2lvbiI6IjAiLCJleHAiOjE4NTQ1MDY3NDF9.GuKpXkwGeJMdzcXwnsl_TkDgwfWotibJ7d1BXkx9mC4'

const signer = new ethers.Wallet(privKey)

const address = await signer.getAddress()

// 计算消息签名
function hmac(data, key) {
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

// 拼接请求参数
function combines(data){
  var builder = []
  Object.entries(data).sort((a,b)=> (a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))).forEach((item,index)=>{
    builder.push(item[0] +'=' + item[1])
  })
  return builder.join("&")
}

// 1. 用户私钥签名，用于证实用户身份(这里是这个API本身的参数)
const api_params = {
  "type": "retail",
  "address": address,
  "unstake_amt": "0.1"
}

const sign_obj = {
  'sign_time': Math.round(new Date().getTime() / 1000), // 签名时间 下边的返回结果是用1681709412时间生成的，正常需要用最新时间，不然时间会检验错误
  'token': 'eth', // 签名币种
  'addr': address,// 签名钱包地址
  'url': '/eth2/v2/miner/unstake', // 请求api路由
  'method': 'post', // 请求api方法
  'api_param': api_params
}

const sign_obj_str = JSON.stringify(sign_obj)

console.log('sign_obj_str:', sign_obj_str)
// sign_obj_str: {"sign_time":1681728378,"token":"eth","addr":"0x71743fe0B3474f7A3498E2c95b00a92C680e56FB","url":"/eth2/v2/miner/unstake","method":"post","api_param":{"type":"retail","address":"0x71743fe0B3474f7A3498E2c95b00a92C680e56FB","unstake_amt":"0.1"}}

const user_sign_str = await signer.signMessage(sign_obj_str)

console.log('user_sign_str:', user_sign_str)
// user_sign_str: 0x53d18594769a49fbd538c78fd1b51f1f20a6208d71e19a8f5e9800153eb30d715e32d7d12596dfe097f43b410ee71c983d0a0af547231338d1e1ad3a571e2b831b

const params = {
  '_pirv_sign_raw': sign_obj_str
}

const parameters = combines(params)

const key = Buffer.from(authority_key,'utf8')

const data = Buffer.from(parameters,'utf8')

// 2.渠道token签名，用于证实渠道身份
const signature = hmac(data, key)

console.log('signature:', signature)
// signature: 98a7272375ed17b2255eafac21fcd2f7852e0a70f9b8b45e22bdb2e29ffd5240b80f5c18c4ae5536aea16d9f73fa9a666aa982ca6b00066b7c7ff84de9de0de1

// 3.发起请求
const headers = {
  'Content-Type': 'application/json', 
  'Accept':'application/json',
  'Kele-ThirdParty-Authority': token,
  'Kele-ThirdParty-Sign': signature,
  'Kele-Private-Sign':user_sign_str
}

const options = {
  headers,
  method: 'post',
  json: params
};

try {
  const res = await got(url, options).json()
  console.log('res',res)
} catch (error) {
  console.log('error',error)
}


```

### 用户地址注册
##### POST [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

此接口只需在用户**第一次质押**的时候调用，当然你也可以在用户每次质押时调用，注意此接口**必须在用户质押前**调用。

> 请求参数：
> - `payee_addr` ：用户质押钱包地址
> - `token` ：质押代币（eth）
> - `source` ：数据来源便于商务合作统计（例如：ThirdParty）

```bash
https://test-api.kelepool.com/user/v2/anonymouslogin

{
    "payee_addr":"0xA49F98416aa4B158c2e752FD8031Fb295D330B22",
    "token":"eth",
    "source":"ThirdParty"
}
```

> 请求返回值：
> - 判断`code`为0即表示成功，反之则注册失败
> - 返回`token`并不是鉴权所需的字段，无需理会
> - 返回的其他字段无需理会，不作为注册地址使用
```bash
{
   "code":0,
   "message":"success"
}
```

## 用户查询API接口

### 用户质押总览
##### GET [/eth2/v2/miner/dashboard](https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day)

> 请求参数：
> - `address` ：用户质押钱包地址
> - `interval` ：返回收益曲线类型hour=小时、day=天
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day&num2str=1
```

> 请求返回值：
> - `total_amount` ：质押总数量（ETH）
> - `staked_amount` ：已生效数量（ETH）
> - `staking_amount` ：待生效数量（ETH）
> - `ongoing_amount` ：可提款金额（推荐使用withdrawable字段）
> - `withdrawable` ：可提款金额（ETH）
> - `retail_staked` ：小额质押生效金额（ETH）
> - `retail_unstaking` ：小额赎回中金额（ETH）
> - `whale_staked` ：大额质押生效金额（ETH）
> - `whale_unstaking` ：大额赎回中金额（ETH）
> - `total_reward` ：共识总收益（ETH）
> - `mev_total_reward` ：mev总收益（ETH）
> - `staked_days` ：总质押天数
> - `apr` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率
> - `total_validaters` ：总验证节点数量
> - `unactived_validater` ：待生效节点数量
> - `actived_validater` ：已生效节点数量
> - `closed_validater` ：已关闭节点数量
> - `reward` ：曲线图上的共识收益（ETH）
> - `mev_reward` ：曲线图上的mev收益（ETH） (需要注意mev收益是小时级结算，共识收益是天级结算，两者结算进度不同)
> - `snap_time` ：曲线图上的时间

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
            "withdrawable":"234",
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
                "snap_time":"2022-06-13 00:00:00",
                "mev_reward": "0.000145631351140014"
            },
            {
                "reward":"0.02423282",
                "snap_time":"2022-06-14 00:00:00",
                "mev_reward": "0.000145631351140014"
            }
        ]
    }
}
```

### 平台数据总览
##### GET [/eth2/v2/global](https://test-api.kelepool.com/eth2/v2/global)

> 请求参数：
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/global?num2str=1
```

> 请求返回值：
> - `whale_fee` ：大额质押手续费（ETH）
> - `retail_fee` ：小额质押手续费（%）
> - `online_ratio` ：节点在线率（%）
> - `reward_cycle` ：计算分红收益时间
> - `reward_total` ：平台总收益（ETH）
> - `staking_ratio` ：ETH全网质押比例（%）
> - `staking_total` ：平台总质押数量（ETH）
> - `validator_total` ：平台总验证节点数量
> - `predicted_reward` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率
> - `whale_min_amount` ：大额最低质押数量（ETH）
> - `retail_min_amount` ：小额最低质押数量（ETH）
> - `retail_deposit_far` ：小额质押还差多少ETH创建验证节点
> - `withdraw_predicted_hour` : ETH2.0正式上线提现功能后，提款后多少小时后能到账
> - `validator_alive_predicted_hour` ：现在质押创建验证节点后，多少小时后验证节点生效
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


### 收益历史列表

#### 收益日账单
##### GET [/eth2/v2/miner/income/query](https://test-api.kelepool.com/eth2/v2/miner/income/query?bill_type=0,1,2&address=0x3ef51b5079021a11b1cab3d36eea45facf2b00ce)

> 请求参数：
> - `address` ：用户质押钱包地址
> - `bill_type` ：账单类型  默认值0,1:查共识收益日账单; 可传0,1,2:查共识收益+mev收益整体日账单
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/miner/income/query?bill_type=0,1,2&address=0x3ef51b5079021a11b1cab3d36eea45facf2b00ce
```

> 请求返回值：
> - `date` ：分红日期
> - `reward` ：当天收益
> - `deposit` ：截止当天累计本金(截止当天累计充值本金-截止当天累计提现)
> - `balance` ：截止当天账户总余额（截止当天累计充值本金+截止当天累计收益-截止当天累计提现）
> - `total_deposit` ：截止当天累计充值金额
> - `total_withdrawal` ：截止当天累计提现金额
> - `total_reward` ：截止当天累计收益

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "date": "2023-04-25 00:00:00",
      "reward": 0.00043776,
      "deposit": 157.68972252,
      "balance": 158.18080674,
      "total_deposit": "254.6243",
      "total_withdrawal": "96.934577477",
      "total_reward": "0.289752687771953251"
    },
    {
      "date": "2023-04-24 00:00:00",
      "reward": 0.20050686,
      "deposit": 157.69163767,
      "balance": 158.18228413,
      "total_deposit": "254.6243",
      "total_withdrawal": "96.932662325",
      "total_reward": "0.289314919943093251"
    }
    ]
}
```
#### MEV收益明细

- 来自合作商的大额质押节点，将按私池模式独立部署，节点获得的mev收益独立结算
- mev收益记入质押地址
- mev手续费记入合作商专用地址,手续费比例可配置
- 来自合作商的小额质押，统一作为可乐的散户整体结算

##### GET [/eth2/v2/mev_reward](https://test-api.kelepool.com/eth2/v2/mev_reward?timezone=8&page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689)

> 请求参数：
> - `page_number`/`page_size` ：页码，页尺寸
> - `address` ：用户质押钱包地址/合作商mev手续费地址
> - `timezone` ：指定返回时间的时区
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/mev_reward?timezone=8&page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689&num2str=1
```

> 请求返回值：
> - `timezone` ：时区
> - `amount` ：单笔收益金额
> - `balance` ：账户余额
> - `total_reward` ：历史累计收益
> - `staked_amt` ：质押金额
> - `record_type` ：记录类型(reward:奖励记录 withdrawal:提现记录)
> - `height` mev奖励块高
> - `mev_addr` ：节点mev收款地址
> - `trx_id` ：交易id(mev奖励/提现)
> - `time` ：结算时间

```json
{
    "code":0,
    "message":"success",
    "data":{
        "total":1428,
        "page_size":1,
        "page_number":1,
        "timezone":"8",
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

### 用户节点列表
##### GET [/eth2/v2/miner/validator/query](https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

仅返回大额质押节点记录，小额质押节点不返回

> 请求参数：
> - `address` ：用户质押钱包地址
> - `page_size` 分页大小
> - `page_number` 分页页号
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&num2str=1
```

> 请求返回值：
> - `identifer` ：验证节点编号（验证节点生效后才有）
> - `public_key` ：验证节点公钥
> - `amount` ：用户初始质押金额
> - `staked_amount` ：当前质押生效金额，可能已部分赎回
> - `status` ：节点状态 0:待质押 1：质押中，2：生效中，3:待赎回 4:赎回中，5：已退出
> - `effective_time` ：生效时间，格式：%Y-%m-%d %H:%M:%S，未生效时为null
> - `address` ETH1存款地址
> - `deposit_credentials` ：ETH2提款凭证
> - `type` ：质押账户类型 0：小额质押，1：大额质押
> - `reward` ：节点累计共识奖励
> - `mev_reward` ：节点累计mev奖励
> - `settle`.`reward` ：扣除手续费后的累计共识收益
> - `settle`.`mev_reward` ：扣除手续费后的累计mev收益
> - `settle`.`7d_reward` ：扣除手续费后的7天共识收益
> - `settle`.`7d_mev_reward` ：扣除手续费后的7天mev收益
> - `apr` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率

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
            "identifer":118838,
            "public_key":"8333ce3b794a6a4fd5045f2853884aef34f1a9a3aaf4dcf09af474e67d01865ae5e7e23f77dac7e41313d665afbe5a12",
            "amount":32,
            "status":2,
            "effective_time":"2022-06-10 13:06:59",
            "address":"0x5dd3bd08cbc8498c8640abc26d19480219bb0606",
            "deposit_credentials":"003283e7b0701bd85c8aea1fb70021571a4732ba965c0309d4ea54b4dc26707d",
            "type":1,
            "reward": 0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
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
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
            }
        }
    ]
}
```

### 用户操作历史

#### GET [/eth2/v4/op_history](https://test-api.kelepool.com/eth2/v4/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=1,2,3,4)

> 请求参数：
> - `address` ：用户质押钱包地址
> - `op_type` ：查询记录类型，默认值1,2,3,4; 1: 质押 2: 赎回 3: 平台提现 4: 链上提现
> - `page_size` ：分页大小
> - `page_number` ：分页页号
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v4/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=1,2,3,4&num2str=1
```

> 请求返回值：
> - `transaction_id` ：交易Hash
> - `amount` ：质押数量（ETH）
> - `op_type` ：操作类型
> - `history_time` ：操作时间

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

> 请求参数：
> - `address` ：用户质押钱包地址
> - `op_type` ：查询记录类型，默认值0,6; 0: 已充值等待质押  1: 质押中  2: 质押生效中 3:等待赎回 4: 赎回中  5: 已赎回  6: 提现中(待广播) 7:已提现(已广播) 8:链上节点自动转账记录
> - `page_size` 分页大小
> - `page_number` 分页页号
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v3/op_history?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&op_type=0,1,2,3,4,5,6,7,8&num2str=1
```

> 请求返回值：
> - `transaction_id` ：交易Hash
> - `amount` ：质押数量（ETH）
> - `op_type` ：操作类型
> - `history_time` 操作时间

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

> 请求参数：
> - `address` ：用户质押钱包地址
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&num2str=1
```

> 请求返回值：
> - `address` ：用户质押钱包地址
> - `transaction_id` ：交易Hash
> - `amount` ：质押数量（ETH）
> - `type` ：此字段未使用
> - `status` ：此字段未使用
> - `history_time` 操作时间
> - `unactive_amount` ：待生效数量（ETH）
> - `active_amount` ：已生效数量（ETH）
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

## 赎回提现API接口

### 查询可赎回节点列表

##### GET [/eth2/v2/miner/unstake_check](https://test-api.kelepool.com/eth2/v2/miner/unstake_check?address=0x3ef51B5079021a11b1CAB3d36eEa45FaCF2B00CE&unstake_amt=0&node_ids=468230,468231)


> 请求参数：
> - `address` ：用户地址
> - `unstake_amt` ：赎回ETH数量，系统根据数量按时间降序选择节点赎回（这个字段与node_ids任选一个填写，用于按数量赎回）
> - `node_ids`：赎回节点链上ID列表，多个逗号分隔（这个字段与unstake_amt任选一个填写，用于按节点ID赎回）
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/miner/unstake_check?address=0x3ef51B5079021a11b1CAB3d36eEa45FaCF2B00CE&unstake_amt=0&node_ids=468106,468105,464352,468230
```

> 请求返回值：availables中是目前可以赎回的节点，unusables中是目前暂时无法赎回的节点（1天内激活的节点）。

> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `identifer` ：验证者链上ID
> - `public_key` ：验证者公钥匙

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "availables": [
            {
                "identifer": 468106,
                "public_key": "893c775be276f3b908a5bc7c06d82119947ea15223738d61222d29d491d0dbc826544b1989bb41834a2ed28112052d32"
            },
            {
                "identifer": 468105,
                "public_key": "b945c815c0151966a3da434298b8634be71d0015064acefa84f7900bbd87a2eb42d404ea9550bca65d5d7ac4692224fb"
            },
            {
                "identifer": 464352,
                "public_key": "a6b53f3fb8c35a4b8ebb0fd4046dc5235655fde408222bb3feab7b81432e11e0766abe0abfd1f3b0017e08da75b59017"
            }
        ],
        "unusables": [
            {
                "identifer": 468230,
                "public_key": "a432e7d747543b9d646c9e5aea05a8681092c24549cc17743e283f4dd4f7b667754212b5c14399f13784bef4f5b65abc"
            }
        ]
    }
}
```

### 查询可赎回金额

##### GET [/eth2/v2/miner/unstake](https://test-api.kelepool.com/eth2/v2/miner/unstake?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87)


> 请求参数：
> - `address` ：用户地址
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/miner/unstake?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87&num2str=1
```

> 请求返回值：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `retail_staked` ：小额质押可赎回金额
> - `retail_unstaking` ：小额质押赎回中金额
> - `whale_staked` ：大额质押可赎回金额
> - `whale_unstaking` ：大额质押赎回中金额
> - `estimate_use_sec` ：预计赎回耗时,秒
> - `fast_fee_ratio` ：快速赎回服务费率 5%

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

### 发起赎回

- 先需要用户私钥签名，详见ETH私钥签名章节
- 然后用auth token对整个json body签名
##### POST [/eth2/v2/miner/unstake](https://test-api.kelepool.com/eth2/v2/miner/unstake)

> 请求参数：
> - `type` ：赎回类型  retail:小额赎回， retail_fast:小额快速赎回, whale:大额质押赎回
> - `address` ：用户地址
> - `unstake_amt` ：赎回金额，这里要注意如果是大额赎回，必须是32的整数倍，系统根据数量按时间降序选择节点赎回（这个字段与node_ids任选一个填写，用于按数量赎回）
> - `node_ids`：赎回节点链上ID列表，多个逗号分隔（仅大额赎回可用，用于按节点ID来赎回。此字段填写后，不允许再填写unstake_amt字段，unstake_amt设置为0）

```bash
https://test-api.kelepool.com/eth2/v2/miner/unstake

{
    "type":"retail",
    "address":"0x3ef51B5079021a11b1CAB3d36eEa45FaCF2B00CE",
    "unstake_amt":"123.3244",
    "node_ids":"468106,468230"
}
```

> 请求返回值：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `withdrawable` : 可提现金额
```json
{
    "code":0,
    "message":"success",
    "data":{
        "withdrawable":"123.123"
    }
}
```


### 查询可提现信息

##### GET [/eth2/v2/miner/withdrawal](https://test-api.kelepool.com/eth2/v2/miner/withdrawal?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87)


> 请求参数：
> - `address` ：用户地址

```bash
https://test-api.kelepool.com/eth2/v2/miner/withdrawal?address=0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87
```

> 请求返回值：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `balance` ：可提现金额
> - `user_fee` ：预估链上手续费，目前仅支持向普通地址转账
> - `fee_free_threshold` ：免除链上手续费的最小提现金额
> - `pay_addr` : 目前固定返回请求中的用户地址，暂不支持向其他地址提现

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

### 发起提现

##### POST [/eth2/v2/miner/withdrawal](https://test-api.kelepool.com/eth2/v2/miner/withdrawal)

> 请求参数：
> - `address` ：用户地址
> - `amount` ：提现金额

```bash
https://test-api.kelepool.com/eth2/v2/miner/withdrawal

{
    "address":"0xd8f8799bc41b9eb55b5c22c6f75e54b5b98f6f87",
    "amount":"12.23",
}
```

请求返回
```json
{
    "code":0,
    "message":"success",
    "data":{}
}
```


## 节点API接口

### 生成验证者公钥
##### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> 请求参数：
> - `deposit_credentials` ：用户提款凭证
> - `count` ：生成验证节点数量，批量质押时可根据`质押数量 / 32` 得出`count`参数的数量。
> - `recreate` ：是否重新生成新的keystore。（0=否，1=是）

```bash
https://test-api.kelepool.com/eth2/v2/validator/keypair

{
    "deposit_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
    "count":2,
    "recreate":0
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



### 查询验证者公钥
##### GET [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair?deposit_credentials=001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb&is_used=0)

> 请求参数：
> - `deposit_credentials` ：用户提款凭证
> - `is_used` ：使用状态（0=未使用，1=已使用）

```bash

https://test-api.kelepool.com/eth2/v2/validator/keypair?deposit_credentials=001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb&is_used=0

```

> 请求返回值：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息
> - `pubkey` ：验证者公钥
> - `withdrawal_credentials` ：提款凭证
> - `signature` ：验证者签名
> - `deposit_data_root` ：默克尔树根
> - `network_name` ：ETH网络名称
> - `create_time` ：创建时间
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


### 节点奖励记录曲线图
##### GET [/eth2/v2/validator_reward](https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> 请求参数：
> - `pubkey` ：验证节点公钥
> - `timezone` ：时区
> - `unit` ：统计单位(day/hour)
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce&num2str=1
```

> 请求返回值：
> - [记录时段,节点累计总奖励,质押金额,节点总余额]

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

### 节点链上自动转账记录查询

> 大额质押节点，其基础收益提取/本金赎回由节点自动完成转账，转账记录可通过此接口查询
##### GET [/eth2/v2/validator/node_withdrawal](https://test-api.kelepool.com/eth2/v2/validator/node_withdrawal?vids=464352,468105&address=0x3ef51B5079021a11b1CAB3d36eEa45FaCF2B00CE&order_by=-time&page_size=5&page_number=1)

> 请求参数：
> - `page_size` 分页大小
> - `page_number` 分页页号
> - `vids` ：验证节点id过滤，可传多个，建议不超过10个
> - `address` ：节点质押人过滤 (vids和address必须至少一个有效，查询结果取两者交集)
> - `order_by` ：转账记录排序，目前支持`time`,`-time`
> - `timezone` ：指定返回时间的时区

```bash
https://test-api.kelepool.com/eth2/v2/validator/node_withdrawal?timezone=0&vids=464352,468105&address=0x3ef51B5079021a11b1CAB3d36eEa45FaCF2B00CE&order_by=-time&page_size=5&page_number=1
```

> 请求返回值：
> - `timezone` ：时区
> - `index` ：转账记录在链上的唯一索引号
> - `amount` ：转账金额(gwei)
> - `amount_eth` ：转账金额(eth)
> - `address` ：转账收款地址
> - `time` ：转账时间
> - `validator_index` ：验证节点唯一id

```json
{
    "code":0,
    "message":"success",
    "data":{
        "total":21,
        "page_size":3,
        "page_number":1,
        "timezone":"8",
        "data":[
            {
                "index":"0x329de0",
                "amount":32000000000,
                "address":"0x3ef51b5079021a11b1cab3d36eea45facf2b00ce",
                "time":"2023-04-21 08:47:36",
                "validator_index":468105,
                "amount_eth":"32"
            },
            {
                "index":"0x328ffd",
                "amount":32000000000,
                "address":"0x3ef51b5079021a11b1cab3d36eea45facf2b00ce",
                "time":"2023-04-21 07:51:00",
                "validator_index":464352,
                "amount_eth":"32"
            },
            {
                "index":"0x303d39",
                "amount":1371538,
                "address":"0x3ef51b5079021a11b1cab3d36eea45facf2b00ce",
                "time":"2023-04-19 14:17:00",
                "validator_index":468105,
                "amount_eth":"0.001371538"
            }
        ]
    }
}
```

### 节点罚款记录
##### GET [/eth2/v2/slashes/history](https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=2&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> 请求参数：
> - `pubkey` ：验证节点公钥
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=20&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce&num2str=1
```

> 请求返回值：
> - `epoch` ：节点周期
> - `slash_amount` ：罚款金额
> - `snap_time` ：周期时间

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



## 合作商API接口


### 合作商下所有用户质押总览
##### GET [/eth2/v2/partner/dashboard](https://test-api.kelepool.com/eth2/v2/partner/dashboard)

> 请求参数：
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/partner/dashboard?num2str=1
```

> 请求返回值：
> - `total_amount` ：质押总数量（ETH）
> - `staked_amount` ：已生效数量（ETH）
> - `staking_amount` ：待生效数量（ETH）
> - `ongoing_amount` ：待提款数量（ETH）
> - `total_reward` ：总收益（ETH）
> - `total_validaters` ：总验证节点数量
> - `unactived_validater` ：待生效节点数量
> - `actived_validater` ：已生效节点数量
> - `closed_validater` ：已关闭节点数量
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


### 合作商下所有用户收益历史列表
##### GET [/eth2/v2/partner/income](https://test-api.kelepool.com/eth2/v2/partner/income)

> 请求参数：
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/partner/income?num2str=1
```

> 请求返回值：
> - `date` ：分红日期
> - `reward` ：截止当天累计收益
> - `deposit` ：截止当天累计充值本金
> - `balance` ：截止当天账户总余额（截止当天累计充值本金+截止当天累计收益）
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



### 合作商下所有用户验证节点列表
##### GET [/eth2/v2/partner/validator](https://test-api.kelepool.com/eth2/v2/partner/validator)

> 请求参数：
> - `page_size` 分页大小
> - `page_number` 分页页号
> - `num2str` ：是否将返回的全部字段转字符串类型

```bash
https://test-api.kelepool.com/eth2/v2/partner/validator?num2str=1
```

> 请求返回值：
> - `identifer` ：验证节点编号（验证节点生效后才有）
> - `public_key` ：验证节点公钥
> - `amount` ：质押数量
> - `status` ：节点状态 0:待处理 1：质押中，2：已生效，3:退出中，4:提款中，5：已退出
> - `effective_time` ：生效时间，格式：%Y-%m-%d %H:%M:%S，未生效时为null
> - `address` ETH1存款地址
> - `deposit_credentials` ：ETH2提款凭证
> - `type` ：质押账户类型 0：小额质押，1：大额质押
> - `reward` ：节点累计共识奖励
> - `mev_reward` ：节点累计mev奖励
> - `settle`.`reward` ：扣除手续费后的累计共识收益
> - `settle`.`mev_reward` ：扣除手续费后的累计mev收益
> - `settle`.`7d_reward` ：扣除手续费后的7天共识收益
> - `settle`.`7d_mev_reward` ：扣除手续费后的7天mev收益
> - `apr` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率
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

#### 设置合作商手续费及收款地址

1.合作商可以联系可乐矿池设置大额质押手续、渠道标记、收款地址、费用类型等，质押完成后合约自动将手续费转入合作商设置的收款地址，可乐矿池目前按每个验证节点收取0.05ETH手续费。

- 若用户质押时的source与合作商设置的partner渠道标记匹配，合约将要求用户支付合作商手续费

- 合作商可通过合约的getPartnerInfo查询自己的手续费信息

- 合作商未设置手续费或手续费设置为0，默认每个节点收取0.05手续费


2.收取手续费有两种方式（以用户一次质押10个验证节点，合作商设置0.1ETH手续费为例）

- 按节点数量收取：合约将收取1.5ETH手续费，其中0.5ETH给可乐矿池，1ETH自动转给合作商

- 按每次质押收取：合约将收取0.6ETH手续费，其中0.5ETH给可乐矿池，0.1ETH自动转给合作商

