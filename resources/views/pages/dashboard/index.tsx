import User from '#models/user'
import { csrfField, route } from '#start/view'
import { Card } from '#views/components/commons/card'
import { DataLabel } from '#views/components/data_label'
import { DashboardLayout } from '#views/layouts/dashboard_layout'

interface DashboardProps {
  user: User
  data?: any
}

export async function Dashboard(props: DashboardProps) {
  const { user, data } = props
  const tableHeadings = ['Plateforme', 'Titre', 'Entreprise', 'Localisation', 'Date de publication']
  return (
    <DashboardLayout user={user}>
      <section id="index">
        <div class="index-top-container">
          <Card>
            <p>Offres totales :</p>
            <span>350</span>
          </Card>
          <Card>
            <p>Plateformes disponibles :</p>
            <span>
              <p>Indeed</p>
              <p>La bonne alternance</p>
              <p>Welome to the jungle</p>
            </span>
          </Card>
          <Card>
            <p>Offres suivies :</p>
            <span>11</span>
          </Card>
        </div>
        <div class="index-bot-container">
          <form action={route('watchlist.store')} method="POST" class={'data-table-form'}>
            {csrfField()}
            <button type="submit">Ajouter la sélection aux favoris</button>
            <table class={'data-table'}>
              <thead>
                <tr>
                  {tableHeadings.map((heading) => {
                    return <th>{heading}</th>
                  })}
                  <th>
                    <input type="checkbox" name="global-checkbox" id="global-checkbox" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((job: any) => {
                  return (
                    <tr>
                      <td>
                        <DataLabel bgColor={`#${job.$preloaded.platform.brandColor}`}>
                          {job.$preloaded.platform.name}
                        </DataLabel>
                      </td>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>{job.publishedAt}</td>
                      <td>
                        <input type="checkbox" name={job.id} id={job.id} />
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
