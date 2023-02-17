const mountBuSuanZi = () => {
  const gtagScript = document.createElement('script')
  gtagScript.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  gtagScript.async = true
  document.head.appendChild(gtagScript)
}

export default () => {
  if (typeof window !== 'undefined')
    mountBuSuanZi()
}
