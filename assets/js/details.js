
const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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
      slidesPerView: 2, 
      grid: {
        fill:	'row',
        rows: 1,
      },
    }
  }  
});

const locales = "en-US";

const todayDate = new Date().toLocaleDateString(locales, {
  weekday: "short",
  day: "numeric",
  year: "numeric",
  month: "short"
});
const nextDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(locales, {
  weekday: "short",
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

const handleClickArrivalButton = (event) => {
  event.preventDefault();

  try {
    arrivalDateInput.showPicker();
  } catch (error) {
    console.log(error)
  }
}
const handleChangeArrivalDate = (event) => {
  const newDate = new Date(event.target.valueAsNumber).toLocaleDateString("es-US", {
    day: "2-digit",
    year: "numeric",
    month: "short"
  });
  
  arrivalTextInput.value = newDate;
}
const handleFocusLostArrivalText = (event) => {
  arrivalTextInput.setAttribute("placeholder", todayDate);
  
  const newDate = new Date(event.target.value);
  if (newDate != "Invalid Date") {
    arrivalDateInput.value = `${newDate.getFullYear()}-${newDate.toLocaleDateString(locales, { month: "2-digit" })}-${newDate.toLocaleDateString(locales, { day: "2-digit" })}`;
  } else {
    arrivalDateInput.value = null;
    arrivalTextInput.value = null;
  }
};

arrivalButton.addEventListener("click", handleClickArrivalButton);
arrivalDateInput.addEventListener("change", handleChangeArrivalDate);
arrivalTextInput.addEventListener("blur", handleFocusLostArrivalText);
arrivalTextInput.addEventListener("mouseleave", handleFocusLostArrivalText);

const handleClickDepartureButton = (event) => {
  event.preventDefault();

  try {
    departureDateInput.showPicker();
  } catch (error) {
    console.log(error)
  }
}
const handleChangeDepartureDate = (event) => {
  const newDate = new Date(event.target.valueAsNumber).toLocaleDateString("es-US", {
    day: "2-digit",
    year: "numeric",
    month: "short"
  });

  departureTextInput.value = newDate;
}
const handleFocusLostDepartureText = (event) => {
  departureTextInput.setAttribute("placeholder", nextDate);
  
  const newDate = new Date(event.target.value);
  if (newDate != "Invalid Date") {
    departureDateInput.value = `${newDate.getFullYear()}-${newDate.toLocaleDateString(locales, { month: "2-digit" })}-${newDate.toLocaleDateString(locales, { day: "2-digit" })}`;
  } else {
    departureDateInput.value = null;
    departureTextInput.value = null;
  }
};

departureButton.addEventListener("click", handleClickDepartureButton);
departureDateInput.addEventListener("change", handleChangeDepartureDate);
departureTextInput.addEventListener("blur", handleFocusLostDepartureText);
departureTextInput.addEventListener("mouseleave", handleFocusLostDepartureText);
