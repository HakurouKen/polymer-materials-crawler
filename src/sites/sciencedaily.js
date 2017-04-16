import _ from 'lodash'
import RssSite from '../utils/rss-site'

const nameRegex = /\/(.*)\.xml$/
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
      return _.capitalize((url.match(nameRegex) || [])[1] || '')
    }
  }
}

export default [
  'top/science.xml',
  'top/health.xml',
  'top/technology.xml',
  'top/environment.xml'
].map(gen)
