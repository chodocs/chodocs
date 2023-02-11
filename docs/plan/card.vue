<script setup lang="ts">
import ContentBox from '../.vitepress/theme/components/ContentBox.vue'
</script>

<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <ContentBox
              link="/plan/list2/done.html" img-src="https://github.com/Chocolate1999.png"
              title="Chocolate 总积分" content="105"
            />
          </div>
          <div class="col-md-4">
            <ContentBox
              link="/plan/list1/done.html" img-src="https://github.com/HearLing.png" title="HearLing 总积分"
              content="210"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

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
