<script setup lang="ts">
// @ts-expect-error missing types
import _contributors from '/virtual-contributors'
import { computed } from 'vue'
import type { ContributorInfo } from '../../metadata'

const props = defineProps<{ doc: string }>()

const contributors = computed(() => _contributors[props.doc] || [] as ContributorInfo[]);

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

</script>

<template>
  <div class="flex flex-wrap gap-4 pt-2">
    <div v-for="c of contributors" :key="c.hash" class="flex gap-2 items-center">
      <img :src="getAvatarUrl(c.name)" class="w-8 h-8 rounded-full">
      {{ c.name }}
    </div>
  </div>
</template>
