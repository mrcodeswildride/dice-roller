let number = document.getElementById(`number`)
let rollButton = document.getElementById(`rollButton`)
let probabilities = document.getElementById(`probabilities`)

rollButton.addEventListener(`click`, rollDice)

number.addEventListener(`keydown`, keyPressed)
number.focus()

function rollDice() {
  let numberValue = number.value.trim()

  if (numberValue != `` && !isNaN(numberValue)) {
    if (numberValue < 1 || numberValue > 1000000) {
      probabilities.innerHTML = `Times to roll must be between 1 and 1,000,000.`
    }
    else {
      probabilities.innerHTML = ``
      let counts = []

      for (let i = 2; i <= 12; i++) {
        counts[i] = 0
      }

      for (let i = 0; i < numberValue; i++) {
        let die1 = Math.floor(Math.random() * 6) + 1
        let die2 = Math.floor(Math.random() * 6) + 1
        let rollNum = die1 + die2

        counts[rollNum]++
      }

      for (let i = 2; i <= 12; i++) {
        let experimental = (counts[i] / numberValue) * 100
        let theoretical = ((6 - Math.abs(7 - i)) / 36) * 100
        let difference = Math.abs(experimental - theoretical)

        let probability = document.createElement(`div`)
        probability.classList.add(`probability`)
        probabilities.appendChild(probability)

        let rollDiv = document.createElement(`div`)
        rollDiv.classList.add(`roll`)
        rollDiv.innerHTML = i
        probability.appendChild(rollDiv)

        let experimentalDiv = document.createElement(`div`)
        experimentalDiv.classList.add(`experimental`)
        experimentalDiv.innerHTML = `${experimental.toFixed(2)}%`
        probability.appendChild(experimentalDiv)

        let theoreticalDiv = document.createElement(`div`)
        theoreticalDiv.classList.add(`theoretical`)
        theoreticalDiv.innerHTML = `${theoretical.toFixed(2)}%`
        probability.appendChild(theoreticalDiv)

        let differenceDiv = document.createElement(`div`)
        differenceDiv.classList.add(`difference`)
        differenceDiv.innerHTML = `${difference.toFixed(2)}%`
        probability.appendChild(differenceDiv)
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