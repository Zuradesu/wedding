/* =========================================================
   OPEN INVITATION
========================================================= */

const opening = document.getElementById("opening");
const openButton = document.getElementById("open-button");

openButton.addEventListener("click", () => {
  opening.classList.add("hide");

  document.body.style.overflow = "auto";

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
});


/* =========================================================
   MUSIC
========================================================= */

const music = document.getElementById("wedding-music");
const musicButton = document.getElementById("music-button");

let musicPlaying = false;

musicButton.addEventListener("click", async () => {

  if (!musicPlaying) {

    try {
      await music.play();

      musicPlaying = true;
      musicButton.classList.add("playing");

    } catch (error) {
      console.log("Music could not play:", error);
    }

  } else {

    music.pause();

    musicPlaying = false;
    musicButton.classList.remove("playing");

  }

});


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate = new Date(
  "September 20, 2026 11:00:00"
).getTime();


function updateCountdown() {

  const now = new Date().getTime();

  const distance = weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;

  }


  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.15,
    }
  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   COPY BANK ACCOUNT
========================================================= */

const copyButton =
  document.getElementById("copy-account");

const accountNumber =
  document.getElementById("account-number");


copyButton.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      accountNumber.textContent.trim()
    );

    const originalText =
      copyButton.textContent;

    copyButton.textContent =
      "Copied!";

    setTimeout(() => {
      copyButton.textContent =
        originalText;
    }, 2000);

  } catch (error) {

    console.error(
      "Failed to copy:",
      error
    );

  }

});


/* =========================================================
   RSVP
========================================================= */

const rsvpForm =
  document.getElementById("rsvp-form");


rsvpForm.addEventListener("submit", (event) => {

  event.preventDefault();


  const name =
    document.getElementById("guest-name").value;

  const attendance =
    document.getElementById("attendance").value;


  const message =
    attendance === "yes"
      ? `Halo, saya ${name}. Saya akan hadir di acara pernikahan Alexander & Mika.`
      : `Halo, saya ${name}. Mohon maaf saya tidak dapat hadir di acara pernikahan Alexander & Mika.`;


  const whatsappNumber =
    "6281234567890";


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

});