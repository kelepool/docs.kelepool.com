# 如何查询用户质押信息？

可乐矿池开放了全部ETH2.0的收益查询接口，开发人员可以使用钱包地址查询用户的质押量、总收益、年华、曲线（小时、天）、节点状态、操作历史、历史收益等数据。

## API查询节点

[可乐矿池Mainnet主网API：https://api.kelepool.com](https://api.kelepool.com)

[可乐矿池Ropsten测试网API：https://test-api.kelepool.com](https://test-api.kelepool.com)

> 通用的请求返回结果：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息

## API授权认证

第三方开发人员需要联系可乐矿池，申请一个长时间有效的签名 `authority_key` 以及 `token`，第三方可以用这两个key进行签名以及数据来源的确认。

### 1.授权步骤
- 联系可乐矿池申请`authority_key` 以及 `token`
- 如果用户是第一次调用可乐矿池API，则需提前调用`/user/v2/anonymouslogin` 进行[用户地址注册](#用户地址注册)
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


url = 'https://test-api.kelepool.com/eth2/v2/miner/income/query'
params = {
    "address":"0xB49F98416aa4B158c2e752FD8031Fb295D330B22"
}

sign_str = '&'.join(['%s=%s' % (k, params[k]) for k in sorted(params)])

authority_key='2fb8098e1xxxxxxxxxxa874f572643b8ed'

sign=hmac.new(authority_key.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.blake2b).hexdigest()

token='eyJ0eXxxxxxxxxxxxxxxx36jpgZRWc'

headers = {'Content-Type': 'application/json', 'Accept':'application/json',
'Kele-ThirdParty-Authority':token,
'Kele-ThirdParty-Sign':sign
}

r_json = requests.get(url,params=params,headers=headers)
print(r_json.text)

```

## 用户地址注册
#### POST [/user/v2/anonymouslogin](https://test-api.kelepool.com/user/v2/anonymouslogin)

此接口用于第三方的用户地址注册，主要用于统计第三方各个用户的质押数量等，只需在第一次使用可乐矿池API时调用，之后无需再次调用。

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
> - `total_reward` ：总收益（ETH）
> - `staked_days` ：总质押天数
> - `total_validaters` ：总验证节点数量
> - `unactived_validater` ：待生效节点数量
> - `actived_validater` ：已生效节点数量
> - `closed_validater` ：已关闭节点数量
> - `reward` ：曲线图上的收益（ETH）
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
> - `predicted_reward` ：质押年华收益（%）
> - `whale_min_amount` ：大额最低质押数量（ETH）
> - `retail_min_amount` ：小额最低质押数量（ETH）
> - `retail_deposit_far` ：小额质押还差多少ETH创建验证节点
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
        "predicted_reward":0.04189544090093631,
        "whale_min_amount":32,
        "retail_min_amount":0.01,
        "retail_deposit_far":27.6,
        "validator_alive_predicted_hour":24
    }
}
```


## 收益历史列表
#### GET [/eth2/v2/miner/income/query](https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606)

> 请求参数：
> - `address` ：用户质押钱包地址

```bash
https://test-api.kelepool.com/eth2/v2/miner/income/query?address=0x5dd3bd08cbc8498c8640abc26d19480219bb0606
```

> 请求返回值：
> - `date` ：分红日期
> - `reward` ：当代产生的收益
> - `deposit` ：未使用此字段
> - `balance` ：当日账户总余额
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
> - `status` ：节点状态 1：未生效，2：已生效，5：已退出
> - `effective_time` ：生效时间，格式：%Y-%m-%d %H:%M:%S，未生效时为null
> - `address` ETH1存款地址
> - `deposit_credentials` ：ETH2提款凭证
> - `type` ：质押账户类型 0：小额质押，1：大额质押
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
            "network_name":"ropsten"
        },
        {
            "pubkey":"83909737754d15dd3ad1281a3f0e62baa64d3c0abb3ed218c3baf7ff250058a24fe1143a5243c3b015e3f93ed6af1e18",
            "withdrawal_credentials":"001ae74d19004b360d02d411795cee1451dc20679f13a13aafce7de2448b60cb",
            "signature":"b95af475d67e8438e49cfaad12dacd789c705938fd6a8fee93a1a170ef6322c2cf37c643d1d010b23734c04e9028b58d034435dd6c9f19610090bfdefb7522c69e99b0a7830f6d967f1d07e3ff30128c8b516d40232e5595ac91d746420da993",
            "deposit_data_root":"f08ca526395300d60ccc6db28d931ba129944f44d4bb92c773424e120dde222b",
            "network_name":"ropsten"
        }
    ]
}
```