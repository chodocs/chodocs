<script setup lang="ts">
import { ref } from 'vue'

const initAge = 42
const initName = 'John Doe'

const person = {
  name: initName,
  age: initAge,
  nationality: 'American',
}

const log = ref('')
const personObj = ref(person)

const personProxy = new Proxy(person, {
  get: (obj: Record<string, string | number>, prop: string) => {
    log.value = `The value of ${prop} is ${Reflect.get(obj, prop)}`
  },
  set: (obj: Record<string, string | number>, prop: string, value) => {
    log.value = `Changed ${prop} from ${obj[prop]} to ${value}`
    return Reflect.set(obj, prop, value)
  },
})

function reset() {
  log.value = ''
  person.name = initName
  person.age = initAge
}
</script>

<template>
  <pre>{{ personObj }}</pre>

  <button @click="personProxy.name">
    get name
  </button>

  <button @click="personProxy.age = 43">
    set age = 43
  </button>

  <button @click="personProxy.name = 'Chocolate'">
    set name = 'Chocolate'
  </button>

  <button class="gray" @click="reset">
    reset
  </button>

  <p v-if="log">
    log message: {{ log }}
  </p>
</template>
