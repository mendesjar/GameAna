const form = document.querySelector(".login_form");
const input = document.querySelector(".login_input");
const button = document.querySelector(".login_button");
const version = document.getElementById("version");

const handleSubmitForm = (e) => {
  e.preventDefault();

  const ver = [...version.elements].filter((input) => input.checked)[0];

  localStorage.setItem("nick_moamor", input.value);
  localStorage.setItem("version", ver?.value || "v1");

  window.location = "pages/game.html";
};

const handleInputChange = ({ target }) => {
  const text = target.value;

  if (text.trim().length > 2) {
    button.removeAttribute("disabled");
    return;
  }

  button.setAttribute("disabled", "");
};

form.addEventListener("submit", handleSubmitForm);
input.addEventListener("input", handleInputChange);
