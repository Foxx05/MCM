"use strict";

//Import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const body = document.body;

//Curseur personnalisé - Aide ChatGPT pour gérer les interractions
if (document.querySelector(".custom-cursor")) {
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("mouseover", (e) => {
  const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button']");
  const isScrollDown = e.target.closest(".scroll-down");
  cursor.classList.toggle("cursor-hover", Boolean(isInteractive || isScrollDown));
});
}

if (document.querySelector(".custom-cursor2")) {
const cursor = document.querySelector(".custom-cursor2");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("mouseover", (e) => {
  const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button']");
  const isScrollDown = e.target.closest(".scroll-down");
  cursor.classList.toggle("cursor-hover", Boolean(isInteractive || isScrollDown));
});
}

//Fond animé - Aide ChatGPT 
const canvas = document.getElementById("particules_bg");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 100;
  const maxDistance = 100;
  const mouse = { x: null, y: null };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = 3.5;
      this.color = "#ffab40";
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function connectParticles(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < maxDistance) {
      const opacity = 1 - dist / maxDistance;
      ctx.strokeStyle = hexToRgba(p1.color, opacity);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }

  function connectToMouse(p) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < maxDistance) {
      const opacity = 1 - dist / maxDistance;
      ctx.strokeStyle = hexToRgba(p.color, opacity);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }

  function hexToRgba(hex, opacity) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.move();
      p.draw();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connectParticles(particles[i], particles[j]);
      }
    }
    if (mouse.x !== null && mouse.y !== null) {
      for (let p of particles) {
        connectToMouse(p);
      }
    }
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  animate();
}

//Animations GSAP
if (document.querySelector(".title--big")) {
  gsap.from(".title--big", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });
}

if (document.querySelector(".p--center__big")) {
  gsap.from(".p--center__big", {
    delay: 0.3,
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });
}

//Animation lignes page projets
if (document.querySelector(".ligne-haut")) {
  gsap.from(".ligne-haut", {
    scrollTrigger: {
      trigger: ".ligne-haut",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    duration: 1,
    xPercent: 100,
    opacity: 0,
    ease: "power3.out",
  });
}

if (document.querySelector(".ligne-bas")) {
gsap.from(".ligne-bas", {
  scrollTrigger: {
    trigger: ".ligne-bas",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  duration: 1,
  xPercent: -100,
  opacity: 0,
  ease: "power3.out",
});
}

//Scroll Down
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
  window.addEventListener('scroll', () => {
    scrollDown.classList.toggle('hidden', window.scrollY > 150);
  });

  scrollDown.addEventListener('click', () => {
    const targetSection = document.querySelector('section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

//Menu burger mobile
const menuBtn = document.querySelector(".menu__btn");
const links = document.querySelectorAll(".menu__link");
const menuElements = document.querySelectorAll(".menu--li");
const menu = document.querySelector(".menu");

function toggleMenu() {
  body.classList.toggle("menu--open");
  if (window.innerWidth < 980) {
    body.classList.toggle("no-scroll");
  }
}

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
menuElements.forEach(el => el.addEventListener("click", toggleMenu));
links.forEach(link => link.addEventListener("click", toggleMenu));

const fileName = window.location.pathname.split("/").pop();
let lastScrollTop = 0;

if (fileName !== "designFiction.html" && fileName !== "pageTemoin.html") {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!body.classList.contains("menu--open")) {
      menu.classList.toggle("menu--hidden", scrollTop > lastScrollTop && scrollTop > 50);
    }
    lastScrollTop = Math.max(0, scrollTop);
  });
}

//Bouton Back To Top
const backToTopButton = document.querySelector('.backToTop__cs');
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

//Etat Actif + nav vertical - Aide ChatGPT pour etats actifs quand 2 sections proches (différentiation difficile)
(() => {
  const spyLinks = document.querySelectorAll('.menu__liste a, .nav-vertical a');
  const spyTargets = [
    ...document.querySelectorAll('section[id]'),
    document.getElementById('contact') //footer (si présent)
  ].filter(Boolean);

  if (!spyLinks.length || !spyTargets.length) return;

  const linksFor = (id) =>
    document.querySelectorAll(`.menu__liste a[href="#${id}"], .nav-vertical a[href="#${id}"]`);

  const setActive = (id) => {
    spyLinks.forEach((a) => a.classList.remove('active'));
    linksFor(id).forEach((a) => a.classList.add('active'));
  };

  spyLinks.forEach((a) => {
    a.addEventListener('click', () => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) setActive(href.slice(1));
    });
  });

  const visibleMap = new Map(spyTargets.map((el) => [el.id, 0]));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibleMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = null;
      let bestRatio = 0;
      visibleMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) setActive(bestId);
    },
    {
      rootMargin: '-80px 0px -20% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }
  );

  spyTargets.forEach((el) => io.observe(el));

  //Page Acceuil -> contact détecté en permanence (ChatGPT)
  const enforceFooterActiveAtBottom = () => {
    const doc = document.documentElement;
    const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
    if (nearBottom && document.getElementById('contact')) {
      setActive('contact');
    }
  };
  window.addEventListener('scroll', enforceFooterActiveAtBottom);

  window.addEventListener('load', () => {
    if (location.hash) {
      const id = location.hash.slice(1);
      if (document.getElementById(id)) setActive(id);
    }
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id && document.getElementById(id)) setActive(id);
  });
})();

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

//Animation textes
gsap.utils.toArray('.animate').forEach(elem => {
  gsap.from(elem, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

//Carousel
const images = document.querySelectorAll('.carousel-img');
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const square = document.getElementById('square');

if (images.length && dots.length && prevBtn && nextBtn && square) {
  let index = 0;

  // Créer une légende uniquement si au moins une image a data-caption
  const hasCaptions = Array.from(images).some(img => (img.dataset.caption || '').trim().length > 0);
  let captionEl = null;

  if (hasCaptions) {
    captionEl = document.createElement('div');
    captionEl.className = 'caption';
    captionEl.setAttribute('role', 'status');
    captionEl.setAttribute('aria-live', 'polite');
    square.appendChild(captionEl);
  }

  function updateCaption() {
    if (!captionEl) return; // pas de légende => rien à faire
    const text = images[index]?.dataset.caption?.trim() || '';
    captionEl.textContent = text;
    captionEl.hidden = !text; // au cas où
  }

  function updateView() {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    updateCaption();
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateView();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateView();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateView();
    });
  });

  updateView();
}

//Audio - Aide ChatGPT (gestion play-arrêt en fonction clic + autre audio en cours)
if (document.querySelector(".audio-btn")) {

  let currentAudio = null;
  let currentButton = null;

  document.querySelectorAll(".audio-btn").forEach(button => {
    button.addEventListener("click", () => {
      const audioSrc = button.getAttribute("data-audio");

      if (currentAudio && currentButton === button) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        button.classList.remove("is-playing");
        currentAudio = null;
        currentButton = null;
        return;
      }

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentButton.classList.remove("is-playing");
      }

      const audio = new Audio(audioSrc);
      audio.play();

      button.classList.add("is-playing");

      currentAudio = audio;
      currentButton = button;

      audio.addEventListener("ended", () => {
        button.classList.remove("is-playing");
        currentAudio = null;
        currentButton = null;
      });
    });
  });
}