/**
 * Test case for drop.
 * Runs with mocha.
 */
'use strict'

const drop = require('../lib/drop.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const theDB = require('the-db')

const co = require('co')

describe('drop', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Drop', () => co(function * () {
    const db = theDB({})

    db.resource('User', {})
    db.resource('Org', {})

    let ctx = ponContext()
    let task = drop(() => db)

    yield task(ctx)
  }))
})

/* global describe, before, after, it */
