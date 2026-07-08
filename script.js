const button = document.querySelector("#changeButton")

button.addEventListener("click", () => {
    const heading = document.querySelector("h1")

    if (heading) {
        heading.textContent = "Текст заголовка изменён"
    }
})

const card = document.querySelector(".card")
const toggleButton = document.querySelector("#toggleButton")

toggleButton.addEventListener("click", () => {
    if (card) {
        card.classList.toggle("active")
    }
})


const taskInput = document.querySelector("#taskInput")
const addButton = document.querySelector("#addButton")
const taskList = document.querySelector("#taskList")

addButton.addEventListener("click", () => {

    const text = taskInput.value.trim()

    if (text === "") {
        return
    }

    const li = document.createElement("li")

    li.textContent = text

    const deleteButton = document.createElement("button")

    deleteButton.textContent = "Удалить"
    deleteButton.classList.add("deleteButton")

    deleteButton.addEventListener("click", function () {
        li.remove()
    })

    li.append(deleteButton)

    taskList.append(li)

    taskInput.value = ""
})