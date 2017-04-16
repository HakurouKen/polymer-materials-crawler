import RssSite from '../utils/rss-site'
import time from '../utils/time'

export default class Pnnl extends RssSite {
  constructor () {
    super('http://www.pnnl.gov/news/rss/rss.xml', '西北太平洋国家实验室')
  }
}
