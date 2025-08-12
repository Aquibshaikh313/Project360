// Access key for Unsplash API (used to authenticate requests)
const accessKey = "GGicNmSGumGSeKDB6ZRAxslNyNGWWE-mOGEyFF4ruW0";

// Get references to HTML elements by their IDs
const searchForm = document.getElementById("search-form"); // The search form
const searchBox = document.getElementById("search-box");   // The text input box
const searchResult = document.getElementById("search-result"); // The container to display images
const showMoreBtn = document.getElementById("show-more-btn");  // "Show More" button

// Variables to store search keyword and current page number
let keyword = "";
let page = 1;

// Function to search images from Unsplash API
async function searchImages() {
   // Assign the value from the search input box to the keyword variable
   keyword = searchBox.value;

   // Construct the API URL with query parameters:
   // - page: current page number
   // - query: search keyword
   // - client_id: your Unsplash access key
   // - per_page: number of images per page (here it's 9)
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;

   // Fetch data from Unsplash API
   const response = await fetch(url); // Send GET request to the API
   const data = await response.json(); // Convert the API response to JSON format

   // If this is the first page, clear any old search results before showing new ones
   if (page === 1) {
      searchResult.innerHTML = "";
   }

   // Store the array of search results
   const results = data.results;

   // Loop through each image result and display it
   results.map((result) => {
      // Create an <img> element for the photo
      const image = document.createElement("img");
      image.src = result.urls.small; // Set the image source to the small-sized image URL

      // Create an <a> (anchor) element to link to the Unsplash page for the image
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html; // Set the link to the original Unsplash image page
      imageLink.target = "_blank"; // Open the link in a new browser tab

      // Place the <img> inside the <a> tag so clicking the image goes to Unsplash
      imageLink.appendChild(image);

      // Add this linked image to the search results container
      searchResult.appendChild(imageLink);
   });

   // Make the "Show More" button visible (so user can load more images)
   showMoreBtn.style.display = "block";
}

// Event listener for the search form submission
searchForm.addEventListener("submit", (e) => {
   e.preventDefault(); // Prevent the form from refreshing the page
   page = 1;           // Reset page number to 1 for a new search
   searchImages();     // Call the search function
});

// Event listener for the "Show More" button click
showMoreBtn.addEventListener("click", () => {
   page++;             // Increase the page number to get next set of images
   searchImages();     // Call the search function again to load more images
});
