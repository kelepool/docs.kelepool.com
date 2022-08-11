# 一文读懂STC-BOX挖矿教程

## 一、STC、可乐介绍 <a href="#r3dn0" id="r3dn0"></a>

#### 1.1 Starcoin(STC) <a href="#pmgbx" id="pmgbx"></a>

Starcoin 是一个去中心化分层智能合约网络，它旨在提供一种安全的数字资产及去中心化金融运行平台，让区块链能够更低门槛应用在更多领域。

* 算法: CryptoNight-R
* 供应总量: 3,185,136,000
* 当前流通量: 175,025,861
* Starcoin官网: [https://starcoin.org/](https://starcoin.org)
* 区块浏览器: [https://stcscan.io/](https://stcscan.io)

#### 1.2 KelePool <a href="#vecbb" id="vecbb"></a>

KelePool 内置于币信钱包，是最早支持挖掘 Starcoin(STC) 的平台，每天 9:30 自动打款至币信钱包，转账手续费低至 0.01STC。

同时，可乐拒绝率低，收益高，在社区内有良好的口碑。

#### 1.3 STC-BOX <a href="#vivx1" id="vivx1"></a>

Hashrate:13.9Kh/s

功率：61W

购买地址：

* Cyber Rare：[https://www.cyberrare.io/](https://www.cyberrare.io)
* 大象商城：[https://global.dxpool.io/product/st-box/](https://global.dxpool.io/product/st-box/)

## 二、矿池设置步骤 <a href="#nlrbm" id="nlrbm"></a>

#### 2.1 安装币信钱包并注册 <a href="#wkba4" id="wkba4"></a>

下载地址：[https://www.bixin.im](https://www.bixin.im) (需要梯子访问)

![](<../../.gitbook/assets/image (184).png>)

#### 2.2 进入 KelePool <a href="#ycq0o" id="ycq0o"></a>

![](<../../.gitbook/assets/image (164).png>)

#### 2.3 创建子账户 <a href="#khq5m" id="khq5m"></a>

![](<../../.gitbook/assets/image (158).png>)

#### 2.4 设置收款地址 <a href="#rrftn" id="rrftn"></a>

收款地址默认是币信钱包地址，不支持修改，收益会自动转到币信钱包。

## 三、STC-BOX 设置步骤 <a href="#m5856" id="m5856"></a>

#### 3.1 Box 接电 <a href="#iqdmx" id="iqdmx"></a>

准备显卡电源，需要至少一条 6P 接口。

温馨提示：

如果您使用的一拖一或没有开关的电源，需要使用电源线短接 24P 的接口，这样电源才能开始工作，如下图所示。

如果 STC-BOX 插上电源后电源不工作，可尝试重新短接。

![](<../../.gitbook/assets/image (106).png>)

接电后，正常状态：红绿灯闪烁后，绿灯常亮（若绿灯常亮后，红灯亮起，可先不管，继续走流程）。

![](<../../.gitbook/assets/image (181).png>)

#### 3.2 接入网线 <a href="#fke7g" id="fke7g"></a>

![](<../../.gitbook/assets/image (194).png>)

#### 3.3 配置矿池 <a href="#fc5jh" id="fc5jh"></a>

**1）进入控制台**

浏览器地址栏输入：[https://find.goldshell.com](https://find.goldshell.com)

温馨提示：

* 推荐使用 Google Chrome 或 Microsoft Edge 浏览器；
* 矿机必须与您的浏览器处于同一局域网；
* 页面右上角可切换语言；

![](<../../.gitbook/assets/image (101).png>)

**2）解锁控制台**

初始密码：123456789

![](<../../.gitbook/assets/image (127).png>)

![](<../../.gitbook/assets/image (147).png>)

**3）添加矿池**

URL（支持 TLS/SSL）：

* 地址1：ssl.cn.stc.kelepool.com:1111
* 地址2：ssl.cn.stc.kelepool.com:3333
* 地址3：ssl.cn.stc.kelepool.com:8888

\


非 TLS 地址（不推荐使用，仅用于 S1 Mini）：cn.stc.kelepool.com:5555

用户名：您的子账户名

密码：输入123

![](<../../.gitbook/assets/image (103).png>)

**4）检查矿池配置**

配置正确的地址后，图标是绿色的。

你也可以在下方添加更多的备用地址。

![](<../../.gitbook/assets/image (150).png>)

#### 3.4 查看算力 <a href="#gy2nq" id="gy2nq"></a>

![](<../../.gitbook/assets/image (185).png>)

## 四、转账及更多设置 <a href="#yevcw" id="yevcw"></a>

#### 4.1 查看收益 <a href="#ocpcv" id="ocpcv"></a>

可以查看当天预估收益和昨日收益。

![](<../../.gitbook/assets/image (162).png>)

#### 4.2 设置算力报警 <a href="#i0gdd" id="i0gdd"></a>

建议设置“算力报警”，STC-BOX 离线时可以获得及时提醒。

![](<../../.gitbook/assets/image (135).png>)

#### 4.3 提现或转账 <a href="#r1xao" id="r1xao"></a>

币信钱包支持 address（以 0x 开头）和 收款地址（以 stc 开头）。

![](<../../.gitbook/assets/image (175).png>)

## 五、严选交易 <a href="#qbtql" id="qbtql"></a>

您可以在币信钱包中购买或卖出 STC。

除了 STC，严选交易也支持主流币种的交易。

![](<../../.gitbook/assets/image (153).png>)

## 六、常见问题 <a href="#fkdlq" id="fkdlq"></a>

#### 6.1 矿机固件升级 <a href="#jwtw5" id="jwtw5"></a>

当前最新固件版本（2021年11月20日更新）：2.1.6

**1）检查STC-BOX固件版本**

进入矿机页面，右侧展示了当前固件版本“2.1.4”，是可以升级的。

![](<../../.gitbook/assets/image (105).png>)

**2）下载最新的固件**

固件地址: [https://pan.baidu.com/s/17uLTsxLAjF5N6TYh3yRsYQ](https://pan.baidu.com/s/17uLTsxLAjF5N6TYh3yRsYQ) 提取码: 9r1i

或：[https://github.com/goldshellminer/firmware](https://github.com/goldshellminer/firmware)

或（社区提供）：[https://wwa.lanzoui.com/b0f8vlkij](https://wwa.lanzoui.com/b0f8vlkij) 密码：star

请不要使用非正常途径获取的固件，以免产生问题。

![](<../../.gitbook/assets/image (179).png>)

**3）控制台更新固件**

![](<../../.gitbook/assets/image (134).png>)

#### 6.2 矿机恢复出厂设置(不推荐) <a href="#oduji" id="oduji"></a>

本文作者做了多次重置，发现重置会引发其他问题。

**1）方式一：物理重置**

适用于场景：

1. 1.无法在 find.goldshell.com 找到矿机；
2. 2.矿机设置错误，如关闭 DHCP，导致无法找到矿机；

用 卡针 长按 reset 键 10s 左右，如下图所示：

![](<../../.gitbook/assets/image (139).png>)

**2）方式二：控制台重置**

![](<../../.gitbook/assets/image (100).png>)
