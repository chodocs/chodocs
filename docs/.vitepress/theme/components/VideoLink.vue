<script setup lang="ts">
const props = defineProps<{
  bvId: string
}>()
const link = `https://www.bilibili.com/video/${props.bvId}/`
</script>

<template>
  <div class="video_link">
    <a :href="link" target="_blank" bg-blue:10 px4 py3 rounded block mt2 flex items-center gap2>
      <div i-carbon:play-filled flex-none text-lg />
      <slot />
    </a>
  </div>
</template>
