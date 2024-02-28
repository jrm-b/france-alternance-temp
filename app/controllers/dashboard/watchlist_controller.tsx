import Job from '#models/job'
import WatchedJob from '#models/watched_job'
import { Watchlist } from '#views/pages/dashboard/watchlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class WatchlistController {
  async showWatchedJobs({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await WatchedJob.query().preload('job', (jobQuery) => {
      jobQuery.preload('platform')
    })
    return await (<Watchlist user={user} data={data}></Watchlist>)
  }

  async storeJob({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = request.except(['_csrf', 'global-checkbox'])
    Object.keys(payload).forEach(
      async (job) =>
        await WatchedJob.create({
          jobId: Number(job),
          userId: user.id,
        })
    )
    return response.redirect().toRoute('dashboard')
  }

  async updateJobStatus({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = request.body()['status-select'].forEach(async (s) => {
      const [newStatus, jobId] = s.split(',')
      // await WatchedJob.updateOrCreate(jobId, { status: newStatus, userId: user.id, jobId: jobId })
    })
    return response.redirect().back()
  }
}
