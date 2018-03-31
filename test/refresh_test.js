/**
 * Test case for refresh.
 * Runs with mocha.
 */
'use strict'

const refresh = require('../lib/refresh.js')
const assert = require('assert')
const ponContext = require('pon-context')
const theDB = require('the-db').default

describe('refresh', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Refresh', async () => {
    const db = theDB({})

    const ctx = ponContext()
    const task = refresh(() => db)

    await task(ctx)
  })
})

/* global describe, before, after, it */
