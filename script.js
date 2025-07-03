
const signs = {};
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  signs[letter] = {
    img: `images/${letter}.jpg`,
    meaning: `Letter ${letter}`
  };
}


const sentences = {
  hello: {
    label: "Hello",
    video: "/videos/hello.mov",
    meaning: "Auslan sign for 'Hello'"
  },
  thankyou: {
    label: "Thank you",
    video: "/videos/thankyou.mov",
    meaning: "Auslan sign for 'Thank you'"
  },
  howareyou: {
    label: "How are you?",
    video: "/videos/howru.mov",
    meaning: "Auslan sign for 'How are you?'"
  },
  please: {
    label: "Please",
    video: "/videos/please.mov",
    meaning: "Auslan sign for 'Please'"
  },
  goodmorning: {
    label: "Good Morning",
    video: "/videos/gmorning.mov",
    meaning: "Auslan sign for 'Good morning'"
  }
};


const alphabetList = document.querySelector(".alphabet-list");
const sentenceList = document.querySelector(".sentence-list");
const img = document.querySelector(".sign-image");
const video = document.querySelector(".sign-video");
const mediaContainer = document.querySelector(".media-container");
const meaning = document.querySelector(".sign-meaning");

// Generate buttons A-Z
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const btn = document.createElement("button");
  btn.classList.add("letter-btn");
  btn.dataset.key = letter;
  btn.textContent = letter;
  alphabetList.appendChild(btn);

  btn.addEventListener("click", () => {
    document.querySelectorAll(".letter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

   const sign = signs[letter];
    if (sign) {
        mediaContainer.innerHTML = `<img src="${sign.img}" alt="${sign.meaning}">`;
        meaning.textContent = sign.meaning;
    }
  });
}

Object.entries(sentences).forEach(([key, data]) => {
  const btn = document.createElement("button");
  btn.classList.add("sentence-btn");
  btn.textContent = data.label;
  btn.setAttribute("aria-label", data.meaning);

  btn.addEventListener("click", () => {
    mediaContainer.innerHTML = "";

    if (data.video.includes("youtube.com")) {
    // YouTube video → use iframe
    const iframe = document.createElement("iframe");
    iframe.src = data.video;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope");
    iframe.setAttribute("allowfullscreen", "");
    iframe.style.width = "100%";
    iframe.style.height = "250px";
    iframe.style.borderRadius = "0.5rem";
    mediaContainer.appendChild(iframe);
    } else {
    // Local video → use <video>
    const videoEl = document.createElement("video");
    videoEl.src = data.video;
    videoEl.setAttribute("controls", "");
    videoEl.style.width = "100%";
    videoEl.style.maxWidth = "480px";
    videoEl.style.height = "auto";
    videoEl.style.borderRadius = "0.5rem";
    mediaContainer.appendChild(videoEl);
    }

  meaning.textContent = data.meaning;
    document.querySelectorAll(".letter-btn").forEach(b => b.classList.remove("active"));
  });

  sentenceList.appendChild(btn);
});

