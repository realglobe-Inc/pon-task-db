/**
 * DB task set for pon
 * @module pon-task-db
 * @version 2.2.0
 */

'use strict'

const define = require('./define')

let lib = define.bind(this)

Object.assign(lib, define, {
  define
})

module.exports = lib
