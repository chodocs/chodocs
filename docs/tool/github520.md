# 如何正常访问 GitHub？

本文教你如何优雅地访问 GitHub，不需要任何费用，钱老板也可以给作者提供一定的赞助，参考地址如下：

> https://github.com/521xueweihan/GitHub520

不过个人在使用过程中还是会出现卡的情况，不是特别稳定，只做备用方案。

## 安装工具

我们需要安装一个名为 `SwitchHosts` 的工具，可以直接从 GitHub 的 release 地址下载：

[SwitchHost Releases](https://github.com/oldj/SwitchHosts/releases)

大家可以根据自己电脑的机型来选择安装即可。

<CloudinaryImg publicId='tool/switchhost-download_ilseh0' alt='switchhost-download'/>


在这里贴两个地址吧：

```bash
https://github.com/oldj/SwitchHosts/releases/download/v4.1.2/SwitchHosts_windows_installer_x64_4.1.2.6086.exe
https://github.com/oldj/SwitchHosts/releases/download/v4.1.2/SwitchHosts_mac_arm64_4.1.2.6086.dmg
```

> 最好是以上述 releases 页面最新版本为主。

## 配置

当我们安装好了工具之后，打开，左上角会有一个加号，我们填写如下信息：

```bash
Hosts 类型：远程
Hosts 标题：（自定义，比如 hellogithub）
URL: https://raw.hellogithub.com/hosts
自动刷新: 最好选 1 hour
```

<CloudinaryImg publicId='tool/switchhost-config_qjhkuk' alt='switchhost-config'/>

至此，我们就可以正常访问 GitHub 了，开启你的开源之旅吧。