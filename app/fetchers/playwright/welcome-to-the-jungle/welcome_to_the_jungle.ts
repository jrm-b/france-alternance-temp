import { Page } from 'playwright'
import JobScraper, { JobScraperOptions } from '../job_scraper.js'
import JobDomain from '../../../domain/job_domain.js'

export default class WelcomeToTheJungleScraper extends JobScraper {
  constructor(url: string, options: JobScraperOptions) {
    super(url, options)
  }

  static async fetchJobs(url: string, options: JobScraperOptions): Promise<JobDomain[]> {
    const jobs: JobDomain[] = []
    const fetcher = new WelcomeToTheJungleScraper(url, options)
    const requestApiURL =
      'https://csekhvms53-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.20.0)%3B%20Browser&search_origin=job_search_client'

    await fetcher.init()
    const page = await fetcher.goTo(fetcher.url)

    const title = await page.title()
    console.log({ page_title: title })

    await page.waitForTimeout(1000)
    const numberOfPages = await fetcher.computePageNumber(page)
    let scrapedPages = 0

    console.log('Start scraping ...')

    if (numberOfPages > 1 && scrapedPages < numberOfPages) {
      for (let i = 1; i < numberOfPages; i++) {
        console.log(`Scraping page ${i}`)
        await page.waitForTimeout(1500)
        const data = await fetcher.getPageJobs(page)
        for (const job of data) {
          jobs.push(job)
        }
        scrapedPages++
        console.dir({
          totalJobs: jobs.length,
          message: `${scrapedPages} pages already scraped`,
        })
        if (scrapedPages < numberOfPages) {
          await fetcher.goToNextPage(page)
        }
      }
    } else {
      console.log('Scraping the only page')
      const data = await fetcher.getPageJobs(page)
      for (let i = 1; i < data.length; i++) {
        jobs.push(data[i])
        scrapedPages++
      }
    }

    await fetcher.kill()
    return jobs
  }

  // Finir de remplacer la méthode avec la récupération de la response de l'api
  private async getPageJobs(page: Page): Promise<JobDomain[]> {
    await this.goToBottom(page)
    await page.waitForTimeout(1000)

    const jobs = await page.$$eval('li.ais-Hits-list-item', (data) => {
      return data.map((job) => {
        const result: JobDomain = {
          origin_id: 'null',
          origin_platform: 'Welcome to the jungle',
          title: null,
          company: null,
          location: null,
          url: null,
          description: null,
          publish_date: null,
          last_fetching_date: new Date().toLocaleDateString('fr-FR'),
        }

        const uid = job.querySelector('div[data-objectid]')
        uid && (result.origin_id = uid.getAttribute('data-objectid'))

        const title = job.querySelector('h4.wui-text div[role=mark]')
        title && (result.title = title.textContent.trim())

        const company = job.querySelector('span.wui-text')
        company && (result.company = company.textContent.trim())

        const location = job.querySelector('i[name=location] + p')
        location && (result.location = location.textContent.trim())

        const url = job.querySelector('a')
        url && (result.url = `https://www.welcometothejungle.com${url.getAttribute('href')}`)

        const publishDate = job.querySelector('time')
        publishDate &&
          (result.publish_date = new Date(publishDate.getAttribute('datetime')!).toLocaleDateString(
            'fr-FR'
          ))

        return result
      })
    })
    return jobs
  }

  private async computePageNumber(page: Page): Promise<number> {
    const paginationLocatorCount = await page.locator('nav[aria-label=Pagination] li').count()

    if (paginationLocatorCount === 0) return 1

    const pagesNumberLocator = await page
      .locator('nav[aria-label=Pagination] li')
      .nth(paginationLocatorCount - 2)
      .innerText()
    const pagesNumber = Number.parseInt(pagesNumberLocator)
    console.log({ numberOfPages: pagesNumber })
    return pagesNumber
  }

  private async goToBottom(page: Page) {
    await page.mouse.wheel(0, 5000)
  }

  private async goToNextPage(page: Page): Promise<void> {
    await page.locator('nav[aria-label=Pagination] li').last().click()
  }
}
