import url from 'url'
import _ from 'lodash'
import Site from '../utils/site'
import Promise from 'bluebird'

export default class Ncsu extends Site {
  constructor () {
    super('http://www.purdue.edu/newsroom/research/', '普渡大学')
    this.archiveUrl = 'http://www.purdue.edu/newsroom/research/archive.html'
  }

  async list () {
    const [$, archive$] = await Promise.all([
      this.$get(this.url),
      this.$get(this.archiveUrl)
    ])
    return this.processor($, archive$)
  }

  processor ($, archive$) {
    let details = {}
    $('.maincontent h2').each((i, elem) => {
      const $elem = $(elem)
      const href = url.resolve(this.url, $elem.find('a').attr('href'))
      details[href] = {
        summary: $elem.next().text(),
        img: $elem.find('img').attr('src') || ''
      }
    })

    let archives = archive$('.maincontent li')
      .map((i, elem) => {
        const $elem = archive$(elem)
        const $title = $elem.find('a')
        const link = url.resolve(this.archiveUrl, $title.attr('href'))

        return _.assign(details[link], {
          title: $title.text(),
          url: link,
          // chrono 默认是美式时间(月/日/年)，这里可以正常转换
          time: $elem.contents().last().text()
        })
      })
      .get()

    return archives
  }
}
