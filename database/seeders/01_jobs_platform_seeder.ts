import Platform from '#models/platform'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Platform.createMany([
      {
        name: 'Indeed',
        url: 'https://fr.indeed.com',
        brandColor: '003A9B',
      },
      {
        name: 'La bonne alternance',
        url: 'https://labonnealternance.apprentissage.beta.gouv.fr/',
        brandColor: 'A558A0',
      },
      {
        name: 'Welcome to the jungle',
        url: 'https://fhttps://www.welcometothejungle.com/fr',
        brandColor: 'FFCD00',
      },
    ])
  }
}
