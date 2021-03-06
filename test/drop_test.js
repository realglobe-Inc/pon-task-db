/**
 * @file Test case for drop.
 * Runs with mocha.
 */
'use strict'

const drop = require('../lib/drop.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const theDB = require('@the-/db')



describe('drop', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Drop', async () => {
    const db = theDB({})

    db.resource('User', {})
    db.resource('Org', {})

    let ctx = ponContext()
    let task = drop(() => db)

    await task(ctx)
  })
})

/* global describe, before, after, it */
