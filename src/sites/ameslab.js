import Site from '../utils/site'

export default class Ameslab extends Site {
  constructor () {
    super('https://www.ameslab.gov/news/news-releases/', '美国埃姆斯国家实验室')
  }

  processor ($) {
    return $('.view-latest-news-releases .views-row')
      .map(function (i, elem) {
        const $elem = $(elem)
        const $title = $elem.find('.views-field-title a')

        return {
          title: $title,
          url: $title,
          time: $elem
            .find('.views-field-field-news-publish-date')
            .text()
            .trim()
            .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'),
          summary: $elem.find('.views-field-body .field-content'),
          img: $elem.find('img')
        }
      })
      .get()
  }
}
