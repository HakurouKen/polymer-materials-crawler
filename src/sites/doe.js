import Site from '../utils/site'

export default class Doe extends Site {
  constructor () {
    super(
      'https://www.netl.doe.gov/newsroom/news-releases/news-listings?cat=all&year=all&month=all',
      '美国国家能源技术国家实验室'
    )
  }

  processor ($) {
    return $('#mainPage .contentBox .testimonial')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('[id="reg_link"]')

        return {
          title: $title,
          url: $title,
          time: $elem.find('span[id]'),
          summary: $elem.text().trim().split('\n').pop() || '',
          img: $elem.find('img')
        }
      })
      .get()
  }
}
