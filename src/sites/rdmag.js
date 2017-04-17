import Site from '../utils/site'

class Rdmag extends Site {
  constructor (url) {
    super(url, 'R&D Magazine')
  }

  processor ($) {
    return (
      $('#block-system-main .views-row')
        // 去掉头条
        .slice(2)
        .map((i, elem) => {
          const $elem = $(elem)
          const $title = $elem.find('.views-field-field-brightcove-url a')
          return {
            title: $title,
            url: $title,
            time: $elem.find('.listing-page-date'),
            summary: $elem.find('.listing-page-field-summary'),
            img: $elem.find('.listing-page-featured-image img')
          }
        })
        .get()
    )
  }
}

export default [
  class RdmagMaterialsScience extends Rdmag {
    constructor () {
      super('http://www.rdmag.com/topics/materials-science')
    }
  },

  class RdmagNanotechnology extends Rdmag {
    constructor () {
      super('http://www.rdmag.com/topics/nanotechnology')
    }
  }
]
