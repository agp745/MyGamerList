async function platformIds() {
    const request = await fetch('https://api.rawg.io/api/platforms?key=2f3ca7722ac84966acbe5a925e535d09')
    .then(response => response.json())
    console.log(request)
}

async function genreIds() {
    const request = await fetch('https://api.rawg.io/api/genres?key=2f3ca7722ac84966acbe5a925e535d09')
    .then(response => response.json())
    console.log(request)
}

platformIds()
genreIds()