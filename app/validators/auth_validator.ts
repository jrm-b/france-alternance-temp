import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    username: vine.string().trim().maxLength(55),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)
