import { BaseSchema } from '@adonisjs/lucid/schema'
import { CategoryId } from '../../app/enums/category_id.js'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true }).unsigned().notNullable().unique()
      table.string('external_id').notNullable().unique()
      table.string('title').notNullable()
      table.string('company').notNullable()
      table.string('location').notNullable()
      table.text('description').nullable()
      table.string('published_at').nullable()
      table.string('url').notNullable().unique()
      table.string('base_url').nullable()
      table
        .integer('platform_id')
        .unsigned()
        .references('platforms.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .notNullable()
        .defaultTo(CategoryId['Développement web'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
