---
author: "Choi Yang"
---

# 容器/演示模式

> 通过将视图与应用程序逻辑分离来实现关注点分离。

## Demo

因为个人觉得这个模式的大致概念比较清晰，我们直接来看下样例：

<iframe src='https://stackblitz.com/edit/container-presentational-pattern?embed=1&file=src/DogImagesContainer.js'></iframe>

上述示例中，我们通过 api 获取了 6 张狗狗的图片，并进行了渲染展示。

可以发现，我们写了两个组件，分别是 `DogImagesContainer.js` 和 `DogImages.js`，源码如下：

::: code-group

```jsx [DogImagesContainer.js]
import React, { useEffect, useState } from 'react'
import DogImages from './DogImages'

function DogImagesContainer() {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    const fetchFn = () => {
      fetch('https://dog.ceo/api/breed/labrador/images/random/6')
        .then(res => res.json())
        .then(({ message }) => setDogs(message))
    }
    fetchFn()
  }, [])

  return <DogImages dogs={dogs} />
}

export default DogImagesContainer
```

```jsx [DogImages.js]
import React from 'react'

export default function DogImages({ dogs }) {
  return dogs?.map((dog, i) => <img src={dog} key={i} alt="Dog" />)
}
```

:::

根据设计模式的名称，为了实现分离关注点，我们的组件也应该分两部分：

- Container Components（关心显示给用户什么数据的组件，在本例中，它正在获取狗的图像。）

- Presentational Components（关心数据如何显示给用户的组件。在本例中，它在渲染狗的图像列表。）

> 获取狗的图像属于应用程序逻辑，而拿到数据显示图像属于视图这块的处理。

下面我们来逐一介绍容器组件和演示组件。

## 容器组件

上述例子 `DogImagesContainer.js` 即是一个容器组件，容器组件的主要功能是将数据传递给它们所包含的演示组件当中。

容器组件通常不会关心除演示组件之外的其他组件，因为它们本身不呈现任何东西，所以通常也不包含任何样式。我们在上述代码中也可以看到，`DogImagesContainer.js` 中并没有引用样式代码。

在代码中，我们通过 `fetch` 获取了狗狗图像数据，将数据传递给了演示组件，即：

```js
<DogImages dogs={dogs} />
```

## 演示组件

上述例子 `DogImages.js` 即是一个演示组件，主要功能是通过 `props` 接受数据，将数据以我们希望的方式显示，包括样式。

而对于这个数据，我们只需要接受就行了，无需修改，都是处理好的数据结构。

通常，演示组件通常是无状态的，除非是改这个 ui 而需要添加状态，而从 `props` 中拿到的数据也不会去修改。

## Hooks

在许多情况下，我们可以通过 React Hooks 方式来代替容器/演示模式，通过 Hooks 我们无需容器来提供 `state`。

这样，我们就可以直接去掉 `DogImagesContainer.js` 这个组件了，而是通过 hooks 方式来编写数据获取的逻辑，如下代码所示：

```jsx
export default function useDogImages() {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/labrador/images/random/6')
      .then(res => res.json())
      .then(({ message }) => setDogs(message))
  }, [])

  return dogs
}
```

通过以上代码，我们就可以简化之前的 demo 中的代码，我们直接在演示组件中使用 hook 试试，如下示例：

<iframe src='https://stackblitz.com/edit/container-presentational-pattern-hooks?ctl=1&embed=1&file=src/useDogImages.js'></iframe>

上述示例中，我们使用了 `useDogImages` hook，也做到了逻辑和视图上的分离，显然，这节省了设计模式所需的容器组件。

## 总结

优点：

- 使用容器/演示模式可以做到视图和逻辑上的分离，视图组件只需要负责 UI 的渲染，而容器组件则负责应用程序的状态和数据，各司其职。
- 因为演示组件不会修改数据并且一般是无状态的，我们可以很好的进行复用，例如，基于数据的不同，我们可以实现应用程序换肤效果等。
- 测试演示组件也很容易，毕竟它们是纯函数，我们无需模拟数据的存储，并且知道它们是根据我们传递的数据不同而呈现不同的内容。

不足：

虽然容器/演示模式能够让逻辑和视图关注点分离，但是上文中我们使用 Hooks 也达到了同样的效果，那么其实我们没必要再多写一个容器组件，组件的嵌套多了看起来不够简洁。
