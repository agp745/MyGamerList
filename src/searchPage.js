// import { searchBar, searchButton } from "./main.js"

const searchedGame = document.querySelector('#searchedGame')
const moreGamesButton = document.querySelector('#moreGamesButton')
const moreLikeThisList = document.querySelector('#moreLikeThis')

getSearchedGame(searchedGame, 'Halo 2')

moreGamesButton.addEventListener('click', () => {
    moreLikeThis(moreLikeThisList)
})