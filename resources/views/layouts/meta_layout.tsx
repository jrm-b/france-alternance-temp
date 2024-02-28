import { Children } from '@kitajs/html'
import { Vite } from '#start/view'

interface MetaLayoutProps {
  children: Children
  title: string
  lang?: string
}

export function MetaLayout(props: MetaLayoutProps) {
  const { lang = 'en-EN', title, children } = props
  return (
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Vite.Entrypoint entrypoints={['resources/css/app.scss', 'resources/js/app.js']} />
      </head>
      <body>{children}</body>
    </html>
  )
}
