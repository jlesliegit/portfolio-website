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
