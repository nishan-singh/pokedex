function render(i, data) {
  let type = data["types"][0]["type"]["name"];
  return /*html*/ `
    <div class="each-container ${data["name"]} ${type}" id="element-${i}" onclick="showModal(${i})">
        <div class="pokedex-info">
            <h3 class="pokedex-name">${data["name"]}</h3>
            <div id="pokedex-type-wrapper${data["id"]}">
            </div>
        </div>
        <div class="pokedex-img">
            <img src="${data["sprites"]["other"]["home"]["front_default"]}" alt="" />
        </div>
        <div class="bg-design">
            <div class="bg-inner-line1 ${type} ${type}-border"></div>
            <div class="bg-inner-design ${type}-border"></div>
            <div class="bg-inner-line2 ${type} ${type}-border"></div>
        </div>
    </div>`;
}

function showSelectedPokemon(data, i) {
  let type = data["types"][0]["type"]["name"];
  return /*html*/ `
        <div class="selected-pokemon ${type}" id="selected-pokemon">
          <button class="back-btn" onclick="closeModal()">&#8629</button>
          <div class="selected-pokedex-info">
            <div id="" class="poke-name-type-wrapper">
                <h3 class="selected-pokemon-name">${data["name"]}</h3>
                <div id="pk-selected-type-wrapper${data["id"]}"></div>
            </div>
            <div class="pokedex-img pokedex-selected-img"><img src="${
              data["sprites"]["other"]["home"]["front_default"]
            }" alt="" /></div>
            <div class="selected-bg-design bg-design">
              <div class="bg-inner-line1 ${type} ${type}-border"></div>
              <div class="bg-inner-design ${type}-border"></div>
              <div class="bg-inner-line2 ${type} ${type}-border"></div>
            </div>
          </div>
          <div class="selected-pokemon-specs">
            <div class="pokemon-infos">
                <div class="specs about focused" onclick="showAbout()">About</div>
                <div class="specs base-stats" onclick="showBaseStats()">Base Stats</div>
                <div class="specs moves" onclick="showMoves()">Moves</div>
            </div>
            <div class="about-table specs-details">
              <table>
                <tr>
                  <td>Height</td>
                  <td>${data["height"] / 10} m</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>${data["weight"] / 10} kg</td>
                </tr>
                <tr>
                  <td>Abilities</td>
                  <td class="abilities"></td>
                </tr>
              </table>
            </div>
            <div class="base-stats-wrapper specs-details">
              <table class="base-stats-table">
                <tbody class="base-stats-table-body"></tbody>
              </table>
            </div>
            <div class="moves-wrapper specs-details"></div>
        </div>
      `;
}

function pkStats(data, i) {
  let type = data["types"][0]["type"]["name"];
  return /*html*/ `
        <tr class="t-row">
          <td>${data["stats"][i]["stat"]["name"]}</td>
          <td>${data["stats"][i]["base_stat"]}</td>
          <td class="pro-td">
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${data["stats"][i]["base_stat"]}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </td>
        </tr>`;
}
