# What is ETH2.0 staking?

## About ETH2.0

ETH2.0 is an important stage in the transition of ETH from PoW mechanism to PoS mechanism, and the PoS stage can provide users with pledge income. Participating in ETH2.0 requires 32 ETHs and node construction technology to be mortgaged, and the lock-up period is long. In order to lower the threshold for users to participate in pledge, Kele Pool provides users with a one-click pledge service, 100% of the income on the chain is distributed, and ETH can be earned safely.

[Kele Pool - Mainnet](https://kelepool.com/pos/eth/mining)

[Kele Pool - Ropsten](https://test-www.kelepool.com/pos/eth/mining)

## Stake ≥ 32 ETH

- If the user wants to manage the withdrawal key by himself and owns more than 32ETH of tokens at the same time, he can pledge the tokens through a large amount of pledge. Users need to generate a withdrawal key and corresponding withdrawal certificate through a hardware wallet (Ledger) or [Ethereum official CLI tool](https://github.com/ethereum/staking-deposit-cli), and send the withdrawal certificate to Pledge for the cola mining pool.

- After this method is pledged, the user controls the withdrawal key by himself. After the ETH2.0 withdrawal function is officially launched, the user can withdraw the income and pledge the principal. Cola Mining Pool will charge some service fees as node operation fees, the amount of pledge needs to be an integer multiple of 32+fee, and the fee of each verification node is temporarily 0.05ETH.

## Stake ＜ 32 ETH

- If the user has insufficient tokens for 32ETH, or does not want to manage the withdrawal key by himself, he can pledge the tokens through a small amount of pledge. After the accumulated amount in the smart contract reaches 32ETH, the cola mining pool will immediately create a verification node.

- Since the small pledge is a multi-party accumulated amount, the withdrawal key of the verification node is managed and maintained by the cola mining pool cold wallet. After the ETH2.0 withdrawal function is officially launched, the cola mining pool will withdraw funds for users.

- Small amount pledge is not a literal small amount. This method supports a minimum pledge of 0.01 ETH and a maximum of unlimited ETH. Cola Mining Pool will charge 10% of the total revenue of users' pledge as a node operating fee.