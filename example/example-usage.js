'use strict'

const pon = require('pon')
const {setup, seed, dump, migrate} = require('pon-task-db')

async function tryExample () {
  const createDB = () => {/*...*/}

  const run = pon({
    'db:setup': setup(createDB),
    'db:seed': seed(createDB, 'db/seeds/:env/*.seed.json')
  })

  run('db:seed')
}

tryExample()
