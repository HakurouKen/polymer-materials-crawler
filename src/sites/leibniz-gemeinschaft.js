import Site from '../utils/site'

export default class LeibnizGemeinschaft extends Site {
  constructor () {
    super('https://www.leibniz-gemeinschaft.de/en/media/news/', '德国莱布尼兹科学联合会')
  }

  processor ($) {
    return $('.news-container .news-item').map((i, elem) => {
      const $elem = $(elem)
      const $title = $elem.find('h3 a')
      const $subheader = $elem.find('.subheader')
      const dateArr = ($elem.find('.news-date').text() || '').trim()
        .split('/')

      return {
        title: $title,
        url: $title,
        time: `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`,
        summary: $subheader.text().replace(/more info\s*?$/, ''),
        img: $subheader.find('img')
      }
    }).get()
  }
}
