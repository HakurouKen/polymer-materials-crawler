import Site from '../utils/site'

export default class PlasticsNewsEurope extends Site {
  constructor () {
    super('http://www.plasticsnewseurope.com/section/news', 'Plastic News Europe')
  }

  processor ($) {
    return $('.categorized article').map((i, elem) => {
      const $elem = $(elem)
      const $container = $elem.find('a')
      return {
        title: $container.data('title'),
        url: $container.attr('href'),
        time: $elem.find('.updated'),
        summary: $container.find('p').last(),
        img: $container.data('image')
      }
    }).get()
  }
}
