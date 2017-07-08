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

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Setup', () => co(function * () {
    const db = theDB({})

    let ctx = ponContext()
    let task = setup(() => db)

    yield task(ctx)
  }))
})

/* global describe, before, after, it */
