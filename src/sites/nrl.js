import Site from '../utils/site'

export default class Nrl extends Site {
  constructor () {
    super('https://www.nrl.navy.mil/media/news-releases/', '美国海军研究实验室')
  }

  processor ($) {
    return $('#mainColumn .prBlock')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.prTitle a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.prDate'),
          summary: $elem.find('.prText').contents().last(),
          img: $elem.find('.prImage img')
        }
      })
      .get()
  }
}
