import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from './job.js'
import type { WatchedJobsStatus } from '../enums/watched_jobs_status.js'

export default class WatchedJob extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare jobId: number

  @column()
  declare status?: WatchedJobsStatus

  @belongsTo(() => Job)
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
