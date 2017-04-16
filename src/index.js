import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {FileSaver as Saver} from './utils/saver'

const files = fs.readdirSync(path.join(__dirname, './sites'));

(async () => {
  let SiteConstructors = _.flatten(
    files.map(f => require(`./sites/${f}`).default)
  )
  try {
    const saver = new Saver(path.join(__dirname, '../news.json'))
    for (let Site of SiteConstructors) {
      const site = new Site()
      const data = await site.get()
      await saver.append(data)
    }
  } catch (e) {
    console.log(e, e.stack)
  }
})()
