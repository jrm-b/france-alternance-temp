import { Children } from '@kitajs/html'

interface HeaderProps {
  children: Children
  variant?: undefined | string
}

export function Header(props: HeaderProps) {
  const { children, variant, sticky = false } = props
  return <header class={variant && `header-${variant}`}>{children}</header>
}
