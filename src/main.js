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
const left = document.getElementById("leftArrow")
const right = document.getElementById("rightArrow")
const darkButton = document.getElementById("darkButton")
const darkSwitch = document.getElementById("darkSwitch")

darkButton.addEventListener('click',darkMode) 

 function darkMode() {
    darkSwitch.classList.add('dark')
 }

hotGames(top4List)
generalGames(randomList)
getGenres(genreFilter)
getPlatforms(platformFilter)

left.addEventListener("mouseenter", function(){
    idx = setInterval(() => randomList.scrollLeft -= 4, 08);
  });
  
  left.addEventListener("mouseleave", function(){
    clearInterval(idx);
  });
  
  right.addEventListener("mouseenter", function(){
    idx = setInterval(() => randomList.scrollLeft += 4, 08);
  });
  
  right.addEventListener("mouseleave", function(){
    clearInterval(idx);
  });

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