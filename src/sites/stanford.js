import Site from '../utils/site'
import time from '../utils/time'

export default class Stanford extends Site {
  constructor () {
    super('http://news.stanford.edu/section/science-technology/')
  }

  processor ($) {
    return $('#post-list .list-item')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('h3 a')
        return {
          title: $title.text().trim(),
          url: $title.attr('href'),
          domain: 'http://www.stanford.edu',
          source: '斯坦福大学',
          time: time.get($elem.find('.meta time').text()),
          summary: $elem.find('.teaser').text().trim(),
          img: $elem.find('.card-photo  img').attr('src') || ''
        }
      })
      .get()
  }
}
