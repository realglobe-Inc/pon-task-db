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

  before(async () => {

  })

  after(async () => {

  })

  it('Define', async () => {
    const db = theDB({})

    db.resource('User', {})
    db.resource('Org', {})
    let ctx = ponContext()
    let task = define({
      seed: [ db, '*.seed.json', {} ],
      drop: [ db ]
    })
    ok(task)

    await Promise.resolve(task(ctx))
  })
})

/* global describe, before, after, it */
