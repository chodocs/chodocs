---
author: "Choi Yang"
date: 2023-03-20
---

# 高阶组件模式

在应用程序中，我们经常希望在多个组件中使用相同的逻辑。此逻辑可以包括向组件应用某种样式、要求授权或添加全局状态。

高阶组件模式就能够让我们在多个组件中重用相同逻辑，这种模式允许我们在整个应用程序中重用组件逻辑。

高阶组件简称 HOC（Higher Order Component），是接收其它组件的组件。

HOC 包含我们希望应用于作为参数传递的组件的特定逻辑。应用该逻辑后，HOC 会返回带有附加逻辑的元素。

假设我们总是想向应用程序中的多个组件添加某种样式。我们可以简单地创建一个 HOC，将样式对象添加到传递给它的组件中，而不是每次都在本地创建一个样式对象

```jsx
function withStyles(Component) {
  return (props) => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () => <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

在上面的示例中，我们创建了一个 HOC，名称为 `withStyles`，它接收一个组件作为参数，并返回一个新组件。

接着，我们使用 `withStyles` HOC 来为 `Button` 和 `Text` 组件添加了样式，会发现它们都有了相同的样式。

## 狗狗图片的例子

让我们看一下之前在[容器/演示模式](/patterns/container-presentational-pattern/)中使用的狗狗图片 Demo，该示例无非是渲染从 API 获取的狗狗的图像列表。

<iframe src='https://stackblitz.com/edit/container-presentational-pattern-hooks?ctl=1&embed=1&file=src/useDogImages.js'></iframe>

让我们稍微改进一下用户体验。当我们获取数据时，我们希望向用户显示 `Loading…`的状态。但我们不必直接向 `DogImages` 组件添加数据，而是使用一个高阶组件来为我们添加这个逻辑。

如下我们创建一个名为 `withLoader` 的 HOC，`withLoader` HOC 应该返回一个新组件，该组件应该在数据被请求到之前显示 `Loading…`，并在数据被请求到后显示 `Element`。

```jsx
function withLoader(Element, url) {
  return (props) => {}
}
```

一个 HOC 返回一个元素，在本例中是一个功能组件 `props =>{}`，我们希望向该元素添加逻辑，允许我们在数据仍在获取时显示带有 `Loading` 的文本。一旦获取了数据，组件应该将获取的数据作为 `props` 传递。

直接来看看下方的示例吧：

<iframe src='https://stackblitz.com/edit/react-wz3weq?ctl=1&embed=1&file=src/withLoader.js'></iframe>

完美！我们刚刚创建了一个可以接收任何组件和 url 的 HOC。

1.在 `useEffect` hook 中，`withLoader` HOC 从我们传递的 url 来请求获取数据。当数据还没有返回时，我们返回包含 `Loading…` 的文本（这里为了演示需要，写了一个 `setTimeout`，大概 3s 左右会有显示 `Loading...` 的效果）。

2.一旦获取了数据，我们将 data 设置为已经获取的数据。由于 data 不再为空，我们可以显示传递给 HOC 的 `element` 组件。

那么，我们如何将这个行为添加到我们的应用程序中，让它实际显示 `Loading...`在 DogImages 列表上?

在 `DogImages.js` 文件中，我们不再只想导出普通的 DogImages 组件。相反，我们想要在 DogImages 组件周围导出包裹了一层 `withLoader` HOC 的组件，如下代码所示。

```jsx
export default withLoader(DogImages)
```

`withLoader` 高阶组件接受两个参数，第一个参数是我们想要包裹的组件，第二个参数是我们想要从中获取数据的 url。

```jsx
export default withLoader(
  DogImages,
  'https://dog.ceo/api/breed/labrador/images/random/6'
)
```

由于我们已经将 `withLoader` HOC 应用于 `DogImages` 组件，我们现在可以在 `DogImages` 组件中通过传递过来的 `props` 来使用 `data`。

```jsx
import React from 'react'
import withLoader from './withLoader'

function DogImages(props) {
  return props.data.message.map((dog, index) => (
    <img src={dog} alt="Dog" key={index} />
  ))
}

export default withLoader(
  DogImages,
  'https://dog.ceo/api/breed/labrador/images/random/6'
)
```

这时候再来看看上述的演示代码，如下所示：

<iframe src='https://stackblitz.com/edit/react-wz3weq?ctl=1&embed=1&file=src/withLoader.js'></iframe>

到此，应该对于高阶组件模式有了一个基本的了解，通过 `HOC pattern`，我们可以在多个组件中重用相同的逻辑，这种模式允许我们在整个应用程序中重用组件逻辑。

在上述狗狗图片示例中，我们使用了 `withLoader` HOC，它只要接受一个组件和一个 url，就可以为我们的组件添加数据获取的逻辑。这样，我们就可以在任何组件中使用 `withLoader` HOC，而不必在每个组件中都写一遍数据获取的逻辑。

## 多个高阶组件的组合

我们可以将多个 HOC 组合在一起，以便在组件中使用多个 HOC。例如，我们可以使用 `withLoader` HOC 来获取数据，然后使用 `withLogger` HOC 来记录数据。

不过接下来的例子，我们这样子做，当我们 `hover` 容器的时候，会有一个文本提示，告诉我们当前 `hovering`，来看看 Demo 吧。

<iframe src='https://stackblitz.com/edit/hoc-pattern-hovering?ctl=1&embed=1&file=src/withHover.js'></iframe>

在上述例子中，我们新增了一个 `withHover` HOC，它接收一个组件作为参数，并返回一个新组件。这个新组件会在鼠标悬停在组件上时显示 `Hovering`，详细代码如下：

::: code-group

```jsx [withHover.js]
import React, { useState } from 'react'

export default function withHover(Element) {
  return (props) => {
    const [hovering, setHover] = useState(false)

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    )
  }
}
```

```jsx [DogImages.js]
import React from 'react'
import withLoader from './withLoader'
import withHover from './withHover'

function DogImages(props) {
  return (
    <div {...props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  )
}

export default withHover(
  withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6')
)
```

你会发现，我们在 `DogImages` 组件中使用了两个 HOC，`withHover` 和 `withLoader`。这两个 HOC 都接收一个组件作为参数，并返回一个新组件。我们可以将多个 HOC 组合在一起，以便在组件中使用多个 HOC。

> 其实大部分的 HOC 目前都是可以被 `React Hooks` 所取代，我们下面来看看使用了 Hooks 之后又会是怎样的形式。

## Hooks 中

在大部分例子中，我们可以通过 `React Hooks` 来替代 HOC。我们来看看如何使用 `React Hooks` 来实现 `withHover` HOC。

<iframe src='https://stackblitz.com/edit/hoc-pattern-hooks?ctl=1&embed=1&file=src/useHover.js'></iframe>

详细代码如下，你也可以在上述演示 demo 中切换查看代码详情。

::: code-group

```jsx [useHover.js]
import { useEffect, useRef, useState } from 'react'

export default function useHover() {
  const [hovering, setHover] = useState(false)
  const ref = useRef(null)

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [ref.current])

  return [ref, hovering]
}
```

```jsx [DogImages.js]
import React from 'react'
import withLoader from './withLoader'
import useHover from './useHover'

function DogImages(props) {
  const [hoverRef, hovering] = useHover()

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  )
}

export default withLoader(
  DogImages,
  'https://dog.ceo/api/breed/labrador/images/random/6'
)
```

:::

在上述代码中，我们使用了 `useHover` 自定义 Hook，如果不太清楚自定义 Hook，可以在 [React 最新文档](https://react.dev/learn/reusing-logic-with-custom-hooks) 中学习。

当我们使用了 Hooks 语法之后，你会发现代码也变得干净卫生了，我们不需要去通过 `withxxx` 这样的 HOC 来包裹了，而是直接在组件中使用 `useHover` Hook，这样就可以在组件中使用 `hovering` 状态了。

### Hooks 好处

在上述代码中，我们不难发现，使用了 Hooks 之后没有那么多层级，代码也变得简洁了，这是因为 Hooks 本身就是一个函数，我们可以在任何地方调用它，而不需要像 HOC 那样，需要在组件中包裹一层 HOC。

来看看，包裹了 HOC 的组件结构：

```jsx
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

看完感受就是一套又一套的...

## 优点

使用高阶组件模式允许我们在一个地方保留我们想要重用的逻辑。这降低了通过重复代码在应用程序中意外传播错误的风险，每次都可能引入新的错误。

通过将所有逻辑都放在一个地方，可以轻松地实现关注点的分离。

## 不足

HOC 可以传递被包裹的组件时，可能会导致命名冲突，来看下述例子：

```jsx
function withStyles(Component) {
  return (props) => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () => <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```

在本例中，`withStyles` HOC 将一个名为 `style` 的 `props` 添加到我们传递给它的元素中。

然而，`Button` 组件已经有了一个名为 `style` 的 props，这时样式将会被覆盖！

我们可以修改一下代码，如下所示：

```jsx
function withStyles(Component) {
  return (props) => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      ...props.style
    }

    return <Component style={style} {...props} />
  }
}

const Button = () => <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```

另外，如果有多个 HOC，那么 HOC 的嵌套层级就会越来越深，这样也会导致组件的可读性变差，对于组件所接收的 `props` 也很难确定它应该是来自于哪个 HOC，这可能也会阻碍调试以及阅读。
