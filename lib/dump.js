'use strict'

const path = require('path')
const { statAsync, unlinkAsync } = require('asfs')
const useDB = require('./helpers/useDB')
const amkdirp = require('amkdirp')
const akv = require('akv')
const execcli = require('execcli')

/** @deprecated */
function dump (db, dirname = 'var/dump', options = {}) {
  const {
    max = 3,
    minInterval = 24 * 60 * 60 * 1000,
    gzip = false,
  } = options

  const statusFile = path.join(dirname, 'dump-status.json')
  const status = akv(statusFile)

  return async function task (ctx) {
    const { logger } = ctx
    return useDB(db, async (instance) => {
      await amkdirp(dirname)

      const queue = (await Promise.all(
        (await status.get('queue') || []).map(async (data) => {
          const { filename } = data
          const state = await statAsync(filename).catch(() => null)
          if (!state) {
            logger.warn(`Dump file gone: "${filename}"`)
            return false
          }
          return data
        })
      )).filter(Boolean)

      await status.set('queue', queue)
      await status.commit()

      const [last] = queue
      if (last) {
        const tooSoon = (new Date() - new Date(last.at)) < minInterval
        if (tooSoon) {
          logger.warn(`Skip creating dump because it is too soon from last time: ${last.at}`)
          return
        }
      }

      while (queue.length >= Number(max)) {
        const { filename } = queue.shift()
        try {
          await unlinkAsync(filename)
        } catch (e) {
          // DO nothing
        }
        await status.set('queue', queue)
        await status.set('max', max)
        await status.commit()
        logger.debug(`Old Dump removed: ${filename}`)
      }
      let { filename } = (await instance.dump(dirname)) || {}
      if (filename) {
        logger.debug(`New Dump created: ${filename}`)
        if (gzip) {
          await execcli('gzip', [filename])
          filename += '.gz'
          logger.debug(`Gzipped: ${filename}`)
        }
        queue.push({ filename, at: new Date() })
      } else {
        console.warn(`[pon-task-db] No file emitted on dump for ${dirname}`)
      }

      await status.set('queue', queue)
      await status.commit()
    })
  }
}

module.exports = dump
