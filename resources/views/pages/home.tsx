import User from '#models/user'
import { Vite } from '#start/view'
import { Button } from '#views/components/commons/button'
import { Header } from '#views/components/header'
import { MetaLayout } from '#views/layouts/meta_layout'
import { HttpContext } from '@adonisjs/core/http'

interface HomeProps {
  user?: undefined | User
  session?: undefined | HttpContext | any
}

export function Home(props: HomeProps) {
  const { user, session } = props
  return (
    <MetaLayout lang="fr-FR" title="France alternance - Acceuil">
      <Header variant="auth">
        <div class="container">
          <div class="header-left">
            <div class="nav-brand-container">
              <a href="/">
                <Vite.Image src="resources/images/france.png" class="nav-brand-logo"></Vite.Image>
                <h1>france /.alternance</h1>
              </a>
            </div>
          </div>
          <div class="user-controls">
            <a href={user ? `/logout` : `/login`}>
              <Button text={user ? `Déconnexion` : `Connexion`} variant="primary"></Button>
            </a>
          </div>
        </div>
      </Header>
      <main>
        <section id="hero-banner">
          <div class="hero-banner-container-top">
            {user && (
              <div class="user-infos-container">
                <p>id: {user.id}</p>
                <p safe>username: {user.username}</p>
                <p safe>email: {user.email}</p>
                <a href="/dashboard">
                  <Button text="Dashboard"></Button>
                </a>
              </div>
            )}
          </div>
          <div class="hero-banner-container-bot"></div>
        </section>
      </main>
    </MetaLayout>
  )
}
