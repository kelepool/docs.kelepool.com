# FAQ

### How to round up the redemption/withdrawal amount?

The redemption amount and cash withdrawal amount should be rounded down to avoid exceeding the maximum redemption/withdrawal amount after rounding.


### How to catch interface exceptions?

The exception must be captured for the interface. Only when the code returned by the interface is 0, the execution is successful. Other values are execution exceptions, and the exception log should be recorded and the user should be prompted.


### Can't redeem the node that just took effect?

Due to official restrictions, nodes that have just taken effect cannot be redeemed, so the redemption operation can only be performed after waiting for 24 hours after the large-amount pledged node becomes effective. We have added a redeemable status query interface, which can obtain the list of nodes that can be redeemed by the user through the amount or node ID. This interface should be used to check when a large amount is redeemed. For details, please refer to the document:

[https://docs.kelepool.com/zh/developers/ethereum/api/#Query the list of redeemable nodes](https://docs.kelepool.com/zh/developers/ethereum/api/#Query redeemable nodes back to node list)