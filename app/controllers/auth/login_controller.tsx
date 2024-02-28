import User from '#models/user'
import { LoginValidator } from '#validators/auth_validator'
import { Login } from '#views/pages/auth/login'
import { errors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ session }: HttpContext) {
    return <Login></Login>
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      session.flash('success', 'Welcome back. Authentication successfull.')
      return response.redirect().toRoute('index')
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        session.flash('error', error)
      }
      return response.redirect().back()
    }
  }
}
