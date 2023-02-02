<script setup lang="ts">
let counter = 0

class Counter {
  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}
const counter1 = new Counter()
const counter2 = new Counter()
</script>

<template>
  我们来比对一下结果：<br>

  counter1.getInstance() === counter2.getInstance() 的结果是：{{
    counter1.getInstance()
      === counter2.getInstance()
  }}
</template>
