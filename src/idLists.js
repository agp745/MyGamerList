async function platformIds() {
    const request = await fetch('https://api.rawg.io/api/platforms?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    console.log(request)
}

async function genreIds() {
    const request = await fetch('https://api.rawg.io/api/genres?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    console.log(request)
}

platformIds()
genreIds()