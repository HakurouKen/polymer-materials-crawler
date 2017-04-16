import Site from '../utils/site'
import time from '../utils/time'

export default class Fraunhofer extends Site {
  constructor () {
    super('https://www.fraunhofer.de/en/press/research-news.html', '德国弗劳恩霍夫协会')
  }

  processor ($) {
    return $('.articles-list li')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.heading h3 a')
        // 英式时间，手动转化
        const dateArr = ($elem.find('p.text-meta .date').text() || '')
          .split('.')
          .map(n => +n)
        const t = new Date(dateArr[2], dateArr[1] - 1, dateArr[0])

        return {
          title: $title,
          url: $title,
          time: time.format(t),
          summary: $elem.find('.text p'),
          img: $elem.find('.image img')
        }
      })
      .get()
  }
}
