/**
 * Define task to exec database
 * @function exec
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

/** @lends exec */
function exec (db, sql, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db

    await Promise.resolve(instance.exec(sql))

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = exec
