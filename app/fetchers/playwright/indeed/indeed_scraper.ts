import { Page } from 'playwright'
import JobScraper, { JobScraperOptions } from '../job_scraper.js'
import JobDomain from '../../../domain/job_domain.js'

export default class IndeedScraper extends JobScraper {
  constructor(url: string, options: JobScraperOptions) {
    super(url, options)
  }

  static async fetchJobs(
    url: string,
    options: JobScraperOptions
  ): Promise<JobDomain[] | undefined> {
    const jobs: JobDomain[] = []
    const fetcher = new IndeedScraper(url, options)

    await fetcher.init()
    const page = await fetcher.goTo(fetcher.url)
    const title = await page.title()

    console.log({ page_title: title })

    await page.waitForTimeout(1500)
    const numberOfPages = await fetcher.computePageNumber(page)
    let scrapedPages = 0

    if (numberOfPages > 1 && scrapedPages < numberOfPages) {
      for (let i = 1; i < numberOfPages; i++) {
        console.log(`Scraping page ${i}`)
        await page.waitForTimeout(1500)
        const data = await fetcher.getPageJobs(page)
        for (const job of data) {
          jobs.push(job)
        }
        scrapedPages++
        console.log(`${scrapedPages} pages already scraped`)
        console.log(`${numberOfPages - scrapedPages} pages restante a scraper`)

        if (scrapedPages === 2) {
          // await page.locator('button.icl-CloseButton').click()
          const indeedModal = page.locator('div[data-ipl-modal-id=modal-1]')
          await indeedModal.locator('button[aria-label=fermer]').click()
        }

        if (scrapedPages < numberOfPages) {
          await fetcher.goToNextPage(page)
        } else {
          await fetcher.kill()
          return jobs
        }
      }
    } else {
      console.log(`Scraping the only page`)
      const data = await fetcher.getPageJobs(page)
      for (const job of data) {
        jobs.push(job)
      }
      scrapedPages++
    }

    await fetcher.kill()
    return jobs
  }

  private async computePageNumber(page: Page): Promise<number> {
    const totalJobsCountLocator = await page
      .locator('div.jobsearch-JobCountAndSortPane-jobCount span')
      .first()
      .innerText()
    const totalJobsCount: number = Number.parseInt(totalJobsCountLocator)
    const jobsPerPage: number = await page.locator('div[data-testid=slider_item]').count()
    const pagesNumber = Math.floor(totalJobsCount / jobsPerPage - 3)
    console.dir({
      totalJobsCount: totalJobsCount,
      jobsPerPage: jobsPerPage,
      pagesNumber: pagesNumber,
    })
    return pagesNumber
  }
  private async getPageJobs(page: Page): Promise<JobDomain[]> {
    await this.goToBottom(page)
    const jobs = await page.$$eval('div[data-testid=slider_item]', (data) => {
      return data.map((job) => {
        const result: JobDomain = {
          origin_id: 'null',
          origin_platform: 'Indeed',
          title: null,
          company: null,
          location: null,
          url: null,
          description: null,
          publish_date: null,
          last_fetching_date: new Date().toLocaleDateString('fr-FR'),
        }

        const uid = job.querySelector('h2.jobTitle > a[role=button] > span')
        uid && (result.origin_id = uid.getAttribute('id').split('-')[1])

        const title = job.querySelector('h2.jobTitle')
        title && (result.title = title.textContent.trim())

        const company = job.querySelector('span[data-testid=company-name]')
        company && (result.company = company.innerText.trim())

        const location = job.querySelector('div[data-testid=text-location]')
        location && (result.location = location.textContent.trim())

        const url = job.querySelector('h2.jobTitle > a[role=button]')
        url && (result.url = `https://indeed.com${url.getAttribute('href')}`)

        const description = job.querySelector('tr.underShelfFooter ul')
        description && (result.description = description.innerText.trim())

        const publishDate = job.querySelector('span[data-testid=myJobsStateDate]')
        publishDate && (result.publish_date = publishDate.innerText.split('\n')[1])

        return result
      })
    })
    return jobs
  }

  private async goToBottom(page: Page) {
    await page.mouse.wheel(0, 7500)
  }

  private async goToNextPage(page: Page): Promise<void> {
    await page.waitForTimeout(1000)
    await page.getByTestId('pagination-page-next').click()
  }
}
