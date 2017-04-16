import Site from '../utils/site'

export default class Epfl extends Site {
  constructor () {
    super('https://actu.epfl.ch/search/mediacom/', '瑞士洛桑联邦理工', 'https://www.epfl.ch')
  }

  processor ($) {
    const dateRegex = /(\d{2})\.(\d{2})\.(\d{2})/
    return $('#content .media-list .media').map((i, elem) => {
      const $elem = $(elem)
      const $title = $elem.find('.media-header a')
      let date = $elem.find('[itemprop="datePublished"]').attr('content')
      const dateArr = (date.match(dateRegex) || []).slice(1)
      date = dateArr.length ? `20${dateArr[2]}-${dateArr[1]}-${dateArr[0]}` : date

      return {
        title: $title,
        url: $title,
        time: date,
        summary: $elem.find('[itemprop="description"]'),
        img: $elem.find('[itemprop="image"]')
      }
    }).get()
  }
}
