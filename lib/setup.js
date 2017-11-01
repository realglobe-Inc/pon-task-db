/**
 * Define task to setup database
 * @function setup
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const useDB = require('./helpers/useDB')

/** @lends setup */
function setup (db, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      await Promise.resolve(instance.setup())
    })
  }
}

module.exports = setup
