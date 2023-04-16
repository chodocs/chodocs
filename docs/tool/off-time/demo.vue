<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'

const input_time = ref('')
const start_time = ref('')
const end_time = ref('')
const leftTime = ref({ hour: 0, min: 0, sec: 0 })

function countDown(seconds: number) {
  const hour = Math.floor(seconds / 60 / 60 % 24)
  const min = Math.floor(seconds / 60 % 60)
  const sec = Math.floor(seconds % 60)
  leftTime.value.hour = hour
  leftTime.value.min = min
  leftTime.value.sec = sec
}

function cal() {
  const start_hour = input_time.value.split(':')[0]
  const start_minute = input_time.value.split(':')[1]
  const getHour_Minute_Second = moment().hour(Number(start_hour)).minute(Number(start_minute)).second(0)

  // 上班时间
  const start_time_format = moment(getHour_Minute_Second).format('HH:mm')
  start_time.value = start_time_format

  // 下班时间
  const end_time_format = moment(getHour_Minute_Second).add(9, 'hour').add(30, 'minutes').format('HH:mm')
  end_time.value = end_time_format

  // 当前时间
  const now = moment()

  // 距离下班还有多久
  const how_long_off_minute = moment(getHour_Minute_Second).add(9, 'hour').add(30, 'minutes').diff(now, 'seconds')
  countDown(how_long_off_minute)
}
</script>

<template>
  <div class="flex gap-4">
    <input v-model="input_time" type="text" placeholder="请以英文分号输入时间，示例 9:30">
    <button @click="cal()">
      计算时间
    </button>
  </div>
  <pre v-if="start_time">上班时间：{{ start_time }}</pre>
  <pre v-if="end_time">下班时间：{{ end_time }}</pre>
  <pre
    v-if="leftTime.hour > 0 || leftTime.min > 0 || leftTime.sec > 0"
  >距离下班还有 {{ leftTime.hour }} 时 {{ leftTime.min }} 分 {{ leftTime.sec }} 秒</pre>
</template>
