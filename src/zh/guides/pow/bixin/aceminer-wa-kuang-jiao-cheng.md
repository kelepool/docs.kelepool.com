# AceMiner挖矿教程
> 这是 AceOS 和 AceMiner 的使⽤⼿册，单机版挖矿软件主要用于个人用户在单机、个人电脑上挖矿，支持自动超频、定时挖矿、锁屏挖矿等功能。同时还提供了按分钟、小时、天的算力统计曲线数据，让用户随时了解矿机状态。

## AceOS

AceOS 是针对 AceMiner 的定制系统，基于 Ubuntu LTS 20.04，集成 Amd 和 Nvidia 显卡驱动。

### 下载

AceOS 以磁盘镜像格式发布，安装时使⽤镜像烧录工具将下载的镜像烧录到 U 盘或者移动硬盘， 然后将 U 盘插⼊机器，启动即可。

[下载最新版本的AceOS](https://kldl.oss-accelerate.aliyuncs.com/aceos/dl/aceos-20220520192504.img.xz)

[下载镜像烧录软件Rufus](https://kldl.oss-accelerate.aliyuncs.com/aceos/dl/rufus-3.18p.exe)

### 制作U盘镜像

[下载镜像文件](https://kldl.oss-accelerate.aliyuncs.com/aceos/dl/aceos-20220520192504.img.xz)并解压

![](<../../.gitbook/assets/aceminer/aceos-decompress.png>)

### 使用Rufus

[下载Rufus](https://kldl.oss-accelerate.aliyuncs.com/aceos/dl/rufus-3.18p.exe)，然后双击启动，不需要安装。如果系统开启了【用户账户控制】，启动时会弹出提示框确认是否允许rufus控制系统，选择【是】。
![](<../../.gitbook/assets/aceminer/rufus.png>)

如图配置 rufus，操作如下:
1. 选择要写⼊的U盘或者移动硬盘
2. 选择解压出的系统镜像
3. 点击【开始】按钮，开始写⼊操作

![](<../../.gitbook/assets/aceminer/rufus-config.png>)

开始写⼊时会弹出警告提⽰，写⼊镜像会清空 U 盘或者移动硬盘中的内容，请注意备份 U 盘或移 动硬盘中原有⽂件。

![](<../../.gitbook/assets/aceminer/rufus-warning.png>)

开始写⼊操作后，可以通过进度条查看写⼊进度。

![](<../../.gitbook/assets/aceminer/rufus-finish.png>)

写⼊完成后，rufus 会提⽰准备就绪，此时可以关闭 rufus，并且弹出 U 盘，然后将 U 盘插⼊需要 启动的机器上，从 U 盘启动系统。

### 启动AceOS

镜像成功写⼊U盘后，就可以将 U 盘插⼊机器启动，启动时需要注意:
1. 需要设置系统 BIOS 从 UEFI 启动
2. 需要设置系统的启动顺序，优先从写⼊镜像的 U盘启动

## AceMiner

AceMiner 是集成化的矿机管理工具，内置 Ethminer、NBMiner， Phoenix Miner 等挖矿软件， ⽀持单机挖矿，并且⽀持群控。

### 下载

AceMiner 分为两个版本，单机版和群控版。矿机需要安装单机版，如果矿机数量少，可以直接使 ⽤单机版的配置功能管理和控制矿机，如果矿机数量多，可以在控制电脑上安装群控版，批量配置 和管理矿机。

[Linux单机版](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-amd64-linux-standard.deb)

[Linux群控版](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-amd64-linux-cluster.deb)

[Windows群控版](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-win32-cluster.exe)

[MacOS群控版-Inter](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-osx-cluster-x64.dmg)

[MacOS群控版-M1](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-osx-cluster-arm64.dmg)

### 单机版

AceMiner 单机版可以单独安装在矿机上，针对单台矿机设置、挖矿，同时也是群控版的客⼾端， 可以通过群控版在局域⽹中被群控。

#### 安装

安装前需要注意以下内容: 
- 如果使⽤ AceOS， AceOS 已经内置 AceMiner，不需要再安装。
- AceMiner 单机版⽬前仅⽀持 Linux 系统 (Ubuntu 20.04)。 
- 如果⾮ AceOS 安装 AceMiner，请确保显卡驱动已经安装，并且显卡可⽤，并且确保 nvidia-smi (N卡) 和 rocm-smi (A卡) 可⽤。

### Linux系统
``` 
# 下载deb包
wget https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-latest-amd64-linux-standard.deb

# 或使用curl下载
# curl -L https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-latestamd64-linux-standard.deb 
# -O ./AceMiner-latest-amd64-linux-standard.deb

# 安装下载的deb包
sudo apt install ./AceMiner-latest-amd64-linux-standard.deb
```

### 打开AceMiner

进⼊ AceMiner 单机版的控制⻚⾯有两种⽅式： 
单独安装 AceMiner，：可以在系统菜单中看到 AceMiner，可以直接打开 AceMiner。
使⽤ AceOS：可以在系统桌⾯空⽩处右键打开菜单，可以在菜单中看到 AceMiner ⼊⼝，点击即可 打开

![](<../../.gitbook/assets/aceminer/aceminer-start.png>)

如果不⽅便直接操作矿机，可以通过与矿机同⼀局域⽹的其他电脑的浏览器，使⽤地址 `http://<矿机 ip>:9123 `打开浏览器，⽐如矿机 ip 地址是 192.168.0.2 ， 可以使⽤地址`http://192.168.0.2：9123`

### 配置矿梯(***不使用矿梯可忽略此步骤***)
[参考矿梯使用教程](../ladder.md)

***注意：此处需要确保矿梯配置的币种与挖矿软件配置的币种保持一致，否则无法连通***

配置矿梯后，准备好 

**①矿梯本地IP+端口号**

**②挖矿子账户**


#### 一、挖矿功能

直接打开 AceMiner 和使⽤浏览器控制 AceMiner 的操作⽅式相同。
⾸先，需要在设置⻚⾯配置挖矿相关的参数
- 【挖矿核⼼】AceMiner ⽀持不同的挖矿软件，针对当前币种，可以选择想要使⽤的挖矿软件 
- 【矿池地址】填⼊想要使⽤的矿池对应币种的挖矿地址 
- 【挖矿账号】填⼊所在矿池的挖矿账号，对于⽀持匿名挖矿的矿池，可以填⼊钱包地址 
- 【矿机编号】矿机编号，默认为 IP 地址，可以修改 
- 【过滤开发费】开启此选项后，会⾃禁⽌挖矿软件与矿池连接之外的所有⽹络连接 
- 【开启超频】使⽤显卡超频，需要提前设置超频模板

![](<../../.gitbook/assets/aceminer/aceminer-set.png>)

#### 二、系统设置
分时模式启用后，您可控制AceMiner在指定的时间段进行挖矿，便于灵活控制挖矿周期。

![](<../../.gitbook/assets/aceminer/aceminer-set1.png>)

#### 三、设置超频模版
可自定义超频模版，用于矿机超频。开启超频后，挖矿效率会有一些提高，但同时可能影响显卡寿命，请谨慎操作。

![](<../../.gitbook/assets/aceminer/aceminer-3.png>)

#### 四、算力统计
- 开始挖矿后系统按15分钟、天统自动统计力曲线，便于用户追踪矿机算力状态。
- 点击分钟、小时、天选项卡可以刷新最新的矿机算力状态。
![](<../../.gitbook/assets/aceminer/aceminer-4.png>)

#### 五、自动更新

启用自动更新后，系统将每隔一段时间自动检查版本，若发现新版本将会自动更新。

![](<../../.gitbook/assets/aceminer/aceminer-5.png>)

## 群控版

如果矿机数量多，可以安装群控版批量控制。需要注意的是，被控矿机需要安装单机版，同时群控
只能控制同⼀局域⽹的矿机，不⽀持通过互联⽹远程控制。

## 安装

群控版不需要安装在矿机上，矿机需要安装单机版。群控版⽀持 Windows、Linux、Mac OS。

### Linux系统

```
wget https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-latest-amd64-
linux-cluster.deb
sudo apt install ./AceMiner-latest-amd64-linux-cluster.deb 
```

### Windows系统

下载[Windows群控版](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-win32-cluster.exe)，双击运行安装。


### MacOS系统
下载[MacOS群控版-Inter](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-osx-cluster-x64.dmg)，双击运行安装。

下载[MacOS群控版-M1](https://kldl.oss-accelerate.aliyuncs.com/aceminer/dl/AceMiner-2.1.0-osx-cluster-arm64.dmg)，双击运行安装。

## 使用
AceMiner 群控版安装后会在系统菜单出现，可以通过系统菜单打开，同单机版，Linux 版本的群
控版也⽀持浏览器通过` http://<ip>:9123 打开 `。群控版打开后如下图所⽰：

![](<../../.gitbook/assets/aceminer/acemaster-1.png>)

### 一、添加矿机

①使⽤群控版，需要⾸先添加矿机分组。每个分组⽀持多个 ip 地址段。
![](<../../.gitbook/assets/aceminer/acemaster-2.png>)

②添加矿机分组后，选择新添加的分组，点击【扫描机器】就会⾃动扫描分组中 ip 地址段已经安装
单机版的矿机（未安装单机版的矿机不会被扫描到）。

![](<../../.gitbook/assets/aceminer/acemaster-3.png>)

③矿机扫描成功后，可以多选矿机列表中的机器，然后批量配置挖矿参数。
![](<../../.gitbook/assets/aceminer/acemaster-4.png>)

④挖矿参数配置同单机版挖矿参数⼀致。

![](<../../.gitbook/assets/aceminer/acemaster-5.png>)

⑤除批量设置矿机挖矿参数，群控版还⽀持如下批量操作:
- 【启动挖矿软件】批量启动矿机挖矿软件
- 【停⽌挖矿软件】批量停⽌矿机挖矿软件
- 【重启挖矿软件】批量重启矿机挖矿软件
- 【升级矿机】批量升级矿机
- 【重启矿机】批量重启矿机
- 【关闭矿机】批量关闭矿机
- 【升级AMD显卡驱动】批量升级AMD显卡驱动
- 【升级NVIDIA显卡驱动】批量升级NVIDIA显卡驱动
![](<../../.gitbook/assets/aceminer/acemaster-6.png>)

⑥矿机列表中，可以针对每台矿机查看矿机算⼒统计。（同单机版，此算⼒时挖软件显⽰的算⼒，⾮矿池实际算⼒）
![](<../../.gitbook/assets/aceminer/acemaster-7.png>)

⑦除批量控制矿机外，在矿机列表也可以直接控制单台矿机。
![](<../../.gitbook/assets/aceminer/acemaster-8.png>)


### 二、超频
对于显卡挖矿，⽐如 ETH， AceMiner ⽀持设置超频（最好搭配 AceOS 使⽤）。

点击 AceMiner 菜单的【超频模板】菜单，可以进⼊超频模板控制⻚⾯。点击【创建模板】可以添加超频模板。超频模板分 AMD 显卡和 Nvidia 显卡两种类型，两种显卡超频参数不同，需要根据
⾃⼰实际显卡类型配置。

![](<../../.gitbook/assets/aceminer/overclock-amd.png>)

如图为 Nvidia 显卡参数:
![](<../../.gitbook/assets/aceminer/overclock-nvidia.png>)

创建好的模板会在模板列表如图显⽰。
![](<../../.gitbook/assets/aceminer/overclock-list.png>)

超频模板创建好后，可以在群控版批量给矿机设置超频模板（配置矿机时需要开启超频）。也可以
在单机版的配置⻚⾯点击【开启超频】，然后选择创建的超频模板。
- 超频模板本地存储，不通过互联⽹同步。
- 选择超频模板时需要注意显卡的型号，显卡型号不同，超频参数也不同。

![](<../../.gitbook/assets/aceminer/overclock-set.png>)

