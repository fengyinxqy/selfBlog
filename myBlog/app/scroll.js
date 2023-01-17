import IScroll from 'iscroll'
//初始化IScroll
let oCon = document.querySelector('.blog-container')
oCon.addEventListener('touchmove', (e) => {
  e.preventDefault()
}, false)
let scroll = new IScroll('.blog-container', {
  mouseWheel: true,
})
export default scroll