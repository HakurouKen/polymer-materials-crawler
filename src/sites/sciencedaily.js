import _ from 'lodash'
import RssSite from '../utils/rss-site'

const nameRegex = /(\w+)\.xml$/
function gen (url = '') {
  return class extends RssSite {
    constructor () {
      super(
        `https://rss.sciencedaily.com/${url}`,
        'Science Daily',
        'https://www.sciencedaily.com'
      )
    }

    static get name () {
      return 'ScienceDaily' +
        _.capitalize(_.camelCase(url.match(nameRegex) || [])[1] || '')
    }
  }
}

export default ['matter_energy.xml'].map(gen)
