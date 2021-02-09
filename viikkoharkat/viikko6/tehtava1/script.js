const truncateButton = document.getElementById("truncateBtn");
let truncateCharAmountNumber = document.getElementById("truncateCharAmountNumber");
let textToBeTruncated = document.getElementById("truncationTextInputBox");
let truncatedText = document.getElementById("truncatedText");

const handleTruncation = () => {
    inputText = textToBeTruncated.value;
    charCount = parseInt(truncateCharAmountNumber.value);
    truncatedText.textContent = inputText.slice(0,-charCount);
}

truncateButton.addEventListener("click", handleTruncation)
