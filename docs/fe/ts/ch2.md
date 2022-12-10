# 工具类

## expectType

```typescript
npm install --save-dev tsd
```

```typescript
import { expectType } from 'tsd';

expectType<string>("Chocolate"); // √
expectType<string>(1999); // ×
```

## 工具类型

```typescript
// 工具类型
type MaybeNull<T> = T | null;

function process13(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

type MaybeArray<T> = T | T[];

function ensureArray13<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}
```

## 映射类型

```typescript
// 映射类型
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于
interface StringifiedFooAns {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
// 等价于
type StringifiedFooAns2 = {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
```

> 高级操作：克隆类型

```typescript
type Clone<T> = {
  [K in keyof T]: T[K];
};
```

## IsAny 与 IsUnknown

```typescript
// IsAny 与 IsUnknown
type IsAny<T> = 0 extends 1 & T ? true : false;

type IsUnknown<T> = unknown extends T
    ? IsAny<T> extends true
    ? false
    : true
    : false;
```

## 属性修饰工具类型

```typescript
// 属性修饰工具类型

type Partial<T> = {
    [P in keyof T]?: T[P]; // 标记属性可选
};

type Partial_2<T> = {
    [P in keyof T]+?: T[P]; // 和上述相等，更好理解，表示在原本的属性上添加可选
};

type Required<T> = {
    [P in keyof T]-?: T[P]; // -? 表示原本属性上如果有 ? 这个标记，则移除它
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

## 结构工具类型
### Record

```typescript
// 内置类型 Record
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 键名均为字符串，键值类型未知
type Record_1 = Record<string, unknown>;
// 键名均为字符串，键值类型任意
type Record_2 = Record<string, any>;

// 其中，Record<string, unknown> 和 Record<string, any> 是日常使用较多的形式，通常我们使用这两者来代替 object 。

// 键名为字符串或数字，键值类型任意
type Record_3 = Record<string | number, any>;
```

```typescript
// 例子：用于字典
type Dictionary<T> = {
    [index: string]: T;
};

type NumericDictionary<T> = {
    [index: number]: T;
};
```

### Pick

```typescript
// 结构处理工具类型 Pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
// 例子：
interface Foo {
    name: string;
    age: number;
    isVip: boolean;
}

type PickedFoo = Pick<Foo, "name" | "age">
```

### Omit

```typescript
// Omit 是基于 Pick 实现的，反向工具类型基于正向工具类型实现
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

`Exclude<A, B>` 的结果就是联合类型 A 中不存在于 B 中的部分，举例：

```typescript
type Tmp1 = Exclude<1, 2>; // 1
type Tmp2 = Exclude<1 | 2, 2>; // 1
type Tmp3 = Exclude<1 | 2 | 3, 2 | 3>; // 1
type Tmp4 = Exclude<1 | 2 | 3, 2 | 4>; // 1 | 3
```

那么 `Exclude<keyof T, K>` 其实就是 T 的键名联合类型中剔除了 K 的部分


## 集合工具类型

```typescript
// 交集
type Extract<T, U> = T extends U ? T : never;

// 差集
type Exclude<T, U> = T extends U ? never : T;
```


```typescript
// 集合工具类型汇总
// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;
```

```typescript
// 例子 集合 T 相对于 null | undefined 的差集

type NonNullable<T> = T extends null | undefined ? never : T;

type _NonNullable<T> = Difference<T, null | undefined>
```

## 模式匹配工具类型

> 主要使用条件类型与 infer 关键字。

### 对函数类型签名的模式匹配

```typescript
type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any;
```

更进一步，比如只匹配第一个参数类型：

```typescript
type Firstparameter<T extends FunctionType> = T extends (arg: infer P, ...args: any) => any ? P : never;

type FuncFoo = (args: number) => void;

type FooFirstParameter = Firstparameter<FuncFoo>; // number

type FuncBar = (...args: string[]) => void;

type BarFirstParameter = Firstparameter<FuncBar>; // string
```

### 对 Class 进行模式匹配

```typescript
type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (...args: infer P) => any ? P : never;

type InstanceType<T extends ClassType> = T extends abstract new (...args: any) => infer R ? R : never;
```

Class 的通用类型签名，实际上就是声明了可实例化（new）与可抽象（abstract）

```typescript
export interface ClassType<TInstanceType = any> {
    new (...args: any[]): TInstanceType;
}
```

### 拓展
提取数组第一个成员的工具类型

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer R, ...any[]] ? R : never;

// 加上字符串条件类型
type FirstArrayItemType2<T extends any[]> = T extends [infer R, ...any[]] ? R extends string ? R : never : never;

type Tmp1 = FirstArrayItemType2<[100, 'Chocolate']>; // never
type Tmp2 = FirstArrayItemType2<['Chocolate', 100]>; // 'Chocolate'
```

```typescript
// ts 4,7 支持 infer 约束功能，能对特定类型进行提取
type FirstArrayItemType3<T extends any[]> = T extends [infer R extends string, ...any[]] ? R : never;
```
