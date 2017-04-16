import Site from '../utils/site'

export default class Upenn extends Site {
  constructor () {
    super(
      'https://news.upenn.edu/archives?field_date_value%5Bvalue%5D%5Byear%5D=&field_school_tid=All&field_subject_tid=167',
      '宾夕法尼亚大学',
      'http://www.upenn.edu'
    )
  }

  processor ($) {
    return $('.view-content .container .grid-item')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('b a')
        return {
          title: $title,
          url: $title,
          time: $elem.find('.date-display-single'),
          summary: $elem.find('div').contents().last()
        }
      })
      .get()
  }
}
