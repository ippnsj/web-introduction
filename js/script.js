window.onload = function() {
    const storage = window.localStorage
    const keys = []
    for(let i = 0; i < storage.length; i++) {
        keys.push(storage.key(i))
    }
    keys.sort()

    keys.forEach((key) => {
        const guestBook = JSON.parse(storage.getItem(key))

        let guestBookMesssage = `<b style="color: hotpink;">${guestBook.name}</b>님의 취향 영화는 `
        guestBookMesssage += getMoviesString(guestBook.movies)
        guestBookMesssage += `입니다!`

        addGuestBook(guestBookMesssage)
    })
}

function getMoviesString(movies) {
    let moviesString = ""
    movies.forEach((movie) => {
        moviesString +=`'<b>${movie}</b>' `
    })
    return moviesString
}

function hoverLinkImage(element) {
    element.setAttribute('src', "../images/click_active/click_active_50.png")
}

function unhoverLinkImage(element) {
    element.setAttribute('src', "../images/click_unactive/click_unactive_50.png")
}

function submit() {
    const name = document.getElementById('input-name').value
    const selectedMovies = document.querySelectorAll('input[name="input-movies"]:checked')

    const message = `${name}님, 저와 ${selectedMovies.length}개의 취향이 같으시네요!`
    let guestBookMesssage = `<b style="color: hotpink;">${name}</b>님의 취향 영화는 `
    const movies = []
    selectedMovies.forEach((movie) => {
        guestBookMesssage += `'<b>${movie.value}</b>' `
        movies.push(movie.value)
    })
    guestBookMesssage += `입니다!`

    const key = (new Date()).toUTCString()
    const guestBook = {
        name: `${name}`,
        movies: movies
    }
    window.localStorage.setItem(`${key}`, JSON.stringify(guestBook))

    alert(message)
    addGuestBook(guestBookMesssage)
    reset()
}

function reset() {
    const nameElement = document.getElementById('input-name')
    const movieCheckboxes = document.getElementsByName('input-movies')

    nameElement.value = ""
    movieCheckboxes.forEach((checkbox) => {
        checkbox.checked = false
    })
}

function addGuestBook(message) {
    const guestBookContainer = document.getElementById("guest-book-container")
    const guestBook = document.createElement('p')

    guestBookContainer.style.display = "block"

    guestBook.style.width = "fit-content"
    guestBook.style.maxWidth = "80%"
    guestBook.style.margin = "30px auto 30px auto"
    guestBook.style.padding = "10px 20px 10px 20px"
    guestBook.style.backgroundColor = "white"
    guestBook.style.borderRadius = "20px"
    guestBook.innerHTML = message

    guestBookContainer.appendChild(guestBook)
}