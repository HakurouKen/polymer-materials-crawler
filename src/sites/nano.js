import Site from '../utils/site'

export default class Nano extends Site {
  constructor () {
    super('http://www.nano.gov/newsroom/nano-news', '国家纳米技术机构')
  }

  async processor (page$) {
    let iframe = page$('.content iframe').attr('src')
    const $ = await this.$get(iframe)
    return $('.article').map((i, elem) => {
      const $container = $(elem).find('table').first().find('td')
      const $title = $container.find('.title a')
      return {
        title: $title,
        url: $title,
        time: $container.find('.date').contents().first()
      }
    }).get()
  }
}
