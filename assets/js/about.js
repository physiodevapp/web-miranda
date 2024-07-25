
const swiperFacilities = new Swiper(".swiper.about__facilities__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    100: {
      slidesPerView: 1, 
      grid: {
        fill:	'row',
        rows: 1,
      },
    },
    1000: {
      spaceBetween: 10,
      slidesPerView: 3, 
      grid: {
        fill:	'row',
        rows: 2,
      },
    }
  }
});

const swiperFacts = new Swiper(".swiper.about__facts__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    100: {
      slidesPerView: 1, 
      grid: {
        fill:	'row',
        rows: 1,
      },
    },
    1000: {
      spaceBetween: 20,
      slidesPerView: 2, 
      grid: {
        fill:	'row',
        rows: 1,
      },
    }
  }
});

const facilitiesSliders = document.querySelectorAll(".about__facilities__slider .swiper-wrapper .facilities__slider__number");
facilitiesSliders.forEach((htmlElement, index) => htmlElement.innerHTML = index < 10 ? `0${index + 1}` : index);

