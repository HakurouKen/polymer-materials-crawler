import Site from '../utils/site'

export default class Jlab extends Site {
  constructor () {
    super('https://www.jlab.org/more-science-news', '托马斯杰斐逊国家加速器实验室')
  }

  processor ($) {
    return $('#block-system-main .view-content .item-list .views-row')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.views-field-title a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.views-field-created'),
          summary: $elem.find('.views-field-body')
        }
      })
      .get()
  }
}
