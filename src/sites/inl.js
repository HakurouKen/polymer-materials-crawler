import Site from '../utils/site'

export default class Inl extends Site {
  constructor () {
    super(
      'https://www.inl.gov/wp-content/themes/inl/minipage-news.php',
      '爱达荷国家实验室'
    )
  }

  processor ($) {
    return $('.result')
      .map((i, elem) => {
        const $elem = $(elem)
        return {
          title: $elem.find('.middle h2'),
          url: $elem.find('.bottom a'),
          time: $elem.find('.date'),
          summary: $elem.find('.middle p').last(),
          img: $elem.find('.middle img')
        }
      })
      .get()
  }
}
