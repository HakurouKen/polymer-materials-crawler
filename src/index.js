import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {SqlSaver as Saver} from './utils/saver'
import DB from '../db.privacy'
import ProgressBar from 'progress'

const files = fs.readdirSync(path.join(__dirname, './sites'));

(async () => {
  let SiteConstructors = _.flatten(
    files.map(f => require(`./sites/${f}`).default)
  )
  try {
    const saver = new Saver(DB.database, DB.username, DB.password, {
      host: DB.host,
      port: DB.port,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    })
    console.log('Syncing database...')
    await saver.sync()
    console.log('Start download...')
    let bar = new ProgressBar('[:bar] :percent Site :site', {
      total: SiteConstructors.length
    })
    for (let Site of SiteConstructors) {
      const site = new Site()
      const data = await site.get()
      bar.tick({
        site: Site.name
      })
      await saver.append(data)
    }
    console.log('Download finish.')
  } catch (e) {
    console.log(e, e.stack)
  }
})()
