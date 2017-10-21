/**
 * Define task to dump database
 * @function dump
 * @param {function|ClayLump} db - DB instance or it's creator
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.max=3] - Max count
 * @returns {function} Defined task
 */
'use strict'

const path = require('path')
const {readFileAsync, writeFileAsync, unlinkAsync} = require('asfs')
const amkdirp = require('amkdirp')

/** @lends dump */
function dump (db, dirname, options = {}) {
  const {
    max = 3
  } = options

  const statusFile = path.join(dirname, 'dump-status.json')
  return async function task (ctx) {
    const {logger} = ctx
    const newInstance = typeof db === 'function'
    const instance = newInstance ? db() : db
    await amkdirp(dirname)

    const status = JSON.parse(await readFileAsync(statusFile).catch((err) => '{}'))
    const {queue = []} = status

    while (queue.length >= Number(max)) {
      const filename = queue.shift()
      await unlinkAsync(filename)
      logger.info(`Old Dump removed: ${filename}`)
    }
    const result = await instance.dump(dirname)
    console.log('!result',result)
    const {filename} = result
    logger.info(`New Dump crated: ${filename}`)
    queue.push(filename)
    await writeFileAsync(statusFile, JSON.stringify({queue}))

    if (newInstance) {
      await instance.close()
    }
  }
}

module.exports = dump
