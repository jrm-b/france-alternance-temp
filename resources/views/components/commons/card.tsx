import { Children } from '@kitajs/html'

interface CardProps {
  children: Children
}

export function Card(props: CardProps) {
  const { children } = props
  return <div class="card">{children}</div>
}
