import router from '@adonisjs/core/services/router'
import vite from '@adonisjs/vite/services/main'
import { HttpContext } from '@adonisjs/core/http'

export function session() {
  const { session } = HttpContext.getOrFail()
  return session
}

export function route(...args: Parameters<typeof router.makeUrl>) {
  return router.makeUrl(...args)
}

export function csrfField() {
  // Note the usage of ALS here.
  const { request } = HttpContext.getOrFail()

  return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}

function Image(props: { src: string; alt?: string; class?: string }) {
  const url = vite.assetPath(props.src)

  return Html.createElement('img', { src: url, alt: props.alt, class: props.class })
}

function Entrypoint(props: { entrypoints: string[] }) {
  const assets = vite.generateEntryPointsTags(props.entrypoints)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return Html.createElement('script', {
        ...asset.attributes,
      })
    }

    return Html.createElement('link', {
      ...asset.attributes,
    })
  })

  return Html.createElement(Html.Fragment, {}, elements)
}

export const Vite = {
  Entrypoint,
  Image,
}
