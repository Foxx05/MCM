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
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); 

  document.querySelectorAll(".menu__liste a").forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });
});

// Barres
document.querySelectorAll('.shortline__right, .longline__left').forEach(el => {
  const origin = el.classList.contains('shortline__right') ? 'right center' : 'left center';
  gsap.set(el, { scaleX: 0, transformOrigin: origin });

  gsap.to(el, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end:   "top 40%",
      scrub: true
    }
  });
});
