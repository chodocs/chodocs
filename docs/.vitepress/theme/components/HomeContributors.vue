<script setup lang="ts">
import { contributors } from '../../../contributors'
</script>

<template>
  <div class="vp-doc mx-auto">
    <h2 op50 font-normal pt-5 text-center>
      感谢以下所有人的贡献与参与
    </h2>
    <p op40 font-normal text-center text-sm>
      以下排名不分先后（参与或主动提 PR 申请加入）
    </p>
  </div>
  <div text-lg max-w-200 text-center leading-7 p-10 mx-auto>
    <div flex="~ wrap gap-1" justify-center>
      <a
        v-for="{ name, avatar } of contributors" :key="name" :href="`https://github.com/${name}`" target="_blank" m-0
        rel="noopener noreferrer" :aria-label="`${name} on GitHub`"
      >
        <img
          loading="lazy" :src="avatar" width="40" height="40" rounded-full min-w-10 min-h-10 h-10 w-10
          :alt="`${name}'s avatar`"
        >
      </a>
    </div>
    <br>
  </div>
</template>
