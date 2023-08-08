<script setup lang="ts">
import { computed } from 'vue'
import { EXTERNAL_URL_RE, normalizeLink } from '../utils/md'

interface ILink {
  href: string
  title: string
  target?: string
  rel?: string
  tag?: string
  desc?: string
}

const { href, title, tag = 'a', rel, target, desc } = defineProps<ILink>()

const hrefSource = computed(() => {
  if (/bilibili\.com/.test(href))
    return 'bilibili'
  if (/juejin\.cn/.test(href))
    return 'juejin'
  if (/mp\.weixin\.qq/.test(href))
    return 'mpwx'
  if (/weread\.qq\.com/.test(href))
    return 'weread'
  else if (/youtube\.com/.test(href))
    return 'youtube'
  else if (/github\.com/.test(href))
    return 'github'
  else if (/zsxq\.com/.test(href))
    return 'zsxq'
  else if (/vercel/.test(href))
    return 'vercel'
  else if (/next[-]?js/.test(href))
    return 'nextjs'
  else if (/typescript/.test(href))
    return 'typescript'
  else if (/react[-]?query/.test(href))
    return 'react-query'
  else if (/react/.test(href))
    return 'react'
  else if (/stackoverflow/.test(href))
    return 'stackoverflow'
  else return 'web'
})

const isExternal = computed(() => href && EXTERNAL_URL_RE.test(href))

const component = computed(() => {
  if (tag)
    return tag

  return href ? 'a' : 'button'
})
</script>

<template>
  <component
    :is="component" v-if="isExternal" :href="href ? normalizeLink(href) : undefined"
    :target="target || (isExternal ? '_blank' : undefined)" :rel="rel || (isExternal ? 'noreferrer' : undefined)"
    class="custom-link"
  >
    <div class="custom-wrap rounded-lg p-px dark:shadow-lg shadow-black/20 my-4 border-zinc-300 border-solid border-px">
      <div class="rounded-lg dark:bg-black">
        <section class="flex group flex-col rounded-md p-4 gap-3 transition duration-500 cursor-pointer ">
          <span
            class="text-ellipsis w-[90%] whitespace-nowrap overflow-hidden dark:opacity-90 font-600 group-hover:text-[#06f]"
          >{{
            title }}</span>
          <div v-if="desc" class="opacity-75 font-500 text-sm">
            {{ desc
            }}
          </div>
          <div class="flex item-center justify-between">
            <div class="flex items-center gap-1 w-full max-w-[75%]">
              <tabler:brand-bilibili v-if="hrefSource === 'bilibili'" class="text-blue-600 w-8 h-8 " />
              <uiw:weixin v-if="hrefSource === 'weread'" class="text-blue-600 w-8 h-8 " />
              <fe:youtube v-if="hrefSource === 'youtube'" class="text-red-600 w-8 h-8" />
              <bi:github v-if="hrefSource === 'github'" class="text-slate-600 w-7 h-7" />
              <ph:planet-fill v-if="hrefSource === 'zsxq'" class="text-emerald-600 w-8 h-8" />
              <uiw:weixin v-if="hrefSource === 'mpwx'" class="text-emerald-600 w-8 h-8" />
              <skill-icons:vercel-dark v-if="hrefSource === 'vercel'" class="text-zinc-800 w-7 h-7" />
              <teenyicons:nextjs-solid v-if="hrefSource === 'nextjs'" class="text-zinc-800 w-7 h-7" />
              <tabler:brand-juejin v-if="hrefSource === 'juejin'" class="text-blue-600 w-7 h-7" />
              <skill-icons:typescript v-if="hrefSource === 'typescript'" class="w-7 h-7" />
              <logos:react-query-icon v-if="hrefSource === 'react-query'" class="w-7 h-7" />
              <skill-icons:react-dark v-if="hrefSource === 'react'" class="w-7 h-7" />
              <skill-icons:stackoverflow-dark v-if="hrefSource === 'stackoverflow'" class="w-7 h-7" />
              <icon-park:add-web v-if="hrefSource === 'web'" class="w-7 h-7" />
              <span class="text-ellipsis w-full whitespace-nowrap overflow-hidden text-sm opacity-75 font-500">{{ href
              }}</span>
            </div>
            <div class="items-center gap-1 hidden sm:flex">
              <span
                class="text-ellipsis w-full whitespace-nowrap overflow-hidden text-sm font-500 opacity-50"
              >chodocs.cn</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </component>
  <component :is="component" v-else :href="href ? normalizeLink(href) : undefined" class="internal-link">
    {{ title }}
  </component>
</template>

<style scoped>
.custom-link {
  color: unset;
  font-weight: normal;
  text-decoration-style: none;
}

.dark .custom-link {
  color: white;
}

.dark .custom-wrap {
  border: unset;
  background-image: radial-gradient(at left top, #71717a, 50px, #27272a 50%);
}

.custom-link:hover {
  text-decoration: none;
}

.internal-link {
  color: var(--vp-c-brand);
  font-weight: normal;
}

.internal-link:hover {
  cursor: pointer;
}
</style>
