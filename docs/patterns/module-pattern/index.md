---
author: "Choi Yang"
date: 2023-02-21
---

# 模块模式

随着应用程序和代码库的增长，保持代码可维护和分离变得越来越重要。模块模式可以将代码分割成更小的、可重用的片段。

除了能够将代码分割成更小的可重用片段外，模块还允许您在文件中保留某些私有值。

默认情况下，模块内的声明被限定(封装)到该模块。如果不显式导出某个值，则该值在该模块之外不可用。

那么就降低了在代码中其它地方的声明的值出现命名冲突的风险，因为这些值在全局作用域中不可用。

## ES2015 的模块

ES2015 引入了内置 JavaScript 模块。模块是一个包含 JavaScript 代码的文件，与普通脚本相比在行为上有一些不同。

下面，我们来看一个名为 `math.js` 的模块，包含了一些数学类的函数。

```js
function add(x, y) {
  return x + y
}
function multiply(x) {
  return x * 2
}
function subtract(x, y) {
  return x - y
}
function square(x) {
  return x * x
}
```

代码也比较简单，包含加减乘除这些函数，不过我们希望的是能够在 `index.js` 当中使用，很显然，我们需要将这几个函数通过 `export` 关键字导出去，如下：

```js
export function add(x, y) {
  return x + y
}

export function multiply(x) {
  return x * 2
}

export function subtract(x, y) {
  return x - y
}

export function square(x) {
  return x * x
}
```

通过在函数前面添加 `export` 即可实现导出，不过我们仅仅只是在模块中导出了这些函数，此时在 `index.js` 中还是不能使用，那么为了能够使用来自模块的导出值，我们必须引用他们。

顾名思义，我们可以使用 `import` 关键字，为了让 js 知道我们想从哪个模块导入这些函数，我们还需要添加 `from` 和模块的路径，如下：

```js
import { add, multiply, square, subtract } from './math.js'
```

## 演示

<iframe src='https://stackblitz.com/edit/module-pattern-demo?devToolsHeight=33&embed=1&file=index.js'></iframe>

使用模块的一大好处是，我们只能访问使用 `export` 关键字显式导出的值。没有使用 `export` 关键字显式导出的值只在该模块中可用。

我们不妨创建一个只能在 `math.js` 文件中引用的值，称为 `privateValue`。

::: code-group

```js [main.js]
const privateValue = 'This is a value private to the module!'

export function add(x, y) {
  return x + y
}

export function multiply(x) {
  return x * 2
}

export function subtract(x, y) {
  return x - y
}

export function square(x) {
  return x * x
}
```

```js [index.js]
import { add, multiply, square, subtract } from './math.js'

console.log(privateValue)
/* Error: privateValue is not defined */
```

:::

通过将值设置为模块私有，可以降低意外污染全局作用域的风险。

假如没有设置私有的话，都放在全局，那很有可能你的同事也会使用到和你相同名称的值，这样就会导致命名冲突，而模块内私有的值可以防止命名冲突。

如果我们发现导入的值已经在该文件中使用了，我们可以使用 `as` 关键字进行重命名一下，看看如下例子：

## 演示

<iframe src='https://stackblitz.com/edit/module-pattern-demo2?ctl=1&devToolsHeight=33&embed=1&file=index.js'></iframe>

## export 与 export default

除了仅使用导出关键字 `export` 导出外，还可以使用默认导出，注意，每个模块**只能有一个**默认导出。

默认导出的关键字是 `export default`，我们在下方例子当中将加法的函数设置为默认导出试试，其它的都使用 `export` 来导出。

::: code-group

```js [math.js]
export default function add(x, y) {
  return x + y
}

export function multiply(x) {
  return x * 2
}

export function subtract(x, y) {
  return x - y
}

export function square(x) {
  return x * x
}
```

```js [index.js]
import add, { multiply, square, subtract } from './math.js'

add(7, 8)
multiply(8, 9)
subtract(10, 3)
square(3)
```

:::

从以上代码我们不难发现，通过 `export default` 导出的值，我们在 `import` 的时候是不需要加在括号里的。

同时， js 知道这个值是默认导出的，我们也可以直接给它取一个别名，比如我们上述导入的 `add` 可以取名为 `addValues`。

```js
import addValues, { multiply, square, subtract } from './math.js'

addValues(7, 8)
multiply(8, 9)
subtract(10, 3)
square(3)
```

此外，我们还可以通过 `*` 和 `as` 的配合来实现所有的导出（包括默认导出），如下例子，我们用模块导出的内容设置为 `math`。

<iframe src='https://stackblitz.com/edit/module-pattern-demo3?devToolsHeight=33&embed=1&file=index.js'></iframe>

在上例中，我们从一个模块导入所有的导出。这样做时要小心，可能会不必要地导入其它不需要的值，因为使用 `*` 会导入所有导出的值。

而模块私有的值在导入模块的文件中仍然不可用，除非我们显式地导出它们。

## Todo iist

在使用 React 构建应用程序时，你经常需要处理大量的组件。我们不需要在一个文件中编写所有这些组件，而是可以将这些组件分离到它们自己的文件中，实际上就是为每个组件创建一个模块。

比如一个 demo 名叫 todo-list，想必大家非常熟悉吧，它包含一个列表、列表项、一个输入框和一个按钮。

使用模块模式的话，我们可以将每一个组件单独做成一个模块，这样主应用程序只需要将这些模块拼起来就好了，包括样式我们也可以单独写在每一个组件当中，相互不影响。

## Dynamic import

上文我们在 `index.js` 文件顶部导入都是直接导入的，也有导入所有的模块，但实际情况我们有时候并不需要立即要这个模块，而是希望它在特定的条件下才导入模块，这时候，我们就可以通过 `Dynamic import` 来按需加载导入的模块。

```js
import('node:module').then((module) => {
  module.default()
  module.namedExport()
});

// Or with async/await
(async () => {
  const module = await import('node:module')
  module.default()
  module.namedExport()
})()
```

## 演示

<iframe src='https://stackblitz.com/edit/module-pattern-dynamic-import?ctl=1&devToolsHeight=33&embed=1&file=index.js'></iframe>

通过动态导入模块，我们可以减少页面加载时间。当用户需要时，我们只需要加载，解析和编译用户真正需要的代码。

除了能够按需导入模块外，`import()` 函数还可以接收表达式。它允许我们传递模板字符串，以便基于给定的值来动态加载模块。

```js
const res = await import(`../assets/dog${num}.png`)
```

如上述代码，只有当用户单击点击加载图像按钮后，每个图像才会加载，并且会根据我们传递的 `num` 值来判断实现动态加载。

这样，我们就不依赖于硬编码的模块路径，我们可以根据用户输入、从外部源接收的数据、函数的结果等来导入模块，会比直接全部导入更加灵活。

## 结语

使用模块模式，我们可以封装不公开的一部分代码。这可以防止一些变量的命名冲突和全局作用域的污染，从而降低使用多个依赖项和命名空间的风险。

当然，为了能使用 ES5 及以上的语法，我们需要类似于 `Babel` 这样的编译器让我们能在 js 运行时使用模块化的语法。