const userDiv = document.getElementById("user");
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
    btn.textContent = "Loading...";
    userDiv.classList.add("hidden");

    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    const user = data.results[0];

    userImg.src = user.picture.large;
    userImg.alt = `${user.name.first} ${user.name.last}`;

    userName.textContent =
      `${user.name.title} ${user.name.first} ${user.name.last}`;

    userEmail.textContent = user.email;
    userAge.textContent = user.dob.age;
    userLocation.textContent =
      `${user.location.city}, ${user.location.country}`;

    setTimeout(() => {
      userDiv.classList.remove("hidden");
    }, 300);

  } catch (error) {
    console.error("Error fetching user:", error);

    userDiv.classList.remove("hidden");

    userName.textContent = "Failed to load user";
    userEmail.textContent = "";
    userAge.textContent = "";
    userLocation.textContent = "";
    userImg.src = "";
    userImg.alt = "No user available";

  } finally {
    btn.disabled = false;
    btn.textContent = "Get New User";
  }
}

// Theme Initialization
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "Toggle Bright Mode";
} else {
  darkModeBtn.textContent = "Toggle Dark Mode";
}

// Theme Toggle
darkModeBtn.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  if (isDarkMode) {
    darkModeBtn.textContent = "Toggle Bright Mode";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeBtn.textContent = "Toggle Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  fetchUser();
  btn.addEventListener("click", fetchUser);
});