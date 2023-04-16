<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { getDate, getFromNow } from '../utils'

defineProps<{
  readTime: string
  words: string
}>()
const defaultAuthor = 'Choi Yang'
const author = ref(defaultAuthor)
const { frontmatter, page } = useData()

const publishedTime = getDate(frontmatter.value?.date)

if (frontmatter.value?.author)
  author.value = frontmatter.value?.author

const lastUpdatedDate = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => lastUpdatedDate.value.toISOString())
const timeFormNow = getFromNow(isoDatetime.value)
</script>

<template>
  <div>
    <section
      class="border-b-1 border-[var(--vp-c-divider)] w-full border-b-solid mt-[24px] pb-[12px] flex gap-[12px] mb-[12px] flex-wrap max-w-[85%]"
    >
      <div class="flex gap-[4px] items-center">
        <octicon:feed-person-16 />
        作者:<span>
          {{ author }}
        </span>
      </div>
      <div v-if="publishedTime" class="flex gap-[4px] items-center">
        <eos-icons:modified-date />
        发表于:<span>{{ publishedTime }}</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <radix-icons:update />
        更新于:<span>{{ timeFormNow }}</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <bi:file-earmark-word-fill />
        字数统计:<span>{{ words }} 字</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <ooui:clock />
        阅读时长:<span>{{ readTime }} 分钟</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <ph:eye-fill />
        阅读量:<span id="busuanzi_container_page_pv"><span id="busuanzi_value_page_pv" /></span>
      </div>
    </section>
  </div>
</template>
