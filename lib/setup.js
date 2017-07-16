/**
 * Define task to setup database
 * @function setup
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

/** @lends setup */
function setup (db, options = {}) {
  return async function task (ctx) {
    const { logger } = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db

    await Promise.resolve(instance.setup())

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = setup
