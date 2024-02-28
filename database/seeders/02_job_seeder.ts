import Job from '#models/job'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { CategoryId } from '../../app/enums/category_id.js'
import { PlatformId } from '../../app/enums/platform_id.js'

export default class extends BaseSeeder {
  async run() {
    await Job.createMany([
      {
        externalId: 'aaaa-1234-aaaa-1234',
        title: 'Développeur web en alternance H/F',
        company: 'Atos',
        location: '31 - Toulouse',
        publishedAt: new Date().toLocaleDateString(),
        url: 'https://indeed.fr/job1',
        baseUrl: 'https//indeed.fr',
        categoryId: CategoryId['Développement web'],
        platformId: PlatformId.Indeed,
      },
      {
        externalId: 'bbbb-1234-bbbb-1234',
        title: 'Développeur web en alternance H/F',
        company: 'Atos',
        location: '31 - Toulouse',
        publishedAt: new Date().toLocaleDateString(),
        url: 'https://indeed.fr/job2',
        baseUrl: 'https//indeed.fr',
        categoryId: CategoryId['Développement web'],
        platformId: PlatformId.Indeed,
      },
      {
        externalId: 'cccc-1234-cccc-1234',
        title: 'Développeur web en alternance H/F',
        company: 'Atos',
        location: '31 - Toulouse',
        publishedAt: new Date().toLocaleDateString(),
        url: 'https://labonnealternance.fr/job1',
        baseUrl: 'https//labonnealternance.fr',
        platformId: PlatformId['La bonne alternance'],
        description:
          "Développeur web en alternance bac+5, 3 ans d'xp, fullstack spacex devops, NON REMUNEREE !!",
      },
      {
        externalId: 'eeee-1234-eeee-1234',
        title: 'Développeur web en alternance H/F',
        company: 'Atos',
        location: '31 - Toulouse',
        publishedAt: new Date().toLocaleDateString(),
        url: 'https://welcometothejungle.fr/job1',
        baseUrl: 'https//welcometothejungle.fr',
        platformId: PlatformId['Welcome to the jungle'],
      },
      {
        externalId: 'rrrr-1234-rrrr-1234',
        title: 'Développeur web en alternance H/F',
        company: 'Atos',
        location: '31 - Toulouse',
        publishedAt: new Date().toLocaleDateString(),
        url: 'https://labonnealternance.fr/job2',
        baseUrl: 'https//labonnealternance.fr',
        platformId: PlatformId['La bonne alternance'],
      },
    ])
  }
}
