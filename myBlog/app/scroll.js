/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-11-14 18:14:35
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-18 17:43:59
 * @FilePath: \myBlog\app\scroll.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import IScroll from 'iscroll'
//初始化IScroll
let oCon = document.querySelector('.blog-container')
oCon.addEventListener('touchmove', (e) => {
  e.preventDefault()
}, false)
let scroll = new IScroll('.blog-container', {
  mouseWheel: true,
  // click: true,
  // disableMouse: true,
  disablePointer: true,
  keyBindings: true,
  preventDefault: true,
  // disableTouch: true,
})

scroll.reset = function () {
  scroll.refresh();
  scroll.scroller.style.transform = 'translate(0px, 0px) translateZ(0px)'
  scroll.absStartY = 0
  scroll.startY = 0
  scroll.y = 0
}
export default scroll