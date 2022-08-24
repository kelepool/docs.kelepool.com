---
description: >-
  This guide is for users who mine by using anonymous addresses on the chain. If
  you want to use the register on our website to mine, please refer to "Kele
  Pool BTC/ETH Mining Guide".
---

# Anonymous Mining

## 1. Features of anonymous mining

You only need the address on the public chain corresponding to the currency to start mining, and there is no need to register on the website.

## 2. Login for anonymous mining

### A. Login

Enter the Kele Mining Pool website and click on the homepage navigation of the Cola Mining Pool **"Anonymous Mining".**

**Website address:** [**`https://www.kelepool.com/`**](https://www.kelepool.com/)

****

### B. Select currency

Click on the currency on the left to select

### C. Enter on-chain address

After selecting the currency, enter the on-chain address on the native public chain corresponding to the selected currency on the right to receive money. Take BTC as an example. Here, the native public chain refers to the address generated on the BTC chain, not ETH and other addresses on the public chain. It's same for ETH, needs to establish the address on the ETH chain, and the internal recharge address of some exchanges is not the address on the public chain and cannot be used, please pay attention.&#x20;

If you cannot confirm, you can contact customer service for help. After filling in the address, click View to enter the anonymous mining page. The address displayed in the upper right corner is both an account and a payment address, and no additional settings are required.

## 3. Anonymous Mining Settings

### A. Common tutorials and software

Set the mining pool parameters on the worker, start the worker, and put it and the computer on the same network. If the worker has a built-in configuration function, you can obtain its IP through IP search software, and enter the worker in the computer browser for setting (common in ASIC miners), or use mining software to complete the setting (common in GPU graphics card miners). Refer to the tutorials officially given by each miner/mining software for more details.

**Common BTC mining machine tutorials:**

* Antminer tutorial address: [https://support.bitmain.com/hc/en-us](https://support.bitmain.com/hc/en-us)
* Avalon miner tutorial address: [https://canaan.io/service/447](https://canaan.io/service/447)
* Shenma miner tutorial address: [https://www.microbt.com/server/manual.html#/](https://www.microbt.com/server/manual.html#/)

**Common ETH mining software:**

* Hiveon: [**`https://hiveon.com/`**](https://hiveon.com/)
* Open Source Miners: [**`http://dl.ntminer.top/`**](http://dl.ntminer.top/)
* MinerOs: [**`https://mineros.info/`**](https://mineros.info/)

**Commonly used ETH mining original kernel:**

* PhoenixMiner：[**`https://phoenixminer.org/download/`**](https://phoenixminer.org/download/)
* Bminer: [**`https://www.bminer.me/releases/`**](https://www.bminer.me/releases/)**``**
* NBminer: **** [**`https://github.com/NebuTech/NBMiner/releases`**](https://github.com/NebuTech/NBMiner/releases)**``**
* Municipality: [**`https://github.com/develsoftware/GMinerRelease/releases`**](https://github.com/develsoftware/GMinerRelease/releases)

### **B. ASIC miner settings**

The setting of mining pool parameters is generally divided into mining address and miner name.

#### **1. Fill in the mining address**

**The mining address is the address of the mining pool corresponding to the mining pool.** You can go to the **anonymous login/mining page** to view the latest address. It should be noted that the address may not be displayed due to antivirus software/firewall and other reasons. Just turn off the antivirus software/firewall. The current mining address of Kele Mining Pool is as follows:

**BTC General mining address**

* **URL1：stratum+tcp://btc.kelepool.com:80**
* **URL2：stratum+tcp://btc.kelepool.com:443**

**ETH General mining address:**

* **URL1：stratum+tcp://eth.kelepool.com:80**
* **URL2：stratum+tcp://eth.kelepool.com:1080**

**Cryptized mining address:**

* **URL1：stratum+ssl://eth.kelepool.com:443**
* **URL2：stratum+ssl://eth.kelepool.com:543**

#### **2. Fill in the miner's name**

The miner name filling mode is: the **on-chain address filled in when the mining pool logs in anonymously.**&#x20;

**Number**, the number is the number that distinguishes the mining machine, which can be freely written according to your own needs. If there are multiple mining machines, you can start with the address XXX on the chain and press XXX. 01, XXX.02 This rule gives the machine number for easy management.

#### 3. Precautions

* Because there may be problems with the mining address of the mining pool, generally a mining pool will provide multiple mining addresses for backup;
* When the same mining machine fills in multiple mining addresses of the same mining pool, it uses the same miner name (that is, the same on-chain address. Number combination);
* If the same mining machine sets the mining addresses of different mining pools, the miner name should fill in the on-chain address used by the corresponding mining pool to log in;
* If there are multiple miners, they should be distinguished in the numbering part when setting the miner name. If they fill in the same miner name, only one miner can be seen in the mining pool, but the real computing power is not affected, and it is still multiple miners. Superposition;
* **Filling in the mining address and miner name is very important** . If you fill in the wrong one, it may lead to loss of income. If you are not sure, please contact customer service;
* Please note that some mining machines do not support miner names to fill in the on-chain address, anonymous mining cannot be used, which may cause the mining machine to work abnormally. Users are required to sign-up and login for mining through mailboxes and other channels. You can participate in the BTC mining tutorial

The combination of anonymous address and number (separated by.) is the miner name

#### 4. Fill in the payment address

It is the on-chain address used for anonymous login in the first step of preparation.

#### 5. Verify that the connection is successful

After the miner is connected to the mining pool, wait a few minutes to log in to the Cola mining pool page to view it. If the computing power data has been updated, it will be successful.

### **C. GPU (NVIDIA or AMD) graphics card miner** settings

For details, please refer to the settings of the graphics card miner in the ETH mining tutorial.The difference between anonymous on-chain address mining and registered account mining is that the **"username"** (i.e. miner name) no longer uses the sub-account/username registered by the mining pool, but uses the on-chain address filled in when anonymous mining logs in.
