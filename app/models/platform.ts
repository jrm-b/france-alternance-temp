import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Job from './job.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UrlToScrap from './url_to_scrap.js'

export default class Platform extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare brandColor?: undefined | string

  @column()
  declare icon?: undefined | string

  @hasMany(() => Job)
  declare jobs: HasMany<typeof Job>

  @hasMany(() => UrlToScrap)
  declare urlToScrap: HasMany<typeof UrlToScrap>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
