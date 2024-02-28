import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import JobCategory from './category.js'
import JobPlatform from './platform.js'
import Platform from './platform.js'
import Category from './category.js'
import WatchedJob from './watched_job.js'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare externalId: string

  @column()
  declare title: string

  @column()
  declare company: string

  @column()
  declare location: string

  @column()
  declare description?: undefined | string

  @column()
  declare publishedAt?: undefined | string

  @column()
  declare url: string

  @column()
  declare baseUrl: string

  @column()
  declare platformId: number

  @column()
  declare categoryId: number

  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => WatchedJob)
  declare watchedjobs: HasMany<typeof WatchedJob>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
