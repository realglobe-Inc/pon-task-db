/**
 * Define task to drop database
 * @function drop
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.unless='production'] - NODE_ENV to skip
 * @returns {function} Defined task
 */
'use strict'

/** @lends drop */
function drop (db, options = {}) {
  const {
    unless = 'production'
  } = options
  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db
    const {NODE_ENV} = process.env
    const skip = [].concat(unless).includes(NODE_ENV)
    if (skip) {
      throw new Error(`[drop] Skip dropping database because of NODE_ENV: ${NODE_ENV}`)
    }

    await instance.drop()

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = drop
