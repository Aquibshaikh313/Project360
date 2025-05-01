
const userDiv = document.getElementById('user');
const btn = document.getElementById("btn");
const userImg = document.getElementById("user-img");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
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
    userEmail.textContent = user.email;
    userLocation.textContent = user.location.country;

    setTimeout(() => userDiv.classList.remove("hidden"), 300);
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    btn.disabled = false;
    btn.textContent = "Get New User";
  }
}

//Dark mode toggle
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Load a user when the page loads
fetchUser();

// Load new user on button click
btn.addEventListener("click", fetchUser);
