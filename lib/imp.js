/**
 * @function imp
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {string} dirname - Dirname import from
 * @returns {function} Defined task
 */
'use strict'

const useDB = require('./helpers/useDB')

/** @lends imp */
function imp (db, dirname, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      return instance.import(dirname)
    })
  }
}

module.exports = imp
