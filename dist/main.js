const top4List = document.querySelector('#top4')
const top4Title = document.querySelector('#hotGamesTitle')
const randomList = document.querySelector('#random')
const discoverTitle = document.querySelector('#discoverTitle')
const searchBar = document.querySelector('#searchBar')
const searchButton = document.querySelector('#searchButton')
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
const left = document.querySelector("#leftArrow")
const right = document.querySelector("#rightArrow")
const darkButton = document.querySelector("#darkButton")
const darkSwitch = document.querySelector("#darkSwitch")
const body = document.querySelector("#body")

function hideShow(button, element) {
    button.addEventListener('change',function(){
        if (this.checked) {
            element.setAttribute("style","display:block") 
        } else {
            element.setAttribute("style","display:none")
        }
    })
}

function scroll(direction) {
    let idx = null
    if(direction === 'left') {
        left.addEventListener("mouseenter", function(){
            idx = setInterval(() => randomList.scrollLeft -= 4, 8);
        });
        left.addEventListener("mouseleave", function(){
            clearInterval(idx);
        });
    } else if(direction === 'right'){
        right.addEventListener("mouseenter", function(){
            idx = setInterval(() => randomList.scrollLeft += 4, 8);
        });
          
        right.addEventListener("mouseleave", function(){
            clearInterval(idx);
        });
    } else {
        throw new Error ('invalid scroll input')
    }
}

function darkMode() {
    darkSwitch.classList.add('dark')
    body.setAttribute("style","background-image:url()")
    body.setAttribute("style","background-image:url(../dist/assets/bg-night.gif)")
}

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)

hideShow(showFilters, filters)
hideShow(genreCheckbox, genreFilter)
hideShow(platformCheckbox, platformFilter)

scroll('left')
scroll('right')

searchButton.addEventListener('click', () => {
    const title = searchBar.value
    getSearchedGame(top4List, title)
})

randomizerButton.addEventListener('click',() => {
    randomList.innerHTML = ''
    discoverTitle.innerHTML = 'Discover'
    for(let i = 0; i < 20; i++) {
        let randomInt = Math.floor(Math.random() * 900000)
        randomizer(randomList, randomInt)
    }
})

filterRandomButton.addEventListener('click', () => {
    randomList.innerHTML = ''
    discoverTitle.innerHTML = 'Discover'

    let genreStr = genresFilteredArr.toString()
    if(genreStr === '') {
        genreStr = 'indie' //default value
    }

    let platformStr = platformsFilteredArr.toString()
    if(platformStr === '') {
        platformStr = '4' //default value (PC)
    }

    const rating = ratingFilter.value 

    if(dateFilter.value === '') {
        return filteredSearch(randomList, genreStr, platformStr, rating)
    }
    const release =  new Date(dateFilter.value).getTime()
    //1 day = 86400000ms || 1 month = 2592000000ms || 6 months = 15552000000ms
    const preReleaseISO = new Date(release - 15552000000).toISOString()
    const postReleaseISO = new Date(release + 15552000000).toISOString()
    
    const preRelease = preReleaseISO.replace('T00:00:00.000Z','')
    const postRelease = postReleaseISO.replace('T00:00:00.000Z','')
    const releaseRange = `${preRelease},${postRelease}`

    filteredSearch(randomList, genreStr, platformStr, rating, releaseRange)
})

darkButton.addEventListener('click', darkMode)
