const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data)) 

// Find matches
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

// Insert comma 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display matches
function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <ul>
            <li>
             <span class="name"> ${cityName},  ${stateName} </span>
             <span class="population"> ${numberWithCommas(place.population)} </span>
            </li>
        </ul>
        `
    }).join('');
    
    suggestions.innerHTML = html
}

const inputSearch = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

inputSearch.addEventListener('change', displayMatches)
inputSearch.addEventListener('keyup', displayMatches)


// Hide search results if no value in input tag

inputSearch.addEventListener('blur', hideSearchResult)

function hideSearchResult() {
    if (inputSearch.value === '') {
       document.location.reload(true)
    }
}



