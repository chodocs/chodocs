<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <ContentBox link="#详情" imgSrc='https://github.com/Chocolate1999.png' title='Chocolate 总积分' content='0' />
          </div>
          <div class="col-md-4">
            <ContentBox link="#详情" imgSrc='https://github.com/HearLing.png' title='HearLing 总积分' content='0' />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ContentBox from '../.vitepress/theme/components/ContentBox.vue'

</script>

<style scoped>
.container {
  margin-top: 20px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}

@media (min-width:960px) {
  .row {
    flex-direction: row;
  }
}
</style>