"use strict";

//Import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const body = document.body;

//Curseur
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

//Etat Actif
(() => {
  const spyLinks = document.querySelectorAll('.menu__liste a');
  const spyTargets = [
    ...document.querySelectorAll('section[id]'),
    document.getElementById('contact')
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

  //Page Acceuil
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
