const top4List = document.querySelector('#top4')
const randomList = document.querySelector('#random')
const genreFilter = document.querySelector('#genreFilter')
const genreCheckbox = document.querySelector('#genreCheckbox')
const platformFilter = document.querySelector('#platformFilter')
const platformCheckbox = document.querySelector('#platformCheckbox')
const ratingFilter = document.querySelector('#ratingInput')
const dateFilter = document.querySelector('#dateInput')
const filters = document.querySelector('#filters')
const showFilters = document.querySelector('#showFilters')
const randomizerButton = document.querySelector('#randomButton')
const filterRandomButton = document.querySelector('#filterRandomButton')

function hideShow(button, element) {
    button.addEventListener('change',function(){
        if (this.checked) {
            element.setAttribute("style","display:block") 
        } else {
            element.setAttribute("style","display:none")
        }
    })
}

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)

hideShow(showFilters, filters)
hideShow(genreCheckbox, genreFilter)
hideShow(platformCheckbox, platformFilter)

//Add filter to show games with atleast 1 review
randomizerButton.addEventListener('click',() => {
    randomList.innerHTML = ''
    for(let i = 0; i < 20; i++) {
        let randomInt = Math.floor(Math.random() * 900000)
        randomizer(randomList, randomInt)
    }
})

filterRandomButton.addEventListener('click', () => {
    const rating = ratingFilter.value 

    if(dateFilter.value === '') {
        return filteredSearch(randomList, 'indie', '4', rating)
    }

    const release =  new Date(dateFilter.value).getTime()
    //1 day = 86400000ms || 1 month = 2592000000ms || 6 months = 15552000000ms
    const preReleaseISO = new Date(release - 15552000000).toISOString()
    const postReleaseISO = new Date(release + 15552000000).toISOString()
    
    const preRelease = preReleaseISO.replace('T00:00:00.000Z','')
    const postRelease = postReleaseISO.replace('T00:00:00.000Z','')
    const releaseRange = `${preRelease},${postRelease}`

    filteredSearch(randomList, 'indie', '4', rating, releaseRange)
})
