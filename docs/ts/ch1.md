# 基础操作

## null 与 undefined
在 JavaScript 中：

- null：这里有值，但是个空值
-  undefined：这里没有值

在 TypeScript 中：

- null 与 undefined 类型都是有具体意义的类型

> 在没有开启 `strictNullChecks` 检查的情况下，会被视作其他类型的子类型。

```typescript
const ans1: string = null; // 仅在关闭 strictNullChecks 时成立，下同
const ans2: string = undefined;
```

## void 类型
在 TypeScript 中，`undefined` 类型是一个实际的、有意义的类型值，而 `void` 代表空的、没有意义的类型值。

```typescript
// 没有 return 用 void
function foo(): void { }

// 有 return 但是没有返回值，用 undefined
function bar(): undefined {
    return;
}
```

## never 类型
never 类型**不包含任何**的类型，啥也没有，在联合类型中会被移除。

never 是整个类型系统层级中最底层的类型，即 `Bottom Type`。

```typescript
// never 类型使用
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
  console.log("bool!");
} else {
  // 未处理的新类型，都会走到 never 进行报错
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```


## any 与 unknown

any 与 unknown 的本质是类型系统中的顶级类型，即 `Top Type`。

unknown 类型**可以赋值为**任意其它类型，但它**只能赋值给** any 或者 unknown 类型。

```typescript
// any unknown
let anyVar: any = null;
anyVar.foo.bar.baz();

let unknownVar: unknown;
unknownVar.foo(); // 对象的类型为 "unknown"。ts(2571)
(unknownVar as { foo: () => {} }).foo(); // 当 unknown 类型，进行属性访问，需要类型断言
```

unknown 使用会比较麻烦，需要一堆的类型断言。

## unique symbol
在 TypeScript 中，使用 `unique symbol`（symbol 类型的子类型）确保独一无二。

```typescript
// unique symbol
const uniqueSymbolFoo: unique symbol = Symbol("Chocolate")

// 不能将类型“typeof uniqueSymbolFoo”分配给类型“typeof uniqueSymbolBar”。ts(2322)
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo 
```

```typescript
// 复用 unique symbol 类型
declare const uniqueSymbolA: unique symbol;

const uniqueSymbolB: typeof uniqueSymbolA = uniqueSymbolA
```

## 枚举

```typescript
// 枚举
enum IEnum {
    Home_Page_Url = 'https://yangchaoyi.vip/',
    Blog_Page_Url = 'https://blog.yangchaoyi.vip/',
    Num1 = 1999,
    Num2
}

const num = IEnum.Num2;
console.log(num); // 2000
console.log(IEnum[1999]) // Num1

// 常量枚举
const enum IEnum2 {
    Val1 = 99,
    Val2
}
const val1 = IEnum2.Val1;
console.log(val1); // 99
```

## 函数

```typescript
type Func = (name: string) => number

const foo: Func = (name) => {
    return name.length
}
```


## 可选与只读

```typescript
// 可选与只读属性
interface IProps {
  readonly name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj: IProps = {
  name: 'Chocolate',
  age: 18,
  male: true,
  // 无需实现 func 也是合法的
};

obj.name = 'HearLing'; // 无法分配到 "name" ，因为它是只读属性。ts(2540)
```

## 非空断言

```typescript
// 非空断言
declare const foo: {
  func?: () => ({
    prop?: number | null;
  })
};

foo.func!().prop!.toFixed();
// 等价于
((foo.func as () => ({
  prop?: number;
}))().prop as number).toFixed();
```

## object、Object 以及 { }

记住以下几点规则：

- **不使用** Object 以及类似的装箱类
> object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型。
- 当不确定某个变量的具体类型，但能够确定它不是原始类型，可以使用 object。可以进一步区分，例如用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any` 表示函数。
- `{}` 意味着任何非 `null / undefined` 的值，尽量避免使用。

## 字面量类型
字面量类型主要包括**字符串字面量类型、数字字面量类型、布尔字面量类型**和**对象字面量类型**。

```typescript
// 字面量类型
const str: "Chocolate" = "Chocolate";
const num: 1999 = 1999;
const bool: true = true;
```

> 字面量类型要求的是值级别的字面量一致，因此比原始值类型更精确。
> 对象字面量类型就是一个对象类型的值，对象的值都为字面量值，不常用。

通常与联合类型一起使用：

```typescript
// 字面量与联合类型
interface Iprops {
    bool: true | false;
    num: 1 | 2 | 3;
    str: "RNG" | "EDG" | "TES" | "JDG"
}
```


let 与 const 使用区别：

- let 只需推导对应的从属类型即可
- const 声明的原始类型变量将不再可变，因此类型会收窄到最精确的字面量类型（但对象类型变量仍可变）
```typescript
// let 与 const
let userName = 'Chocolate'; // let userName: string
const userAge = 20; // const userAge: 20
```

## 联合类型

```typescript
// 联合类型
interface Iprops {
    props: true | string | 1999 | {} | (() => {}) | (1 | 2 | 3)
}
```

> 联合类型中的函数要用 `()`包裹一下，因为函数并不存在字面量类型。

```typescript
// 多个对象类型的联合，实现手动的互斥属性
interface IUser {
    user:
    | {
        vip: true;
        expires: string;
    }
    | {
        vip: false;
        promotion: string;
    };
}

declare var userInfo: IUser;

if (userInfo.user.vip) {
    console.log(userInfo.user.expires);
}
```

## 索引类型

```typescript
// 索引类型
type AllStringTypes = {
  [key: string]: string;
}

const foo: AllStringTypes = {
  "aaa": "123",
  1999: "Chocolate",
  [Symbol("sss")]: 'symbol',
}

interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

// 索引类型查询
type Keys = keyof AllStringTypes; // string | number

// 索引类型访问
type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean
type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
```

## type 与 interface
推荐做法：

tinterface 用来描述对象、类的结构。

type 将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型。

> 不过大部分场景下接口结构都可以被类型别名所取代，简而言之，能用就行。

## 类型查询操作符 typeof

```typescript
// 类型查询操作符 typeof
const name = "Chocolate";

const obj = { name: "Chocolate" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
    return input.length > 10;
}

type Str = typeof str; // "Chocolate"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
```

## 类型守卫

```typescript
// 类型守卫
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);
```

## 类型断言守卫

```typescript
// 类型断言守卫
const name: any = 'Chocolate';

function assertIsNumber(val: any): asserts val is number {
    if (typeof val !== 'number') {
        throw new Error('not a number!');
    }
}

assertIsNumber(name);
// number 类型！
name.toFixed();
```

## infer 关键字

```typescript
// infer 关键字
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换 [2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
    infer Start,
    ...any[],
    infer End
]
    ? [Start, End]
    : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
    infer Start,
    ...infer Left,
    infer End
]
    ? [End, ...Left, Start]
    : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
    infer Start1,
    infer Start2,
    ...infer Left
]
    ? [Start2, Start1, ...Left]
    : T;
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
    ? R
    : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never

type ReverseKeyValueResult1 = ReverseKeyValue<{ "key": "value" }>; // { "value": "key" }
```


## 上下文类型

```typescript
// 上下文类型
type CustomHandler = (name: string, age: number) => boolean;

const handler: CustomHandler = (arg1, arg2) => true;
// 基于位置的类型推导
declare const struct: {
    handler: CustomHandler;
}

struct.handler = (name, age) => { }; //  不能将类型“void”分配给类型“boolean”。
```

## void 使用

```typescript
// 通过 void 执行立即执行函数
void function iife() {
  console.log("log!");
}();

// 等价于↓
void ((function iife() { })())
```

## 具名元组

```typescript
// 具名元组
const arr: [name: string, age?: number, male?: boolean] = ['Chocolate', 18, true];

type TupleLength = typeof arr.length; // 1 | 2 | 3
```