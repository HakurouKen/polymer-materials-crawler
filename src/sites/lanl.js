import Site from '../utils/site'
import time from '../utils/time'

export default class Lanl extends Site {
  constructor () {
    super(
      'http://www.lanl.gov/newsroom/news-releases/index.php?source=newsroom',
      '洛斯阿拉莫斯国家实验室'
    )
  }

  processor ($) {
    return $('.all-stories-list li')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('h3 a')
        // 这里的日期有歧义，手动转化
        const rawDate = $elem.find('.date').text()
        const dateArr = (rawDate.match(/(\d+)\/(\d+)\/(\d+)/) || []).slice(1)
        let date = new Date(+('20' + dateArr[2]), +dateArr[0] - 1, +dateArr[1])

        return {
          title: $title,
          url: $title,
          time: time.format(date),
          summary: $elem.find('p').contents().first(),
          img: $elem.find('img')
        }
      })
      .get()
  }
}
