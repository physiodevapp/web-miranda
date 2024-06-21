

class Pagination {
  constructor(perPage, items, containerId) {
    this._perPage = perPage;
    this._numPages =
      Math.floor(items.length / perPage) +
      (!!(items.length % perPage) ? 1 : 0);
    this._currentPage = 1;
    this._items = items;
    this._containerId = containerId;
    this._containerHTMLElement = document.getElementById(containerId);
    this._itemHTMLTemplate = document.getElementById(containerId).firstElementChild;
    
    this.init();
  }

  init() {
    this.createNavBar();
  }

  isURL(string) {
    let isValid = true
    try {
      new URL(string);
    } catch (error) {
      isValid = false;
    }

    return isValid;
  }

  fetchItemHTMLTemplate(itemObject) {
    let itemHTMLElement = this._itemHTMLTemplate.cloneNode(true);

    itemHTMLElement.querySelectorAll("[data-field]")
      .forEach((fieldHTMLElement) => {
        const fieldName = fieldHTMLElement.dataset.field;
        if (fieldHTMLElement.tagName === "IMG" && fieldHTMLElement.hasAttribute("src"))
          fieldHTMLElement.src = (itemObject[fieldName]) || "";
        else
          fieldHTMLElement.innerHTML = itemObject[fieldHTMLElement.dataset.field] || "";
      });

    return itemHTMLElement;
  }

  loadNewItems() {
    const showItems = this._items.slice(
      this._perPage * (this._currentPage - 1),
      this._perPage * this._currentPage
    );
    const showHTMLElements = showItems.map((itemObject, index) => {
      const itemHTMLElement = this.fetchItemHTMLTemplate(itemObject);
      itemHTMLElement.id = index;
      return itemHTMLElement;
    });

    showHTMLElements.forEach((htmlElement, index) => {
      this._containerHTMLElement.appendChild(htmlElement.cloneNode(true));
    });
  }

  removeOldItems() {
    const removeHTMLElements = [...this._containerHTMLElement.getElementsByTagName("article"),];
    for (const htmlElement of removeHTMLElements) {
      this._containerHTMLElement.removeChild(htmlElement);
    }
  }

  createNavBar() {
    this._navbar = document.createElement("ul");
    this._navbar.classList.add(this._containerId);
    const buttonsLimit = this._numPages >= 5 ? 7 : this._numPages + 2
    Array(buttonsLimit)
      .fill()
      .forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.dataset.ref = index;
        listItem.classList.add("page");

        if (index === 0) {
          listItem.innerHTML = ""
          listItem.style.backgroundImage = `url("./assets/images/Double_Chevron_Left.svg")`
          listItem.classList.add("change-by-one")
        } else if (index === buttonsLimit - 1) {
          listItem.innerHTML = ""
          listItem.style.backgroundImage = `url("./assets/images/Double_Chevron_Right.svg")`
          listItem.classList.add("change-by-one")
        } else if (index === 1) {
          listItem.innerHTML = index 
          listItem.dataset.page = index
        } else if (index === buttonsLimit - 2) {
          listItem.innerHTML = this._numPages
          listItem.dataset.page = this._numPages
        } else if (index <= Math.floor(buttonsLimit / 2)) {
          listItem.innerHTML = index 
          listItem.dataset.page = index
        } else if (this._numPages - index < 2) {
          listItem.innerHTML = index
          listItem.dataset.page = index
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
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718983706784.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718983706784.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718983706784.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718983706784.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1719001376258.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718982740187.jpg'
  },
  { 
    title: "Minimal Duplex Room", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor.",
    price: "$345/Night",
    url: './assets/images/photo_1718998497112.jpg'
  },
];
const roomsPagination = new Pagination(2, rooms, "pagination");
