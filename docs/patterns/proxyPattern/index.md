# 代理模式

代理模式，就拿部门工作来说，如果我是总监，那委派需求的话，就找开发组的产品经理就好了，我不需要和开发对接，那么也就是我只需要和中间的代理对象交谈就行了。

## proxy 使用

提到代理模式，一定回想到 proxy 这玩意，用法如下，比较常用的两个方式就是 `get` 和 `set` 了。

```js
const person = {
  name: "Chocolate",
  age: 23,
  nationality: "China",
};
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  },
});
personProxy.name; // [!code hl]
personProxy.age = 18; // [!code hl]
```



## 属性校验

通过 `proxy` 方法，其实我们对于其中一些属性校验很有帮助，比如下面这个例子：

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  },
});

personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";
```

> 持续更新中...


<script setup>
const person = {
  name: "Chocolate",
  age: 23,
  nationality: "China"
};
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    return obj[prop];
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  }
});
</script>

<pre>{{personProxy.name}}</pre>


aaa