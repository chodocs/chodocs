# 环境配置

```sh
# 环境配置
npm i ts-node typescript ts-node-dev -g
# 添加 tsconfig.json
npx --package typescript tsc --init
```

执行单个文件：

```sh
ts-node index.ts
```
监听文件变更：
```sh
ts-node-dev --respawn --transpile-only index.ts
```
