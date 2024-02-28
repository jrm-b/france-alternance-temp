import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CronMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx
    console.log(request.ip())

    if (request.ip() === '127.0.0.1' || request.ip() === 'localhost') {
      const output = await next()
      return output
    }
    return response.redirect('/')
  }
}
