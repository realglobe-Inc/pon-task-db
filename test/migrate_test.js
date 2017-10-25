/**
 * Test case for migrate.
 * Runs with mocha.
 */
'use strict'

const migrate = require('../lib/migrate.js')
const theDB = require('the-db')
const ponContext = require('pon-context')

describe('migrate', function () {
  this.timeout(12000)

  before(async () => {

  })

  after(async () => {

  })

  it('Migrate', async () => {
    const db = theDB({
      dialect: 'sqlite',
      storage: `${__dirname}/../tmp/testing-migration/test-data.db`
    })

    const Hoge = db.resource('Hoge')
    await Hoge.create({
      name: 'hoge'
    })
    const ctx = ponContext()

    const task = migrate(() => db, {
      async 'none' (db) {
        console.log('none')
        await db.updateVersion('hoge')
      },
      async 'hoge' () {
        console.log('hoge')
        await db.updateVersion('foo')
      }
    }, {
      // snapshot: `${__dirname}/../tmp/testing-migration/snapshot`
    })

    await task(ctx)
    await task(ctx)

    await db.drop()
    await db.close()

  })
})

/* global describe, before, after, it */
