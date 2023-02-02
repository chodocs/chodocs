let instance: any
let counter = 0

class Counter {
  constructor() {
    if (instance)
      throw new Error('You can only create one instance!')

    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
const singletonCounter2 = Object.freeze(instance)
export { singletonCounter, singletonCounter2 }
