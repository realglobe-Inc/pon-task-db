/**
 * Define task to setup database
 * @function setup
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const co = require('co')

/** @lends setup */
function setup (db, options = {}) {
  return function task (ctx) {
    const { logger } = ctx
    return co(function * () {
      const newInstance = typeof db === 'function'
      const instance = newInstance ? db() : db

      yield Promise.resolve(instance.setup())

      if (newInstance) {
        yield instance.close()
      }
    })
  }
}

module.exports = setup
