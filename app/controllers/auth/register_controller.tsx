import User from '#models/user'
import { RegisterValidator } from '#validators/auth_validator'
import { Register } from '#views/pages/auth/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistersController {
  async show() {
    return <Register></Register>
  }

  async store({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(RegisterValidator)
    try {
      const user = await User.create(payload)
      session.flash('success', 'Welcome. Account successfully created.')
      await auth.use('web').login(user)
      return response.redirect().toRoute('index')
    } catch (error) {
      session.flash('error', `Error: ${error.message}`)
      console.log(error)
      return response.redirect().back()
    }
  }
}
