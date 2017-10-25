/**
 * Define task
 * @function migrate
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} handlers - Migration handlers
 * @returns {function} Defined task
 */
'use strict'

/** @lends migrate */
function migrate (db, handlers, options = {}) {

  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db

    const result = await instance.migrate(
      ...Object.keys(handlers).map((version) => ({
          [version]: async function handlerWrap (db, options = {}) {
            logger.notice(`Migration started for: "${version}"`)
            return handlers[version](db, options)
          }
        })
      )
    )
    const {from, to} = result
    logger.notice(`...migration done! ( "${from}" => "${to}" )`)
    return result
  }
}

module.exports = migrate
