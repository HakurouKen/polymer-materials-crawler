import Site from '../utils/site'

export default class Lbl extends Site {
  constructor () {
    super('http://newscenter.lbl.gov', '劳伦斯伯克利国家实验室', 'http://www.lbl.gov')
  }

  processor ($) {
    let news = $('#content .news-release')
      .map((i, elem) => {
        const $elem = $(elem)
        const $title = $elem.find('.below-feature-inset a')
        return {
          title: $title,
          url: $title,
          time: $elem.find('.news-below-feature'),
          summary: $elem.find('.below-feature-inset p'),
          img: $elem.find('img.wp-post-image')
        }
      })
      .get()

    const $topStory = $('#content .top-story')
    const $topStoryTitle = $topStory.find('.time-title a')
    news = news.concat({
      title: $topStoryTitle,
      url: $topStoryTitle,
      time: $topStory.find('.time-title span'),
      summary: $topStory.find('.feat-excerpt'),
      img: $topStory.find('.home-feat img')
    })
    return news
  }
}
