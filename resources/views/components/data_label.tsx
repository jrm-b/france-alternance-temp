import { Children } from '@kitajs/html'

interface DataLabelProps {
  children: Children
  bgColor?: undefined | string
}

export function DataLabel(props: DataLabelProps) {
  const { children, bgColor } = props
  return (
    <div class={`data-label`} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  )
}
