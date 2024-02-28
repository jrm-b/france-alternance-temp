interface ButtonProps extends JSX.HtmlButtonTag {
  text: string
  variant?: 'primary' | 'success' | 'error' | 'info'
}

export function Button(props: ButtonProps) {
  const { type, text, variant = 'primary', id } = props
  return (
    <button type={type} class={`button-${variant}`} id={id}>
      {text}
    </button>
  )
}
