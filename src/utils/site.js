import _url from 'url'
import cheerio from 'cheerio'
import req from './req'
import time from './time'

export default class Site {
  constructor (url, name, site) {
    // 数据源
    this.url = url
    // 网站名称
    this.name = name

    const urlObject = _url.parse(url)
    // 对应域名
    this.domain = `${urlObject.protocol}//${urlObject.host}`
    // 官方网站，如果没有，则取 url 的 domain
    this.site = site || this.domain
  }

  $get (page) {
    return req.$page(page)
  }

  async list () {
    const $ = await this.$get(this.url)
    return this.processor($)
  }

  processor () {
    // 需要被子类重写
    return Promise.resolve([])
  }

  normalizeUrl (url) {
    if (!url) return ''
    return _url.resolve(this.url, url)
  }

  isCheerio (o) {
    return o instanceof cheerio
  }

  async get () {
    const list = await this.list()
    if (!list.length) {
      // @TODO: 空列表告警
      console.error(`${this.name} has no data.`)
    }
    // 格式化得到的数据
    return (
      list
        // 格式化所有参数，并对可能为转化的 cheerio 对象进行对应转化取值
        .map(news => {
          // 新闻标题
          const title = this.isCheerio(news.title)
            ? news.title.text()
            : news.title
          // 新闻连接
          const url = this.isCheerio(news.url)
            ? news.url.attr('href')
            : news.url
          // 日期
          const date = this.isCheerio(news.time) ? news.time.text() : news.time
          // 描述
          const summary = this.isCheerio(news.summary)
            ? news.summary.text()
            : news.summary
          // 图片
          const img = this.isCheerio(news.img)
            ? news.img.attr('src')
            : news.img

          return {
            title: (title || '').trim(),
            url: this.normalizeUrl(url),
            domain: this.site,
            source: this.name || '',
            time: time.get(date),
            // 简介中最多允许四个空格，多于4个空格的部分直接替换
            summary: (summary || '').trim().replace(/\s{4,}/, '    '),
            img: this.normalizeUrl(img)
          }
        })
        .sort((news1, news2) => {
          return +(news1.time < news2.time) || +(news1.time === news2.time) - 1
        })
    )
  }
}
