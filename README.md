# 快速搭建个人 CLI

## 快速使用

---

```terminal
git clone https://github.com/RayHooray/private-cli
```

```terminal
cd private-cli
```

```terminal
npm i || yarn
```

```terminal
npm link

no-name
```

## 关于执行命令的更改

---
在 package.json 文件中，修改 bin 属性的属性值 “no-name”，变成自己想要修改的成的 cli 名称。

## 关于代码功能模块

---
代码执行入口在 bin 目录下的 index.js

lib 目录存放的是一些执行过程的方法，init.js 为执行文件的主逻辑，详细流程看注释
