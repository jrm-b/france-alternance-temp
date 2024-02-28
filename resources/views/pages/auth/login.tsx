import { Vite, csrfField, route } from '#start/view'
import { Button } from '#views/components/commons/button'
import { InputField } from '#views/components/form/input_field'
import { Header } from '#views/components/header'
import { MetaLayout } from '#views/layouts/meta_layout'

export function Login() {
  return (
    <MetaLayout lang="fr-FR" title="France alternance - Se connecter ">
      <Header variant="auth" sticky>
        <div class="nav-brand-container">
          <a href="/">
            <Vite.Image src="resources/images/france.png" class="nav-brand-logo"></Vite.Image>
            <h1>france /.alternance</h1>
          </a>
        </div>
      </Header>
      <main id="auth-page-login">
        <div class="auth-form-container">
          <h2>Se connecter</h2>
          <form class="auth-form login" method="POST" action={route('auth.login.store')}>
            {csrfField()}
            <InputField
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="jhondoe@mail.com"
              required
              autofocus="autofocus"
            ></InputField>
            <InputField
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
            ></InputField>
            <InputField
              label="Remember me"
              type="checkbox"
              id="remember-me"
              name="remember-me"
            ></InputField>
            <Button text="Se connecter" type="submit" variant="primary"></Button>
          </form>
          <div class="backlinks">
            <a href="/">Mot de passe ou email oublié ?</a>
            <div class="separator"></div>
            <a href="/register">Pas de compte ? En créer un (gratuit)</a>
          </div>
        </div>
        <div class="auth-picture-container"></div>
      </main>
    </MetaLayout>
  )
}
