import User from '#models/user'
import { csrfField, route } from '#start/view'
import { DataLabel } from '#views/components/data_label'
import { DashboardLayout } from '#views/layouts/dashboard_layout'
import { WatchedJobsStatus } from '../../../../app/enums/watched_jobs_status.js'

interface DashboardProps {
  user: User
  data?: any
}

export async function Watchlist(props: DashboardProps) {
  const { user, data } = props
  const status = Object.keys(WatchedJobsStatus)
  const tableHeadings = [
    'Plateforme',
    'Titre',
    'Entreprise',
    'Localisation',
    'Date de publication',
    'status',
  ]

  return (
    <DashboardLayout user={user}>
      <section id="index">
        La bonne alternance
        <div class="index-top-container"></div>
        <div class="index-bot-container">
          <form action={route('watchlist.update')} method="POST" class={'data-table-form'}>
            {csrfField()}
            <button type="submit">Modifier les status</button>
            <table class={'data-table'}>
              <thead>
                <tr>
                  {tableHeadings.map((heading) => {
                    return <th>{heading}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((job: any) => {
                  return (
                    <tr>
                      <td>
                        <DataLabel
                          bgColor={`#${job.$preloaded.job.$preloaded.platform.brandColor}`}
                        >
                          {job.$preloaded.job.$preloaded.platform.name}
                        </DataLabel>
                      </td>
                      <td>{job.$preloaded.job.title}</td>
                      <td>{job.$preloaded.job.company}</td>
                      <td>{job.$preloaded.job.location}</td>
                      <td>{job.$preloaded.job.publishedAt}</td>
                      <td>
                        <select name="status-select" id={job.id}>
                          <option selected value={`${job.status},${job.id}`}>
                            {status[job.status - 1]}
                          </option>
                          {status
                            .filter((s) => s != status[job.status - 1])
                            .map((finalStatus) => {
                              return (
                                <option value={`${WatchedJobsStatus[finalStatus]},${job.id}`}>
                                  {finalStatus}
                                </option>
                              )
                            })}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </form>
        </div>
      </section>
    </DashboardLayout>
  )
}
