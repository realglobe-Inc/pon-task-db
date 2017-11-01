/**
 * Test case for exp.
 * Runs with mocha.
 */
'use strict'

const exp = require('../lib/exp.js')
const imp = require('../lib/imp.js')
const {equal} = require('assert')
const theDB = require('the-db')
const ponContext = require('pon-context')
const asleep = require('asleep')

describe('exp', function () {
  this.timeout(13000)

  before(async () => {

  })

  after(async () => {

  })

  it('Exp', async () => {
    const storage = `${__dirname}/../tmp/testing-migration/test-exp.db`
    const dataDir = `${__dirname}/../tmp/testing-exp/test-exp-data`
    const createDB = () => theDB({
      dialect: 'sqlite',
      storage: storage
    })
    const db = createDB()
    const Hoge = db.resource('Hoge')
    await Hoge.drop()
    await Hoge.create({
      name: 'hoge'
    })
    const ctx = ponContext()

    await exp(db, dataDir)(ctx)

    equal(await Hoge.count(), 1)
    await asleep(100)
    await Hoge.drop()
    await asleep(100)
    equal(await Hoge.count(), 0)
    await asleep(100)
    await imp(db, dataDir)(ctx)
    await asleep(100)
    equal(await Hoge.count(), 1)
  })
})

/* global describe, before, after, it */
