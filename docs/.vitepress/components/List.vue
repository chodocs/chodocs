<template>
  <table class="border-style">
    <thead>
      <tr>
        <td v-for="item in listHead" :key="item">{{ item }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="list in listBody" :key="list">
        <td v-for="item in list" :key="item">
          <a href="javascript:;" @click="goToPage(item.link)">
            {{ item.text }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import sideBar from '../sidebar.js'
import { computed } from 'vue'
import { useRouter } from 'vitepress'
const router = useRouter()
const props = defineProps({
  type: String
})
const sidebar = sideBar[`/${props.type}/`]
const goToPage = link => {
  router.go(link)
}
const listHead = computed(() => {
  return sidebar.map(x => x.text)
})
const listBody = computed(() => {
  let items = sidebar.map(x => x.items)
  const res = []
  const n = items.reduce((pre, cur) => (cur.length > pre ? cur.length : pre), Math.max())
  for (let i = 0; i < n; i++) {
    res[i] = []
    for (let j = 0; j < items.length; j++) {
      res[i].push(items[j][i] ?? [])
    }
  }
  return res
})
</script>
<style>
.border-style tbody td {
  border-bottom: 0.5px solid #dfe2e5;
  padding: 3px 1px 3px 15px;
}
</style>