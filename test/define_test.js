/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const {ok} = require('assert')
const theDB = require('the-db').default

describe('define', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Define', async () => {
    const db = theDB({})

    db.resource('User', {})
    db.resource('Org', {})
    const ctx = ponContext()
    const task = define({
      seed: [db, '*.seed.json', {}],
      drop: [db],
      setup: [db],
      dump: [db, `${__dirname}/../tmp/testing-dump`],
      exp: [db, `${__dirname}/../tmp/testing-exp`],
      imp: [db, `${__dirname}/../tmp/testing-exp`]
    })
    ok(task)

    await Promise.resolve(task(ctx))
  })
})

/* global describe, before, after, it */
