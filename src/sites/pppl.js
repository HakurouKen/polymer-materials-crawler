import Site from '../utils/site'

export default class Pppl extends Site {
  constructor () {
    super('http://www.pppl.gov/news', '普林斯顿等离子体物理实验室')
  }

  threadProcessor ($dom) {
    const $fields = $dom.find('.field-content')
    return {
      title: $fields.eq(1).text().trim(),
      url: $fields.eq(1).find('a').attr('href'),
      time: $fields.eq(0),
      summary: $dom.find('p'),
      img: $dom.find('img')
    }
  }

  processor ($) {
    const $contents = $('#block-system-main .view-content')

    return [
      this.threadProcessor($contents.eq(0)),
      ...$contents
        .slice(1)
        .find('.views-row')
        .map((i, elem) => {
          return this.threadProcessor($(elem))
        })
        .get()
    ]
  }
}
