import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {SqlSaver as Saver} from './utils/saver'
import DB from '../db.privacy'

const files = fs.readdirSync(path.join(__dirname, './sites'));

(async () => {
  let SiteConstructors = _.flatten(
    files.map(f => require(`./sites/${f}`).default)
  )
  try {
    const saver = new Saver(DB.database, DB.username, DB.password, {
      host: DB.host,
      port: DB.port
    })
    await saver.sync()
    for (let Site of SiteConstructors) {
      const site = new Site()
      const data = await site.get()
      await saver.append(data)
    }
  } catch (e) {
    console.log(e, e.stack)
  }
})()
