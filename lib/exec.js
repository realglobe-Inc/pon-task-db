/**
 * Define task to exec database
 * @function exec
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const useDB = require('./helpers/useDB')

/** @lends exec */
function exec (db, sql, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      await Promise.resolve(instance.exec(sql))
    })
  }
}

module.exports = exec
