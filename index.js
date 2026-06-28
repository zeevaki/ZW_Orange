let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    // Added rotate after tutorial
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_qxdnyg4",
      "template_zkdk6zl",
      event.target,
      "URaLON_8OTzDkIS1D"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on zeevaki@gmail.com"
      );
    });
}

function filterProjects(category) {
  const cards = document.querySelectorAll('.category__card');
  const projects = document.querySelectorAll('#projects .project');
  const clickedCard = document.querySelector(`.category__card[data-filter="${category}"]`);
  const isAlreadyActive = clickedCard.classList.contains('active');

  cards.forEach(card => card.classList.remove('active'));

  if (isAlreadyActive) {
    projects.forEach(p => p.style.display = '');
  } else {
    clickedCard.classList.add('active');
    projects.forEach(p => {
      p.style.display = p.dataset.category === category ? '' : 'none';
    });
  }
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
