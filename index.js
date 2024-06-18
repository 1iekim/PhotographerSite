// Add event for Portfolio BTN
const portfolioImg = document.querySelectorAll(".portfolio__img");
const portfolioBtn = document.querySelectorAll(".portfolio__btn");

function portfolioAction(el){
  if(el.target.classList.contains("portfolio__btn")){
    let active = document.querySelector(".portfolio__btn--active");
    active.classList.remove("portfolio__btn--active");
    el.target.classList.add("portfolio__btn--active");
    chargeGallery(el.target.dataset.season);
  }
}

function chargeGallery(x){
  portfolioImg.forEach((el,i) => el.src = `./assets/img/${x}/${i+1}.jpg`);
}

portfolioBtn.forEach(el => el.addEventListener("click", portfolioAction));

// Add event for Modal OPEN / CLOSE

const modal = document.querySelector(".modal");
const btns1 = document.querySelectorAll(".hero__btn");
const btns2 = document.querySelectorAll(".price__btn");
const modalBackground = document.querySelector(".modal__section");
const html = document.querySelector("html");

const HandlerOpenModal = () => {
  modal.classList.add("modal--active");
  html.classList.add("html--module");
};

const HandlerCloseModal = () => {
  modal.classList.remove("modal--active");
  html.classList.remove("html--module");
};

const HandlerStop = (event) => {
  event.stopPropagation();
};

btns1.forEach((btn) => btn.addEventListener("click", HandlerOpenModal));
btns2.forEach((btn) => btn.addEventListener("click", HandlerOpenModal));

modal.addEventListener("click", HandlerCloseModal);
modalBackground.addEventListener("click", HandlerStop);

//Navbar burger
const burger = document.querySelector(".nav-toggle");
const navbar = document.querySelector(".nav");
const links = document.querySelectorAll(".nav__link");

const HandlerLinkClick = () => {
  burger.click();
};

const HandlerBurgerClick = (event) => {
  event.target.closest(".nav-toggle").classList.toggle("nav-toggle--active");
  navbar.classList.toggle("nav--active");
};

burger.addEventListener("click", HandlerBurgerClick);
links.forEach((link) => link.addEventListener("click", HandlerLinkClick));

// Button send
const sendBtn = document.querySelectorAll(".btn__contacts");

const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");
const message = document.querySelector(".message");

// contacts__label
// show__warning

const CheckNum = (event) => {
  // console.log(event.target.value);
  let val = event.target.value;
  val = val.replace(/[^0-9]/gi, "");

  const label = event.target.closest(".contacts__label");

  if (val.length < 9) label.classList.add("show__warning");
  if (
    (val.length >= 9 || val.length === 0) &&
    label.classList.contains("show__warning")
  ) {
    label.classList.remove("show__warning");
  }

  event.target.value = val.length === 0 ? "" : "+" + val;

  CheckBtn1();
  CheckBtn2();
};

const CheckMail = (event) => {
  let val = event.target.value;

  const label = event.target.closest(".contacts__label");

  if (val.replace(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, "")) {
    label.classList.add("show__warning");
  }

  if (
    !val.replace(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, "") &&
    label.classList.contains("show__warning")
  ) {
    label.classList.remove("show__warning");
    CheckBtn1();
    CheckBtn2();
  }
};

const HandlerClickSend = (event) => {
  event.preventDefault();
  inputs.forEach((input) => (input.value = ""));
  textareas.forEach((area) => (area.value = ""));

  modal.click();

  message.classList.remove("message--hide");
  setTimeout(() => {
    message.classList.add("message--hide");
  }, 1500);
};

inputs.forEach((input, i) => {
  if (i === 1 || i === 3) {
    input.addEventListener("input", CheckNum);
  }
  if (i === 0 || i === 2) {
    input.addEventListener("input", CheckMail);
  }
});

const CheckBtn1 = () => {
  if (
    inputs[1].value.length > 9 &&
    !inputs[0].value.replace(
      /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
      ""
    )
  ) {
    sendBtn[0].disabled = false;
  } else {
    sendBtn[0].disabled = true;
  }
};
const CheckBtn2 = () => {
  if (
    inputs[3].value.length > 9 &&
    !inputs[2].value.replace(
      /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
      ""
    )
  ) {
    sendBtn[1].disabled = false;
  } else {
    sendBtn[1].disabled = true;
  }
};

sendBtn.forEach((btn) => btn.addEventListener("click", HandlerClickSend));
