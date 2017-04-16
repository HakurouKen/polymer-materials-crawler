import URL from 'url'
import FeedParser from 'feedparser'
import cheerio from 'cheerio'
import Promise from 'bluebird'
import req from './req'
import Site from './site'
import time from './time'

export default class RssSite extends Site {
  constructor (url, name, site) {
    super(url, name, site)
  }

  async list () {
    return new Promise((resolve, reject) => {
      let result = []
      req
        .pipe(this.url)
        .on('error', err => {
          reject(err)
        })
        .pipe(new FeedParser())
        .on('error', error => {
          reject(error)
        })
        .on('readable', function () {
          let item
          while ((item = this.read())) {
            let $ = cheerio.load(item.description || '')
            // 默认取 image 字段作为图片
            let img = item.image || {}
            // 如果没有，则取 enclosures 中的第一张图作为图片
            img = img.url
              ? img
              : (item.enclosures || [])
                  .filter(enclosure => enclosure.type.indexOf('image/') === 0)[
                  0
                ]
            // 如果还是没有，取正文中的第一张图
            img = (img && img.url) || $('img').attr('src') || ''

            result.push({
              title: item.title,
              url: item.link,
              time: time.format(new Date(item.pubDate)),
              summary: $.text(),
              img: img
            })
          }
        })
        .on('end', () => {
          resolve(result)
        })
    })
  }
}
