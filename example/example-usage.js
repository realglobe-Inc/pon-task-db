'use strict'

const pon = require('pon')
const {seed} = require('pon-task-db')

async function tryExample () {
  const run = pon({
    'db:seed': seed(() => {/*...*/}, 'db/seeds/:env/*.seed.json')
  })

  run('db:seed')
}

tryExample()
