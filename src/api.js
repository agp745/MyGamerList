async function hotGames(element) { //add dynamically changing dates 
    const request = await fetch('https://api.rawg.io/api/games?page_size=4&dates=2022-12-01,2023-03-01&metacritic=85,100&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const top4 = request.results

    const games = await top4.map((game) => {

        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })

        return `<div class="card bg-violet-500 rounded-lg" id="card">
            <img src="${game.background_image}" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap text-xs justify-center">
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
    
    const games = await general.map((game) => {

        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })

        return `<div class="card bg-violet-500 rounded-lg subpixel-antialiased" id="card">
            <img src="${game.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap text-xs justify-center">
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

function selectedGenre(idName){
    const button = document.querySelector(`#${idName}`)
    button.addEventListener('change', function() {
        if(this.checked) {
            console.log(`checked!${idName}`)
        } else {
            console.log(`unchecked!${idName}`)
        }   
    })
}

async function getGenres(element) {
    const request = await fetch('https://api.rawg.io/api/genres?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const genresArr = request.results
    const genres = genresArr.map((genre) =>{

        return `
        <label for="${genre.name}" class="filterLabel">${genre.name}</label>
        <input type="checkbox" id="${genre.name}" onclick="selectedGenre('${genre.name}')">
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
        <input type="checkbox" id="${plat.name}" class="float-right">
        <br>
        `
    })
    element.innerHTML += platforms.join('')
}

async function randomizer(element, id) {
    const request = await fetch(`https://api.rawg.io/api/games/${id}?key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    
    const genres = request.genres.map((genre) => {
        return `<div id="genre" class="flex flex-wrap text-xs justify-center">${genre.name}</div>`
    })
    
    const randomGame = `
        <div class="card bg-violet-500 rounded-lg subpixel-antialiased" id="card">
            <img src="${request.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap text-xs justify-center">
                ${genres}
            </div>
            <div id="title">${request.name}</div>
        </div>
    `
    element.innerHTML += randomGame
}
        
// async function searchGames(title) {
//         const game = title
//         const request = await fetch(`https://api.rawg.io/api/games?page_size=5&search=${game}&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2`)
//         const response = await request.json()
//         const searchedGames = response.results 
//         console.log(searchedGames)
// }
// searchGames('halo')
    
async function filteredSearch(element, genre, platforms, rating, release) {
    const request = await fetch(`https://api.rawg.io/api/games?genres=${genre}&platforms=${platforms}&metacritic=${rating},100&dates=${release}&key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    const filtered = request.results
    console.log(filtered)
    const filteredGames = filtered.map((game) => {
        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })
        
        return `<div class="card" id="card">
            <img src="${game.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap text-xs justify-center">
                ${genres}
            </div>
            <div id="title">${game.name}</div>
            <div id="platformContainer" class="flex flex-wrap">
            ${parentPlatforms}
            </div>
        </div>`
    })
    element.innerHTML = ' '
    element.innerHTML += filteredGames
}
        