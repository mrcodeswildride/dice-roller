let number = document.getElementById(`number`)
let rollButton = document.getElementById(`rollButton`)
let box = document.getElementById(`box`)

rollButton.addEventListener(`click`, rollDice)

number.addEventListener(`keydown`, keyPressed)
number.focus()

function rollDice() {
  let numberValue = number.value.trim()

  if (numberValue != `` && !isNaN(numberValue)) {
    if (numberValue < 1 || numberValue > 1000000) {
      box.innerHTML = `Times to roll must be between 1 and 1,000,000.`
    }
    else {
      let counts = {}

      for (let i = 2; i <= 12; i++) {
        counts[i] = 0
      }

      for (let i = 0; i < numberValue; i++) {
        let die1 = Math.floor(Math.random() * 6) + 1
        let die2 = Math.floor(Math.random() * 6) + 1
        let rollNum = die1 + die2

        counts[rollNum]++
      }

      box.innerHTML = ``
      createRow(`Roll`, `<strong>Frequency</strong>`)

      for (let i = 2; i <= 12; i++) {
        let percent = (counts[i] / numberValue) * 100

        createRow(i, `${percent.toFixed(2)}%`)
      }
    }
  }

  number.focus()
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    rollDice()
  }
}

function createRow(key, value) {
  let row = document.createElement(`div`)
  row.classList.add(`row`)
  box.appendChild(row)

  let keyDiv = document.createElement(`div`)
  keyDiv.classList.add(`key`)
  keyDiv.innerHTML = key
  row.appendChild(keyDiv)

  let valueDiv = document.createElement(`div`)
  valueDiv.classList.add(`value`)
  valueDiv.innerHTML = value
  row.appendChild(valueDiv)
}