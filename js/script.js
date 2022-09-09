let pokemonName = document.querySelector('.pokemon_name')
let pokemonNumber = document.querySelector('.pokemon_number')
let pokemonImage = document.querySelector('.pokemon_img')

let form = document.querySelector('.form')
let input = document.querySelector('.input_search')

let btn_prev = document.querySelector('.btn-prev')
let btn_next = document.querySelector('.btn-next')

let searchPokemon = 1

let fetchPokemon = async (pokemon) => {
    let APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        let data = await APIResponse.json()

        return data
    }
}

let renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''

    let data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id

        input.value = ''
    } else {
        pokemonName.innerHTML = 'Não encontrado :c'
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none'

        input.value = ''
    }
}

form.addEventListener('submit', event => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btn_prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

btn_next.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)