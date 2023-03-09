# What is ETH2.0 staking?

## About ETH2.0

ETH2.0 is an important stage in the transition of ETH from PoW mechanism to PoS mechanism, and the PoS stage can provide users with staking income. Participating in ETH2.0 requires 32 ETHs and node construction technology to be mortgaged, and the lock-up period is long. In order to lower the threshold for users to participate in staking, Kele Pool provides users with a one-click staking service, 100% of the income on the chain is distributed, and ETH can be earned safely.

[Kele Pool - Mainnet](https://kelepool.com/pos/eth/mining)

[Kele Pool - Goerli](https://test-www.kelepool.com/pos/eth/mining)

## Stake ≥ 32 ETH

- If the user wants to manage the withdrawal key by himself and owns more than 32ETH of tokens at the same time, he can staking the tokens through a large amount of staking. Users need to generate a withdrawal key and corresponding withdrawal certificate through a hardware wallet (Ledger) or [Ethereum official CLI tool](https://github.com/ethereum/staking-deposit-cli), and send the withdrawal certificate to staking for the cola mining pool.

- After this method is staked, the user controls the withdrawal key by himself. After the ETH2.0 withdrawal function is officially launched, the user can withdraw the income and staking the principal. Cola Mining Pool will charge some service fees as node operation fees, the amount of staking needs to be an integer multiple of 32+fee, and the fee of each verification node is temporarily 0.05ETH.

## Stake ＜ 32 ETH

- If the user has insufficient tokens for 32ETH, or does not want to manage the withdrawal key by himself, he can staking the tokens through a small amount of staking. After the accumulated amount in the smart contract reaches 32ETH, the cola mining pool will immediately create a verification node.

- Since the small staking is a multi-party accumulated amount, the withdrawal key of the verification node is managed and maintained by the cola mining pool cold wallet. After the ETH2.0 withdrawal function is officially launched, the cola mining pool will withdraw funds for users.

- Small amount staking is not a literal small amount. This method supports a minimum staking of 0.01 ETH and a maximum of unlimited ETH. Cola Mining Pool will charge 10% of the total revenue of users' staking as a node operating fee.

## Set partner fee and payment address

1. Partners can contact Coke Mining Pool to set up large pledge procedures, channel marks, payment address, fee type, etc. After the pledge is completed, the contract will automatically transfer the handling fee to the payment address set by the partner. Kele Pool currently charges 0.05ETH as a handling fee for 32ETH staking. 


- If the source when the user pledges matches the partner channel flag set by the partner, the contract will require the user to pay the partner fee

- Partners can query their own handling fee information through the contract's getPartnerInfo

- The partner does not set the handling fee or the handling fee is set to 0. By default, each node charges 0.05 handling fee


2. There are two ways to collect the handling fee (take the user as a pledge of 10 verification nodes at a time, and the partner sets a handling fee of 0.1ETH as an example)

- Charged according to the number of nodes: the contract will charge 1.5ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 1ETH will be automatically transferred to the partner

- Charged per pledge: the contract will charge 0.6ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 0.1ETH will be automatically transferred to the partner