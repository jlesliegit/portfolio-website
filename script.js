'use sctrict;';

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

fetch('projects.json')
  .then((response) => response.json())
  .then((data) => {
    data.projects.forEach((project) => {
      let projectDisplay = document.createElement('div');
      projectDisplay.classList.add(
        'relative',
        'w-[300px]',
        'h-[300px]',
        'md:h-auto',
        'flex',
        'flex-col',
        'items-center',
        'max-sm:mb-10',
        'cursor-pointer'
      );

      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.alt;
      image.className = 'object-cover w-full h-full rounded-3xl';

      let title = document.createElement('h3');
      title.className =
        'projectTitle hidden max-sm:block max-sm:text-2xl max-sm:mt-3 md:flex md:absolute md:inset-0 md:items-center md:justify-center md:text-4xl md:text-white md:bg-[rgba(0,0,0,1)] md:opacity-0 md:transition-opacity md:duration-300 md:hover:opacity-50 md:rounded-3xl md:hover:font-bold';
      title.innerText = project.title;

      projectDisplay.append(image);
      projectDisplay.append(title);

      const gallery = document.querySelector('.projectGallery');
      gallery.appendChild(projectDisplay);
    });
  });

function showProjectDetails(projectIndex) {
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      const modalTitle = document.querySelector('.modalTitle');
      const modalText = document.querySelector('.modalBody');
      const modalImage = document.querySelector('.modalImage');
      const result = data.projects[projectIndex];

      modalTitle.innerHTML = `${result.title}`;
      modalText.innerHTML = `${result.description}`;

      const image = document.createElement('img');
      image.src = result.image;
      image.alt = result.alt;
      image.className = 'w-full h-60 object-cover';

      modalImage.innerHTML = '';
      modalImage.appendChild(image);
    });
}

let i = 0;
let text = 'Jack Leslie';
let speed = 100;

function typeWriter() {
  if (i < text.length) {
    document.querySelector('.titleText').innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener('DOMContentLoaded', typeWriter());
