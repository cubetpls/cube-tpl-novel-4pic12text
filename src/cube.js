import Slider from './components/Slider/index.js'

export default {
  data: {
    loading: true,
    picList: [],
    textList: []
  },
  onLoad() {
    this.createComponent(Slider)
  },
  onReady() {
    this.request({
      api: 'list',
      complete: (offlineData, res) => {
        const _this = this
        _this.setData({
          loading: false
        });

        if (res && res.errno === 0 && res.data && res.data.tag && res.data.tag.length > 0) {
          const data = res.data.tag.slice(0, 16)
          const fmtData = _this.formatData(data)
          _this.setStorage({
            key: 'data',
            data: fmtData
          })

          _this.handleData(fmtData)
        } else {
          _this.getStorage({
            key: 'data',
            success (res) {
              const data = res || offlineData
              _this.handleData(data)
            }
          })
        }
      }
    })
  },

  formatData (data) {
    return data.map(item => {
      return {
        name: `${item.name}故事`,
        pic: item.pic || '',
        link: `https://story.hao.360.cn/?tag=${encodeURIComponent(item.name)}`,
      }
    })
  },

  handleData (data) {
    this.setData({
      picList: data.slice(0, 4),
      textList: data.slice(4, 16)
    })
  }
};
