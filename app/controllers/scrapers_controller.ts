import type { HttpContext } from '@adonisjs/core/http'
import IndeedScraper from '../fetchers/playwright/indeed/indeed_scraper.js'
import WelcomeToTheJungleScraper from '../fetchers/playwright/welcome-to-the-jungle/welcome_to_the_jungle.js'
import LaBonneAlternanceFetcher from '../fetchers/la_bonne_alternance_fetcher.js'
import Job from '#models/job'

export default class ScrapersController {
  async indeed(ctx: HttpContext) {
    const { response } = ctx
    const url =
      'https://fr.indeed.com/emplois?q=d%C3%A9veloppeur+web&l=France&sc=0kf%3Ajt%28apprenticeship%29%3B&vjk=631cbfbd7047d628'
    const indeedJobs = await IndeedScraper.fetchJobs(url, { headless: false })

    if (indeedJobs) {
      await Job.updateOrCreateMany('origin_id', indeedJobs)
    }

    return response.status(201).json({
      jobs_fetched: indeedJobs?.length,
      data: indeedJobs,
    })
  }

  async welcomeTtJungle(ctx: HttpContext) {
    const { response } = ctx
    const url =
      'https://www.welcometothejungle.com/fr/jobs?refinementList%5Boffices.country_code%5D%5B%5D=FR&refinementList%5Bcontract_type%5D%5B%5D=apprenticeship&query=d%C3%A9veloppeur%20web&page=1'

    const welcomeTtJJobs = await WelcomeToTheJungleScraper.fetchJobs(url, { headless: false })

    if (welcomeTtJJobs) {
      await Job.updateOrCreateMany('origin_id', welcomeTtJJobs)
    }

    return response.status(201).json({
      jobs_fetched: welcomeTtJJobs.length,
      data: welcomeTtJJobs,
    })
  }

  async laBonneAlternance(ctx: HttpContext) {
    const { response } = ctx
    const url =
      'https://labonnealternance.apprentissage.beta.gouv.fr/api/v1/jobs?romes=M1802%2CM1805%2CM1806&caller=contact%40domaine%20nom_de_societe'
    const laBonneAlternanceJobs = await LaBonneAlternanceFetcher.fetchJobs(url)

    if (laBonneAlternanceJobs) {
      await Job.updateOrCreateMany('origin_id', laBonneAlternanceJobs)
    }

    return response.status(201).json({
      jobs_fetched: laBonneAlternanceJobs.length,
      data: laBonneAlternanceJobs,
    })
  }
}
