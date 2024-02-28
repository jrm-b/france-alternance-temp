import WatchedJob from '#models/watched_job'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await WatchedJob.createMany([
      {
        jobId: 1,
        userId: 1,
      },
      {
        jobId: 2,
        userId: 1,
      },
    ])
  }
}
