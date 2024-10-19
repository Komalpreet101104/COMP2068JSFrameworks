const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

document.querySelectorAll('.nav-link').forEach((n) => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.classList.remove('no-scroll');
}));


const projects = [
  {
    id: 'bg-pro1',
    name: 'Cake Bakery Website ',
    description: 'A visually appealing website showcasing a variety of cakes with ordering options and customer reviews',
    featuredImage: './images/A1.png',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/FINAL-PROJECT/tree/main/CAKE" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro2',
    name: 'Retro Product Website',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. Has been the industry standards.',
    featuredImage: './images/A3.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/Poster" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro3',
    name: 'Intersteller Movie Poster',
    description: 'A creative webpage displaying iconic movie posters with brief descriptions and release dates',
    featuredImage: './images/A2.png',
    technologies: ['HTML', 'Ruby', 'BootStrap'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/ASSIGNMENT" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro4',
    name: 'Photo Studio Webpage',
    description: 'A sleek website for a photography studio, featuring portfolio galleries, booking options, and client testimonials.',
    featuredImage: './images/A4.jpg',
    technologies: ['HTML', 'Ruby', 'BootStrap'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/ASSIGNMENT" target="blank">See Source</a>',
  },
  
];


const projectsContainer = document.getElementById('projects-container');

projects.map((card) => {
  projectsContainer.innerHTML += `
  <div id="${card.id}" class="project-card">
          <div class="card-text flex flex-column">
            <h2 class="work-subtitle protitle">
            ${card.name}
            </h2>
            <p class="work-details prodetails">${card.description}
            </p>
            <div class="flex">
              <p class="flex-item item2 proitem2">${card.technologies[0]}</p>
              <p class="flex-item item3 proitem3">${card.technologies[1]}</p>
              <p class="flex-item item1 proitem1">${card.technologies[2]}</p>
            </div>
          </div>
          <button class="work-button probutton ">
          ${card.seeProject}
          </button>
  </div>
  `;
  return ('');
});

const allProjects = [
  {
    id: 'bg-pro1',
    name: 'Cake Bakery Website',
    description: 'A visually appealing website showcasing a variety of cakes with ordering options and customer reviews',
    featuredImage: './images/A1.png',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/FINAL-PROJECT/tree/main/CAKE" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro2',
    name: 'Retro Product Website',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. Has been the industry standards.',
    featuredImage: './images/A2.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/Poster" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro3',
    name: 'Intersteller Movie Poster',
    description: 'A creative webpage displaying iconic movie posters with brief descriptions and release dates',
    featuredImage: './images/A3.png',
    technologies: ['HTML', 'Ruby', 'BootStrap'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/ASSIGNMENT" target="blank">See Source</a>',
  },
  {
    id: 'bg-pro4',
    name: 'Photo Studio Webpage',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. Has been the industry standards.',
    featuredImage: './images/A4.jpg',
    technologies: ['HTML', 'Ruby', 'BootStrap'],
    seeProject: 'See Project',
    linkSource: '<a href="https://github.com/Komalpreet101104/Projects/tree/main/ASSIGNMENT" target="blank">See Source</a>',
  },
 
];



// pop-up section
document.addEventListener('DOMContentLoaded', () => {
    const seeProjectButtons = document.querySelectorAll('.work-button');
    const popMenu = document.querySelector('.seePopup');
  
    seeProjectButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        document.body.classList.toggle('no-scroll');
        popMenu.classList.add('act');
        popMenu.innerHTML = `
          <section id="popup" class="popup">
            <div id="popup-title">
              <h3 class="popup-heading flex">${allProjects[index].name}</h3>
              <span class="close-btn">&#x2715;</span>
              <div class="flex flex-start">
                ${allProjects[index].technologies.map(tech => `<p class="flex-item">${tech}</p>`).join('')}
              </div>
            </div>
            <div class="popup-card">
              <div id="popup-image"><img src="${allProjects[index].featuredImage}" alt="Project Image"></div>
              <div class="flex flex-column">
                <p class="popup-details">${allProjects[index].description}</p>
                <div class="flex popup-textbtn">
                  <button id="see-source" class="work-button">${allProjects[index].linkSource}</button>
                </div>
              </div>
            </div>
          </section>`;
  
        const popClose = document.querySelector('.close-btn');
        popClose.addEventListener('click', () => {
          popMenu.classList.remove('act');
          document.body.classList.remove('no-scroll');
        });
      });
    });
  });
  