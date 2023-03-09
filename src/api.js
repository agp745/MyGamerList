async function hotGames(element) {

    const today =  new Date().getTime()
    const fourMonthsBack = new Date(today - 10368000000).toISOString().slice(0, 10)
    const todayISO = new Date(today).toISOString().slice(0, 10)

    const request = await fetch(`https://api.rawg.io/api/games?page_size=4&dates=${fourMonthsBack},${todayISO}&metacritic=85,100&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    const top4 = request.results

    const games = await top4.map((game) => {

        const genres = game.genres.map((genre) => {
            return `<div id="genre">${genre.name}</div>`
        })

        const parentPlatforms = game.parent_platforms.map((plat) => {
            return `<div id="platforms">${plat.platform.name}</div>`
        })

        return `
        <div class="card bg-violet-500 rounded-lg subpixel-antialiased border border-black shadow-md shadow-black hover:bg-red-300 hover:scale-110" id="card">
        <a onclick="getSearchedGame(top4List, '${game.name}')">   
            <img src="${game.background_image}" id="cardImg" class="aspect-auto max-w-lg min-h-fit">
            <div id="plat-genreContainer" class="flex flex-wrap font-sans text-xs justify-center font-medium underline shadow-md shadow-violet-600">
                ${genres}
            </div>
            <div id="title" class="italic text-lg font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${game.name}</div>
            <div id="plat-genreContainer" class="flex flex-wrap font-sans text-sm justify-center font-medium relative top-5">
                ${parentPlatforms}
            </div>
        </a>
        </div>
        `
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

        return `
        <div class="card bg-violet-500 rounded-lg subpixel-antialiased border border-black shadow-md shadow-black hover:bg-red-300 hover:scale-110" id="card">
        <a onclick="getSearchedGame(top4List, '${game.name}')">
            <img src="${game.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap font-sans text-xs justify-center font-medium underline shadow-md shadow-violet-600">
                ${genres}
            </div>
            <br>
            <div id="title" class="italic text-lg font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${game.name}</div>
            <br>
            <div id="platformContainer" class="flex flex-wrap font-sans text-sm justify-center font-medium relative top-5">
            ${parentPlatforms}
            </div>
        </a>
        </div>
        `
    })
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
        <input type="checkbox" id="p${id}" onclick="selectedPlatform('p${id}','${id}', '${plat.name}')" class="float-right">
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
        return `<div id="genre" class="flex flex-wrap text-xs justify-center">${genre.name}</div>`
    })
    
    const randomGame = `
        <div class="card bg-violet-500 rounded-lg subpixel-antialiased border border-black shadow-md shadow-black hover:bg-red-300 hover:scale-110" id="card">
        <a onclick="getSearchedGame(top4List, '${request.name}')">
            <img src="${request.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap font-sans text-xs justify-center font-medium underline shadow-md shadow-violet-600">
                ${genres}
            </div>
            <div id="title" class="italic text-lg font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${request.name}</div>
        </a>
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
        return `
        <div class="card bg-violet-500 rounded-lg subpixel-antialiased border border-black shadow-md shadow-black hover:bg-red-300 hover:scale-110" id="card">
        <a onclick="getSearchedGame(top4List, '${game.slug}')">
            <img src="${game.background_image}" class="aspect-auto max-w-lg min-h-fit" id="cardImg">
            <div id="plat-genreContainer" class="flex flex-wrap font-sans text-xs justify-center font-medium underline shadow-md shadow-violet-600">
                ${genres}
            </div>
            <div id="title" class="text-center italic text-lg font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${game.name}</div>
            <div id="platformContainer" class="text-center flex flex-wrap font-sans text-sm justify-center font-medium relative top-5">
            ${parentPlatforms}
            </div>
        </a>
        </div>
        `
    })
    element.innerHTML = ' '
    element.innerHTML += filteredGames.join('')
}

async function getSearchedGame(element, searchTitle){
    top4Title.innerHTML = searchTitle
    const title = searchTitle.toLowerCase().replace(' ', '-')
    console.log(title)
    const titleRequest = await fetch(`https://api.rawg.io/api/games?search=${title}&search_precise=true&page_size=1&key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    const gameId = titleRequest.results.map((game) => game.id.toString()).toString()
    gameSearch(element, gameId)
}

async function gameSearch(element, id) {

    const request = await fetch(`https://api.rawg.io/api/games/${id}?key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    console.log(request)

    const genres = request.genres.map((genre) => {
        return `<div id="genre">${genre.name}</div>`
    })

    const platforms = request.platforms.map((plat) => {
        return `<div id="platforms">${plat.platform.name}</div>`
    })

    const game = 
    `<section class="flex flex-col flex-wrap items-center">
        <div id="searchedCard" class="shadow-2xl shadow-violet-700 overflow-scroll flex flex-col flex-wrap justify-center scale-75 bg-violet-500 rounded-3xl subpixel-antialiased border border-black hover:bg-red-300">
            <img id="searchedImage" src="${request.background_image}" class="block text-center aspect-auto max-w-auto min-h-fit scale-75">
            <div id="searchedTitle" class=" mb-3 text-center italic text-3xl font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${request.name}</div>
            <div id="searchedSlug" class="hidden">${request.slug}</div>
            <div id="searchedGenres" class="mb-3 flex flex-wrap font-sans text-xl justify-center text-center font-medium shadow-md shadow-violet-600">${genres}</div>
            <div id="searchedDescription" class=" mb-3 text-center text-xl font-semibold font-serif subpixel-antialiased shadow-xl shadow-violet-600">${request.description}</div>
            <div id="searchedPlatforms" class="flex flex-wrap font-sans text-xl justify-center font-medium relative top-5">${platforms}</div>
        </div>
        <button id="moreGamesButton" class="rounded-full bg-yellow-300 border-black border-2 items-center self-center mt-5 ml-1 p-1 hover:bg-yellow-500 active:bg-yellow-600" onclick="moreLikeThis(randomList)">More Games like this</button>
    </section>`
    element.innerHTML = game
}

async function moreLikeThis(element) {
    
    const slug = document.querySelector('#searchedSlug').innerHTML
    const genre = document.querySelector('#genre').innerHTML.toLowerCase().replace(' ', '-')
    const title = document.querySelector('#searchedTitle').innerHTML

    element.innerHTML = ''
    discoverTitle.innerHTML = `Games like ${title}`

    const request = await fetch(`https://api.rawg.io/api/games?search=${slug}&search_precise=true&genres=${genre}&page_size=6&exclude_additions=true&key=e9a677462e984c02a2f1a9afab3493e2`)
    .then(response => response.json())
    const gamesArr = request.results

    const uniqueArr = gamesArr.filter((game) => game.slug !== slug)

    const relatedgames = uniqueArr.map((game) => {

        return `
            <section id="moreCards" class="scale-90 card bg-violet-500 rounded-lg subpixel-antialiased border border-black shadow-md shadow-black hover:bg-red-300 hover:scale-100">
            <a onclick="getSearchedGame(top4List, '${game.name}')">
                <img id="relatedGameImage" class="aspect-auto max-w-lg min-h-fit" src="${game.background_image}">
                <div id="relatedTitle" class=" text-center italic text-lg font-bold font-mono subpixel-antialiased shadow-xl shadow-violet-600">${game.name}</div>
                <div id="relatedRelease" class="text-lg text-center font-mono subpixel-antialiased shadow-xl shadow-violet-600">${game.released}
            </a>
            </section>
        `
    })
    element.innerHTML += relatedgames.join('')
    
}

let genresFilteredArr = []
let platformsFilteredArr = []
