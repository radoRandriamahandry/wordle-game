import { tick } from "svelte"
import { get, writable } from "svelte/store"

let randomSolution = writable(null)
let turn = writable(0)
let currentGuess = writable("")
let isCorrect = writable(false)
let guesses = writable([...Array(6)])
let usedKeys = writable({}) // for styling the keypad {a: "green", b:"yellow", c:"grey"}

let history = writable(["ninja", "toads", "steak"])

const getRandomSolution = () => {
  fetch("http://localhost:8000/solutions")
    .then((response) => response.json())
    .then((json) => {
      randomSolution.update(() => {
        return json[Math.floor(Math.random() * json.length)].word
      })
    })
    .catch((error) => {
      console.log(error.message)
      return
    })
}

// format a guess into an array of letters objects
// e.g: [{key: "a", color:"yellow"}]
const formatGuess = () => {
  let formattedGuess = [...get(currentGuess)].map((key) => {
    return { key, color: "grey" }
  })
  const copiedSolution = [...get(randomSolution)]

  // find any green
  formattedGuess.forEach((item, index) => {
    if (item.key === copiedSolution[index]) {
      item.color = "green"
      copiedSolution[index] = null
    }
  })

  // find any yellow
  formattedGuess.forEach((item, index) => {
    if (copiedSolution.includes(item.key) && item.color !== "green") {
      item.color = "yellow"
      copiedSolution[copiedSolution.indexOf(item.key)] = null
    }
  })

  return formattedGuess
}

// add a new guess to the guesses state
// update the isCorrect value if the guess is correct
// add one to the turn value
const addNewGuess = (formattedGuess) => {
  // test if the guess is correct
  if (get(currentGuess) === get(randomSolution)) {
    isCorrect.update(() => true)
    console.log("congrats ...")
  }

  // add new guess
  // guesses[get(turn)] = formattedGuess
  guesses.update((current) => {
    current[get(turn)] = formattedGuess
    console.log(current)
    return current
  })

  // update use keys
  // {a: "green", b:"grey", c:"yellow"}
  // get it from the formattedGuess
  usedKeys.update((prev) => {
    let newKeys = { ...prev }
    formattedGuess.forEach((guess) => {
      const currentColor = newKeys[guess.key]

      if (guess.color === "green") {
        newKeys[guess.key] = "green"
        return
      }
      if (guess.color === "yellow" && currentColor !== "green") {
        newKeys[guess.key] = "yellow"
        return
      }
      if (
        guess.color === "grey" &&
        currentColor !== "green" &&
        currentColor !== "yellow"
      ) {
        newKeys[guess.key] = "grey"
        return
      }
    })
    return { ...newKeys }
  })

  history.update((current) => [...current, ...get(currentGuess)])
  turn.update((prev) => prev + 1)
  currentGuess.set("")
}

// Handle the enter key
const testTheEnteredGuess = (key) => {
  const enteredGuess = get(currentGuess)

  if (key === "Enter") {
    if (get(turn) > 5) {
      console.log("wrong turn !!!")
      return
    }
    if (get(history).includes(enteredGuess)) {
      console.log("already tried, are you too old :o")
      return
    }
    if (enteredGuess.length !== 5) {
      console.log("you should wear glasses :p")
      return
    }
    const formatted = formatGuess()
    addNewGuess(formatted)
  }
}

// Handle the backspace key
const handleBackspace = (key) => {
  if (key === "Backspace") {
    if (get(currentGuess).length < 1) {
      console.log("nothing to remove")
      return
    }
    currentGuess.update((prev) => prev.slice(0, -1))
  }
}

// Handle the key up event
// only consider a-z or A-z letters
const handleKeyUp = async ({ key }) => {
  testTheEnteredGuess(key)
  handleBackspace(key)

  if (/^[A-Za-z]$/.test(key)) {
    if (get(currentGuess).length < 5) {
      currentGuess.update((guess) => guess.concat(key))
    } else {
      console.log("that enough :)")
    }
  }
}

const restartGame = () => {
  randomSolution.set(null)
  turn.set(0)
  currentGuess.set("")
  isCorrect.set(false)
  guesses.set([...Array(6)])
  usedKeys.set({})
  getRandomSolution()
}

export {
  randomSolution,
  turn,
  currentGuess,
  guesses,
  history,
  isCorrect,
  usedKeys,
  handleKeyUp,
  restartGame,
  getRandomSolution,
}
