const top4List = document.querySelector('#top4')
const randomList = document.querySelector('#random')
const genreFilter = document.querySelector('#genreFilter')
const platformFilter = document.querySelector('#platformFilter')
const ratingFilter = document.querySelector('#ratingInput')
const startDateFilter = document.querySelector('#startDateInput')
const endDateFilter = document.querySelector('#endDateInput')
const filters = document.querySelector('#filters')
const hideShowBox = document.querySelector('#hideShowBox')

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)


//make dynamic/ reusable
hideShowBox.addEventListener('change',function(){
    if (this.checked) {
        filters.setAttribute("style","display:block") 
        }
        else {
        filters.setAttribute("style","display:none")}
})