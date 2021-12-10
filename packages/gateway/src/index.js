/* eslint-env serviceworker */

import { Router } from 'itty-router'

import { gatewayGet } from './gateway.js'
import { metricsGet } from './metrics.js'

import { addCorsHeaders, corsOptions, withCorsHeaders } from './cors.js'
import { errorHandler } from './error-handler.js'
import { envAll } from './env.js'

const router = Router()

router
  .options('*', corsOptions)
  .all('*', envAll)
  .get('/metrics', withCorsHeaders(metricsGet))
  .get('*', withCorsHeaders(gatewayGet))

/**
 * @param {Error} error
 * @param {Request} request
 * @param {import('./env').Env} env
 */
function serverError(error, request, env) {
  return addCorsHeaders(request, errorHandler(error, env))
}

// https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
/** @typedef {{ waitUntil(p: Promise): void }} Ctx */

export default {
  async fetch(request, env, ctx) {
    try {
      return await router.handle(request, env, ctx)
    } catch (error) {
      return serverError(error, request, env)
    }
  },
}
