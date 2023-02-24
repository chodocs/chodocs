---
author: "Choi Yang"
date: 2023-02-22
---

# 混合模式

`mixin` 是一个对象，我们可以使用它向另一个对象或类添加可重用的功能，而不需要使用继承的方式。

> 注意，我们不能单独使用 `mixin`：它们的唯一目的是在没有继承的情况下向对象或类添加功能。

## mixin 使用

假设对于我们的应用程序，我们需要创建多个狗。然而，我们创建的狗只有一个 `name` 属性，如下代码所示：

```js
class Dog {
  constructor(name) {
    this.name = name
  }
}
```

一只狗除开拥有名字外，它应该还会汪汪叫，摇尾巴，玩！

我们可以创建一个 `mixin`，为我们提供 `bark`、`wagTail` 和 `play` 属性，而不是直接添加到 `Dog` 中。

开头咱们说过，一个 `mixin` 就是一个对象，因此我们创建一个名为 `dogFunctionality` 的对象。

```js
const dogFunctionality = {
  bark: () => console.log('Woof!'),
  wagTail: () => console.log('Wagging my tail!'),
  play: () => console.log('Playing!'),
}
```

我们可以通过 `Object.assign` 方法将上述 `dogFunctionality` 对象添加到 `Dog` 的原型中，也就是 `Dog.prototype`。

```js
class Dog {
  constructor(name) {
    this.name = name
  }
}

const dogFunctionality = {
  bark: () => console.log('Woof!'),
  wagTail: () => console.log('Wagging my tail!'),
  play: () => console.log('Playing!'),
}

Object.assign(Dog.prototype, dogFunctionality)
```

那么在实例化 `Dog` 后，每一个实例对象都能访问 `Dog` 上的方法，包括在原型上的方法，因为我们可以通过原型链的方式去往上找。

不妨来示例化一下吧，`new` 出来一个宠物，名叫做 `pet1`，我们来访问一下上述新增加的方法试试：

```js
const pet1 = new Dog('Daisy')

pet1.name // Daisy
pet1.bark() // Woof!
pet1.play() // Playing!
```

会发现能正常使用，那么我们通过 `mixin` 方式可以轻松将自定义的一些方法添加到类或对象当中，不需要使用继承的方式。

## mixin 本身也可以继承

虽然我们可以在没有继承的情况下使用`mixin`添加方法，但 `mixin` 本身也可以使用继承。

比如说，大多数哺乳动物(除了海豚，也许还有其他物种)能走路和睡觉，而狗也是哺乳动物，应该也是要会走路和睡觉。

下面我们再创建一个名为 `animalFunctionality` 的 `mixin` 添加走路和睡觉的方法。

```js
const animalFunctionality = {
  walk: () => console.log('Walking!'),
  sleep: () => console.log('Sleeping!'),
}
```

我们可以使用 `Object.assign` 将这些属性添加到 `dogFunctionality` 原型中。在上述例子中，目标对象是 `dogFunctionality`。

```js
const animalFunctionality = {
  // xxx
}

const dogFunctionality = {
  // xxx
}

Object.assign(dogFunctionality, animalFunctionality)
Object.assign(Dog.prototype, dogFunctionality)
```

## Demo

那么我们可以 `new` 来试试，又新增了 `walk` 和 `sleep` 方法。

<iframe src='https://stackblitz.com/edit/mixin-pattern-demo?devToolsHeight=33&embed=1&file=index.js'></iframe>

## 日常编码

日常编码中的一个 `mixin` 例子就是浏览器环境中的 `Window` 对象了，它从 `WindowOrWorkerGlobalScope` 和 `WindowEventHandlers` 中混合了很多属性方法。

比如，我们常用的一些 `setTimeout` 、`setInterval`、`indexedDB` 和 `isSecureContext`。

由于它是一个 `mixin`，因此仅用于向对象去添加功能，而不能创建 `WindowOrWorkerGlobalScope` 类型的对象，我们来看看下方的例子：

<iframe src='https://stackblitz.com/edit/mixin-pattern-window-demo?ctl=1&devToolsHeight=33&embed=1&file=index.js'></iframe>

可以发现，我们直接去访问 `WindowOrWorkerGlobalScope` 或者 `WindowEventHandlers` 是访问不到的。

## React (ES6 前)

在引入 `ES6` 类之前，`mixin` 经常被用来为 `React` 组件添加功能。`React`团队不鼓励使用`mixin`，因为它很容易给组件增加不必要的复杂性，使其难以维护和重用。

React 团队鼓励使用更高阶的组件，这些组件现在通常可以被 `Hooks` 取代。

## 结语

`mixin` 允许我们轻松地向对象添加属性方法，而不需要将功能注入到对象的原型中。因为修改一个对象的原型被认为是一种糟糕的做法，它会导致原型污染和对于属性方法来源的不确定性。
