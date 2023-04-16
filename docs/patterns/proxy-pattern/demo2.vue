<script setup lang="ts">
import { ref } from 'vue'

const initAge = 22

const person = {
  name: 'John Doe',
  age: initAge,
  nationality: 'American',
}

const log = ref('')
const personObj = ref(person)

const personProxy = new Proxy(person, {
  get: (obj: Record<string, string | number>, prop: string) => {
    if (!obj[prop])
      log.value = 'Hmm.. this property doesn\'t seem to exist'
    else
      log.value = `The value of ${prop} is ${obj[prop]}`
  },
  set: (obj: Record<string, string | number>, prop: string, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      log.value = 'Sorry, you can only pass numeric values for age.'
    }
    else if (prop === 'name' && value.length < 2) {
      log.value = 'You need to provide a valid name.'
    }
    else {
      log.value = `Changed ${prop} from ${obj[prop]} to ${value}.`
      obj[prop] = value
    }
    return true
  },
})

function reset() {
  log.value = ''
  person.age = initAge
}
</script>

<template>
  <pre>{{ personObj }}</pre>

  <button @click="personProxy.nonExistentProperty;">
    get nonExistentProperty
  </button>

  <button @click="personProxy.age = 44">
    set age = 44
  </button>

  <button @click="personProxy.name = ''">
    set name = ''
  </button>

  <button class="gray" @click="reset">
    reset
  </button>

  <p v-if="log">
    log message: {{ log }}
  </p>
</template>
