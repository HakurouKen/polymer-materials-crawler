import Site from '../utils/site'

export default class Bnl extends Site {
  constructor () {
    super('https://www.bnl.gov/newsroom/results.php', '布鲁克海文国家实验室')
  }

  processor ($) {
    return $('.slats .group')
      .map((i, elem) => {
        const $elem = $(elem)
        return {
          title: $elem.find('.NewsHead'),
          url: $elem.find('.storySummaryLink'),
          time: $elem.find('.NewsDate')
        }
      })
      .get()
  }
}
