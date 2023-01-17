<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <!-- Start Content Box -->
            <div class="content-box">
              <div class="content-box-icon-wrapper">
                <div class="content-box-circle">
                  <div class="content-box-circle-bullet"></div>
                </div>
                <div class="content-box-circle">
                  <div class="content-box-circle-bullet"></div>
                </div>
                <span class="content-box-icon">
                  <img :src="imgSrc" alt="" />
                </span>
              </div>
              <div class="content-box-content-wrapper">
                <h3 class="content-box-title">{{ title }}</h3>
                <div class="content-box-content">
                  {{ content }}
                </div>
              </div>
              <a v-if="!!link" class="content-box-button" href="#">View Details</a>
            </div>
            <!-- End Content Box -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string, content: string, link: { type: string, value: '',required: false}, imgSrc: string }>()
const { title, content, link, imgSrc } = props
</script>

<style scoped>
.content-box {
  background: #ffffff;
  padding: 50px 40px;
  box-shadow: 0 15px 40px rgba(69, 63, 181, 0.1);
  border-radius: 30px;
  text-align: center;
  margin-bottom: 30px;
  transition: 0.3s;
}

.content-box:hover {
  transform: translateY(-10px);
}

.content-box-icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 110px;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  border: 1px solid #6a4bc4;
  box-sizing: content-box;
  border-radius: 50%;
  color: #6a4bc4;
}

.content-box-icon-wrapper::before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  top: 10%;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 25px 0px #6a4bc4, 0px 0px 25px 0px #6a4bc4 inset;
  border-radius: 50%;
  opacity: 0.2;
}

.content-box-circle {
  position: absolute;
  z-index: -1;
  width: 84%;
  height: 84%;
  left: 8%;
  top: 8%;
}

.content-box-circle:nth-child(1) {
  transform: rotate(0deg);
  animation: content-box-rotation 2s infinite linear;
  animation-play-state: paused;
}

.content-box-circle:nth-child(2) {
  transform: rotate(180deg);
  animation: content-box-rotation-2 2s infinite linear;
  animation-play-state: paused;
}

.content-box-circle-bullet {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #6a4bc4;
}

.content-box:hover .content-box-circle:nth-child(1),
.content-box:hover .content-box-circle:nth-child(2) {
  animation-play-state: running;
}

@keyframes content-box-rotation {
  0% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(450deg);
  }
}

@keyframes content-box-rotation-2 {
  0% {
    transform: rotate(-90deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

.content-box-icon {
  line-height: 0;
  font-size: 52px;
}

img {
  vertical-align: middle;
  width: 80px;
}

.content-box-content-wrapper {
  letter-spacing: 1px;
}

.content-box-title {
  font-size: 22px;
  margin: 0 0 20px;
  color: #343a40;
}

.content-box-content {
  color: #858aa7;
  font-size: 16px;
  line-height: 1.6;
}

.content-box-button {
  display: inline-block;
  margin-top: 26px;
  text-decoration: none;
  color: #6a4bc4;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s;
}

.content-box-button:hover {
  color: #333 !important;
}

.content-box.color-2 .content-box-icon-wrapper {
  border: 1px solid #54e0c4;
  color: #54e0c4;
}

.content-box.color-2 .content-box-icon-wrapper::before {
  box-shadow: 0px 0px 25px 0px #54e0c4, 0px 0px 25px 0px #54e0c4 inset;
}

.content-box.color-2 .content-box-circle-bullet {
  background-color: #54e0c4;
}

.content-box.color-2 .content-box-button {
  color: #54e0c4;
}

.content-box.color-3 .content-box-icon-wrapper {
  border: 1px solid #ffb507;
  color: #ffb507;
}

.content-box.color-3 .content-box-icon-wrapper::before {
  box-shadow: 0px 0px 25px 0px #ffb507, 0px 0px 25px 0px #ffb507 inset;
}

.content-box.color-3 .content-box-circle-bullet {
  background-color: #ffb507;
}

.content-box.color-3 .content-box-button {
  color: #ffb507;
}
</style>