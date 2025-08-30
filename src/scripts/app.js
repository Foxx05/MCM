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

document.querySelectorAll('.shortline__right, .longline__left, .line__center').forEach(el => {
  let origin = 'center center';
  if (el.classList.contains('shortline__right')) origin = 'right center';
  if (el.classList.contains('longline__left'))   origin = 'left center';

  gsap.set(el, { transformOrigin: origin });

  gsap.to(el, {
    scaleX: 1,               // grandit de 0 -> 1 entre start et end
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",      // commence à grandir en approchant
      end:   "top 40%",      // plein à ~40% du viewport
      scrub: true,
      onEnter:     () => gsap.set(el, { opacity: 1 }),
      onLeaveBack: () => gsap.set(el, { opacity: 0 })
    }
  });
});
