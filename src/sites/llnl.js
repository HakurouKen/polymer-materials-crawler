import _ from 'lodash'
import Site from '../utils/site'

export default class Llnl extends Site {
  constructor () {
    super('https://www.llnl.gov/news', '劳伦斯利沃默国家实验室')
  }

  processor ($) {
    return $('#block-system-main .view-content .views-field')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('h3 a')
        const url = $title.attr('href')
        const content = $elem.find('p').text()
        let [date, summary] = _.split(content, '-', 2)
        return {
          title: $title,
          url: $title,
          time: date,
          summary: summary,
          img: $elem.find('.thumbnail img')
        }
      })
      .get()
  }
}
