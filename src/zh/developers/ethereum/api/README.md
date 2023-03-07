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

## 用户地址注册
#### POST [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

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

## 用户质押总览
#### GET [/eth2/v2/miner/dashboard](https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day)

> 请求参数：
> - `address` ：用户质押钱包地址
> - `interval` ：返回收益曲线类型hour=小时、day=天

```bash
https://test-api.kelepool.com/eth2/v2/miner/dashboard?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606&interval=day
```

> 请求返回值：
> - `total_amount` ：质押总数量（ETH）
> - `staked_amount` ：已生效数量（ETH）
> - `staking_amount` ：待生效数量（ETH）
> - `ongoing_amount` ：待提款数量（ETH）
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
            "ongoing_amount":0
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

## 平台数据总览
#### GET [/eth2/v2/global](https://test-api.kelepool.com/eth2/v2/global)

> 请求参数：
> - 无

```bash
https://test-api.kelepool.com/eth2/v2/global
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


## 收益历史列表

### 共识收益
#### GET [/eth2/v2/miner/income/query](https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> 请求参数：
> - `address` ：用户质押钱包地址

```bash
https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
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
### MEV收益

- 来自合作商的大额质押节点，将按私池模式独立部署，节点获得的mev收益独立结算
- mev收益记入质押地址
- mev手续费记入合作商专用地址,手续费比例可配置
- 来自合作商的小额质押，统一作为可乐的散户整体结算

#### GET [/eth2/v2/mev_reward](https://test-api.kelepool.com/eth2/v2/mev_reward?page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689)

> 请求参数：
> - `page_number`/`page_size` ：页码，页尺寸
> - `address` ：用户质押钱包地址/合作商mev手续费地址

```bash
https://test-api.kelepool.com/eth2/v2/mev_reward?page_number=1&page_size=5&address=0x1ba59c6ba6fa7b14ec63fe499d649595cf3b8689
```

> 请求返回值：
> - `amount` ：单笔收益金额
> - `balance` ：账户余额
> - `total_reward` ：历史累计收益
> - `staked_amt` ：质押金额
> - `record_type` ：记录类型(reward:奖励记录 withdrawal:提现记录)
> - `height` mev奖励块高
> - `mev_addr` ：节点mev收款地址
> - `trx_id` ：交易id(mev奖励/提现)
> - `time` ：结算时间utc8

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

## 节点状态列表
#### GET [/eth2/v2/miner/validator/query](https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> 请求参数：
> - `address` ：用户质押钱包地址

```bash
https://test-api.kelepool.com/eth2/v2/miner/validator/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
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
> - `apr` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率

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
            "type":0, 
            "reward": 0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
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

## 用户操作历史
#### GET [/eth2/v2/op_history](https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> 请求参数：
> - `address` ：用户质押钱包地址

```bash
https://test-api.kelepool.com/eth2/v2/op_history?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
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


## 生成验证者公钥
#### POST [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair)

> 请求参数：
> - `deposit_credentials` ：用户提款凭证
> - `count` ：生成验证节点数量，批量质押时可根据`质押数量 / 32` 得出`count`参数的数量。
> - `recreate` ：是否取回之前生成的未使用keystore。（0=是，1=否）

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



## 查询验证者公钥
#### GET [/eth2/v2/validator/keypair](https://test-api.kelepool.com/eth2/v2/validator/keypair?deposit_credentials=001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb&is_used=0)

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



## 合作商质押总览
#### GET [/eth2/v2/partner/dashboard](https://test-api.kelepool.com/eth2/v2/partner/dashboard)

> 请求参数：
> - 无

```bash
https://test-api.kelepool.com/eth2/v2/partner/dashboard
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


## 合作商收益历史列表
#### GET [/eth2/v2/partner/income](https://test-api.kelepool.com/eth2/v2/partner/income)

> 请求参数：
> - 无

```bash
https://test-api.kelepool.com/eth2/v2/partner/income
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



## 合作商验证节点列表
#### GET [/eth2/v2/partner/validator](https://test-api.kelepool.com/eth2/v2/partner/validator)

> 请求参数：
> - 无

```bash
https://test-api.kelepool.com/eth2/v2/partner/validator
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
> - `apr` ：预估总年化收益率
> - `apr_detail`.`basic` ：预估共识年化收益率
> - `apr_detail`.`mev` ：预估mev年化收益率
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
            "type":0,
            "reward": 0.5368926599999995,
            "apr":0.0487,
            "apr_detail":{
                "basic":0.0367,
                "mev":0.012
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

## 节点奖励记录曲线图
#### GET [/eth2/v2/validator_reward](https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> 请求参数：
> - `pubkey` ：验证节点公钥
> - `timezone` ：时区
> - `unit` ：统计单位(day/hour)

```bash
https://test-api.kelepool.com/eth2/v2/validator_reward?page_number=1&page_size=20&timezone=8&unit=day&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce
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

## 节点罚款记录
#### GET [/eth2/v2/slashes/history](https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=2&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce)

> 请求参数：
> - `pubkey` ：验证节点公钥

```bash
https://test-api.kelepool.com/eth2/v2/slashes/history?page_number=1&page_size=20&pubkey=8d9f04df4879680625ce6f3b9df0536160bb706e4242abc317ae53903abb804a5f26390ee4b739eacaecf8776bd0d0ce
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