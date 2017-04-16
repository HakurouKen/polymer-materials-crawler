import RssSite from '../utils/rss-site'

class NanowerkSpotlight extends RssSite {
  constructor () {
    super(
      'http://feeds.nanowerk.com/NanowerkNanotechnologySpotlight',
      'Nanowerk',
      'http://www.nanowerk.com'
    )
  }
}

class NanowerkNews extends RssSite {
  constructor () {
    super(
      'http://feeds.nanowerk.com/nanowerk/agWB',
      'Nanowerk',
      'http://www.nanowerk.com'
    )
  }
}

export default [NanowerkSpotlight, NanowerkNews]
