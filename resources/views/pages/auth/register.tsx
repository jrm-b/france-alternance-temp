import { Vite, csrfField, route } from '#start/view'
import { Button } from '#views/components/commons/button'
import { InputField } from '#views/components/form/input_field'
import { Header } from '#views/components/header'
import { MetaLayout } from '#views/layouts/meta_layout'

export function Register() {
  return (
    <MetaLayout lang="fr-FR" title="France alternance - S'enregistrer">
      <Header variant="auth" sticky>
        <div class="nav-brand-container">
          <a href="/">
            <Vite.Image src="resources/images/france.png" class="nav-brand-logo"></Vite.Image>
            <h1>france /.alternance</h1>
          </a>
        </div>
      </Header>
      <main id="auth-page-register">
        <div class="auth-form-container">
          <h2>S'enregistrer</h2>
          <form class="auth-form register" method="POST" action={route('auth.register.store')}>
            {csrfField()}
            <InputField
              label="Username"
              type="text"
              id="username"
              name="username"
              placeholder="Jhon Doe"
              required
              autofocus="autofocus"
            ></InputField>
            <InputField
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="jhondoe@mail.com"
              required
            ></InputField>
            <InputField
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
            ></InputField>
            <Button text="S'enregistrer" type="submit" variant="primary"></Button>
          </form>
          <div class="backlinks">
            <a href="/login">Déjà un compte ? Se connecter</a>
          </div>
        </div>
        <div class="auth-picture-container"></div>
      </main>
    </MetaLayout>
  )
}
