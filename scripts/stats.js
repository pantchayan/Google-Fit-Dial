let caloriesDiv = document.querySelector('.calories')
let distanceDiv = document.querySelector('.distance')
let moveMinDiv = document.querySelector('.move-min')

let calories = values[0].steps * 0.04
let distance = values[0].steps * 0.001
let moveMin = values[0].steps * 0.01


caloriesDiv.innerHTML = `<p>${Math.round(calories)}</p> <p>Cal</p>`;
distanceDiv.innerHTML = `<p>${distance.toFixed(1)}</p> <p>km</p>`;
moveMinDiv.innerHTML = `<p>${Math.round(moveMin)}</p> <p>Move Min</p>`;

