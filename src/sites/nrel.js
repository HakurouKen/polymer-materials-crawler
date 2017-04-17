import RssSite from '../utils/rss-site'

class NrelNewsRelease extends RssSite {
  constructor () {
    super(
      'http://feeds.feedburner.com/NrelNewsReleases?format=xml',
      '美国国家可再生能源实验室',
      'http://www.nrel.gov'
    )
  }
}

class NrelFeatureStory extends RssSite {
  constructor () {
    super(
      'http://feeds.feedburner.com/NrelFeatureStories?format=xml',
      '美国国家可再生能源实验室',
      'http://www.nrel.gov'
    )
  }
}

export default [NrelNewsRelease, NrelFeatureStory]
