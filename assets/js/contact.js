
const swiperGallery = new Swiper(".swiper.contact__maps__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
});

const contactForm = document.getElementById("contact-form");
const handleClickForm = (event) => {
  event.preventDefault();
}
contactForm.addEventListener("click", handleClickForm);