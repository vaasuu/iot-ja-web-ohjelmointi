// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

function getNewNumbers(){

    num1 = getRandomIntInclusive(0,5);
    num2 = getRandomIntInclusive(0,5);
    num3 = getRandomIntInclusive(0,5);
    num4 = getRandomIntInclusive(0,5);
    num5 = getRandomIntInclusive(0,5);
    num6 = getRandomIntInclusive(0,5);
}

function fillNewNumbers(){
    clearStatus();
    getNewNumbers();
    document.querySelector("#question1").innerHTML = num1+" * "+num2;
    document.querySelector("#question2").innerHTML = num3+" * "+num4;
    document.querySelector("#question3").innerHTML = num5+" * "+num6;
    document.querySelector("#input1").value = "";
    document.querySelector("#input2").value = "";
    document.querySelector("#input3").value = "";
}

function getInputValue(id){
    return document.getElementById(id).value;
}

function checkAnswer(){
    var input1 = getInputValue("input1");
    var input2 = getInputValue("input2");
    var input3 = getInputValue("input3");

    if (input1 == num1*num2) {
        document.querySelector("#status1").innerHTML = "✅"
    } else {
        document.querySelector("#status1").innerHTML = "❌"   
    }

    if (input2 == num3*num4) {
        document.querySelector("#status2").innerHTML = "✅"
    } else {
        document.querySelector("#status2").innerHTML = "❌"   
    }

    if (input3 == num5*num6) {
        document.querySelector("#status3").innerHTML = "✅"
    } else {
        document.querySelector("#status3").innerHTML = "❌"   
    }

}

function clearStatus(){
    document.querySelector("#status1").innerHTML = "";
    document.querySelector("#status2").innerHTML = "";
    document.querySelector("#status3").innerHTML = "";
}

function giveRightAnswers(){
    console.log("gave right answers");
    document.querySelector("#input1").value = num1*num2;
    document.querySelector("#input2").value = num3*num4;
    document.querySelector("#input3").value = num5*num6;
    

}

window.onload = function() {
    fillNewNumbers();

}