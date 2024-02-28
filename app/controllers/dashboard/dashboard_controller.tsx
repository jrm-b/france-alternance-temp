import Job from '#models/job'
import { Dashboard } from '#views/pages/dashboard/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async showUnwatchedJobs({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await Job.query()
      .preload('category')
      .preload('platform')
      .andDoesntHave('watchedjobs')
    return await (<Dashboard user={user} data={data}></Dashboard>)
  }
}
