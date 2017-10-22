/**
 * Define task to dump database
 * @function dump
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {string} [dirname='var/dump'] - Dirname to save dump
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.max=3] - Rotation max count
 * @returns {function} Defined task
 */
'use strict'

const path = require('path')
const {unlinkAsync} = require('asfs')
const amkdirp = require('amkdirp')
const akv = require('akv')

/** @lends dump */
function dump (db, dirname = 'var/dump', options = {}) {
  const {
    max = 3
  } = options

  const statusFile = path.join(dirname, 'dump-status.json')
  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db
    await amkdirp(dirname)

    const status = akv(statusFile)

    const queue = [] = await status.get('queue') || []

    while (queue.length >= Number(max)) {
      const filename = queue.shift()
      try {
        await unlinkAsync(filename)
      } catch (e) {
        // DO nothing
      }
      logger.info(`Old Dump removed: ${filename}`)
    }
    const result = await instance.dump(dirname)
    const {filename} = result
    logger.info(`New Dump crated: ${filename}`)
    queue.push(filename)

    await status.set('queue', queue)

    await status.commit()

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = dump
