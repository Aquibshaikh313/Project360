
const userDiv = document.getElementById('user');
const btn = document.getElementById("btn");
const userImg = document.getElementById("user-img");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userAge = document.getElementById("user-age");
const userLocation = document.getElementById("user-location");
const darkModeBtn = document.getElementById("dark-mode");

async function fetchUser() {
  try {
    btn.disabled = true;
    btn.textContent = "Loading";
    userDiv.classList.add("hidden");

    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];

    userImg.src = user.picture.large;
    userName.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
     userName.style.color = 'yellow';
    userEmail.textContent = user.email;
    userAge.textContent = user.dob.age;
    userLocation.textContent = `${user.location.city}, ${user.location.country}`;

    setTimeout(() => userDiv.classList.remove("hidden"), 300);
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    btn.disabled = false;
    btn.textContent = "Get New User";
  }
}

//storing the dark mode into localStorage so even if we refresh it doesnt switch back
// //Dark mode toggle
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "Toggle Bright Mode";
} else {
  darkModeBtn.textContent = "Toggle Dark Mode";
}

// Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "Toggle Bright Mode";
    localStorage.setItem("theme", "dark"); // Save to localStorage
  } else {
    darkModeBtn.textContent = "Toggle Dark Mode";
    localStorage.setItem("theme", "light"); // Save to localStorage
  }
});


// Load a user when the page loads
fetchUser();

// Load new user on button click
btn.addEventListener("click", fetchUser);
