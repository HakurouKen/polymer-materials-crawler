import RssSite from '../utils/rss-site'

export default class Cnrs extends RssSite {
  constructor () {
    super('http://www2.cnrs.fr/rss.php?id=all&lang=en', '法国国家科学研究中心')
  }
}
