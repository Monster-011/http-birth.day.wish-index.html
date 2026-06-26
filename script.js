document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const wishButton = document.getElementById("wishButton");
  const nameInputSection = document.getElementById("name-input-section");
  const wishSection = document.getElementById("wish-section");
  const birthdayTitle = document.getElementById("birthday-title");
  const birthdayMessage = document.getElementById("birthday-message");
  const resetBtn = document.getElementById("resetBtn");
  const confettiContainer = document.getElementById("confetti-container");
  const backgroundUpload = document.getElementById("backgroundUpload");
  const filenameDisplay = document.getElementById("filename");
  const container = document.querySelector(".container");

  let uploadedBackgroundImage = null;

  function setRandomNatureBackground() {
      const randomSig = Math.floor(Math.random() * 1000);
      const imageUrl = `https://picsum.photos/1920/1080?random=${randomSig}`;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = "cover";
  }

  setRandomNatureBackground();
  nameInput.focus();

  nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          wishButton.click();
      }
  });

  backgroundUpload.addEventListener("change", () => {
      if (backgroundUpload.files.length > 0) {
          filenameDisplay.textContent = backgroundUpload.files[0].name;
          const reader = new FileReader();
          reader.onload = (e) => {
              uploadedBackgroundImage = e.target.result;
          };
          reader.readAsDataURL(backgroundUpload.files[0]);
      } else {
          filenameDisplay.textContent = "No file chosen";
          uploadedBackgroundImage = null;
      }
  });

  wishButton.addEventListener("click", () => {
      const name = nameInput.value;
      if (name.trim() === "") {
          alert("Please enter your name!");
          return;
      }

      const wishes = [
          `May your day be filled with joy 😃 and laughter 😁!`,
          `Wishing you a year filled with happiness 😆😆 and success!`,
          `May all your dreams 🤙🤙 come true on your special day!`,
          `Sending you warm wishes 🎉 and a day as bright as your smile ☺️☺️!`,
          `Happy birthday 🎂🎂, ${name}! May this year bring endless blessings ✨✨.`,
      ];

      birthdayTitle.textContent = `Happy Birthday 🎂✌️, ${name}!`;
      // Yahan double br se single br kiya gap kam karne ke liye
      birthdayMessage.innerHTML = wishes.join("<br>"); 

      nameInputSection.style.display = "none";
      wishSection.style.display = "block";
      
      container.classList.add("transparent-bg");

      if (uploadedBackgroundImage) {
          document.body.style.backgroundImage = `url('${uploadedBackgroundImage}')`;
      } else {
          const randomSig = Math.floor(Math.random() * 1000) + 50;
          document.body.style.backgroundImage = `url('https://picsum.photos/1920/1080?random=${randomSig}')`;
      }
      document.body.style.backgroundSize = "cover";

      createConfetti();
  });

  resetBtn.addEventListener("click", () => {
      nameInput.value = "";
      wishSection.style.display = "none";
      nameInputSection.style.display = "block";
      
      container.classList.remove("transparent-bg");
      setRandomNatureBackground();
      
      filenameDisplay.textContent = "No file chosen";
      uploadedBackgroundImage = null;
      nameInput.focus();
  });

  function createConfetti() {
      const colors = ["#ff0055", "#00ffcc", "#0066ff", "#ffcc00", "#ff00ff", "#33ff33"];
      confettiContainer.innerHTML = "";

      for (let i = 0; i < 100; i++) { /* 120 se 100 kiya screen clean rakhne ke liye */
          const confetti = document.createElement("div");
          confetti.className = "confetti";

          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * 100 + "vw";
          confetti.style.width = Math.random() * 6 + 5 + "px";
          confetti.style.height = Math.random() * 12 + 5 + "px";
          confetti.style.opacity = Math.random() * 0.6 + 0.4;

          const duration = Math.random() * 2.5 + 2;
          confetti.style.animationDuration = duration + "s";
          confetti.style.animationDelay = Math.random() * 0.5 + "s";

          confettiContainer.appendChild(confetti);

          setTimeout(() => {
              confetti.remove();
          }, (duration + 0.5) * 1000);
      }
  }
});
