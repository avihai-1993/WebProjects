
let b = document.getElementById("board-numbers")
let select = document.getElementById("condition-maker")
let numberOfCounters = 0
const BIG_M = 999
const SMALL_M = 1
const T_SECONDS = 2500
const N = 10
let score = 0
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ccch1() {
    numberOfCounters++
    return `<h1 id="t${numberOfCounters}" onClick=checker('t${numberOfCounters}')>${getRandomInt(SMALL_M, BIG_M)}</h1>`
}
function cccoption(condition){

    return `<option id="option_${condition}" value="${condition}">${condition}</option>`
}
function action(e) {
    setInterval(() => {
        document.getElementById(e).innerText = getRandomInt(SMALL_M, BIG_M) 
    }, T_SECONDS)
}
function isEven(n){
 return n%2 === 0
}
function isODD(n){
    return n%2 === 1
   }
function checker(e) {
    var c1 = document.getElementById('score')
    if (conditionsMAP.get(select.value)(parseInt(document.getElementById(e).innerText))) {
        score++
    } else {
        score--
    }
    c1.innerText = score
    document.getElementById(e).innerText = getRandomInt(SMALL_M, BIG_M) 
}

let conditionsMAP = new Map()
conditionsMAP.set('isEven',isEven)
conditionsMAP.set('isODD',isODD)

for (var i = 1; i < N; i++) {
    b.innerHTML += ccch1()
    action(`t${i}`)
}
for (let [condition, func] of conditionsMAP) {
   select.innerHTML += cccoption(condition)
}
document.getElementById('score').innerText = 0
