const button = document.querySelector("#changeButton")

button.addEventListener("click", function () {
    const heading = document.querySelector("h1")

    if (heading) {
        heading.textContent = "Текст заголовка изменён"
    }
})

const card = document.querySelector(".card")
const toggleButton = document.querySelector("#toggleButton")

toggleButton.addEventListener("click", function () {
    if (card) {
        card.classList.toggle("active")
    }
})