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