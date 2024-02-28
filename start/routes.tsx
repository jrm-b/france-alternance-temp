/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { Home } from '#views/pages/home'
import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'

const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const DashboardController = () => import('#controllers/dashboard/dashboard_controller')
const WatchlistController = () => import('#controllers/dashboard/watchlist_controller')
const ScrapersController = () => import('#controllers/scrapers_controller')

router
  .get('/', async ({ auth, session }: HttpContext) => <Home user={auth.user} session={session} />)
  .as('index')

router
  .group(() => {
    router.get('login', [LoginController, 'show']).as('login.show')
    router.get('register', [RegisterController, 'show']).as('register.show')
    router.post('login', [LoginController, 'store']).as('login.store')
    router.post('register', [RegisterController, 'store']).as('register.store')
  })
  .as('auth')
  .middleware([middleware.guest()])

router
  .group(() => {
    router.get('dashboard', [DashboardController, 'showUnwatchedJobs']).as('dashboard')
    router.get('watchlist', [WatchlistController, 'showWatchedJobs']).as('watchlist')
    router.post('watchlist', [WatchlistController, 'storeJob']).as('watchlist.store')
    router.post('watchlist/update', [WatchlistController, 'updateJobStatus']).as('watchlist.update')
    router.get('logout', [LogoutController]).as('auth.logout')
  })
  .middleware([middleware.auth()])

router
  .group(() => {
    router.get('/indeed', [ScrapersController, 'indeed'])
    router.get('/welcometothejungle', [ScrapersController, 'welcomeTtJungle'])
    router.get('/labonnealternance', [ScrapersController, 'laBonneAlternance'])
  })
  .prefix('/cron')
  .use(middleware.cron())
