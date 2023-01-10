declare global {
  interface Window {
    _hmt: any
  }
}


declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}