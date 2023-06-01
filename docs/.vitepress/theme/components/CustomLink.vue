<script setup lang="ts">
import { computed } from 'vue'
import { EXTERNAL_URL_RE, normalizeLink } from '../utils/md'

interface ILink {
  href: string
  title: string
  target?: string
  rel?: string
  tag?: string
}

const { href, title, tag = 'a', rel, target } = defineProps<ILink>()

const isBilibili = /bilibili\.com/.test(href)
const isYoutube = /youtube\.com/.test(href)
const isGithub = /github\.com/.test(href)
const isZSXQ = /zsxq\.com/.test(href)

const isExternal = computed(() => href && EXTERNAL_URL_RE.test(href))

const component = computed(() => {
  if (tag)
    return tag

  return href ? 'a' : 'button'
})
</script>

<template>
  <component
    :is="component" :href="href ? normalizeLink(href) : undefined" :target="target || (isExternal ? '_blank' : undefined)"
    :rel="rel || (isExternal ? 'noreferrer' : undefined)" class="custom-link"
  >
    <section
      class="flex flex-col border-1 border-neutral-400 border-solid rounded-md p-4 gap-4 transition  dark:border-neutral-600
  cursor-pointer my-4" :class="{
    'hover:bg-blue-300 dark:hover:bg-blue-400': isBilibili,
    'hover:bg-rose-300 dark:hover:bg-red-400': isYoutube,
    'hover:bg-slate-300 dark:hover:bg-slate-400': isGithub,
    'hover:bg-emerald-300 dark:hover:bg-emerald-400': isZSXQ,
      }" @click="() => {
      }
      "
    >
      <span class="text-ellipsis w-[90%] whitespace-nowrap overflow-hidden dark:opacity-90 font-600">{{ title }}</span>
      <div class="flex item-center justify-between">
        <div class="flex items-center gap-1">
          <tabler:brand-bilibili v-if="isBilibili" class="text-blue-600 w-8 h-8 " />
          <fe:youtube v-if="isYoutube" class="text-red-600 w-8 h-8" />
          <bi:github v-if="isGithub" class="text-slate-600 w-8 h-8" />
          <ph:planet-fill v-if="isZSXQ" class="text-emerald-600 w-8 h-8" />
          <span class="text-ellipsis w-full whitespace-nowrap overflow-hidden text-sm opacity-75 font-500">{{ href
          }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span
            class="text-ellipsis w-full whitespace-nowrap overflow-hidden text-sm font-500 opacity-50"
          >chodocs.cn</span>
        </div>
      </div>
    </section>
  </component>
</template>

<style scoped>
.custom-link {
  color: unset;
  font-weight: normal;
  text-decoration-style: none;
}
.custom-link:hover{
  text-decoration: none;
}
</style>
