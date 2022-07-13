# Deposits

<br>

## Overview

The main reason for extending the Kele Pool network is to implement custom deposit logic which funnels user deposits into the deposit pool.
For example, a fund manager may wish to stake their users' ETH in Kele Pool via their own smart contracts, and abstract the use of Kele Pool itself away from their users.

**Note:** the `RocketDepositPool` contract address should *not* be hard-coded in your contracts, but retrieved from `RocketStorage` dynamically.
See [Interacting With Kele Pool](ADD_URL_HERE) for more details.


<br>

## Implementation


The following describes a basic example contract which forwards deposited ETH into Kele Pool and minted rETH back to the caller::

``` solidity
import "RocketStorageInterface.sol";
import "RocketDepositPoolInterface.sol";
import "RocketTokenRETHInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);

    constructor(address _rocketStorageAddress) {
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

    receive() external payable {
        // Check deposit amount
        require(msg.value > 0, "Invalid deposit amount");
        // Load contracts
        address rocketDepositPoolAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketDepositPool")));
        RocketDepositPoolInterface rocketDepositPool = RocketDepositPoolInterface(rocketDepositPoolAddress);
        address rocketTokenRETHAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketTokenRETH")));
        RocketTokenRETHInterface rocketTokenRETH = RocketTokenRETHInterface(rocketTokenRETHAddress);
        // Forward deposit to RP & get amount of rETH minted
        uint256 rethBalance1 = rocketTokenRETH.balanceOf(address(this));
        rocketDepositPool.deposit{value: msg.value}();
        uint256 rethBalance2 = rocketTokenRETH.balanceOf(address(this));
        require(rethBalance2 > rethBalance1, "No rETH was minted");
        uint256 rethMinted = rethBalance2 - rethBalance1;
        // Transfer rETH to caller
        require(rocketTokenRETH.transfer(msg.sender, rethMinted), "rETH was not transferred to caller");
    }

}
```