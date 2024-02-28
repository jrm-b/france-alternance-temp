import { Browser, BrowserContext, Page } from 'playwright'
import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

export interface JobScraperOptions {
  headless: boolean
}

export default class JobScraper {
  protected browser?: Browser
  protected context?: BrowserContext
  protected url: string
  protected options: JobScraperOptions

  constructor(url: string, options: JobScraperOptions) {
    this.url = url
    this.options = options
  }

  protected async goTo(url: string): Promise<Page> {
    const page = await this.context?.newPage()
    await page?.goto(url)
    return page!
  }

  protected async init(): Promise<BrowserContext> {
    chromium.use(stealth())
    this.browser = await chromium.launch({
      headless: this.options.headless,
      // proxy: { server: `${env.get("PROXY_IP")}:${env.get("PROXY_PORT")}`, username: env.get("PROXY_ID"), password: env.get("PROXY_PASSWORD") },
    })
    this.context = await this.browser.newContext({
      timezoneId: 'Europe/Paris',
      locale: 'fr-FR',
    })
    return this.context
  }

  protected async kill(): Promise<void> {
    await this.context?.close()
    await this.browser?.close()
    return
  }
}
