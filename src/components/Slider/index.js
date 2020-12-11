import './index.css'

const TPL = [
  '<ul class="slider-wrap" c-style=\'{"width": width+"px", "height": height+"px"}\' ref="sliderWrap">',
    '{{#list list as item by item_index}}',
      '<li class="item" on-mouseenter="{{this.mEnterHandle(item_index)}}" on-mouseleave="{{this.mLeaveHandle(item_index)}}">',
        '<a href="{{item.link}}">',
          '<img src="{{item.pic | clipImage:\'230_155_75\'}}" alt="">',
          '<span class="title">{{item.name}}</span>',
        '</a>',
      '</li>',
    '{{/list}}',
  '</ul>'
].join('')

export default {
  name: 'cube-slider',
  data: {
    timer: null,
    duration: 5000,
    index: -1,
    maxWidth: 230,
    minWidth: null,
    direction: 'right'
  },
  template: TPL,
  onLoad() {
    //组件编译前
  },
  onReady() {
    //组件渲染后
    this.start()
  },
  start () {
    if (!this.data.autoplay) {
      return
    }

    this.data.timer = this.setTimeout(_ => {
      this.stop()

      if (!this.data.list.length) {
        this.start()
        return
      }

      this.setWidth()
      this.setIndex()
      this.setDirection()
      this.animate()
      this.start()
    }, this.data.duration)
  },

  stop () { 
    this.clearTimeout(this.data.timer)
    this.data.timer = null
  },

  setWidth () {
    if (this.data.minWidth && this.data.averageWidth) {
      return
    }

    this.setData({
      minWidth: (this.data.width - this.data.maxWidth) / (this.data.list.length - 1),
      averageWidth: this.data.width / this.data.list.length
    })
  },

  setIndex () {
    let idx = this.data.direction === 'left'
      ? this.data.index - 1
      : this.data.index + 1

    this.setData({
      index: idx
    })
  },

  setDirection () {
    if (this.data.index === 0) {
      this.data.direction = 'right'
    }

    if (this.data.index >= this.data.list.length - 1) {
      this.data.direction = 'left'
    }
  },

  animate (arg) {
    const $li = this.refs.sliderWrap.querySelectorAll('.item')
    for (let i=0, len = $li.length; i < len; i++) {
      if (arg === 'mleave') {
        $li[i].style.cssText = `width: ${this.data.averageWidth}px;`
      } else {
        if (i === this.data.index) {
          $li[i].style.cssText = `width: ${this.data.maxWidth}px;`
        } else {
          $li[i].style.cssText = `width: ${this.data.minWidth}px;`
        }
      }
    }
  },

  mEnterHandle (index) {
    this.stop()
    
    this.data.index = index
    this.setWidth()
    this.animate()
  },

  mLeaveHandle (index) {
    this.data.index = index
    this.setDirection()
    this.animate('mleave')
    this.start()
  }
}