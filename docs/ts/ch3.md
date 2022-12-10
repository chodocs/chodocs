# 类型系统

## 函数类型

如何对两个函数类型进行兼容性比较？

即比较它们的参数类型是否是反向的父子类型关系，返回值是否是正向的父子类型关系。

> 也就是判断参数类型是否遵循类型逆变，返回值类型是否遵循类型协变。

我们可以通过 TypeScript ESLint 的规则以及 `strictFunctionTypes` 配置，来为 interface 内的函数声明启用严格的检查模式。


如果项目内配置了 TypeScript ESLint，可以加上 [method-signature-style](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/method-signature-style.md) 这条规则提升代码质量。