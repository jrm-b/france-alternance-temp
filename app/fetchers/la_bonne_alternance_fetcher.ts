import JobDomain from '../domain/job_domain.js'

export default class LaBonneAlternanceFetcher {
  static async fetchJobs(url: string) {
    const jobs: JobDomain[] = []
    const data: any = await fetch(url)
      .then((response) => response.json())
      .then((json: any) => json.peJobs.results)

    for (const job of data) {
      jobs.push({
        origin_id: job.job.id,
        origin_platform: 'La bonne alternance',
        title: job.title,
        company: job.company.name,
        location: job.place.city,
        publish_date: new Date(job.job.creationDate).toLocaleDateString('fr-FR'),
        url: job.url,
        description: job.job.description,
        last_fetching_date: new Date().toLocaleDateString('fr-FR'),
      })
    }

    return jobs
  }
}
