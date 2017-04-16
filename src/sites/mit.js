import Site from '../utils/site'

export default class Mit extends Site {
  constructor () {
    super('http://news.mit.edu/mit-news', '麻省理工学院', 'http://www.mit.edu')
  }

  processor ($) {
    return $('.view-mit-news li a')
      .map((i, elem) => {
        const $elem = $(elem)
        return {
          title: $elem.find('h3'),
          url: $elem,
          time: $elem.find('.date'),
          summary: $elem.find('.dek'),
          img: $elem.find('.cover-image img')
        }
      })
      .get()
  }
}
