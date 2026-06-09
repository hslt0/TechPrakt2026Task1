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

type Task = {
  text: string
  done: boolean
}

const tasks: Task[] = []

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const renderTasks = () => {
  list.innerHTML = tasks
    .map(
      (task, index) =>
        `<li class="task-item${task.done ? ' done' : ''}" data-index="${index}">
          <span>${escapeHtml(task.text)}</span>
          <button class="remove-button" type="button" aria-label="Видалити завдання">×</button>
        </li>`
    )
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

  tasks.push({ text: value, done: false })
  input.value = ''
  updateButtonState()
  renderTasks()
  input.focus()
})

list.addEventListener('click', event => {
  const target = event.target as HTMLElement
  const item = target.closest<HTMLLIElement>('.task-item')
  if (!item) return

  const index = Number(item.dataset.index)
  if (Number.isNaN(index) || index < 0 || index >= tasks.length) return

  if (target.classList.contains('remove-button')) {
    tasks.splice(index, 1)
    renderTasks()
    return
  }

  tasks[index].done = !tasks[index].done
  renderTasks()
})

updateButtonState()
