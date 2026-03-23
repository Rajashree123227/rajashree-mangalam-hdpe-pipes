/*----------------Header product list dropdown------------------*/
const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});


/*-----------------Accordion functionality--------------*/
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const icon = item.querySelector('.faq-icon');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
    });
    if (!isActive) {
      item.classList.add('active');
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

if (faqItems.length > 0) {
  faqItems[0].classList.add('active');
  faqItems[0].querySelector('.faq-icon').style.transform = 'rotate(180deg)';
}


/*---------------Manufacturing process stepper--------------*/
const steps = [
  {
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    img: "./assets/images/portfolio_img1.png"
  },
  {
    title: "Precision Extrusion Process",
    desc: "High-performance extruders melt and form HDPE compound at controlled temperatures ensuring consistent melt flow and pipe quality.",
    points: ["Temperature controlled zones", "Consistent melt flow index"],
    img: "./assets/images/portfolio_img2.png"
  },
  {
    title: "Controlled Cooling System",
    desc: "Water cooling tanks rapidly cool the extruded pipe maintaining dimensional stability and preventing deformation.",
    points: ["Rapid cooling technology", "Dimensional stability assured"],
    img: "./assets/images/portfolio_img1.png"
  },
  {
    title: "Precision Sizing & Calibration",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["Vacuum sizing technology", "Wall thickness uniformity"],
    img: "./assets/images/portfolio_img2.png"
  },
  {
    title: "Rigorous Quality Control",
    desc: "Every pipe undergoes comprehensive quality checks including dimensional verification, pressure testing, and material analysis.",
    points: ["100% dimensional verification", "Pressure tested to standards"],
    img: "./assets/images/portfolio_img1.png"
  },
  {
    title: "Clear Product Marking",
    desc: "Pipes are marked with all essential information including size, pressure rating, material grade, and manufacturer details.",
    points: ["ISO standard markings", "Permanent ink printing"],
    img: "./assets/images/portfolio_img2.png"
  },
  {
    title: "Precision Cutting",
    desc: "Automated cutting systems ensure accurate pipe lengths with clean square ends ready for installation.",
    points: ["Automated cutting system", "Clean square ends"],
    img: "./assets/images/portfolio_img1.png"
  },
  {
    title: "Safe Packaging & Dispatch",
    desc: "Pipes are carefully packaged to prevent damage during transport and storage, ready for delivery to customers.",
    points: ["Protective packaging", "Ready for safe transport"],
    img: "./assets/images/portfolio_img2.png"
  }
];

const stepNames = [
  "Raw Material", "Extrusion", "Cooling", "Sizing",
  "Quality Control", "Marking", "Cutting", "Packaging"
];

let currentStep = 0;

function updateStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  const step = steps[currentStep];

  document.getElementById('process-title').textContent = step.title;
  document.getElementById('process-desc').textContent = step.desc;
  document.getElementById('step-badge').textContent =
    `Step ${currentStep + 1}/${steps.length}: ${stepNames[currentStep]}`;

  const pointsList = document.getElementById('process-points');
  pointsList.innerHTML = step.points.map(p => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#2B3990"/>
        <path d="M5.5 10L8.5 13L14.5 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${p}
    </li>
  `).join('');

  const img = document.getElementById('process-img');
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    img.src = step.img;
    img.style.opacity = '1';
  }, 150);

  document.querySelectorAll('.process-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === currentStep);
  });
}

document.querySelectorAll('.process-tab').forEach((tab, i) => {
  tab.addEventListener('click', () => updateStep(i));
});


document.getElementById('prev-btn').addEventListener('click', () => {
  updateStep(currentStep - 1);
});
document.getElementById('next-btn').addEventListener('click', () => {
  updateStep(currentStep + 1);
});
document.getElementById('mobile-prev').addEventListener('click', () => {
  updateStep(currentStep - 1);
});
document.getElementById('mobile-next').addEventListener('click', () => {
  updateStep(currentStep + 1);
});

updateStep(0);

/*-------------------------- Applications carousel-------------------------*/
const appsSlider = document.getElementById('apps-slider');
const appsPrev = document.getElementById('apps-prev');
const appsNext = document.getElementById('apps-next');
const wrapper = document.querySelector('.apps-slider-wrapper');

let currentTranslate = 0;

function getMaxTranslate() {
  return appsSlider.scrollWidth - wrapper.offsetWidth;
}

function updateAppsSlider() {
  const maxTranslate = getMaxTranslate();
  if (appsSlider.scrollWidth <= wrapper.offsetWidth) {
    appsSlider.style.justifyContent = "center";
    appsSlider.style.transform = `translateX(0px)`;
    appsPrev.disabled = true;
    appsNext.disabled = true;
    return;
  } else {
    appsSlider.style.justifyContent = "flex-start";
  }

  if (currentTranslate < 0) currentTranslate = 0;
  if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;

  appsSlider.style.transform = `translateX(-${currentTranslate}px)`;

  appsPrev.disabled = currentTranslate === 0;
  appsNext.disabled = currentTranslate >= maxTranslate;
}

function getScrollAmount() {
  const card = appsSlider.querySelector('.apps-card');
  return card ? card.offsetWidth + 16 : 350;
}

appsNext.addEventListener('click', () => {
  currentTranslate += getScrollAmount();
  updateAppsSlider();
});

appsPrev.addEventListener('click', () => {
  currentTranslate -= getScrollAmount();
  updateAppsSlider();
});
window.addEventListener('resize', updateAppsSlider);

updateAppsSlider();


/*----------------------testimonal functionality-------------------------*/

const testimonialsWrapper = document.getElementById('testimonials-wrapper');
const testimonialsSlider = document.getElementById('testimonials-slider');

let isDown = false;
let startX;
let scrollLeft;

testimonialsWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  testimonialsWrapper.style.cursor = 'grabbing';
  startX = e.pageX - testimonialsWrapper.offsetLeft;
  scrollLeft = testimonialsWrapper.scrollLeft;
});

testimonialsWrapper.addEventListener('mouseleave', () => {
  isDown = false;
  testimonialsWrapper.style.cursor = 'grab';
});

testimonialsWrapper.addEventListener('mouseup', () => {
  isDown = false;
  testimonialsWrapper.style.cursor = 'grab';
});

testimonialsWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonialsWrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  testimonialsWrapper.scrollLeft = scrollLeft - walk;
});

function getMaxScroll() {
  const cards = testimonialsSlider.querySelectorAll('.testimonial-card');
  const lastCard = cards[cards.length - 1];
  const wrapperRect = testimonialsWrapper.getBoundingClientRect();
  const lastRect = lastCard.getBoundingClientRect();

  const overflow = lastRect.right - wrapperRect.right + 20;
  return Math.max(0, testimonialsWrapper.scrollLeft + overflow);
}

testimonialsWrapper.addEventListener('wheel', (e) => {
  const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

  if (isHorizontal) {
    e.preventDefault();
    testimonialsWrapper.scrollLeft += e.deltaX;
    return;
  }

  const atStart = testimonialsWrapper.scrollLeft === 0;
  const atEnd =
    testimonialsWrapper.scrollLeft + testimonialsWrapper.clientWidth >=
    testimonialsWrapper.scrollWidth - 1;

  if (
    (e.deltaY < 0 && !atStart) ||
    (e.deltaY > 0 && !atEnd)    
  ) {
    e.preventDefault();
    testimonialsWrapper.scrollLeft += e.deltaY;
  }

}, { passive: false });

testimonialsWrapper.addEventListener('scroll', () => {
  const maxScroll = getMaxScroll();
  if (testimonialsWrapper.scrollLeft > maxScroll) {
    testimonialsWrapper.scrollLeft = maxScroll;
  }
});

/*-----------Smooth scroll functionality-----------*/
const header        = document.querySelector("header");
const headerWrapper = document.querySelector(".header-wrapper");
const stickyFoldBar = document.getElementById("stickyFoldBar");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const firstFold     = window.innerHeight; 

  if (currentScroll > 10) {
    headerWrapper.classList.add("scrolled");
  } else {
    headerWrapper.classList.remove("scrolled");
  }

  if (currentScroll === 0) {
    header.classList.remove("hide");
  } else {
    if (currentScroll < lastScrollY) {
      header.classList.add("hide");     
    } else {
      header.classList.remove("hide"); 
    }
  }

  
  if (currentScroll > firstFold) {
    if (currentScroll < lastScrollY) {
      stickyFoldBar.classList.remove("visible");
    } else {
      stickyFoldBar.classList.add("visible");
    }
  } else {
    stickyFoldBar.classList.remove("visible");
  }

  lastScrollY = currentScroll;
}, { passive: true });

/*----------------------Modal functionality--------------------*/
function clearModalInputs(modalElement) {
  // clear all inputs
  const inputs = modalElement.querySelectorAll('input');

  inputs.forEach(input => {
    input.value = '';
  });

  // reset buttons if exist
  const btn = modalElement.querySelector('.modal-download-btn');
  if (btn) {
    btn.classList.remove('enabled');
    btn.disabled = true;
  }
}
const modal = document.getElementById('datasheet-modal');
const closeBtn = document.getElementById('modal-close-btn');
const downloadBtn = document.getElementById('modal-download-btn');
const emailInput = document.getElementById('modal-email');
const phoneInput = document.getElementById('modal-phone');

document.querySelector('.download-btn').addEventListener('click', () => {
  modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  clearModalInputs(modal);
});

emailInput.addEventListener('input', () => {
  const hasValue = emailInput.value.trim().length > 0;
  downloadBtn.disabled = !hasValue;
  downloadBtn.classList.toggle('enabled', hasValue);
});

const quoteModal = document.getElementById('quote-modal');
const quoteOpenBtn = document.getElementById('quote-open-btn');
const quoteCloseBtn = document.getElementById('quote-close-btn');

quoteOpenBtn.addEventListener('click', () => {
  clearModalInputs(quoteModal);
  quoteModal.classList.add('active');
});

quoteCloseBtn.addEventListener('click', () => {
  clearModalInputs(quoteModal);
  quoteModal.classList.remove('active');
});

/*--------------------------Zoom , preview functionality-------------------------------*/
const imageBox       = document.getElementById('imageBox');
const mainImg        = document.getElementById('mainImg');
const zoomLens       = document.getElementById('zoomLens');
const zoomPreview    = document.getElementById('zoomPreview');
const zoomPreviewImg = document.getElementById('zoomPreviewImg');

let cx = 1;
let cy = 1;

function isDesktop() {
  return window.innerWidth > 800;
}


imageBox.addEventListener('mouseenter', () => {
  if (!isDesktop()) return;

  zoomLens.style.display = 'block';
  zoomPreview.style.display = 'block';

  zoomPreviewImg.src = mainImg.src;

  cx = zoomPreview.offsetWidth / zoomLens.offsetWidth;
  cy = zoomPreview.offsetHeight / zoomLens.offsetHeight;

  zoomPreviewImg.style.width  = mainImg.offsetWidth * cx + "px";
  zoomPreviewImg.style.height = mainImg.offsetHeight * cy + "px";
});


imageBox.addEventListener('mouseleave', () => {
  zoomLens.style.display = 'none';
  zoomPreview.style.display = 'none';
});

imageBox.addEventListener('mousemove', (e) => {
  if (!isDesktop()) return; // 

  const rect = mainImg.getBoundingClientRect();

  const lensW = zoomLens.offsetWidth;
  const lensH = zoomLens.offsetHeight;

  let lx = e.clientX - rect.left - lensW / 2;
  let ly = e.clientY - rect.top  - lensH / 2;

  lx = Math.max(0, Math.min(lx, rect.width - lensW));
  ly = Math.max(0, Math.min(ly, rect.height - lensH));

  zoomLens.style.left = lx + "px";
  zoomLens.style.top  = ly + "px";

  zoomPreview.style.left = (rect.right + 20) + "px";
  zoomPreview.style.top  = rect.top + "px";

  zoomPreviewImg.style.left = -(lx * cx) + "px";
  zoomPreviewImg.style.top  = -(ly * cy) + "px";
});


