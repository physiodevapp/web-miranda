
  const swiperRooms = new Swiper(".swiper.home__rooms__popular-rooms__slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const swiperFacilities = new Swiper(".swiper.home__facilities__slider", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });
  const swiperMenu = new Swiper(".swiper.home__menu__slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const swiperGallery = new Swiper(".swiper.home__gallery__slider", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });
  const todayDate = new Date().toLocaleDateString("es-US", {
    day: "numeric",
    year: "numeric",
    month: "short"
  });
  const nextDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString("es-US", {
    day: "numeric",
    year: "numeric",
    month: "short"
  });
  
  const arrivalButton = document.getElementById("arrival-date-button");
  const arrivalDateInput = document.getElementById("arrival-date-input"); 
  const arrivalTextInput = document.getElementById("arrival-text-input");
  Inputmask("datetime", {
    inputFormat: "dd mmm yyyy",
    clearMaskOnLostFocus: true
  }).mask(arrivalTextInput);
  arrivalTextInput.setAttribute("placeholder", todayDate);

  const departureButton = document.getElementById("departure-date-button");
  const departureDateInput = document.getElementById("departure-date-input"); 
  const departureTextInput = document.getElementById("departure-text-input");
  Inputmask("datetime", {
    inputFormat: "dd mmm yyyy",
    clearMaskOnLostFocus: true
  }).mask(departureTextInput);
  departureTextInput.setAttribute("placeholder", nextDate);

  const handleClickArrivalButton = () => {
    try {
      arrivalDateInput.showPicker();
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeArrivalDate = (event) => {
    const newDate = new Date(event.target.valueAsNumber).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short"
    });

    arrivalTextInput.value = newDate;
  }
  const handleBlurArrivalText = (event) => {
    arrivalTextInput.setAttribute("placeholder", todayDate);
    
    const newDate = new Date(event.target.value);
    if (newDate != "Invalid Date") {
      arrivalDateInput.value = `${newDate.getFullYear()}-${newDate.toLocaleDateString("default", { month: "2-digit" })}-${newDate.toLocaleDateString("default", { day: "2-digit" })}`;
    } else {
      arrivalDateInput.value = null;
      arrivalTextInput.value = null;
    }
  };

  arrivalButton.addEventListener("click", handleClickArrivalButton);
  arrivalDateInput.addEventListener("change", handleChangeArrivalDate);
  arrivalTextInput.addEventListener("blur", handleBlurArrivalText);

  const handleClickDepartureButton = () => {
    try {
      departureDateInput.showPicker();
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeDepartureDate = (event) => {
    const newDate = new Date(event.target.valueAsNumber).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short"
    });

    departureTextInput.value = newDate;
  }
  const handleBlurDepartureText = (event) => {
    departureTextInput.setAttribute("placeholder", nextDate);
    
    const newDate = new Date(event.target.value);
    if (newDate != "Invalid Date") {
      departureDateInput.value = `${newDate.getFullYear()}-${newDate.toLocaleDateString("default", { month: "2-digit" })}-${newDate.toLocaleDateString("default", { day: "2-digit" })}`;
    } else {
      departureDateInput.value = null;
      departureTextInput.value = null;
    }
  };

  departureButton.addEventListener("click", handleClickDepartureButton);
  departureDateInput.addEventListener("change", handleChangeDepartureDate);
  departureTextInput.addEventListener("blur", handleBlurDepartureText);
