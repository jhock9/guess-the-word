// The unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
// The instructions to input letters
const inputInstructions = document.querySelector(".input-instructions");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; // Default word if request is unsuccessful
let guessedLetters = [];
let remainingGuesses = 8;

// Gets a random word for the game
const getWord = async function () {
  const response = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    if (!response.ok) {
      // If we can't fetch the file for some reason, use default word
      placeholder(word);
      console.log("Response failed - using default word");
  } else {
    // go the desired response
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    if (word.length > 10) {
      getWord();
    } else {
      placeholder(word);
    }
  };
};

// Fire off the game
getWord(word);

// Display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  // Focus on letter input
  letterInput.focus();
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  // Prevents the default behavior of clicking a button, the form submitting, and then reloading the page
  e.preventDefault(); 
  // Focus on letter input
  letterInput.focus();
  // Empty message paragraph
  message.innerText = "";
  // Let's grab what was entered in the input
  const guess = letterInput.value;
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  };
  // Empty guess text input
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A-Z.";
  } else {
    // We finally got a single letter, omg yay
  return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    updateRemainingGuesses(guess);
     // Show user what they already guessed
    showGuessedLetters();
    // New letter guessed - let's see if we're right
    updateWordInProgress(guessedLetters);
    // console.log(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";

  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push ("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateRemainingGuesses = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }
  
  if (remainingGuesses === 0) {
    message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the word correctly! Way to go!</p>';
    startOver();
  }
};

const startOver = function () {
  letterInput.blur();
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  letterInput.classList.add("hide");
  inputInstructions.classList.add("hide");
  playAgainButton.classList.remove("hide");
  playAgainButton.focus();
};

playAgainButton.addEventListener("click", function () {
  // Reset all original values and grab new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8; 
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerText = "";
  message.innerText = "";
  getWord();
  // show the right UI elements
  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  letterInput.classList.remove("hide");
  inputInstructions.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
