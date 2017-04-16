import Site from '../utils/site'

export default class Unist extends Site {
  constructor () {
    super('http://news.unist.ac.kr/category/all-news/research-innovation/', '韩国蔚山科学技术院', 'http://www.unist.ac.kr')
  }

  async processor ($) {
    return $('.blog-post[itemscope]')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.bp-head h2 a')
        return {
          title: $title,
          url: $title,
          time: $elem.find('.date'),
          summary: $elem.find('.bp-head h3'),
          img: $elem.find('.bp-details .post-img img')
        }
      })
      .get()
  }
}
