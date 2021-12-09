/* global Response caches */

import { METRICS_CACHE_MAX_AGE } from './constants.js'

/**
 * Retrieve metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {import('./index').Ctx} ctx
 * @returns {Promise<string>}
 */
export async function metricsGet(request, env, ctx) {
  const cache = caches.default
  let res = await cache.match(request)

  if (res) {
    return res
  }

  const usersTotal = 0
  const metrics = [
    '# HELP web3storage_users_total Total users registered.',
    '# TYPE web3storage_users_total counter',
    `web3storage_users_total ${usersTotal}`,
  ].join('\n')

  res = new Response(metrics, {
    headers: {
      'Cache-Control': `public, max-age=${METRICS_CACHE_MAX_AGE}`,
    },
  })

  ctx.waitUntil(cache.put(request, res.clone()))

  return res
}
