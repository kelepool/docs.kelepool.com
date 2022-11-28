---
description: 本指南针对通过使用匿名链上地址进行挖矿的用户，如需使用注册网站账户的方式进行挖矿，请参考“可乐矿池BTC/ETH挖矿指南”。
---

# 🔑 匿名挖矿教程

## 1.匿名挖矿特点

只需要所挖币种对应的公链上可以收款的地址即可开始挖矿，无需注册网站操作。

## 2.匿名挖矿登录

### a.登录

进入可乐矿池网站，点击可乐矿池首页导航**“匿名挖矿”。**

**网站地址（需VPN代理）：** [**`https://www.kelepool.com/`**](https://www.kelepool.com/)

![](<../.gitbook/assets/new/nmwk1.png>)

![](<../.gitbook/assets/new/nmwk2.png>)


### b.选择币种

点击左边币种进行选择

![选择币种](<../.gitbook/assets/image(79).png>)

### c.输入链上地址

选好币种后在右侧输入所选币种对应的原生公链上可以收款的链上地址，以BTC为例，这里原生公链指的是生成于BTC链上的地址，而非ETH等其他公链上的地址，ETH同理，需要建立在ETH链上的地址，而部分交易所的内部充值地址并非公链上的地址不能拿来使用，请注意甄别，如不能确认可以联系客服帮助。

填好地址后点击查看，就进入匿名挖矿页面，右上角显示的地址既是账户也是收款地址，无需再额外进行设置。

![](<../.gitbook/assets/new/nmwk3.png>)

![](<../.gitbook/assets/new/nmwk4.png>)

## 3.匿名挖矿设置

### a.常用教程及软件

在矿机上进行设置矿池参数，启动矿机，将矿机与电脑置于同一网络，若矿机内置配置功能则可通过矿机IP查找软件获取矿机IP，在电脑浏览器中输入矿机IP进行设置（常见于ASIC矿机），或使用各类挖矿软件完成设置（常见于GPU显卡矿机），具体流程参照各矿机/挖矿软件官方给出的教程。

**常见BTC矿机教程：**

* 蚂蚁矿机教程地址：[**`https://service.bitmain.com.cn/support/download`**](https://service.bitmain.com.cn/support/download)**``**
* 阿瓦隆矿机教程地址：[**`https://canaan-creative.com/service/a10`**](https://canaan-creative.com/service/a10)**``**
* 神马矿机教程地址：[**`https://www.microbt.com/server/manual.html`**](https://www.microbt.com/server/manual.html)**``**

**常用ETH挖矿软件：**

* Hiveon：[**`https://hiveon.com/`**](https://hiveon.com/)**``**
* 开源矿工：[**`http://dl.ntminer.top/`**](http://dl.ntminer.top/)**``**
* MinerOs：[**`https://mineros.info/`**](https://mineros.info/)**``**

**常用ETH挖矿原创内核：**

* PhoenixMiner：[**`https://phoenixminer.org/download/`**](https://phoenixminer.org/download/)**``**
* Bminer：[**`https://www.bminer.me/zh/releases/`**](https://www.bminer.me/zh/releases/)**``**
* NBminer：[**`https://github.com/NebuTech/NBMiner/releases`**](https://github.com/NebuTech/NBMiner/releases)**``**
* Gminer：[**`https://github.com/develsoftware/GMinerRelease/releases`**](https://github.com/develsoftware/GMinerRelease/releases)**``**

### **b.ASIC矿机设置**

矿池参数的设置一般分为挖矿地址和矿工名。

#### **1. 填写挖矿地址**

**挖矿地址即对应矿池的矿池地址****，**可前往**匿名登录/挖矿页面**下方查看最新地址，需注意的是可能因为杀毒软件/防火墙等原因会导致地址无法显示，关闭杀毒软件/防火墙即可，可乐矿池目前挖矿地址如下：

**BTC**

**通用挖矿地址**

* **URL1：stratum+tcp://btc.kelepool.com:80**
* **URL2：stratum+tcp://btc.kelepool.com:443**

**ETH**&#x20;

**通用挖矿地址：**

* **URL1：stratum+tcp://eth.kelepool.com:80**
* **URL2：stratum+tcp://eth.kelepool.com:1080**

**加密挖矿地址：**

* **URL1：stratum+ssl://eth.kelepool.com:443**
* **URL2：stratum+ssl://eth.kelepool.com:543**

#### **2. 填写矿工名**

&#x20;矿工名填写模式为：**矿池匿名登录时填写的链上地址.编号**，编号是区分矿机的编号，可按照自己需要自由编写，如有多台矿机，可以链上地址XXX为开头按XXX.01，XXX.02这个规律给机器编号方便管理。

#### 3. 注意事项

* 因为矿池的挖矿地址可能出现问题，一般一个矿池会提供多个挖矿地址做备用；
* 同一台矿机在填写了同一个矿池的多个挖矿地址时，使用同一个矿工名（也就是同一个链上地址.编号组合）；
* 同一台矿机若设置了不同矿池的挖矿地址，则矿工名要填写对应矿池用来登录的链上地址；
* 若有多台矿机在设置矿工名时应在编号部分进行区分，如填写成同样的矿工名则只能在矿池里看到一台，但真实算力不受影响，仍旧是多台矿机的叠加；
* **挖矿地址和矿工名的填写非常重要**，如填错了则可能导致收益受损，若不确定请联系客服；
* 请注意有些矿机不支持矿工名填写链上地址，则匿名挖矿无法使用，可能导致矿机工作异常，需要用户通过邮箱等途径注册登录进行挖矿，可以参[BTC挖矿教程](Mining/BTC.md)&[ETC挖矿教程](Mining/ETC.md)

![匿名地址与编号组合（以.隔开）则为矿工名](<../.gitbook/assets/image(62).png>)

#### 4. 填写收款地址

即为第一步准备工作中用来匿名登录的链上地址。&#x20;

#### 5. 验证连接成功

矿机连接上矿池后，等待几分钟登录可乐矿池页面查看，若算力数据已经更新则为成功。

### **c.GPU（NVIDIA或AMD）显卡矿机**的设置

具体可参考[ETC挖矿教程](Mining/ETC.md)中显卡矿机的设置。

匿名链上地址挖矿与注册账户挖矿的区别在于，**“username”**（即矿工名）不再使用矿池注册的子账户/用户名，而使用匿名挖矿登录时所填的链上地址。
