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

    deleteButton.addEventListener("click", () => {
        li.remove()
    })

    li.append(deleteButton)

    taskList.append(li)

    taskInput.value = ""
})


const products = [
    {
        title: "Мышь",
        price: 1000,
        category: "Периферия"
    },
    {
        title: "Клавиатура",
        price: 3000,
        category: "Периферия"
    },
    {
        title: "Монитор",
        price: 15000,
        category: "Техника"
    },
    {
        title: "Ноутбук",
        price: 65000,
        category: "Техника"
    }
]

const catalog = document.querySelector("#catalog")

function renderCatalog() {

    catalog.innerHTML = ""

    products.forEach(product => {

        const card = document.createElement("div")
        card.classList.add("product-card")

        const title = document.createElement("h3")
        title.textContent = product.title

        const price = document.createElement("p")
        price.textContent = `Цена: ${product.price} ₽`

        const category = document.createElement("p")
        category.textContent = `Категория: ${product.category}`

        card.append(title)
        card.append(price)
        card.append(category)

        catalog.append(card)
    })
}
renderCatalog()

const openModalButton = document.querySelector("#openModal")
const closeModalButton = document.querySelector("#closeModal")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

openModalButton.addEventListener("click", () => {
    overlay.classList.add("active")
})

closeModalButton.addEventListener("click", () => {
    overlay.classList.remove("active")
})

overlay.addEventListener("click", () => {
    overlay.classList.remove("active")
})

modal.addEventListener("click", (event) => {
    event.stopPropagation()
})


const users = [
    {
        name: "Алексей",
        email: "alex@example.com",
        role: "Студент"
    },
    {
        name: "Мария",
        email: "maria@example.com",
        role: "Администратор"
    },
    {
        name: "Иван",
        email: "ivan@example.com",
        role: "Преподаватель"
    },
    {
        name: "Ольга",
        email: "olga@example.com",
        role: "Студент"
    }
]

const usersTable = document.querySelector("#usersTable")

function renderUsers() {

    usersTable.innerHTML = ""

    users.forEach(user => {
        const tr = document.createElement("tr")

        const name = document.createElement("td")
        name.textContent = user.name

        const email = document.createElement("td")
        email.textContent = user.email

        const role = document.createElement("td")
        role.textContent = user.role

        tr.append(name)
        tr.append(email)
        tr.append(role)

        usersTable.append(tr)
    })

}

renderUsers()