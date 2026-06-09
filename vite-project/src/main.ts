import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <section class="task-tracker">
    <h1>Трекер завдань</h1>
    <form class="form-row">
      <input id="task-input" type="text" placeholder="Введіть завдання" autocomplete="off" />
      <button id="add-task" type="submit" disabled>Додати</button>
    </form>
    <ul id="task-list" class="task-list" aria-live="polite"></ul>
  </section>
`

const input = document.querySelector<HTMLInputElement>('#task-input')!
const button = document.querySelector<HTMLButtonElement>('#add-task')!
const list = document.querySelector<HTMLUListElement>('#task-list')!

const tasks: string[] = []

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const renderTasks = () => {
  list.innerHTML = tasks
    .map(task => `<li class="task-item"><span>${escapeHtml(task)}</span></li>`)
    .join('')
}

const updateButtonState = () => {
  button.disabled = input.value.trim().length === 0
}

input.addEventListener('input', updateButtonState)

app.querySelector('form')!.addEventListener('submit', event => {
  event.preventDefault()
  const value = input.value.trim()
  if (!value) return

  tasks.push(value)
  input.value = ''
  updateButtonState()
  renderTasks()
  input.focus()
})

updateButtonState()
