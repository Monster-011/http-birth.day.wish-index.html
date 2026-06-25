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

  // Har baar naya random nature wallpaper load karne ka function
  function setRandomNatureBackground() {
      // Math.random() lagane se browser purani image cache nahi karega aur har baar bilkul naya wallpaper dega
      const randomId = Math.floor(Math.random() * 1000);
      document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80&sig=${randomId}')`;
      document.body.style.backgroundSize = "cover";
  }

  // Page load hote hi random background set karein
  setRandomNatureBackground();
  nameInput.focus();

  // Allow pressing Enter to submit
  nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          wishButton.click();
      }
  });

  // Update filename display on file selection
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

  // Main wish button functionality
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

      // Change background to uploaded image if available, else get a different random background
      if (uploadedBackgroundImage) {
          document.body.style.backgroundImage = `url('${uploadedBackgroundImage}')`;
      } else {
          // Wish page ke liye ek alag celebration type random background
          const randomId = Math.floor(Math.random() * 1000);
          document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80&sig=${randomId}')`;
      }
      document.body.style.backgroundSize = "cover";

      // Create confetti effect
      createConfetti();
  });

  // Reset button functionality
  resetBtn.addEventListener("click", () => {
      nameInput.value = "";
      wishSection.style.display = "none";
      nameInputSection.style.display = "block";
      
      // Reset karne par phir se naya background
      setRandomNatureBackground();
      
      filenameDisplay.textContent = "No file chosen";
      uploadedBackgroundImage = null;
      nameInput.focus();
  });

  // Confetti creation function
  function createConfetti() {
      const colors = ["#ff0055", "#00ffcc", "#0066ff", "#ffcc00", "#ff00ff", "#33ff33"];
      confettiContainer.innerHTML = "";

      // 120 pieces for more dense effect
      for (let i = 0; i < 120; i++) {
          const confetti = document.createElement("div");
          confetti.className = "confetti";

          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * 100 + "vw";
          confetti.style.width = Math.random() * 8 + 6 + "px";
          confetti.style.height = Math.random() * 15 + 5 + "px"; // Thoda rectangular shapes
          confetti.style.opacity = Math.random() * 0.6 + 0.4;

          // Alag alag speed aur ghumne (rotation) ka effect
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
