interface InputFieldProps extends JSX.HtmlInputTag, JSX.HtmlLabelTag {
  label?: undefined | string
  iconPath?: undefined | string
}

export async function InputField(props: InputFieldProps) {
  const { type, id, label, name, placeholder, required = undefined, autofocus, iconPath } = props
  return (
    <div class={`input-${type}-field`}>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        autofocus={autofocus}
      />
      <span>
        <label for={id?.toString()}>{label}</label>
      </span>
      {iconPath && <img src={iconPath} />}
    </div>
  )
}
