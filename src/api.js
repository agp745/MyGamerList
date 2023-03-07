async function hotGames(element) { //add dynamically changing dates 
    const request = await fetch('https://api.rawg.io/api/games?page_size=4&dates=2022-12-01,2023-03-01&metacritic=85,100&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const top4 = request.results
    console.log(top4)

    const games = await top4.map((game) => {

        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })

        return `<div class="card bg-violet-500 rounded-lg" id="card">
            <img src="${game.background_image}" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap">
                ${genres}
            </div>
            <div id="title">${game.name}</div>
            <div id="plat-genreContainer" class="flex flex-wrap">
                ${parentPlatforms}
            </div>
        </div>`
    })
    element.innerHTML += games.join('')
}

async function generalGames(element) { //20 Popular Games
    const request = await fetch('https://api.rawg.io/api/games?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const general = request.results
    console.log(general)
    const games = await general.map((game) => {

        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })

        return `<div class="card bg-violet-500 rounded-lg subpixel-antialiased" id="card">
            <img src="${game.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap">
                ${genres}
            </div>
            <div id="title">${game.name}</div>
            <div id="platformContainer" class="flex flex-wrap">
            ${parentPlatforms}
            </div>
        </div>`
    })
    //Figre out Image Resize
    element.innerHTML += games.join('')
}

async function searchGames(title) {
    const game = title
    const request = await fetch(`https://api.rawg.io/api/games?page_size=5&search=${game}&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2`)
    const response = await request.json()
    const searchedGames = response.results 
    console.log(searchedGames)
}

async function filteredSearch(genre, platform, rating, releaseMin, releaseMax) {
     
    // const request = await fetch(`https://api.rawg.io/api/games?page_size=20&genres=${genre}&platforms=${platform}&metacritic=${rating}&dates=${releaseMin},${releaseMax}&key=e9a677462e984c02a2f1a9afab3493e2`)
    const request = await fetch(`https://api.rawg.io/api/games?page_size=20&genres=action&platforms=xbox&metacritic=${rating}&dates=${releaseMin},${releaseMax}&key=e9a677462e984c02a2f1a9afab3493e2`)
    const response = await request.json()
    console.log(response)
    const filteredGames = response.results 
    console.log(filteredGames)
}

async function getGenres(element) {
    const request = await fetch('https://api.rawg.io/api/genres?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const genresArr = request.results
    const genres = genresArr.map((genre) =>{
        return `
            <label for="${genre.name}" class="filterLabel">${genre.name}</label>
            <input type="checkbox" id="${genre.name}">
            <br>
        `
    })
    element.innerHTML += genres.join('')
}

async function getPlatforms(element) {
    const request = await fetch('https://api.rawg.io/api/platforms?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const platformsArr = request.results
    const platforms = platformsArr.map((plat) => {
        return `
            <label for="${plat.name}" class="filterLabel">${plat.name}</label>
            <input type="checkbox" id="${plat.name}">
            <br>
        `
    })
    element.innerHTML += platforms.join('')
}

async function randomizer(element, id) {
    const request = await fetch(`https://api.rawg.io/api/games/${id}?key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    
    const genres = request.genres.map((genre) => {
        return `<div id="genre">${genre.name}</div>`
    })
    genres.join('')

    const randomGame = `
        <div class="card bg-violet-500" id="card">
            <img src="${request.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap">
                ${genres}
            </div>
            <div id="title">${request.name}</div>
        </div>
    `
    element.innerHTML += randomGame
}

// searchGames('halo')
// filteredSearch('action', 'playstation4', '70,100', '2009-01-01', '2013-01-01')
