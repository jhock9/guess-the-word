//The unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const numberRemainingSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
//Starting word to test hte game until I fetch words from API
const word = "magnolia";

const placeholder = function (word) {
  wordInProgress.innerText = "●";
};

placeholder(word);

guessButton.addEventListener("click"), function (e) {
  e.preventDefault(); //prevents the default behavior of clicking a button, the form submitting, and then reloading the page
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
};