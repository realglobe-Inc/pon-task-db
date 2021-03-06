'use strict'

const seed = require('pon-task-seed')
const drop = require('./drop')
const setup = require('./setup')
const dump = require('./dump')
const exec = require('./exec')
const refresh = require('./refresh')
const migrate = require('./migrate')

const subPacks = {
  exec,
  seed,
  drop,
  setup,
  refresh,
  dump,
  migrate,
}

/**
 * Define task
 * @function define
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
function define (options = {}) {
  const subTasks = Object
    .keys(options)
    .reduce((subTasks, name) => Object.assign(subTasks, {
      [name]: subPacks[name](...(options[name] || []))
    }), {})

  function task (ctx) {
    return Promise.all([
      Object.keys(subTasks).map((name) => subTasks[name](ctx))
    ])
  }

  return Object.assign(task, subTasks)
}

module.exports = Object.assign(define, subPacks)
