'use sctrict;';
document.addEventListener('DOMContentLoaded', () => {
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      let overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.classList.add(
        'fixed',
        'inset-0',
        'bg-black',
        'opacity-50',
        'hidden',
        'z-10'
      );
      document.body.appendChild(overlay);

      const gallery = document.querySelector('.projectGallery');

      data.projects.forEach((project, index) => {
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

        const modalId = `modal-${index}`;
        projectDisplay.setAttribute('data-modal-target', `#${modalId}`);

        const image = document.createElement('img');
        image.src = project.image;
        image.alt = project.alt;
        image.className = 'object-cover w-full h-full rounded-3xl';

        let title = document.createElement('h3');
        title.className =
          'projectTitle lg-hidden lg-absolute max-sm:block max-sm:text-2xl max-sm:mt-3 md:flex md:absolute md:inset-0 md:items-center md:justify-center md:text-4xl md:text-white md:bg-[rgba(0,0,0,1)] md:opacity-0 md:transition-opacity md:duration-300 md:hover:opacity-50 md:rounded-3xl md:hover:font-bold';
        title.innerText = project.title;

        projectDisplay.appendChild(image);
        projectDisplay.appendChild(title);
        gallery.appendChild(projectDisplay);

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className =
          'modal fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] drop-shadow-2xl rounded-lg z-10 bg-white w-[500px] max-w-[80%] hidden';

        modal.innerHTML = `
            <div class="modal-content bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full max-h-[90vh] overflow-y-auto mx-auto">

              <div class="modalHeader flex justify-between items-center">
                <h2 class="modalTitle text-xl font-semibold">${project.title}</h2>
                <button class="closeButton cursor-pointer text-2xl">&times;</button>
              </div>
              <div class="modalImage my-4">
                <img src="${project.image}" alt="${project.alt}" class="w-full h-60 object-cover rounded-3xl">
              </div>
              <div class="modalBody">${project.description}</div>
            </div>
          `;
        document.body.appendChild(modal);

        projectDisplay.addEventListener('click', () => {
          const modal = document.querySelector(
            projectDisplay.dataset.modalTarget
          );
          openModal(modal);
        });
      });

      document.body.addEventListener('click', (event) => {
        if (event.target.matches('.closeButton')) {
          const modal = event.target.closest('.modal');
          closeModal(modal);
        }
      });

      overlay.addEventListener('click', () => {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(closeModal);
      });

      function openModal(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('active');
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
      }

      function closeModal(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
        overlay.classList.add('hidden');
        overlay.classList.remove('active');
      }
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
      image.className = 'w-full h-full object-cover';

      modalImage.innerHTML = '';
      modalImage.appendChild(image);
    });
}

document.addEventListener('DOMContentLoaded', typeWriterTitle);

let i = 0; // index for title text
let j = 0; // index for tagline text

let titleText = 'Jack Leslie';
let taglineText = 'Aspiring Software Developer';

function typeWriterTitle(fn, speed) {
  if (i < titleText.length) {
    document.querySelector('.titleText').innerHTML += titleText.charAt(i);
    i++;
    setTimeout(typeWriterTitle, 100);
  } else {
    typewriterTagline();
  }
}

function typewriterTagline(fn, speed) {
  if (j < taglineText.length) {
    document.querySelector('.taglineText').innerHTML += taglineText.charAt(j);
    j++;
    setTimeout(typewriterTagline, 45);
  } else {
    cursorBlink();
  }
}

const tagline = document.querySelector('.taglineText');
const cursorElement = document.createElement('span');
cursorElement.innerText = '|';
cursorElement.classList.add('cursor');

function cursorBlink() {
  tagline.appendChild(cursorElement);
  cursorElement.classList.toggle('blinkOff');
  setTimeout(cursorBlink, 500);
}
