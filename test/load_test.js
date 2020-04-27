/**
 * @file Test case for load.
 * Runs with mocha.
 */
'use strict'

const load = require('../lib/load.js')
const theDB = require('@the-/db')
const ponContext = require('pon-context')

describe('load', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Load', async () => {
    const createDB = () => theDB({
      dialect: 'sqlite',
      storage: `${__dirname}/../tmp/testing-migration/test-load.db`
    })
    const db = createDB()

    const ctx = ponContext({})
    const task = load(db, `${__dirname}/../misc/mocks/mock-sql-02.sql`)
    await task(ctx)

    await db.close()
  })
})

/* global describe, before, after, it */
