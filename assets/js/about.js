
const swiperFacilities = new Swiper(".swiper.about__facilities__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
});

const swiperFacts = new Swiper(".swiper.about__facts__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
});

const menuButton = document.getElementById("menu-button");
const navbarMenu = document.getElementById("navbar-menu");

const handleClickMenuButton = () => {
  navbarMenu.classList.toggle("opened");      
  document.getElementById("menu-button-open").classList.toggle("show");
  document.getElementById("menu-button-close").classList.toggle("show");
}
menuButton.addEventListener("click", handleClickMenuButton);
