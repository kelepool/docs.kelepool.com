# Is it a Good Idea to Stake Your Ethereum on KelePool?

Investment always has risks, and there is no exception for staking despite its well-known stability among cryptocurrency lovers. It's a wise choice to learn about the potential risks of the investment project and cooperate with a reliable platform. This article will explain the risks of ETH staking and the operation mechanism of Kele Pool ( https://www.kelepool.com/ ), so that you can make a thought-out decision before investing.

# Risk of Staking

The main risk of staking comes from slashing, which occurs when a validator behaves contrary to the Ethereum network. Slashing takes away (part of) the staked funds and forces the validator to leave the network. The penalty, requiring validators to follow the rules correctly, is to stop people trying to harm the Ethereum network. Slashing happens because the validator has malicious intent, but also happens when misconfiguration violates the protocol. This risk always exists, but staking pools, such as Kele Pool, can reduce the risks with their own professional skills.

# Which is the best staking platform: these should be considered when choosing a platform

When selecting a staking platform, how can we tell whether a platform is reliable? The following points are what you need to pay attention to:

1. High yield is not everything

We love high returns when investing, but for Ethereum, the current APR (annual percentage rate) is now quite stable, and there should be no huge changes between different platforms. If you find that a platform has abnormally high APR, please be cautious. Mainstream platforms, such as Kele Pool, will clearly display the current APR (sourced from the official Ethereum website), the number of validators and other information, and you can easily see it when you enter the page ( https://www.kelepool.com/ ).

![img](https://miro.medium.com/max/1400/0*YhHdISs9apTQd8-Y)

2. Platform Terms and Conditions

Be sure to read the terms and conditions carefully, such as the minimum staked amount, the locked period of funds, etc., to avoid misunderstandings and unexpected losses. Generally speaking, the platform will show the terms that need to be clarified during the signing process. If you don't see or check any terms when staking, be careful.

3. Staking mode

Cryptocurrency staking has existed for several years, and now a variety of staking pool services have been developed. From the perspective of the platform, there are mainly two types: centralized platforms and decentralized ones. The services provided by centralized exchanges require custody of funds, saving a lot of tedious operations for users, but from a security point of view, users need to bear latent risks such as fund abuse and market manipulation, so we will not discuss this model in this article. While decentralized platforms do not host funds, and are generally distinguished by private key custody methods. The current main application models are divided into liquid staking and smart contracts.

Liquid staking allows the platform to directly host your private keys, and you will get some new tokens (your tokenized funds) that can be used for trading or as collateral for DeFi activities. Because the staked coins cannot be used during the regular staking process,  so in an ideal state, liquid staking enables you to more freely control the staked assets by trading tokenized funds. 

But this model has two main drawbacks. One is that the platform has the user's private key, which has certain security risks; the other is that the new tokens you get are not very stable in value. They are expected to remain consistent with the value of the corresponding funds, to be more specific, they need to exchange 1:1 with the staked funds. However, this is hard to achieve in actual operation, and the exchange ratio will fluctuate more or less. Also, if a token is not recognized in the market you want to trade, its liquidity is meaningless.

Speaking of the second mode - smart contract, it is a simpler and more transparent way of staking, and it is also the solution currently adopted by Kele Pool. Smart contracts allow users to host their private keys to the contract instead of the platform. These technical means make the important information of the transaction in the hands of an absolutely safe and impartial third party, and the platform only provides services and cannot operate the private key. In order to let everyone better understand, let's take the contract of Kele Pool as an example to explain it.

# Kele Pool Smart Contract

The ETH network requires at least 32ETH to create a new validator. In consideration of meeting the various needs, the smart contract of Kele Pool has introduced two solutions for different staked amounts.

**Small amount staking**

Users can stake a minimum of 0.01 ETH and a maximum of an unlimited amount of ETH.

It is very simple to participate in this staking mode. You only need to deposit the tokens into the Kele Pool smart contract. After the total amount of tokens in the contract exceeds 32ETH, Kele Pool will use the official Ethereum CLI tool to generate withdrawal credentials in the cold wallet. At the same time, a validator is automatically created.  

1. Assuming that we want to stake 125.0172ETH, Kele Pool will immediately create 3 validators (32ETH each)

1. The remaining 29.0172ETH in the contract is waiting to be staked. When other users stake and make it up to 32ETH, another validator will be created.

1. After ETH2.0 is officially launched in the future, Kele Pool will open the withdrawal interface for users.

**Large amount staking**

Under this mode, you need to stake a minimum of 32ETH, and a maximum of 3200ETH can be pledged at a single time (depending on the gas situation). Each stake must be an integer multiple of 32 + service fee. This part of the process is a little complicated and involves some professional descriptions. You can also watch the following video to preview the operation process:

<iframe width="560" height="315" src="https://www.youtube.com/embed/SjnBYNFEv5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The procedure is mainly divided into three steps:

1. Generate withdrawal credentials

2. Generate the validator public key

3. Execute staking

(1) Generate withdrawal credentials

You need to use the official Ethereum CLI tool to generate withdrawal credentials. The tool will generate two files: deposit_ * .json or keystore- * .json. Please save the mnemonics and you can use the mnemonics to regenerate these two files at any time. 

Kele Pool only requires withdrawal_credentials attribute value in the deposit_ * .json file, and this attribute will be used as the ETH2.0 withdrawal credentials.  

(2) Generate the validator public key

The public key of the validator is mainly for Kele Pool to run the ETH2.0 node. In order to prevent the same validator from running in different places and causing slashing, Kele Pool will create the public key of the validator according to the user's withdrawal credentials. 

After getting the withdrawal_credentials attribute value in the deposit_ * .json file from the previous step, we can request the API of the Kele Pool to generate the public key of the verification node.

(3) Execution of staking

After obtaining the public key of the verifier obtained above, staking can be made. Unlike small amount staking, this mode requires more parameters to be passed in, and data needs to be assembled when staking in batches. At the end of this step, the process is complete.

![img](https://miro.medium.com/max/1400/1*zXA1o3RVqtsxMcaUyh9lvg.png)

Kele Pool is dedicated to providing safe and reliable mining and staking services, and the applied smart contracts have been audited by the authoritative organization SlowMist Technology. Kele Pool also supports using Ledger hardware wallets as a safer payment method.

**If you want to know more details, please check the official website: https://www.kelepool.com/**
