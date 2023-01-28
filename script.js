let pokemonNames = [];
let itemCount = 0;
let baseData;
const mainContainer = document.getElementById("main-container");
const modal = document.getElementById("modal-container");
let searchBox = document.getElementById("search-input");
let getMoreBtn = document.getElementById("get-more-btn");
searchBox.disabled = true;

async function fetchData() {
  searchBox.title = "please wait, the Pokemons are still loading";
  for (let i = 1; i <= 27; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let data = await response.json();
    pokemonNames.push(data["name"]);
    mainContainer.innerHTML += render(i, data);
    getTypes(data);
    itemCount++;
  }
  searchBox.disabled = false;
  searchBox.title = "please wait until the Pokemons are loaded";
}

async function getMorePokemon() {
  searchBox.disabled = true;
  searchBox.title = "please wait until the new pokemons are loaded";
  for (let i = itemCount + 1; i <= itemCount + 26; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let newResponse = await fetch(url);
    let newData = await newResponse.json();
    pokemonNames.push(newData["name"]);
    document.getElementById("main-container").innerHTML += render(i, newData);
    getTypes(newData);
  }
  itemCount = itemCount + 26;
  searchBox.disabled = false;
  searchBox.title = "";
}

function getTypes(pokemonData) {
  let types = document.getElementById(
    `pokedex-type-wrapper${pokemonData["id"]}`
  );
  for (let i = 0; i < pokemonData["types"].length; i++) {
    types.innerHTML += `
        <div class="pokedex-type">${pokemonData["types"][i]["type"]["name"]}</div>
        `;
  }
}

searchBox.addEventListener("input", (e) => {
  let inputVal = e.target.value.trim().toLowerCase();
  let eachContainer = document.querySelectorAll(".each-container");
  let searchedName = [];
  filterPokemons(inputVal, eachContainer, searchedName);
  sortOutPokemons(searchedName);
  showAllPokemons(inputVal, getMoreBtn, eachContainer);
});

function filterPokemons(inputVal, eachContainer, searchedName) {
  pokemonNames.filter((name) => {
    if (inputVal !== "") {
      if (name.includes(inputVal)) {
        eachContainer.forEach((eachItem) => eachItem.classList.add("d-none"));
        getMoreBtn.classList.add("d-none");
        searchedName.push(name);
      }
    }
  });
}

function sortOutPokemons(searchedName) {
  for (let i = 0; i < searchedName.length; i++) {
    document.querySelector(`.${searchedName[i]}`).classList.remove("d-none");
  }
}

function showAllPokemons(inputVal, getMoreBtn, eachContainer) {
  if (inputVal.length <= 0) {
    mainContainer.classList.remove("d-none");
    getMoreBtn.classList.remove("d-none");
    eachContainer.forEach((eachItem) => {
      eachItem.classList.remove("d-none");
    });
  }
}

function clearSearchBar() {
  searchBox.value = "";
  searchBox.value.length = 0;
  let eachContainer = document.querySelectorAll(".each-container");
  showAllPokemons(searchBox.value, getMoreBtn, eachContainer);
}

function showPokemon(i, items) {
  items.forEach((eachItem) => eachItem.classList.add("hide-pokemon"));
  document.getElementById("get-more-btn").style.display = "none";
  let searchedPokemon = document.querySelector(`.${pokemonNames[i]}`);
  searchedPokemon.classList.remove("hide-pokemon");
  searchedPokemon.classList.add("show-pokemon");
  document.getElementById("get-more-btn").style.display = "none";
}

function hidePokemon(items) {
  items.forEach((eachItem) => {
    eachItem.classList.remove("hide-pokemon");
    eachItem.classList.remove("show-pokemon");
  });
  document.getElementById("get-more-btn").style.display = "block";
}

async function showModal(i) {
  let modalUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  let modalResponse = await fetch(modalUrl);
  let modalData = await modalResponse.json();
  document.body.style.overflow = "hidden";
  modal.classList.add("show-modal");
  modal.innerHTML += showSelectedPokemon(modalData, i);
  selectedPokeTypes(modalData);
  getModalAbilities(modalData);
}

function getModalAbilities(modalData) {
  let abilArr = [];
  let abilities = document.querySelector(".abilities");
  for (let i = 0; i < modalData["abilities"].length; i++) {
    abilArr.push(modalData["abilities"][i]["ability"]["name"]);
  }
  abilities.innerHTML += abilArr.join(", ");
  abilArr.length = "";
  baseData = modalData;
}

function selectedPokeTypes(data) {
  let selectedPkTypes = document.getElementById(
    `pk-selected-type-wrapper${data["id"]}`
  );
  for (let i = 0; i < data["types"].length; i++) {
    selectedPkTypes.innerHTML += `
          <div class="pokedex-type">${data["types"][i]["type"]["name"]}</div>
          `;
  }
}

function removeUnderline() {
  let specs = document.querySelectorAll(".specs");
  let specsDetail = document.querySelectorAll(".specs-details");
  specs.forEach((spec) => spec.classList.remove("focused"));
  specsDetail.forEach((eachSpec) => eachSpec.classList.add("d-none"));
}

function showAbout() {
  removeUnderline();
  document.querySelector(".about-table").classList.remove("d-none");
  document.querySelector(".about").classList.add("focused");
}

function showBaseStats(data) {
  data = baseData;
  removeUnderline();
  document.querySelector(".base-stats").classList.add("focused");
  document.querySelector(".base-stats-wrapper").classList.remove("d-none");
  let baseStatsTable = document.querySelector(".base-stats-table-body");
  if (!document.querySelector(`.t-row`)) {
    for (let i = 0; i < data["stats"].length; i++) {
      baseStatsTable.innerHTML += pkStats(data, i);
    }
  } else {
    return;
  }
}

function showMoves() {
  let type = baseData["types"][0]["type"]["name"];
  removeUnderline();
  document.querySelector(".moves").classList.add("focused");
  let movesWrapper = document.querySelector(".moves-wrapper");
  movesWrapper.classList.remove("d-none");
  movesWrapper.innerHTML = "";
  for (let i = 0; i < baseData["moves"].length; i++) {
    movesWrapper.innerHTML += `
    <div class="moves-list ${type}">${baseData["moves"][i]["move"]["name"]}</div>`;
  }
}

function closeModal() {
  document.body.style.overflowY = "scroll";
  modal.innerHTML = "";
  modal.classList.remove("show-modal");
}

function closeModalOutside(){
  closeModal();
}


function just(){
  let name = "nishan";
}

console.log(just);
