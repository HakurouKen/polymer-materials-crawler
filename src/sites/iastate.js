import Site from '../utils/site'

export default class Stanford extends Site {
  constructor () {
    super('http://www.news.iastate.edu', '爱荷华州立大学', 'http://www.iastate.edu')
  }

  processor ($) {
    return $('.article-list')
      .eq(0)
      .find('.article-item')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.article-title a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.article-timestamp'),
          summary: $elem.find('.article-blurb'),
          img: $elem.find('.article-thumb img')
        }
      })
      .get()
  }
}
