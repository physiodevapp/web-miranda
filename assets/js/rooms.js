

const bulletsMax = 5;
const swiper = new Swiper('.swiper.rooms__slider', {  
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    renderBullet: function (index, className) {
      const total = Math.round(this.slides.length / ( this.params.grid.rows * this.params.slidesPerView))
      const middle = Math.floor(total / 2);
      const current = index + 1;
      
      if (current === 1 || current === total || total <= bulletsMax)
        return `<span data-index=${current - 1} class="${className}">${current}</span>`;
      else if (current === 2)
        return `<span data-index=${current - 1} class="${className}">${2}</span>`;
      else if (current === total - 1)
        return `<span class="${className} dots">...</span>`;
      else if (current === middle)
        return `<span data-index=${2} class="${className} middle">${3}</span>`;
      else
        return `<span class="${className} hide"></span>`;
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    100: {
      slidesPerView: 1, 
      grid: {
        fill:	'row',
        rows: 6,
      },
    },
    1000: {
      spaceBetween: 20,
      slidesPerView: 3, 
      grid: {
        fill:	'row',
        rows: 4,
      },
    }
  },
  on: {
    init: function() {
      this._total = Math.round(this.slides.length / (this.params.grid.rows * this.params.slidesPerView));
      this._middle = Math.floor(this._total / 2);
      this._middleHTMLElement = document.querySelector(".swiper-pagination .middle");
      this._beforeMiddleHTMLElement = document.querySelectorAll(".swiper-pagination .swiper-pagination-bullet")[1];
      this._afterMiddleHTMLElement = document.querySelectorAll(".swiper-pagination .swiper-pagination-bullet")[this._total - 2];
    }, 
    slideChange: function() {
      const current = this.activeIndex + 1;
      
      if (this._middleHTMLElement) {
        if (current >= 3 && current < this._total - 1 && this._total > bulletsMax) {
          this._middleHTMLElement.classList.add("swiper-pagination-bullet-active");
        }
        if (current > this._total - 2) {
          this._middleHTMLElement.innerHTML = this._total - 2;
          this._middleHTMLElement.dataset.index = this._total - 3;
        } else if (current <= 3 ) {
          this._middleHTMLElement.innerHTML = 3;
          this._middleHTMLElement.dataset.index = 2;
        } else if (current >= 3 && current < this._total - 1 && this._total > bulletsMax) {
          this._middleHTMLElement.innerHTML = current;
          this._middleHTMLElement.dataset.index = current - 1;
        } 
      }

      if (this._beforeMiddleHTMLElement) {
        if (current > 3 && this._total > bulletsMax) {
          this._beforeMiddleHTMLElement.classList.add("dots");
          this._beforeMiddleHTMLElement.removeAttribute("data-index");
          this._beforeMiddleHTMLElement.innerHTML = `...`;
        } else {
          this._beforeMiddleHTMLElement.classList.remove("dots");
          this._beforeMiddleHTMLElement.dataset.index = 1;
          this._beforeMiddleHTMLElement.innerHTML = `${2}`;       
        }
      } 

      if (this._afterMiddleHTMLElement) {
        if (current >= this._total - 2) {
          this._afterMiddleHTMLElement.classList.remove("dots");
          this._afterMiddleHTMLElement.dataset.index = `${this._total - 2}`;
          this._afterMiddleHTMLElement.innerHTML = `${this._total - 1}`;
        } else if (this._total > bulletsMax) {
          this._afterMiddleHTMLElement.classList.add("dots");
          this._afterMiddleHTMLElement.removeAttribute("data-index");
          this._afterMiddleHTMLElement.innerHTML = `...`;
        }  
      }

    }
  },  
});

const bulletHTMLElements = document.querySelectorAll(".swiper-pagination-bullet");
bulletHTMLElements.forEach((bulletElement) => bulletElement.addEventListener("click", (event) => {
    const nextSlideIndex = event.target.dataset.index
    nextSlideIndex && swiper.slideTo(nextSlideIndex)
  })
)
