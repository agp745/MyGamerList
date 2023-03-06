const top4List = document.querySelector('.top4')
const randomList = document.querySelector('.random')
const genreFilter = document.querySelector('.genre')
const platformFilter = document.querySelector('.platform')
const ratingFilter = document.querySelector('#ratingInput')
const startDateFilter = document.querySelector('#startDateInput')
const endDateFilter = document.querySelector('#endDateInput')
const filters = document.getElementById('filters')
const hideShowBox = document.getElementById('hideShowBox')

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)

hideShowBox.addEventListener('change',function(){
    if (this.checked) {
        filters.setAttribute("style","display:block") 
        }
        else {
        filters.setAttribute("style","display:none")}
})