const top4List = document.querySelector('#top4')
const randomList = document.querySelector('#random')
const genreFilter = document.querySelector('#genreFilter')
const platformFilter = document.querySelector('#platformFilter')
const ratingFilter = document.querySelector('#ratingInput')
const startDateFilter = document.querySelector('#startDateInput')
const endDateFilter = document.querySelector('#endDateInput')
const filters = document.querySelector('#filters')
const hideShowBox = document.querySelector('#hideShowBox')
const randomizerButton = document.querySelector('#randomButton')

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)

randomizerButton.addEventListener('click',() => {
    randomList.innerHTML = ''
    for(let i = 0; i < 20; i++) {
        let randomInt = Math.floor(Math.random() * 700000)
        randomizer(randomList, randomInt)
    }
})

//make dynamic/ reusable
hideShowBox.addEventListener('change',function(){
    if (this.checked) {
        filters.setAttribute("style","display:block") 
        }
        else {
        filters.setAttribute("style","display:none")}
})