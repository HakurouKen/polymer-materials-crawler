import Site from '../utils/site'

function processor ($) {
  return $('#block-system-main .views-table tbody tr')
    .map(function (i, elem) {
      const $tds = $(elem).find('td')
      const $content = $tds.eq(1)
      const $title = $content.find('a')

      return {
        title: $title,
        url: $title,
        time: $tds.eq(2),
        summary: $content.find('p'),
        img: $tds.eq(0).find('img')
      }
    })
    .get()
}

class AnlScience extends Site {
  constructor () {
    super('http://www.anl.gov/science-highlights', '美国阿尔贡国家实验室')
  }

  processor (...args) {
    return processor.apply(this, args)
  }
}

class AnlPress extends Site {
  constructor () {
    super('http://www.anl.gov/press-releases', '美国阿尔贡国家实验室')
  }

  processor (...args) {
    return processor.apply(this, args)
  }
}

export default [AnlScience, AnlPress]
