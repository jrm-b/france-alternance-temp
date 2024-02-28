import { Children } from '@kitajs/html'
import { MetaLayout } from './meta_layout.js'
import { Header } from '#views/components/header'
import { Button } from '#views/components/commons/button'
import { Vite, route } from '#start/view'
import User from '#models/user'

interface DashboardLayoutProps {
  children: Children
  user: User
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { children, user } = props
  return (
    <MetaLayout lang="fr-FR" title="Dashboard - France alternance">
      <Header variant="dashboard">
        <div class="header-left-dashboard">
          <p>Bienvenue sur ton dashboard {user.username}</p>
        </div>
        <div class="user-controls">
          <a href={route('auth.logout')}>
            <Button text="Déconnexion" variant="primary"></Button>
          </a>
        </div>
      </Header>
      <aside class="nav-container-dashboard">
        <nav>
          <a href={route('dashboard')}>
            <Vite.Image src="resources/images/icons/table.svg"></Vite.Image>
            Vue d'ensemble
          </a>
          <a href={route('watchlist')}>
            <Vite.Image src="resources/images/icons/bookmarks.svg"></Vite.Image>
            Favoris
          </a>
          <a href={route('dashboard')}>
            <Vite.Image src="resources/images/icons/statistics.svg"></Vite.Image>
            Statistiques
          </a>
        </nav>
      </aside>
      <main id="dashboard">{children}</main>
    </MetaLayout>
  )
}
