import Site from '../utils/site'

export default class Slac extends Site {
  constructor () {
    super(
      'https://www6.slac.stanford.edu/news/news-center.aspx',
      '斯坦福直线加速器中心国家实验室'
    )
  }

  processor ($) {
    return $('.pane-content .views-row')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.views-field-title a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.views-field-created'),
          summary: $elem.find('.views-field-body'),
          img: $elem.find('.views-field-field-image img')
        }
      })
      .get()
  }
}
