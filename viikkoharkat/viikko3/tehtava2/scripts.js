// Initialize score to 0.
maxScore = 0;
currentScore = 0;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getNewNumbers() {
    // Get random numbers between 0 and 5.
  num1 = getRandomIntInclusive(0, 5);
  num2 = getRandomIntInclusive(0, 5);
  num3 = getRandomIntInclusive(0, 5);
  num4 = getRandomIntInclusive(0, 5);
  num5 = getRandomIntInclusive(0, 5);
  num6 = getRandomIntInclusive(0, 5);
}

function fillNewNumbers() {
    // Increase maxScore by 3 because 3 new questions are available.
  maxScore = maxScore + 3;

  // Update the scoreboard
  updateScoreCounter();
  // Clear old feedback/checkmarks and crosses
  clearStatus();
  // call getNewNumbers to generate new random numbers for the multiplication.
  getNewNumbers();
  // Display the new value to be multiplied.
  document.querySelector("#question1").innerHTML = num1 + " * " + num2;
  document.querySelector("#question2").innerHTML = num3 + " * " + num4;
  document.querySelector("#question3").innerHTML = num5 + " * " + num6;
  // Clear old inputs.
  document.querySelector("#input1").value = "";
  document.querySelector("#input2").value = "";
  document.querySelector("#input3").value = "";
    // Enable checkAnswer/Tarkista and giveRightAnswer/Oikeat vastaukset -buttons as they may be disabled.
  document.querySelector("#checkAnswerBtn").disabled = false;
  document.querySelector("#giveRightAnswerBtn").disabled = false;
}
// Help get user input and parse it into a number.
function getInputValue(id) {
  return parseInt(document.getElementById(id).value);
}

// Check users answer against the correct answer. If it's right, give a point, if not, don't.
function checkAnswer() {
    // Disable the checkAnswers button once clicked.
  document.querySelector("#checkAnswerBtn").disabled = true;

  // Set user inputs to variables.
  var input1 = getInputValue("input1");
  var input2 = getInputValue("input2");
  var input3 = getInputValue("input3");

  // Check if users input is correct.
  if (input1 == num1 * num2) {
        // Set a green emoji checkmark to indicate that the answer was correct.
      document.querySelector("#status1").innerHTML = "✅";
      // if it is, give a point.
    currentScore++;
  } else {
      // Set a red emoji cross to indicate that the answer was incorrect.
    document.querySelector("#status1").innerHTML = "❌";
  }

  if (input2 == num3 * num4) {
    document.querySelector("#status2").innerHTML = "✅";
    currentScore++;
  } else {
    document.querySelector("#status2").innerHTML = "❌";
  }

  if (input3 == num5 * num6) {
    document.querySelector("#status3").innerHTML = "✅";
    currentScore++;
  } else {
    document.querySelector("#status3").innerHTML = "❌";
  }
  // Update the scoreboard to reflect the new points.
  updateScoreCounter();
}

// Clears old feedback/checkmarks and crosses
function clearStatus() {
  document.querySelector("#status1").innerHTML = "";
  document.querySelector("#status2").innerHTML = "";
  document.querySelector("#status3").innerHTML = "";
}

// Show the right answers. 
function giveRightAnswers() {
    // If the user hadn't yet checked the answers, do it now.
  if (document.querySelector("#checkAnswerBtn").disabled == false) {
    // Check the users answers.
    checkAnswer();
  }
    // Replace users answers with the correct answers.  
  document.querySelector("#input1").value = num1 * num2;
  document.querySelector("#input2").value = num3 * num4;
  document.querySelector("#input3").value = num5 * num6;

    // Disable the checkAnswer button.
  document.querySelector("#checkAnswerBtn").disabled = true;
    // Disable the giveRightAnswer button.
  document.querySelector("#giveRightAnswerBtn").disabled = true;
}

    // Updates the Scoreboard
function updateScoreCounter() {
        // Sets the scoreBoard to currentScore/maxScore.
    document.querySelector("#score").innerHTML = currentScore + "/" + maxScore;
}

    // Run when the window first loads (and on refresh) 
window.onload = function () {
    // Initializes the test with a new set on random numbers
  fillNewNumbers();
};