# STC-BOX 卡刷流程

注：本教程基于金贝客服给出的文档，使用其提供的软件及镜像，特此感谢。

## 一、卡刷能解决的问题 <a href="#woegp" id="woegp"></a>

1. https://find.goldshell.com 中无法找到 BOX IP；
2. BOX 指示灯异常：红蓝灯常亮、红蓝灯常灭，但算力正常；
3. 开机后一段时间，算力板异常，反复重启后一段时间仍出现；
4. 开机正常工作后，算力缓慢下降；
5. 各种因重置或其他原因导致的问题；

## 二、烧录卡制作 <a href="#nykmo" id="nykmo"></a>

### 2.1 下载刻录软件和 STC-BOX 镜像 <a href="#hpadv" id="hpadv"></a>

下载地址：[https://wwa.lanzoui.com/b0f8vlkij](https://wwa.lanzoui.com/b0f8vlkij) 密码: star

![](<../../.gitbook/assets/image(128).png>)

### 2.2 安装刻录软件 <a href="#u8h8a" id="u8h8a"></a>

刻录软件：IBSMK Setup 1.8.5

解压 IBSMK Setup 1.8.5.rar，并安装软件，打开如下：

![](<../../.gitbook/assets/image(167).png>)

### 2.3 准备读卡器和 SD 卡 <a href="#zafx4" id="zafx4"></a>

准备一个无数据的 SD 卡，大小建议 4GB 及以上；

再准备一个支持 SD 卡的读卡器。

![](<../../.gitbook/assets/image(154).png>)

### 2.4 镜像刻录 SD 卡 <a href="#yazuo" id="yazuo"></a>

注：刻录前需拔掉电脑上所有外接的 U盘、硬盘 等存储设备，防止刻错。

按下面截图中的操作，待刻录完成后，可以取出 SD 卡。

![](<../../.gitbook/assets/image(191).png>)

## 三、设备烧录 <a href="#gxgvh" id="gxgvh"></a>

### 3.1 设备先断电，然后插入 SD 卡 <a href="#ouwae" id="ouwae"></a>

SD 卡要确保插入，可按压尝试。

![](<../../.gitbook/assets/image(116).png>)

### 3.2 通电、烧录 <a href="#ubkt7" id="ubkt7"></a>

烧录过程预计需要 30 秒，建议等一分钟，因为有些设备卡刷前指示灯就异常。

烧录完成后，应该是蓝色灯常亮（此时 SD 卡未弹出）：

![](<../../.gitbook/assets/image(108).png>)

### 3.3 通电状态下按压弹出 SD 卡 <a href="#zjflq" id="zjflq"></a>

按压弹出 SD 卡，过一会儿登录 [https://find.goldshell.com](https://find.goldshell.com/) 后台，即可看到设备正常在线。

注：卡刷后，需要重新配置设备，可参考以下[教程](stcbox1.md)
