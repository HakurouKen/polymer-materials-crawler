import request from 'request'
import cheerio from 'cheerio'
import Promise from 'bluebird'

export function page (url) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: url
      },
      (error, response, body) => {
        if (error) {
          return void reject(error)
        }
        resolve(body)
      }
    )
  })
}

export function pipe (url) {
  return request({
    url: url
  })
}

export function $page (url) {
  return page(url).then(body => cheerio.load(body))
}

export default {
  page,
  $page,
  pipe
}
