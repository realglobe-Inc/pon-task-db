/**
 * Test case for migrate.
 * Runs with mocha.
 */
'use strict'

const migrate = require('../lib/migrate.js')
const assert = require('assert')
const theDB = require('the-db')
const ponContext = require('pon-context')

describe('migrate', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Migrate', async () => {
    const db = theDB({})
    const ctx = ponContext()

    const task = migrate(() => db, {
      async 'none' (db) {
        await db.updateVersion('hoge')
      },
      async 'hoge' () {
        await db.updateVersion('foo')
      }
    })

    await task(ctx)
  })
})

/* global describe, before, after, it */
