import RssSite from '../utils/rss-site'

export default class Sandia extends RssSite {
  constructor () {
    super(
      'https://share-ng.sandia.gov/news/resources/news_releases/feed/',
      '桑迪亚国家实验室',
      'http://www.sandia.gov'
    )
  }
}
