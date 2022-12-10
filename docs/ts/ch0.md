# 环境配置

```shell
# 环境配置
npm i ts-node typescript ts-node-dev -g
# 添加 tsconfig.json
npx --package typescript tsc --init
```

执行单个文件：

```shell
ts-node index.ts
```
监听文件变更：
```shell
ts-node-dev --respawn --transpile-only index.ts
```
