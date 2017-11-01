'use strict'

async function useDB (db, task) {
  const newInstance = typeof db === 'function'
  const instance = newInstance ? db() : db

  const result = await task(instance)

  if (newInstance) {
    await instance.close()
  }

  return result
}

module.exports = useDB