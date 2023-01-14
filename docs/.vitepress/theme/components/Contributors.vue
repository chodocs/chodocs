<script setup lang="ts">
// @ts-expect-error missing types
import _contributors from "/virtual-contributors";
import { computed } from "vue";
import type { ContributorInfo } from "../../metadata";

const props = defineProps<{ doc: string }>();

const contributors = computed(
  () => _contributors[props.doc] || ([] as ContributorInfo[])
);

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`;
const getGithubLink = (name: string) => `https://github.com/${name}`;

const isNotEmpty = (arr: ContributorInfo[]) => Array.isArray(arr) && arr.length;

</script>

<template>
  <div class="flex flex-wrap gap-4 pt-2">
    <div v-if="isNotEmpty(contributors)" v-for="c of contributors" :key="c.hash" class="flex gap-2 items-center">
      <a :href="getGithubLink(c.name)" rel="noreferrer" target="_blank">
        <img :src="getAvatarUrl(c.name)" class="w-8 h-8 rounded-full" />
      </a>
      {{ c.name }}
    </div>
    <div v-else class="flex gap-2 items-center">
      <a href="https://github.com/Chocolate1999" rel="noreferrer" target="_blank">
        <img src="https://github.com/Chocolate1999.png" class="w-8 h-8 rounded-full" />
      </a>
      {{ 'Choi Yang' }}
    </div>
  </div>
</template>
