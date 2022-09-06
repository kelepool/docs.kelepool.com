# 一文读懂以太坊合并

在7月14日的开发者电话会议中，以太坊开发者Tim Beiko确认了以太坊（Ethereum）合并将于 9 月 19 日前后完成，而在8月第二周预计将进行第三次也是最后一次测试网合并Goerli。

截至目前，以太坊是世界上生态最为庞大、复杂的区块链。合并是一次前所未有且重要的以太坊升级，如果顺利进行，以太坊将首次完成共识机制从 PoW 向 PoS 的转换，也将给其他区块链提供一个极具参考性的范例。作为投资者，了解以太坊合并可以为未来的投资决策做好铺垫，让我们灵活应对合并带来的机遇和挑战。本文将详细介绍以太坊合并中需要重点了解的板块，以供各位快速明确相关概念。

# 什么是以太坊合并

“合并”是以太坊区块链从使用工作量证明 (PoW ) 共识机制转变为权益证明 (PoS ) 共识机制的事件名称。它被称为合并，因为它是目前平行运行的两条独立区块链的合并：以太坊主网和名为“信标链”的特殊用途区块链。

信标链于 2020 年 12 月 1 日启动，其唯一用途就是成为一条权益证明 (PoS) 区块链。信标链上没有交易、代币或Defi应用，是一条空链，这样的特性让它能够和以太坊区块链合并，并取代原有的PoW共识机制。

# 以太坊合并是怎样实现的

自从启动之后，信标链一直与以太坊主网并行运行，相互独立。信标链是基于PoS机制的区块链，负责出块和交易验证的节点从质押 ETH 的验证者中随机选出。所以从上线的第一天开始，信标链就支持了 ETH 质押、存储功能，通过质押 32 个或更多 ETH，你能成为验证者，获得质押收益。目前被质押的ETH会处于一个封存状态，本金和收益的提取要等到正式完成合并和升级。

现阶段信标链的功能很单纯，包括质押 ETH、随机选择节点出块和验证、对节点进行奖励和惩罚，这些功能仅允许维持网络正常运行，像账户或者智能合约之类的功能是不支持的。相比之下，以太坊主网已经是一条相当成熟的PoW链，链上存在着数以万计的应用和大量资金。等到信标链合并到以太坊主网，以太坊的 PoW 共识层将被替换成PoS信标链，信标链可能承担交易执行、数据可用的职责，交易状态则是继承自原以太坊主网。

![img](https://miro.medium.com/max/1400/0*qzydMy-djHyl_tDF)

图片来自以太坊官网

从当前的规划来看，以太坊想要通过转变共识机制（PoS）、优化数据存储和验证效率来提高主网性能，Rolllup、分片等技术也会得到进一步应用。为了推动共识机制从 PoW 向 PoS 转变，以太坊还设置了“难度炸弹”。“难度炸弹”会使 PoW 计算难度指数上升，从而劝退矿工，确保以太坊在合并后成为纯粹的 PoS 链。

# 为什么要有以太坊合并

- 实现分片技术在以太坊的应用

分片技术能将区块链网络划分成若干个子网络，每一个子网络都会包含一部分节点，网络中的资料存储和交易都会被随机分配到各个分片中处理，这样一来，每个节点只要承担一小部分工作量，而且不同分片上的交易可以同时进行，整个网络的交易速度就更快了。利用信标链的协调作用，以太坊的网络负载将分布在64个独立的分片中，这些分片同时处理信息，从而使整体交易时间更快、更高效。

- 对环境更友好

PoW 对机器、电力的要求非常高，以比特币为例，比特币网络一年的耗电量大约是 1213.6 亿度，超过阿根廷、荷兰、阿拉伯联合酋长国全年耗电量。在合并之后，使用PoS的以太坊网络将减少 99.95% 以上的耗电量。

- 更高的安全性和去中心化程度

相比PoW复杂的机器配置、运维，PoS 节点的参与门槛更低，特别是在越来越多服务商支持小额ETH质押后，不计划投入高额资金的普通人也能成为节点的一部分。安全方面，Vitalik曾发文论证PoS 网络的攻击成本高于 PoW 网络，而且在被攻击后，PoS 的恢复能力也优于 PoW 网络。但现有的这些观点还需要未来实践进一步验证。

# 合并对ETH投资者有什么影响

合并对 ETH 经济的改变主要有两方面：一是减少 ETH 的发行量，二是 ETH 会逐渐转变为一种原生的收益资产。

PoS 能以低廉的成本提供最高级别的区块链安全，这个过程中会减少为维护安全而发行的 ETH 数量（即支付给矿工的成本），使以太坊将每年的 ETH 增发比例从 4.3% 减少到 0.43%。因为 PoW 矿工习惯立即卖掉收到的大部分奖励，而且随着时间的推移，被卖掉的部分占总开采量的比例几乎是90%以上，PoS可以改变这一现状，减少90%以上的新ETH发行。

新ETH发行量的减少一般意味着币价上升，而且现在支付给矿工的费用将转移给质押者/验证者，让质押（staking）收益率变高。IntoTheBlock计算出，加上费用奖励，目前3.8%的年回报率将升至7.4%。综合这些因素，ETH的需求会进一步增加，成为稳定的收益资产。

当然，如果你已经持有一定ETH，也可以现在就参与ETH质押。我们推荐通过可乐矿池进行快捷、安全的ETH 质押。

![img](https://miro.medium.com/max/1400/0*04U4IuqPG8Yom9YP)

安全性说明：可乐矿池的staking智能合约已通过区块链权威机构慢雾科技的审计，其安全性和智能合约代码均可查。且可乐矿池支持使用Ledger硬件钱包。

灵活质押：不同于大部分只有单一服务的矿池，可乐矿池支持两种服务模式，你可以自由选择符合自己需要的方式。对比其他矿池，它收取的服务费也较为合理。

目前可乐矿池支持的币种为ETH，近期还会有更多质押网络推出，具体可以去官网查看。

**可乐矿池官网：https://www.kelepool.com/**