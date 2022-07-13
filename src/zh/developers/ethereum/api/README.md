# 如何查询用户质押信息？

可乐矿池开放了全部ETH2.0的收益查询接口，开发人员可以使用钱包地址查询用户的质押量、总收益、年华、曲线（小时、天）、节点状态、操作历史、历史收益等数据。

## API查询节点

[Mainnet主网API：https://api.kelepool.com](https://api.kelepool.com)

[Ropsten测试网API：https://test-api.kelepool.com](https://test-api.kelepool.com)

> 通用的请求返回结果：
> - `code` ：整型数字，等于0表示成功，大于0表示失败
> - `message` ：失败后返回的消息

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