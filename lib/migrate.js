/**
 * Define task
 * @function migrate
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} handlers - Migration handlers
 * @returns {function} Defined task
 */
'use strict'

const dump = require('./dump')
const asleep = require('asleep')
const useDB = require('./helpers/useDB')
const path = require('path')

/** @lends migrate */
function migrate (db, handlers, options = {}) {
  const {snapshot} = options
  return async function task (ctx) {
    const {logger} = ctx
    return useDB(db, async (instance) => {
      const wrappedHandlers = Object.keys(handlers).reduce((wrapped, version) => Object.assign(wrapped, {
        [version]: async function handlerWrap (db, options = {}) {
          logger.notice(`Migration "${version}" started ...`)
          if (snapshot) {
            await dump(db, path.join(snapshot, version), {minInterval: 0, max: 5})(ctx)
          }
          const result = await handlers[version](db, options)
          logger.notice(`... migration "${version}" done!`)
          return result
        }
      }), {})

      const result = await instance.migrate(wrappedHandlers)
      if (result) {
        const {from, to} = result
        logger.debug(`Schema updated: "${from}" => "${to}"\n`)

        const hasNext = !!wrappedHandlers[to]
        if (hasNext) {
          const {dialect} = (instance.env || {})
          switch (String(dialect).trim().toLocaleLowerCase()) {
            case 'memory':
              // No recursive for memory driver
              return
            default:
              break
          }
          await asleep(100)
          await task(ctx)
        }
      }
      return result
    })
  }
}

module.exports = migrate
