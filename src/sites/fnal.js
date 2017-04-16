import Site from '../utils/site'

export default class Fnal extends Site {
  constructor () {
    super(
      'http://news.fnal.gov/newsroom/news/',
      '费米国家加速器实验室',
      'https://www.fnal.gov'
    )
  }

  processor ($) {
    return $('#archive-results .fnal-article')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.entry-title a')
        return {
          title: $title,
          url: $title,
          time: $elem.find('.published'),
          summary: $elem.find('.entry-description'),
          img: $elem.find('.col-thumbnail img')
        }
      })
      .get()
  }
}
