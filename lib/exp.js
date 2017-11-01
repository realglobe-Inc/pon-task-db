/**
 * @function exp
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {string} dirname - Dirname export from
 * @returns {function} Defined task
 */
'use strict'

const useDB = require('./helpers/useDB')

/** @lends exp */
function exp (db, dirname, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      return instance.export(dirname)
    })
  }
}

module.exports = exp
