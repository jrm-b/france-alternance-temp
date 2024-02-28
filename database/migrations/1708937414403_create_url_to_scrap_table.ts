import { BaseSchema } from '@adonisjs/lucid/schema'
import { CategoryId } from '../../app/enums/category_id.js'

export default class extends BaseSchema {
  protected tableName = 'url_to_scrap'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true }).unsigned().notNullable().unique()
      table.string('url').notNullable().unique()
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .notNullable()
        .defaultTo(CategoryId['Développement web'])
      table
        .integer('plaform_id')
        .unsigned()
        .references('platforms.id')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
