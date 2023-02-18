<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
defineProps<{
  readTime: string
  words: string
}>()
const defaultAuthor = 'Choi Yang'
const author = ref(defaultAuthor)

const { frontmatter } = useData()

if (frontmatter.value?.author)
  author.value = frontmatter.value?.author
</script>

<template>
  <div>
    <section
      class="border-b-1 border-[var(--vp-c-divider)] w-full border-b-solid mt-[24px] pb-[12px] flex gap-[12px] mb-[12px] flex-wrap"
    >
      <div class="flex gap-[4px] items-center">
        <octicon:feed-person-16 />
        作者:<span>
          {{ author }}
        </span>
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
        阅读量:<span id="busuanzi_value_page_pv" />
      </div>
    </section>
  </div>
</template>
