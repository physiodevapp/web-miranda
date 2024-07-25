

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
          listItem.innerHTML = "..."
        }

        if (index === 1)
          listItem.classList.add("page--selected")

        this._navbar.append(listItem);
      });
    this._containerHTMLElement.appendChild(this._navbar);

    this.startListening();
  }

  startListening() {
    const handleClick = (event) => {
      const pages = document.querySelectorAll(`.${this._containerId} .page`);

      if (!event || event.target.dataset.ref == 1) 
        this._currentPage = 1 
      else if (event.target.dataset.ref == 0 && this._currentPage > 1)
        this._currentPage = this._currentPage - 1
      else if (event.target.dataset.ref == pages.length - 1 && this._currentPage < this._numPages)
        this._currentPage = this._currentPage + 1
      else if(event.target.dataset.page)
        this._currentPage = Number(event.target.dataset.page)

      pages.forEach((page, index) => { 
        page.classList.remove("not-allowed")

        if (index == 0 || index == pages.length - 1){
          page = page
        } else if (index === 1) {
          page.innerHTML = index
          page.dataset.page = index
        } else if (index === pages.length - 2){
          page.innerHTML = this._numPages
          page.dataset.page = this._numPages
        } else if (this._numPages <= 5 ){
          page.innerHTML = index
          page.dataset.page = index
        } else if (index === 2 && this._currentPage - 1 > 2) {
          page.innerHTML = "..."
          page.removeAttribute("data-page")
          page.classList.add("not-allowed")
        } else if (index === 2) {
          page.innerHTML = index
          page.dataset.page = index
        } else if (index === pages.length - 3 && this._numPages - this._currentPage > 2) {
          page.innerHTML = "..."
          page.removeAttribute("data-page")
          page.classList.add("not-allowed")
        } else if (index === pages.length - 3) {
          page.innerHTML = this._numPages - 1
          page.dataset.page = this._numPages - 1
        } else if (index === Math.floor(pages.length / 2) && (this._currentPage - 1 >= 2 && this._numPages - this._currentPage >= 2)) {
          page.innerHTML = this._currentPage
          page.dataset.page = this._currentPage
        } else if (index === Math.floor(pages.length / 2) && this._currentPage < Math.floor(pages.length / 2)) {
          page.innerHTML = Math.floor(pages.length / 2)
          page.dataset.page = Math.floor(pages.length / 2)
        } else if (index === Math.floor(pages.length / 2) && this._numPages - this._currentPage < Math.floor(pages.length / 2)) {
          page.innerHTML = this._numPages - 2
          page.dataset.page = this._numPages - 2
        }

        if (page.innerHTML == this._currentPage)
          page.classList.add("page--selected") 
        else 
          page.classList.remove("page--selected")                 
      });

      this.removeOldItems();

      this.loadNewItems();
    };

    handleClick();

    this._navbar.querySelectorAll("li").forEach((listItem) => {
      listItem.addEventListener("click", handleClick);
    });
  }

  stopListening() {
    this._navbar.querySelectorAll("li").forEach((listItem) => {
      listItem.replaceWith(listItem.cloneNode(true));
    });
  }
}

const rooms = [
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night"
  },
];
const roomsPagination = new Pagination(2, rooms, "pagination");
