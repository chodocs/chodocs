# 泛型

## 泛型坑位

```typescript
// 泛型坑位
type Factory<T> = T | number | string;
type FactoryWithBool = Factory<boolean>;

const addBool: FactoryWithBool = true;
```

```typescript
// 许多内置对象预留泛型坑位
function p() {
    return new Promise<boolean>((resolve, reject) => {
        resolve(true);
    });
}
```

## 泛型默认值

```typescript
// 泛型默认值
type Factory<T = boolean> = T | number | string;

const foo: Factory = false;
```

## 泛型约束

```typescript
// 泛型约束
type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
    ? 'success'
    : 'failure';

type Res = ResStatus; // "success"
```

## 多泛型关联

```typescript
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
    Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'Chocolate', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'Chocolate', boolean, 'passed!', 'rejected!'>;
```

## 对象中的泛型

```typescript
// 对象中的泛型
interface IRes<TData = unknown> {
    code: number;
    error?: string;
    data: TData;
}

interface IUserProfileRes {
    name: string;
    homepage: string;
    avatar: string;
}

function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
    // fetch...
}

type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {
    // handle...
}

// 泛型嵌套使用场景 - 分页结构
interface IPaginationRes<TItem = unknown> {
    data: TItem[];
    page: number;
    totalCount: number;
    hasNextPage: boolean;
}

function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> { 
    // fetch
}
```

## 函数中的泛型

```typescript
// 函数中的泛型
function swap<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
    return [end, start];
}
```

函数的泛型参数也会被内部的逻辑消费，如：

```typescript
function handle<T>(payload: T): Promise<[T]> {
    return new Promise<[T]>((res, rej) => {
        res([payload]);
    });
}
```

箭头函数的泛型

```typescript
const handleArrow = <T extends any>(input: T): T => { return input; };
```