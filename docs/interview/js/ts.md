---
author: "HearLing"
---

# TypeScript 基础面试题

本文总结 TS 常见的面试题（不敢保证一定会考）,后续我们会出一个 TS 的学习专栏在网站，在本文中有所不懂的，应该都能在其专栏找到答案。

答案依旧是**仅供参考**，并且有售后，那话不多说开始吧。

## 什么使用 TypeScript(对比 JavaScript)？

增加静态类型，在编写代码是检查错误，提高代码质量。

优势：

- 杜绝手误导致的变量名写错
- 类型可以一定程度充当文档
- IDE 自动填充，自动联想

## 枚举和常量枚举（const 枚举）的区别

枚举在编译时，会被当做对象使用，const 枚举会在 ts 编译时被删除，避免额外性能开销。

普通枚举：

```typescript
// 普通枚举
enum Witcher {
  Ciri = "Queen",
  Geralt = "Geralt of Rivia",
}
function getGeraltMessage(arg: { [key: string]: string }): string {
  return arg.Geralt;
}
getGeraltMessage(Witcher); // Geralt of Rivia
```

const 枚举：

```typescript
// const枚举
const enum Witcher {
  Ciri = "Queen",
  Geralt = "Geralt of Rivia",
}
const witchers: Witcher[] = [Witcher.Ciri, Witcher.Geralt];
// 编译后
// const witchers = ['Queen', 'Geralt of Rivia']
```

## TS 声明文件

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface 和 type` 声明全局类型
- `export` 导出变量
- `export namespace` 导出（含有子属性的）对象
- `export default` ES6 默认导出
- `export = commonjs` 导出模块
- `export as namespace` UMD 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块

## TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？

- **any**: 编程阶段还不清楚类型的变量指定的类型，不希望检查器对这些值进行检查，直接通过编译，失去了类型检查的作用。
- **never**: 永不存在的值的类型。例如总是会抛出异常或根本没有返回值的函数的返回值类型。
- **unknown**: 任何类型的值都可以赋给  unknown  类型，但是  unknown  类型的值只能赋给  unknown  本身和  any  类型。
- **null & undefined**: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把  null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- **void**: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为 void。

## interface 如何给 Function / Array / Class 做声明

```typescript
/* 可以 */
// 函数声明
interface Say {
  (name: string): viod;
}
const say: Say = (name: string): viod => {};
// Array 声明
interface NumberArray {
  [index: number]: number;
}
const fibonacci: NumberArray = [1, 1, 2, 3, 5];
// Class 声明
interface PersonalIntl {
  name: string;
  sayHi(name: string): string;
}
```

## type 和 interface 的区别?

使用 interface 描述`数据结构`，使用 type 描述`类型关系`

相同点：

1. 都可以描述 '对象' 或者 '函数'
2. 都允许拓展(extends)

不同点：

1. type 可以声明基本类型，联合类型，元组
2. type 可以使用 typeof 获取实例的类型进行赋值
3. 多个相同的 interface 声明可以自动合并
4. type 重名时编译器会抛出错误，接口重名时会产生合并
5. type 无法被实现（implements），而接口可以被派生类实现

## implements 与 extends 的区别

- extends, 子类会继承父类的所有属性和方法。
- implements，使用 implements 关键字的类将需要实现需要实现的类的所有属性和方法。

## 协变、逆变的理解？

**协变**：x = y 不报错，x 类型兼容 y 的类型

```typescript
interface X {
  name: string;
  age: number;
}
interface Y {
  name: string;
  age: number;
  hobbies: string[];
}
let x: X = { name: "xiaoming", age: 16 };
const y: Y = { name: "xiaohong", age: 18, hobbies: ["eat"] };
x = y;
```

**逆变**:printY = printX 函数 X 类型可以赋值给函数 Y 类型

```typescript
let printY: (y: Y) => void;
printY = (y) => {
  console.log(y.hobbies);
};
const printX: (x: X) => void;
printX = (x) => {
  console.log(x.name);
};
printY = printX;
```

## 对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？

- **public**: 成员都默认为 public，被此限定符修饰的成员是可以被外部访问；
- **private**: 被此限定符修饰的成员是只可以被类的内部访问；
- **protected**: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;
- **readonly**: 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

## 简述工具类型 Exclude、Omit、Merge、Intersection、Overwrite 的作用

- `Exclude<T, U>` 从  T  中排除出可分配给  U 的元素。
- `Omit<T, K>` 的作用是忽略 T 中的某些属性。
- `Merge<O1, O2>` 是将两个对象的属性合并。
- `Compute<A & B>` 是将交叉类型合并。
- `Intersection<T, U>` 的作用是取 T 的属性,此属性同样也存在与 U。
- `Overwrite<T, U>` 是用 U 的属性覆盖 T 的相同属性。

## 什么是泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  const result: T[] = [];
  for (let i = 0; i < length; i++) result[i] = value;

  return result;
}

createArray<string>(3, "x"); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 `Array<T>` 中即可使用了。
