/**
 * Test case for migrate.
 * Runs with mocha.
 */
'use strict'

const migrate = require('../lib/migrate.js')
const theDB = require('the-db').default
const ponContext = require('pon-context')
const asleep = require('asleep')

describe('migrate', function () {
  this.timeout(22000)

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
        await db.updateVersion('fuge')
      },
      async 'fuge' () {
        console.log('hoge')
        await db.updateVersion('2.0.0')
      }
    }, {
      // snapshot: `${__dirname}/../tmp/testing-migration/snapshot`
    })

    await task(ctx)
    await asleep(200)
    await db.drop()
  })

  it('With Memory Driver', async () => {
    const createDB = () => theDB({
      dialect: 'memory',
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
        await db.updateVersion('fuge')
      },
      async 'fuge' () {
        console.log('hoge')
        await db.updateVersion('2.0.0')
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
