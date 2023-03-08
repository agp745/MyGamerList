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

async function generalGames(element) {
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

async function getGenres(element) {
    const request = await fetch('https://api.rawg.io/api/genres?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const genresArr = request.results
    const genres = genresArr.map((genre) =>{
        if(genre.name === 'RPG') {
            const name = 'role-playing-games-rpg'
            return `
            <label for="${name}" class="filterLabel">${genre.name}</label>
            <input type="checkbox" id="${name}" onclick="selectedGenre('${name}')">
            <br>
            `
        }
        const name = genre.name.replace(' ', '-')
        return `
        <label for="${name}" class="filterLabel">${genre.name}</label>
        <input type="checkbox" id="${name}" onclick="selectedGenre('${name}')">
        <br>
        `
    })
    element.innerHTML += genres.join('')
}

//BUG!!!
//index reading twice, and value added 3 times after unchecked and checked again
function selectedGenre(idName){
    const button = document.querySelector(`#${idName}`)
    button.addEventListener('change', function() {
        const genreName = idName.toLowerCase()
        if(this.checked) {
            genresFilteredArr.push(genreName)
            console.log(genresFilteredArr)
        } else {
            const index = genresFilteredArr.indexOf(genreName)
            if(index < 0 || index >= genresFilteredArr.length) {
                throw new Error(`ivalid index: ${index} => FIX THIS BUG`)
            } 
            genresFilteredArr.splice(index, 1)
            console.log(`removed ${genreName}`)
        }  
    })
}

async function getPlatforms(element) {
    const request = await fetch('https://api.rawg.io/api/platforms?key=e9a677462e984c02a2f1a9afab3493e2')
    .then(response => response.json())
    const platformsArr = request.results
    const platforms = platformsArr.map((plat) => {
        const id = plat.id.toString()
        return `
        <label for="plat${id}" class="filterLabel">${plat.name}</label>
        <input type="checkbox" id="p${id}" onclick="selectedPlatform('p${id}','${id}', '${plat.name}')">
        <br>
        `
    })
    element.innerHTML += platforms.join('')
}
//BUG!!!
//same bug as in selectedGenre()
function selectedPlatform(buttonId, platId, platName) {
    const button = document.querySelector(`#${buttonId}`)
    button.addEventListener('change', function() {
        if(this.checked) {
            platformsFilteredArr.push(platId)
            console.log(platformsFilteredArr)
        } else {
            const index = platformsFilteredArr.indexOf(platId)
            if(index < 0 || index >= platformsFilteredArr.length) {
                throw new Error(`ivalid index: ${index} => FIX THIS BUG`)
            }
            platformsFilteredArr.splice(index, 1)
            console.log(`removed ${platName}: ${platId}`)
        }
    })
}

async function randomizer(element, id) {
    const request = await fetch(`https://api.rawg.io/api/games/${id}?key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    
    const genres = request.genres.map((genre) => {
        return `<div id="genre">${genre.name}</div>`
    })
    
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
    
async function filteredSearch(element, genre, platforms, rating, release) {
    const request = await fetch(`https://api.rawg.io/api/games?genres=${genre}&platforms=${platforms}&metacritic=${rating},100&dates=${release}&key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    const filtered = request.results
    const filteredGames = filtered.map((game) => {
        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })
        
        return `<div class="card" id="card">
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
    element.innerHTML = ' '
    element.innerHTML += filteredGames
}

let genresFilteredArr = []
let platformsFilteredArr = []





// async function searchGames(title) {
//         const game = title
//         const request = await fetch(`https://api.rawg.io/api/games?page_size=5&search=${game}&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2`)
//         const response = await request.json()
//         const searchedGames = response.results 
//         console.log(searchedGames)
// }
// searchGames('halo')