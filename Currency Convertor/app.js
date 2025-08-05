// Base API URL for fetching currency exchange rates
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Select all dropdowns inside elements with class "dropdown"
const dropdowns = document.querySelectorAll(".dropdown select");

// Select the button inside the form
const btn = document.querySelector("form button");

// Select the dropdown for the "from" currency
const fromCurr = document.querySelector(".from select");

// Select the dropdown for the "to" currency
const toCurr = document.querySelector(".to select");

// Select the element where the result message will be displayed
const msg = document.querySelector(".msg");

// Loop over each dropdown (from and to currency)
for (let select of dropdowns) {
  // Loop through all currency codes in the countryList object
  for (currCode in countryList) {
    let newOption = document.createElement("option"); // Create a new <option> element
    newOption.innerText = currCode; // Set the text shown in the dropdown
    newOption.value = currCode; // Set the value of the option (used for fetching rates)

    // Pre-select USD for the "from" dropdown
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    // Pre-select INR for the "to" dropdown
    else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption); // Add the option to the current select element
  }

  // When a new currency is selected from dropdown, update the flag image
  select.addEventListener("change", (e) => {
    updateFlag(e.target); // e.target refers to the changed select element
  });
}

// Function to fetch and update the exchange rate and display it
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); // Select the input where user enters amount
  let amtVal = amount.value; // Get the entered amount value

  // If the amount is empty or less than 1, default it to 1
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1"; // Also update the input box
  }

  // Build the API URL dynamically based on selected "from" currency
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;

  let response = await fetch(URL); // Fetch the currency data from API
  let data = await response.json(); // Convert the response to JSON format

  let from = fromCurr.value.toLowerCase(); // Get selected "from" currency in lowercase
  let to = toCurr.value.toLowerCase(); // Get selected "to" currency in lowercase

  let rate = data[from][to]; // Get the exchange rate from the API data

  let finalAmount = amtVal * rate; // Multiply the entered amount by exchange rate to convert

  // Display the result in the message paragraph
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Function to update the flag image for the selected currency
const updateFlag = (element) => {
  let currCode = element.value; // Get selected currency code (e.g. "USD")
  let countryCode = countryList[currCode]; // Get corresponding country code (e.g. "US")
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Build the flag image URL
  let img = element.parentElement.querySelector("img"); // Get the <img> tag next to the dropdown
  img.src = newSrc; // Set the new flag image source
};

// When the convert button is clicked
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent form from submitting and reloading the page
  updateExchangeRate(); // Call the function to fetch and show exchange rate
});

// When the page first loads, call this to show initial conversion result
window.addEventListener("load", () => {
  updateExchangeRate();
});


//This applies the Select2 enhancement to your dropdowns once the page is ready.
$(document).ready(function () {
    $('.currency-select').select2();
});
