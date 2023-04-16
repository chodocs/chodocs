<script setup lang="ts">
import { ref } from 'vue'

const initAge = 23

const person = {
  name: 'Chocolate',
  age: initAge,
  nationality: 'China',
}

const log = ref('')
const name = ref('')
const age = ref(0)

const personObj = ref(person)

const personProxy = new Proxy(person, {
  get: (obj: Record<string, string | number>, prop: string) => {
    log.value = `The value of ${prop} is ${obj[prop]}`
  },
  set: (obj: Record<string, string | number>, prop: string, value) => {
    log.value = `Changed ${prop} from ${obj[prop]} to ${value}`
    obj[prop] = value
    return true
  },
})

function reset() {
  log.value = ''
  name.value = ''
  age.value = 0
  person.age = initAge
}
</script>

<template>
  <pre>{{ personObj }}</pre>

  <button @click="(name = personProxy.name as string)">
    get name
  </button>
  <button @click="(age = (personProxy.age = 18))">
    set age
  </button>
  <button class="gray" @click="reset">
    reset
  </button>
  <p v-if="log">
    log message: {{ log }}
  </p>
</template>
