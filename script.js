document.addEventListener("DOMContentLoaded", () => {


  function sanitize(input) {
    return input.replace(/[<>]/g, "");
  }

  function validateEmail(email) {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  }

  function markInvalid(el, msgBox, msg) {
    el.classList.add("invalid");
    el.focus?.();
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    if (msgBox) {
      msgBox.textContent = msg;
      msgBox.style.color = "red";
    }
  }


  document.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", () => {
      el.classList.remove("invalid");
      el.closest(".radio-group")?.classList.remove("invalid");
    });

    el.addEventListener("change", () => {
      el.classList.remove("invalid");
      el.closest(".radio-group")?.classList.remove("invalid");
    });
  });

  
  const noneBox = document.getElementById("habitNone");
  const habitOptions = document.querySelectorAll(".habitOption");

  if (noneBox) {
    noneBox.addEventListener("change", () => {
      if (noneBox.checked) {
        habitOptions.forEach(cb => cb.checked = false);
      }
    });
  }

  habitOptions.forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked && noneBox) {
        noneBox.checked = false;
      }
    });
  });

  
  const quizForm = document.getElementById("quizForm");
  const resultBox = document.getElementById("resultBox");
  const quizMessage = document.getElementById("quizMessage");

  if (quizForm) {
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let score = 0;
      let firstError = null;
      let hasError = false;

      const q1 = document.getElementById("q1");
      const q4 = document.getElementById("q4");
      const q2 = document.querySelector('input[name="q2"]:checked');
      const q3 = document.querySelector('input[name="q3"]:checked');

      q1.value = sanitize(q1.value);
      q4.value = sanitize(q4.value);

      
      document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

      
      if (!q1.value) {
        q1.classList.add("invalid");
        hasError = true;
        firstError = firstError || q1;
      }

      if (!q2) {
        const g = document.getElementById("q2Group");
        g.classList.add("invalid");
        hasError = true;
        firstError = firstError || g;
      }

      if (!q3) {
        const g = document.getElementById("q3Group");
        g.classList.add("invalid");
        hasError = true;
        firstError = firstError || g;
      }

      if (!q4.value) {
        q4.classList.add("invalid");
        hasError = true;
        firstError = firstError || q4;
      }

      if (hasError) {
        quizMessage.textContent = "Please complete all highlighted fields.";
        quizMessage.style.color = "red";

        firstError?.focus?.();
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

    
      score += parseInt(q1.value);
      score += parseInt(q2.value);
      score += parseInt(q3.value);
      score += parseInt(q4.value);

      const habits = document.querySelectorAll('input[name="habits"]:checked');
      const hasNone = [...habits].some(h => h.id === "habitNone");

      if (!hasNone) score += habits.length;

    
      let result = "";

      if (score <= 3) {
        result = "<strong>LOW RISK: Your internet usage appears healthy. </strong>";
      } else if (score <= 6) {
        result = "<strong>MEDIUM RISK: Consider setting limits on usage. </strong>";
      } else {
        result = "<strong>HIGH RISK: You may benefit from reducing internet use or seeking support. </strong>";
      }

      resultBox.innerHTML= result;
      quizMessage.textContent = "";
    });
  }

 
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  if (contactForm) {
    contactForm.addEventListener("submit",(e) => {
      e.preventDefault();

      let firstError = null;
      let hasError = false;

      const name = document.getElementById("contactName");
      const email = document.getElementById("contactEmail");
      const reason = document.getElementById("reason");
      const consent = document.getElementById("consent");
      const message = document.getElementById("message");

     
      name.value = sanitize(name.value.trim());
      email.value = sanitize(email.value.trim());
      message.value = sanitize(message.value.trim());

      
      document.querySelectorAll("#contactForm .invalid").forEach(el => {
        el.classList.remove("invalid");
      });

     
      if (!name.value) {
        name.classList.add("invalid");
        hasError = true;
        firstError = firstError || name;
      }

      if (!email.value) {
        email.classList.add("invalid");
        hasError = true;
        firstError = firstError || email;
      } else if (!validateEmail(email.value)) {
        markInvalid(email, contactMessage, "Enter a valid email address.");
        return;
      }

      if (!reason.value) {
        reason.classList.add("invalid");
        hasError = true;
        firstError = firstError || reason;
      }

      if (!consent.checked) {
        consent.classList.add("invalid");
        hasError = true;
        firstError = firstError || consent;
      }

      if (hasError) {
        contactMessage.textContent= "Please complete all highlighted fields.";
        contactMessage.style.color = "red";

        firstError?.focus?.();
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      contactMessage.textContent =
        "Successfully sent! Expect contact from our team within two to three business days.";
      contactMessage.style.color = "black";

      contactForm.reset();
    });
  }

});