/**
 * Define task to drop database
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.unless='production'] - NODE_ENV to skip
 * @returns {function} Defined task
 */
'use strict'

const co = require('co')

/** @lends drop */
function drop (db, options = {}) {
  let {
    unless = 'production'
  } = options
  return function task (ctx) {
    const { logger } = ctx
    return co(function * () {
      const { NODE_ENV } = process.env
      let skip = [].concat(unless).includes(NODE_ENV)
      if (skip) {
        throw new Error(`[drop] Skip dropping database because of NODE_ENV: ${NODE_ENV}`)
      }

      for (let name of Object.keys(db.resources)) {
        const Resource = db.getResource(name)
        yield Resource.drop()
        logger.debug(`Resource dropped: "${name}"`)
      }
    })
  }
}

module.exports = drop
