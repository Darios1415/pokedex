const dataApi = {
    apiUrl: "https://pokeapi.co/api/v2/",
    endpoint: "pokemon/",
};

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const randomPokemon = document.querySelector(".random-pokemon");
const pokeName = document.querySelector('[data-poke-name]');
const pokeball = document.querySelector(".pokeball");
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const generateRandomNuber = () => Math.floor(Math.random() * 200) + 1;

const generateRandomPokemon = () => {
    const url = dataApi.apiUrl + dataApi.endpoint + generateRandomNuber();
    fetch(url)
        .then((data) => data.json())
        .then(response => displayPokemon(response))
        .catch((err) => {
            console.error(err);
        });
};

const displayPokemon = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    displayPokemonTypes(types);
    displayPokemonStats(stats);
};

const displayPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const displayPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

pokeball.addEventListener("click", generateRandomPokemon);

generateRandomPokemon();