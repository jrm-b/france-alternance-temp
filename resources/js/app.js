import.meta.glob(['../images/**'])
import.meta.glob(['../fonts/**'])

window.addEventListener('DOMContentLoaded', () => {
  const host = 'localhost:3333'
  const currentURL = window.location.href

  switch (currentURL) {
    case `http://${host}/dashboard`:
      const globalCheckbox = document.getElementById('global-checkbox')
      const allFormCheckboxs = document.querySelectorAll('tbody input[type=checkbox]')

      const toggleGlobalCheckglobal = globalCheckbox.addEventListener('change', (e) => {
        if (globalCheckbox.checked) {
          allFormCheckboxs.forEach((checkbox) => (checkbox.checked = true))
        } else {
          allFormCheckboxs.forEach((checkbox) => (checkbox.checked = false))
        }
        removeEventListener('click', toggleGlobalCheckglobal)
      })
      break
  }
})
