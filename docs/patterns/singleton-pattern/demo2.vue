<script setup lang="ts">
import { ref } from 'vue'
import { singletonCounter, singletonCounter2 } from './utils'

const count = ref(0)
</script>

<template>
  点击如下按钮：<br>
  按钮 1 和按钮 2 点击事件使用的实例{{ singletonCounter.getInstance() === singletonCounter2.getInstance() ? '相同' : '不同' }}
  <br>
  <button @click="count = singletonCounter.increment()">
    按钮 1 点击增加
  </button>
  <button @click="count = singletonCounter.decrement()">
    按钮 1 点击减少
  </button>
  <button @click="count = singletonCounter2.increment()">
    按钮 2 点击增加
  </button>
  <button @click="count = singletonCounter2.decrement()">
    按钮 2 点击减少
  </button>
  <br><br>
  count 结果：{{ count }}
</template>
