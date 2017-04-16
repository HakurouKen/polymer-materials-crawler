import _fs from 'fs'
import _ from 'lodash'
import md5 from 'md5'
import Promise from 'bluebird'
import stringify from 'json-stable-stringify'
import Sequelize from 'sequelize'

const fs = ['readFile', 'writeFile', 'stat'].reduce(
  (o, method) => {
    o[method] = Promise.promisify(_fs[method])
    return o
  },
  {}
)

export class NullSaver {
  constructor () {}

  // 用单个信息的 JSON 串的 md5 值作为去重依据
  // 这里要保证 JSON 串生成的 key 顺序，因此不采用原生的 JSON.stringify
  md5 (list = []) {
    let data = _.cloneDeep(list || [])
    return data.map(item => {
      item.md5 = md5(stringify(item))
      return item
    })
  }

  append (data) {
    data = this.md5(data)
    console.log(data)
  }
}

export class FileSaver extends NullSaver {
  constructor (filepath) {
    super()
    this.filepath = filepath
    this._data = []
  }

  getData () {
    return this._data.length
      ? this._data
      : fs
          .readFile(this.filepath)
          .then(content => {
            return JSON.parse(content)
          })
          // 静默处理错误，文件不存在 / JSON解析错误 都直接以空列表覆盖
          .catch(e => {
            return []
          })
  }

  saveData (data = this._data || []) {
    this._data = data
    return fs.writeFile(this.filepath, JSON.stringify(data, null, 4))
  }

  async append (data) {
    data = this.md5(data)
    const olds = await this.getData()
    data = _.uniqBy(olds.concat(data), 'md5')
    return this.saveData(data)
  }
}

export class FileDelegateSaver extends FileSaver {
  constructor (filepath) {
    super(filepath)
  }

  saveData (data = this._data || []) {
    this._data = data
  }

  commit () {
    super.saveData(this._data)
  }
}

export class SqlSaver extends NullSaver {
  constructor (database, username, password, options) {
    super()
    // sequelize 库已经做了伪协议 / option 参数的兼容，这里可以直接传参
    this.db = new Sequelize(database, username, password, options)
    const News = this.db.define(
      'news',
      {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        md5: {type: Sequelize.STRING(32), unique: true},
        title: {type: Sequelize.STRING(1024), allowNull: false},
        url: {type: Sequelize.STRING(1024), validate: {isUrl: true}, allowNull: false},
        domain: {type: Sequelize.STRING(1024), validate: {isUrl: true}},
        source: {type: Sequelize.STRING(128), allowNull: false},
        // 时间以 `yyyy-MM-dd` 的字符串格式储存
        time: {type: Sequelize.STRING(10), validate: {
          date: function (value) {
            if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              throw new Error('Invalid date.')
            }
          }
        }},
        summary: {type: Sequelize.TEXT},
        img: {type: Sequelize.STRING(1024), validate: {isUrl: true}}
      }
    )
    this.Model = News
  }

  async sync () {
    return this.Model.sync({
      logging: false
    })
  }

  async append (data) {
    data = this.md5(data)
    return this.Model.bulkCreate(data, {
      ignoreDuplicates: true,
      logging: false
    })
  }
}

export default {
  NullSaver,
  FileSaver,
  FileDelegateSaver,
  SqlSaver
}
