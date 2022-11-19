<template>
  <div>
    <div>
      <ul>
        <li v-for="item in list" :key="item.text">
          <a @click="goto(item.link)" href="javascript:;">
            {{ item.text }}
          </a>
          <span>：{{ item.desc }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vitepress'
const router = useRouter()
const list = [
]
const goto = link => {
  router.go(link)
}
</script>
