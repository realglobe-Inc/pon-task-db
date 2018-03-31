/**
 * Define task to refresh database
 * @function refresh
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const useDB = require('./helpers/useDB')

/** @lends refresh */
function refresh (db, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      for (const [resourceName, resource] of Object.entries(instance.resources)) {
        logger.trace(`Refreshing ${resourceName}...`)
        await Promise.resolve(resource.refreshAll())
      }
    })
  }
}

module.exports = refresh
