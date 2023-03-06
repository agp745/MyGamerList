async function hotGames() { //add dynamically changing dates 
    const request = await fetch('https://api.rawg.io/api/games?page_size=4&dates=2022-12-01,2023-03-01&metacritic=85,100&search_precise=true&key=e9a677462e984c02a2f1a9afab3493e2')
    const response = await request.json()
    const top4 = response.results
    console.log(top4)
}

async function generalGames() { //20 Popular Games
    const request = await fetch('https://api.rawg.io/api/games?key=e9a677462e984c02a2f1a9afab3493e2')
    const response = await request.json()
    const games = response.results
    console.log(games) 
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

hotGames()
generalGames()
searchGames('halo')
filteredSearch('action', 'playstation4', '70,100', '2009-01-01', '2013-01-01')

