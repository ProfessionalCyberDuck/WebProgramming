document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quizForm");
  const resultBox = document.getElementById("resultBox");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    score += parseInt(document.getElementById("q1").value);
    score += parseInt(document.getElementById("q2").value);
    score += parseInt(document.getElementById("q3").value);
    score += parseInt(document.getElementById("q4").value);

    let result = "";
    let className = "";

    if (score <= 2) {
      result = "Low risk. Your internet use appears healthy.";
      className = "low";
    } else if (score <= 5) {
      result = "Moderate risk. Consider setting limits on usage.";
      className = "medium";
    } else {
      result = "High risk. You may benefit from reducing use or seeking support.";
      className = "high";
    }

    resultBox.className = className;

    resultBox.innerHTML = `
      <h3>Your Result:</h3>
      <p>${result}</p>
    `;
  });
});