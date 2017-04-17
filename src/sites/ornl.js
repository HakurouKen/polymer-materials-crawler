import _ from 'lodash'
import Site from '../utils/site'
import time from '../utils/time'

export default class Ornl extends Site {
  constructor () {
    super('https://www.ornl.gov/news', '美国橡树岭国家实验室')
  }

  processor ($) {
    return $('.view-ornlgov-news-releases-view .views-row')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.views-field-title a')

        let content = $elem
          .find('.views-field-body .field-content')
          .text()
          .trim()
        // 只取前 64 个字符判断
        const timeParseResult = time.extract(content.slice(0, 64))[0]

        if (timeParseResult) {
          content = _.last(_.split(content, timeParseResult.text, 2)).replace(
            /^[\W]+/,
            ''
          )
        }
        return {
          title: $title,
          url: $title,
          time: timeParseResult && timeParseResult.date,
          summary: content,
          img: $elem.find('.img-responsive')
        }
      })
      .get()
  }
}
