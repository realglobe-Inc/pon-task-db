/**
 * Define task to load file into database
 * @function load
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const askconfig = require('askconfig')

const setup = require('./setup')
const exec = require('./exec')

/** @lends load */
function load (db, options = {}) {
  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db
    await setup(instance)(ctx)

    const filenameKey = 'SQL File Path'
    const asked = await askconfig({
      [filenameKey]: ''
    })
    const filename = asked[filenameKey]
    logger.notice('Executing sql....')
    const sql = `source ${filename}`

    await exec(instance, sql)(ctx)

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = load
