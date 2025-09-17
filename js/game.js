const grid = document.querySelector(".container-images");
const nickName = document.querySelector(".nick_name");
const timer = document.querySelector(".timer");
const modal = document.querySelector(".modal_win_container");
const resetButton = document.querySelector(".reset_button");
const closeModal = document.querySelector(".modal_win_container span");
const textModal = document.querySelector(".modal_win_container .modal p");
const version = localStorage.getItem("version");

const pathToOurPhotosVersion = "../images";

document.querySelector(
  "main"
).style.backgroundImage = `url(${pathToOurPhotosVersion}/foto_${version}_background.png)`;

const ourPhotos = [];

for (let i = 1; i <= 10; i++) {
  ourPhotos.push(`foto_${version}_${i}.jpeg`);
}

const createElement = (tag, className) => {
  const el = document.createElement(tag);
  el.className = className;

  return el;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length >= ourPhotos.length * 2) {
    clearInterval(this.timer);
    resetButton.style.display = "block";
    textModal.innerHTML = `Parabéns, Amor! Você Ganhou! Seu tempo foi de ${timer.innerHTML}s!`;
    modal.classList.add("show");
  }
};

closeModal.addEventListener("click", () => modal.classList.remove("show"));

resetButton.addEventListener("click", () => resetGame());

const checkCards = () => {
  const firstPhoto = firstCard.dataset.photo;
  const secondPhoto = secondCard.dataset.photo;

  if (firstPhoto === secondPhoto) {
    setTimeout(() => {
      firstCard.firstChild.classList.add("disabled-card");
      secondCard.firstChild.classList.add("disabled-card");

      firstCard = "";
      secondCard = "";

      checkEndGame();
    }, 800);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 800);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) return;

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (photo) => {
  const card = createElement("div", "card rounded-[1rem]");
  const front = createElement("div", "face front rounded-[1rem]");
  const back = createElement("div", "face back rounded-[1rem]");

  front.style.backgroundImage = `url(${pathToOurPhotosVersion}/${photo})`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-photo", photo);

  return card;
};

const loadGame = () => {
  grid.innerHTML = "";
  const duplicatedPhotos = [...ourPhotos, ...ourPhotos];

  const shuffledPhotos = duplicatedPhotos.sort(() => Math.random() - 0.5);

  shuffledPhotos.forEach((photo) => {
    const card = createCard(photo);

    grid.appendChild(card);
  });

  Array.from(document.querySelectorAll(".back")).map((card) => {
    card.className = "face back rounded-[1rem] bg-rose-400";
    card.style.backgroundImage = `url(../images/foto_base.jpeg)`;
  });
};

const startTimer = () => {
  this.timer = setInterval(() => {
    const currentTimer = +timer.innerHTML;

    timer.innerHTML = String(currentTimer + 1).padStart(2, "0");
  }, 1000);
};

const resetGame = () => {
  clearInterval(this.timer);
  timer.innerHTML = "00";
  loadGame();
  startTimer();
};

window.onload = () => {
  if (localStorage.getItem("nick_name")) {
    nickName.innerHTML = localStorage.getItem("nick_name");
    loadGame();
    startTimer();
  } else {
    window.location = "../index.html";
  }
};
