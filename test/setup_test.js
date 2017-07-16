/**
 * Test case for setup.
 * Runs with mocha.
 */
'use strict'

const setup = require('../lib/setup.js')
const assert = require('assert')
const ponContext = require('pon-context')
const theDB = require('the-db')
const co = require('co')

describe('setup', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Setup', async () => {
    const db = theDB({})

    let ctx = ponContext()
    let task = setup(() => db)

    await task(ctx)
  })
})

/* global describe, before, after, it */
