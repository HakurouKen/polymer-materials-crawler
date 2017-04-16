import Site from '../utils/site'

export default class Battelle extends Site {
  constructor () {
    super('https://www.battelle.org/newsroom/press-releases', '巴特尔纪念研究所')
  }

  processor ($) {
    return $('.news-newsroom .news')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.info a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.date'),
          summary: $elem.find('.summary')
        }
      })
      .get()
  }
}
