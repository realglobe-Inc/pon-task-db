/**
 * Test case for setup.
 * Runs with mocha.
 */
'use strict'

const setup = require('../lib/setup.js')
const assert = require('assert')
const ponContext = require('pon-context')
const theDB = require('the-db').default


describe('setup', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Setup', async () => {
    const db = theDB({})

    const ctx = ponContext()
    const task = setup(() => db)

    await task(ctx)
  })
})

/* global describe, before, after, it */
