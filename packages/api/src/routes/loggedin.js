import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'

/** @type {import('../bindings').Handler} */
export async function loggedin(event, ctx) {
  await validate(event, ctx)
  return new JSONResponse({
    ok: true,
  })
}
