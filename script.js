let number = document.getElementById(`number`)
let rollButton = document.getElementById(`rollButton`)
let table = document.getElementById(`table`)

rollButton.addEventListener(`click`, rollDice)

number.addEventListener(`keydown`, keyPressed)
number.focus()

function rollDice() {
  let numberValue = number.value.trim()

  if (numberValue < 1 || numberValue > 1000000) {
    table.innerHTML = `Times to roll must be between 1 and 1,000,000.`
  } else {
    let rolls = {}

    for (let i = 2; i <= 12; i++) {
      rolls[i] = 0
    }

    for (let i = 0; i < numberValue; i++) {
      let die1 = Math.floor(Math.random() * 6) + 1
      let die2 = Math.floor(Math.random() * 6) + 1
      let roll = die1 + die2

      rolls[roll]++
    }

    table.innerHTML = ``
    makeRow(`Roll`, `<strong>Frequency</strong>`)

    for (let i = 2; i <= 12; i++) {
      let percent = (rolls[i] / numberValue) * 100
      makeRow(i, `${percent.toFixed(2)}%`)
    }
  }

  number.focus()
}

function makeRow(key, value) {
  let row = document.createElement(`div`)
  row.classList.add(`row`)
  table.appendChild(row)

  let keyDiv = document.createElement(`div`)
  keyDiv.classList.add(`key`)
  keyDiv.innerHTML = key
  row.appendChild(keyDiv)

  let valueDiv = document.createElement(`div`)
  valueDiv.classList.add(`value`)
  valueDiv.innerHTML = value
  row.appendChild(valueDiv)
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    rollDice()
  }
}
