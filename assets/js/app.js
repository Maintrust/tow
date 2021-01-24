function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != "loading") callback();
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", callback);
  // IE <= 8
  else
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

ready(function () {
  // Элементы
  const burger = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  const introHeight = document.getElementById("intro").clientHeight;
  const header = document.getElementById("header");
  const accordionItems = document.querySelectorAll(".accordion__item");
  const catalogArrows = document.querySelectorAll(".catalog__arrow");
  const catalog = document.getElementById("catalog");

  let sliderPosition = 0;

  // Ивент листенеры
  burger.addEventListener("click", showHideNav);
  window.addEventListener("scroll", fixedHeader);
  accordionItems.forEach((item) => {
    item.firstElementChild.addEventListener("click", openCloseAccItem);
  });
  catalogArrows.forEach((arrow) => {
    arrow.addEventListener("click", slide);
  });
  window.addEventListener("resize", (e) => {
    if (e.target.innerWidth > 768) {
      catalog.style.transform = "";
      sliderPosition = 0;
    }
  });

  function showHideNav(e) {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      burger.classList.remove("active");
    } else {
      nav.classList.add("active");
      burger.classList.add("active");
    }
  }

  function fixedHeader() {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > introHeight - 110) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  }

  function openCloseAccItem(e) {
    let target;

    if (!e.target.classList.contains("accordion__header")) {
      target = e.target.parentElement;
    } else {
      target = e.target;
    }

    if (target.parentElement.classList.contains("active")) {
      target.parentElement.classList.remove("active");
    } else {
      target.parentElement.classList.add("active");
    }
  }

  function slide(e) {
    e.preventDefault();
    const sliderLength = catalog.children.length;
    if (e.target.classList.contains("catalog__arrow--prev")) {
      --sliderPosition;
      if (sliderPosition < 0) {
        ++sliderPosition;
      }
    } else {
      ++sliderPosition;
      if (sliderPosition > sliderLength - 1) {
        sliderPosition = sliderLength - 1;
      }
    }
    catalog.style.transform = `translateX(-${100 * sliderPosition}%)`;
  }
});
