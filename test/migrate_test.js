/**
 * Test case for migrate.
 * Runs with mocha.
 */
'use strict'

const migrate = require('../lib/migrate.js')
const theDB = require('the-db')
const ponContext = require('pon-context')
const asleep = require('asleep')

describe('migrate', function () {
  this.timeout(12000)

  before(async () => {

  })

  after(async () => {

  })

  it('Migrate', async () => {
    const createDB = () => theDB({
      dialect: 'sqlite',
      storage: `${__dirname}/../tmp/testing-migration/test-data.db`
    })
    const db = createDB()
    const Hoge = db.resource('Hoge')
    await Hoge.create({
      name: 'hoge'
    })
    const ctx = ponContext()
    const task = migrate(createDB, {
      async 'none' (db) {
        console.log('none')
        await db.updateVersion('hoge')
      },
      async 'hoge' () {
        console.log('hoge')
        await db.updateVersion('nonono')
      }
    }, {
      // snapshot: `${__dirname}/../tmp/testing-migration/snapshot`
    })

    await task(ctx)
    await asleep(200)
    await db.drop()
  })
})

/* global describe, before, after, it */
