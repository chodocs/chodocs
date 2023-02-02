# 代理模式

<script setup>
import Demo1 from './demo1.vue';
import Demo2 from './demo2.vue';
import Demo3 from './demo3.vue';
</script>

<VideoLink bvId="BV1FM41187Rx">前端代理模式，介绍 Proxy 与 Reflect | Proxy Pattern B 站视频传送门</VideoLink>

代理模式，就拿部门工作来说，如果我是总监，那委派需求的话，就找开发组的产品经理就好了，我不需要和开发对接，那么也就是我只需要和中间的代理对象交谈就行了。

## proxy 使用

提到代理模式，一定会想到 proxy 这玩意，用法如下，比较常用的两个方式就是 `get` 和 `set` 了。

```js
const person = {
  name: 'Chocolate',
  age: 23,
  nationality: 'China',
}
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    obj[prop] = value
    return true
  },
})
personProxy.name // [!code hl]
personProxy.age = 18 // [!code hl]
```

## Demo

<DemoContainer pkg='patterns/proxy-pattern' path='demo1.vue'>
    <Demo1/>
</DemoContainer>

## 属性校验

通过 `proxy` 方法，其实我们对于其中一些属性校验很有帮助，比如下面这个例子：

```js
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
}

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop])
      console.log('Hmm.. this property doesn\'t seem to exist')
    else
      console.log(`The value of ${prop} is ${obj[prop]}`)

  },
  set: (obj, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      console.log('Sorry, you can only pass numeric values for age.')
    }
    else if (prop === 'name' && value.length < 2) {
      console.log('You need to provide a valid name.')
    }
    else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`)
      obj[prop] = value
    }
    return true
  },
})

personProxy.nonExistentProperty
personProxy.age = '44'
personProxy.name = ''
```

## Demo

<DemoContainer pkg='patterns/proxy-pattern' path='demo2.vue'>
    <Demo2/>
</DemoContainer>

## Reflect

在 JS 当中，有一个内置的对象，叫做 `Reflect`，它能让我们更容易操作目标对象。

上文当中，我们通过 Proxy new 了一个代理对象出来，然后通过 `get` 和 `set` 方法来访问和修改数据。

同样，我们可以通过 `Reflect` 对象来操作，如下代码所示：

```js
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
}

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    return Reflect.set(obj, prop, value)
  },
})

personProxy.name
personProxy.age = 43
personProxy.name = 'Chocolate'
```

### Demo

<DemoContainer pkg='patterns/proxy-pattern' path='demo3.vue'>
    <Demo3/>
</DemoContainer>

从示例代码和 Demo 中可以看到，上文我们是通过 `obj[prop]` 来获取，通过 `obj[prop] = value` 来进行 set 操作。

现在我们可以通过 `Reflect.get()` 和 `Reflect.set()` 分别来进行读取和写入操作。

## 总结

通过代理，我们能够对我们对象的行为进行控制。比如它可以帮助进行验证、格式化、通知或调试等。

但是，过度使用 Proxy 对象或对每个处理程序方法调用执行繁重的操作很容易对应用程序的性能产生负面影响。

> 这里举例说明一下，虽然使用代理很方便，放到现实中，叫人跑腿拿东西也是需要支付金钱的，但过多的去使用，可以理解为会消费许多没必要的资源。

因此，对于性能关键型代码，最好不要使用代理。
