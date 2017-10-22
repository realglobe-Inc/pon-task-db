/**
 * Test case for dump.
 * Runs with mocha.
 */
'use strict'

const dump = require('../lib/dump.js')
const ponContext = require('pon-context')
const {ok} = require('assert')
const asleep = require('asleep')
const theDB = require('the-db')

describe('dump', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Dump', async () => {
    const db = theDB({})

    const ctx = ponContext()
    const task = dump(() => db, `${__dirname}/../tmp/testing-dump-dump`, {
      max: 2,
      minInterval: 80
    })

    await task(ctx)
  })
})

/* global describe, before, after, it */
