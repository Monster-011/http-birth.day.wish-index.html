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

  let uploadedBackgroundImage = null;

  // Har baar bilkul naya nature wallpaper load karne ke liye function
  function setRandomNatureBackground() {
      const randomSig = Math.floor(Math.random() * 5000);
      const imageUrl = `https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80&sig=${randomSig}`;
      
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = "cover";
  }

  // Shuruat me random background set karein
  setRandomNatureBackground();
  nameInput.focus();

  // Enter press karne par submit ho
  nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          wishButton.click();
      }
  });

  // User ke photo upload karne ka logic
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

  // Main wish button click karne par
  wishButton.addEventListener("click", () => {
      const name = nameInput.value;
      if (name.trim() === "") {
          alert("Please enter your name!");
          return;
      }

      const wishes = [
          `...May your day be filled with joy 😃 and laughter 😁!`,
          `..Wishing you a year filled with happiness 😆😆 and success!`,
          `May all your dreams 🤙🤙 come true on your special day!`,
          `Sending you warm wishes 🎉 and a day as bright as your smile ☺️☺️!`,
          `Happy birthday 🎂🎂, ${name}! May this year bring you endless blessings ✨✨.`,
      ];

      birthdayTitle.textContent = `Happy Birthday 🎂✌️, ${name}!`;
      birthdayMessage.innerHTML = wishes.join("<br><br>");

      nameInputSection.style.display = "none";
      wishSection.style.display = "block";

      // Wish section ke liye alag random background (Celebration theme)
      if (uploadedBackgroundImage) {
          document.body.style.backgroundImage = `url('${uploadedBackgroundImage}')`;
      } else {
          const randomSig = Math.floor(Math.random() * 5000) + 1;
          document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80&sig=${randomSig}')`;
      }
      document.body.style.backgroundSize = "cover";

      createConfetti();
  });

  // Reset button logic
  resetBtn.addEventListener("click", () => {
      nameInput.value = "";
      wishSection.style.display = "none";
      nameInputSection.style.display = "block";
      
      // Reset par naya random background
      setRandomNatureBackground();
      
      filenameDisplay.textContent = "No file chosen";
      uploadedBackgroundImage = null;
      nameInput.focus();
  });

  // Confetti function
  function createConfetti() {
      const colors = ["#ff0055", "#00ffcc", "#0066ff", "#ffcc00", "#ff00ff", "#33ff33"];
      confettiContainer.innerHTML = "";

      for (let i = 0; i < 120; i++) {
          const confetti = document.createElement("div");
          confetti.className = "confetti";

          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * 100 + "vw";
          confetti.style.width = Math.random() * 8 + 6 + "px";
          confetti.style.height = Math.random() * 15 + 5 + "px";
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
