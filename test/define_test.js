/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const theDB = require('the-db')
const co = require('co')

describe('define', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Define', () => co(function * () {
    const db = theDB({})
    let ctx = ponContext()
    let task = define({
      seed: [ db, '*.seed.json', {} ]
    })
    ok(task)

    yield Promise.resolve(task(ctx))
  }))
})

/* global describe, before, after, it */
