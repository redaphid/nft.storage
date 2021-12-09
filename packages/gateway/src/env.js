import Toucan from 'toucan-js'
import pkg from '../package.json'

/**
 * @typedef {Object} Env
 * @property {string} IPFS_GATEWAY
 * @property {string} VERSION
 * @property {string} ENV
 * @property {string} [SENTRY_DSN]
 * @property {Toucan} [sentry]
 */

/**
 * @param {Request} request
 * @param {Env} env
 */
export function envAll(request, env) {
  env.sentry = getSentry(request, env)
}

/**
 * Get sentry instance if configured
 *
 * @param {Request} request
 * @param {Env} env
 */
function getSentry(request, env) {
  if (!env.SENTRY_DSN) {
    return
  }

  return new Toucan({
    request,
    dsn: env.SENTRY_DSN,
    allowedHeaders: ['user-agent', 'x-client'],
    allowedSearchParams: /(.*)/,
    debug: false,
    environment: env.ENV || 'dev',
    rewriteFrames: {
      root: '/',
    },
    release: env.VERSION,
    pkg,
  })
}
