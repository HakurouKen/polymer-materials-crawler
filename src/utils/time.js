import chrono from 'chrono-node'
import _ from 'lodash'

const timePad = _.partial(_.padStart, _, 2, '0')

export function format (str) {
  const time = str instanceof Date ? str : new Date(str)
  if (isNaN(time.getTime())) {
    return ''
  }
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return `${year}-${timePad(month)}-${timePad(date)}`
}

export function extract (str) {
  const results = chrono.parse(str)
  return results.map(result => {
    return {
      text: (result.text || '').trim(),
      date: format(result.start.date())
    }
  })
}

export function get (str) {
  return (extract(str)[0] && extract(str)[0].date) || null
}

export default {
  format,
  get,
  extract
}
