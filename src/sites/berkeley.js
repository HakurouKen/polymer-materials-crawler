import Site from '../utils/site'

export default class Berkeley extends Site {
  constructor () {
    super(
      'http://news.berkeley.edu/category/research/',
      '加州大学伯克利分校',
      'http://www.berkeley.edu'
    )
  }

  processor ($) {
    return $('#container-for-infinite-scroll article')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.caption')
        return {
          title: $title.find('h3'),
          url: $elem.find('a'),
          time: $title.contents().last(),
          img: $elem.find('.thumbnail img')
        }
      })
      .get()
  }
}
