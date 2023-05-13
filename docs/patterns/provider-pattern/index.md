# 提供者模式

在某些情况下，我们希望向应用程序中的许多（非全部，如果是全部的话就用全局就好了）组件提供可用的数据。

通常我们可以使用 `props` 将数据传递给组件，但如果几乎所有组件都访问 props 的值的话，这传递的层次也会非常多，代码耦合性也会很高，当我们需要重构代码的时候，你就会发现要改动的文件非常多，越是复杂的项目，重构起来越费劲。

我们来看看下面的例子：

> 因为 Chocolate 更喜欢使用 React，而对于 Vue3 语法目前还不是很熟悉，因此我们使用 React jsx 语法来编写本文案例，并采用 `stackblitz` 来进行在线编码，这样大家可以直接操作源码，方便直观。

## 演示

<iframe src="https://stackblitz.com/edit/provider-pattern-props-demo?embed=1&file=src/App.js&view=editor"></iframe>

::: details 示例源码

::: code-group

```jsx [App.js]
import React from 'react'
import './style.css'

export default function App() {
  const data = {
    listItem: 'ChoDocs',
    title: 'https://chodocs.cn/',
    text: 'Hello Chocolate',
  }

  return (
    <div>
      <SideBar data={data} />
      <Content data={data} />
    </div>
  )
}

const SideBar = ({ data }) => <List data={data} />
const List = ({ data }) => <ListItem data={data} />
const ListItem = ({ data }) => <span>{data.listItem}</span>

function Content({ data }) {
  return <div className="my_content">
    <Header data={data} />
    <Block data={data} />
  </div>
}
const Header = ({ data }) => <div>{data.title}</div>
const Block = ({ data }) => <Text data={data} />
const Text = ({ data }) => <h3>{data.text}</h3>
```

```css [style.css]
.my_content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
```

:::

## 发现问题

通过上述例子，你是否会被这些 data 传递给绕晕了？为了一个简单的页面展示，将 data 传递来传递去的，逻辑上也比较混乱。

当我们未来某一天，发现我们有的组件需要修改数据源，比如需要传递一个 function，这个 props 就需要我们手动去找，并且假如需要修改 props 的命名，那么你的改动将会很多，工作效率不是很好。

仔细看代码的话，我们还可以发现，有些组件根本就没有用到 `data` 数据，它们只是中间的传递者，如果组件层级比较多，我们也会写很多传递的代码，然而这些是没有必要的。

既然发现了这个问题所在，我们是否可以选择跳过一些不需要传递数据的组件呢？对于需要 props 传参的组件直接传给他们就好了，而不是通过这样类似递归的形式一步一步传递。

## 解决问题

那么这就是我们本文要介绍的提供者模式了，我们可以将数据直接用于多个组件，而不用一个一个传递。

直接来看下面的例子吧：

<iframe src="https://stackblitz.com/edit/provider-pattern-context-demo?ctl=1&embed=1&file=src/App.js&view=editor"></iframe>

::: details 示例源码

```js {4,15,18,35,44,49}
import React, { createContext, useContext } from 'react'
import './style.css'

export const DataContext = createContext({})

export default function App() {
  const data = {
    listItem: 'ChoDocs',
    title: 'https://chodocs.cn/',
    text: 'Hello Chocolate',
  }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}

function SideBar() {
  return <List />
}
function List() {
  return <ListItem />
}
function Content() {
  return <div>
    <Header />
    <Block />
  </div>
}

function ListItem() {
  const data = useContext(DataContext)
  return <span>{data.listItem}</span>
}

function Block() {
  return <Text />
}

function Text() {
  const data = useContext(DataContext)
  return <h1>{data.text}</h1>
}

function Header() {
  const data = useContext(DataContext)
  return <div>{data.title}</div>
}
```

:::

通过上述例子，应该显而易见了吧，我们并没有将 data 一层一层传递下去了，在代码的 15-18 行，我们在最外层使用了 `Provider` 这种高阶组件，通过 `createContext` 方法创建了组件都能访问的 Context，这样，当我们真正需要数据的组件，可以通过 React 当中的 `useContext` hook 来接收 Context。在上述演示代码中即指 `DataContext`。

通过代理模式处理逻辑，我们不用担心组件有多少级别了，组件之间直接解耦让我们的代码也更加`干净卫生`，这样当我们需要重构的时候，也无需考虑那么多东西了。

## 共享全局数据

我们刚刚的例子都只是比较简单的 data 数据，代理模式其实还能很方便的让我们共享全局数据。来看看下述例子：

<iframe src='https://stackblitz.com/edit/provider-pattern-global-demo?ctl=1&embed=1&file=src/App.js&view=preview'></iframe>

当然，这个例子还不是很完善，我们希望的是可以通过上方的切换按钮来进行 light 和 dark 模式的切换，比如当切换到黑夜模式的时候，我们希望将文本以及背景颜色进行相应的更改。

和上文代理模式的例子一样，我们依旧是通过 `Context` 来给其他组件传递数据，通过创建 `ThemeContext` 作为我们子组件的提供者，我们传递了 `theme` 数据和 `toggleTheme` 方法。

> 以下部分代码仅伪代码，只是截取了比较核心部分，完整代码见下方演示示例。

```js {12,23,28}
export const themes = {
  light: {
    background: '#fff',
    color: '#000',
  },
  dark: {
    background: '#171717',
    color: '#fff',
  },
}

export const ThemeContext = React.createContext({})

export default function App() {
  const [theme, setTheme] = useState('dark')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
        <>
          <Toggle />
          <List />
        </>
      </ThemeContext.Provider>
    </div>
  )
}
```

在 `Toggle` 子组件中，我们就可以通过 `useContext` hook 拿到 toggleTheme 方法，当点击事件触发的时候，就可以达到切换 `theme` 的效果。

```js {5}
import React, { useContext } from 'react'
import { ThemeContext } from './App'

export default function Toggle() {
  const theme = useContext(ThemeContext)
  return (
    <label className="switch">
      <input type="checkbox" onClick={theme.toggleTheme} />
      <span className="slider round" />
    </label>
  )
}
```

在每一个 `list` 组件中，我们直接获取 `theme` 数据就好了，根据 `theme` 值的变化来使用不同的 css。

```js
import React, { useContext } from 'react'
import { ThemeContext } from './App'

export default function TextBox() {
  const theme = useContext(ThemeContext)

  return <li style={theme.theme}>...</li>
}
```

## 演示

以下就是我们最终达到的效果，大家可以体验一下，源码可在右下角切换到 `Editor` tab 来查看。

<iframe src='https://stackblitz.com/edit/provider-pattern-global-demo2?ctl=1&embed=1&file=src/App.js&view=preview'></iframe>

## 代码优化

上述例子代码还是可以继续再优化的，我们查看每个子组件，会发现我们都需要从 `App.js` 文件中导入 `ThemeContext`，假如我们未来又改名字了呢（虽然几率很小），但这种看起来组件并非完全独立，还是有相关依赖，如果组件层级比较多，从上到下都得根据路径来导入，维护起来不太优雅。

这里我们可以把它抽成一个 `hook`，如下代码所示：

> 以下部分代码仅伪代码，只是截取了比较核心部分，完整代码见下方演示示例。

```js {4}
function useThemeContext() {
  const theme = useContext(ThemeContext)
  if (!theme)
    throw new Error('useThemeContext must be used within ThemeProvider')

  return theme
}
```

当然，为了保障数据是可用的，我们也得进行一下错误情况的处理。

### 再来一个高阶组件

同理，我们也可以将 `Context` 逻辑与渲染组件分开，如下代码所示：

```js {23,26}
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function App() {
  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider>
        <Toggle />
        <List />
      </ThemeProvider>
    </div>
  )
}
```

处理完成之后，我们子组件如果想要获取数据，就可以通过 `useThemeContext()` hook 来得到了。

```js {2}
export default function TextBox() {
  const theme = useThemeContext()
  return <li style={theme.theme}>...</li>
}
```

通过为不同上下文创建钩子，很容易将提供者模式的逻辑与呈现数据的组件分开。

## 演示

下面我们来看看优化之后的完整代码以及预览效果吧：

<iframe src='https://stackblitz.com/edit/provider-pattern-global-demo3?ctl=1&embed=1&file=src/App.js&view=editor'></iframe>

## 拓展学习

一些库当中会提供内置的 `Provider`，我们可以在被包裹的组件中使用提供的数据。

一个不错的例子就是 [styled-components](https://styled-components.com/docs/advanced)。

> 当然，如果你没有使用过 `styled-components` 也没有关系，相信下方的代码你也能看懂了。

`styled-components` 库为我们提供了一个 ThemeProvider，来看下方的例子：

```js {1,12,17}
import { ThemeProvider } from 'styled-components'

export default function App() {
  const [theme, setTheme] = useState('dark')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider theme={themes[theme]}>
        <>
          <Toggle toggleTheme={toggleTheme} />
          <List />
        </>
      </ThemeProvider>
    </div>
  )
}
```

其实这块代码就是将我们之前自己创建的 Context 做了封装，这样我们调用这个库的 api 即可了。

这样，我们就可以通过 `styled-components` 库来转换一下我们之前所实现的代码了，如下：

<iframe src='https://stackblitz.com/edit/provider-pattern-styled-components-demo?ctl=1&embed=1&file=src/App.js&view=editor'></iframe>

## 总结

### 好的方面

通过提供者模式以及上半部分介绍的 Context API，我们可以将数据传递到许多组件，而不需要手动一步一步传递给每个组件层了。

它降低了在重构代码时意外引入错误的风险。过去，如果我们想重命名 props，我们必须在使用此值的整个应用程序中重命名此 props。

此外，因为一层一层传递逻辑上会很混乱，可能很难理解应用程序的数据流，因为并不总是清楚某些 props 值的元数据。

有了 `Provider Pattern`，我们不再需要将 props 传递给不需要这些数据的组件，而直接提供给需要的组件。

其次，全局状态的管理也会非常容易，组件也可以访问该全局状态。

### 不足点

某些情况下，过度地使用提供者模式也会产生性能方面的问题，被 Provider 所包裹的子组件，因为都使用了其中的数据，所以当数据变化的时候，也会导致组件 `re-render`，即触发一次重新渲染。

我们来看看下面的例子：

> 一个比较简单的计数器 demo，点击 `Increment` 按钮，count 就会 +1，点击 `Reset` 按钮，计数将被充值。

<iframe src='https://stackblitz.com/edit/provider-pattern-cons-demo?ctl=1&embed=1&file=src/App.js&view=editor'></iframe>


在这个例子当中，当我们点击 `Increment` 按钮时，会发现 `Reset` 组件也会触发一次渲染，因为它也消费使用了 `useCountContext`，也就是使用了 Provider 提供的数据。

对于我们这种案例 demo 来说，其实影响不是很大，随便怎么玩，但是对于大型应用来说，频繁地触发渲染还是会有一定的性能影响。

那么为了确保不需要更新的组件不消费这个 Provider，我们也可以为组件设置多个 Provider，这样就不会相互影响了。