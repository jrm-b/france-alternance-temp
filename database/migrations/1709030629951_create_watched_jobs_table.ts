import { BaseSchema } from '@adonisjs/lucid/schema'
import { WatchedJobsStatus } from '../../app/enums/watched_jobs_status.js'

export default class extends BaseSchema {
  protected tableName = 'watched_jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true }).unsigned()
      table.integer('job_id').unsigned().references('jobs.id').onDelete('CASCADE').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.tinyint('status').unsigned().notNullable().defaultTo(WatchedJobsStatus.watching)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
