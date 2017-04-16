import Site from '../utils/site'

export default class Mpg extends Site {
  constructor () {
    super(`https://www.mpg.de/research-news`, '德国马普学会')
  }

  processor ($) {
    return $('#main .research_publication .content')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('h3 a')

        return {
          title: $title,
          url: $title,
          time: $elem.find('.date'),
          summary: $elem.find('p').last().text().replace(/\[more\]\s*$/, ''),
          img: $elem.find('img')
        }
      })
      .get()
  }
}
