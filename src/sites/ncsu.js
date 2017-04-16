import Site from '../utils/site'

export default class Ncsu extends Site {
  constructor () {
    super(
      'https://news.ncsu.edu/news-releases',
      '北卡罗来纳州立大学',
      'http://www.ncsu.edu'
    )
  }

  processor ($) {
    return $('.archive-index .archive-block')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.article-txt h3')
        return {
          title: $title,
          url: $elem,
          time: $elem.find('.article-txt-meta'),
          summary: $title.next()
        }
      })
      .get()
  }
}
