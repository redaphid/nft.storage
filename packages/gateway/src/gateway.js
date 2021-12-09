/* eslint-env serviceworker, browser */

import { getCidFromSubdomainUrl } from './utils/cid.js'

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function gatewayGet(request, env) {
  console.log('gateway in')
  const publicGatewayUrl = new URL('ipfs', env.IPFS_GATEWAY)
  const cid = getCidFromSubdomainUrl(request.url)
  const response = await fetch(`${publicGatewayUrl.toString()}/${cid}`)

  // forward gateway response
  return response
}
