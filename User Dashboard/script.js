const users = [
  { id: 1, name: "Aquib", age: 27, country: "India" },
  { id: 2, name: "Sanjay", age: 29, country: "India" },
  { id: 3, name: "Emily", age: 25, country: "USA" },
  { id: 4, name: "John", age: 31, country: "USA" },
  { id: 5, name: "Ahmed", age: 28, country: "UAE" },
];

const countryAccent = {
  India: "var(--india)",
  USA: "var(--usa)",
  UAE: "var(--uae)",
};

const userList = document.getElementById("userList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const countrySelect = document.getElementById("countrySelect");
const userStats = document.querySelector("#userStats .panel-body");
const userGreetings = document.querySelector("#userGreetings .panel-body");
const userKeys = document.querySelector("#userKeys .panel-body");
const nameCountryPairs = document.querySelector("#nameCountryPairs .panel-body");

function renderUsers(data) {
  emptyState.hidden = data.length > 0;
  userList.innerHTML = data
    .map(
      (user, i) => `
    <div class="card" style="--card-accent: ${countryAccent[user.country] || "var(--teal)"}">
      <div class="card-index">No. ${String(i + 1).padStart(2, "0")}</div>
      <h3>${user.name}</h3>
      <div class="card-meta">
        <span>Age</span>
        <strong>${user.age}</strong>
      </div>
      <span class="card-tag">${user.country}</span>
    </div>
  `
    )
    .join("");
}

function updateStats(data) {
  const count = data.reduce((acc, curr) => {
    acc[curr.country] = (acc[curr.country] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(count);
  userStats.innerHTML = entries.length
    ? entries
        .map(
          ([key, val]) =>
            `<div class="panel-row"><span>${key}</span><span class="value">${val}</span></div>`
        )
        .join("")
    : `<span class="field-name">No matches</span>`;
}

function showGreetings(data) {
  userGreetings.innerHTML = data.length
    ? data
        .map(
          (user, i) =>
            `<div class="panel-row"><span>${user.name}</span><span class="value">#${i + 1}</span></div>`
        )
        .join("")
    : `<span class="field-name">No matches</span>`;
}

function showObjectKeys(user) {
  const keys = Object.keys(user);
  userKeys.innerHTML = keys.length
    ? keys.map((key) => `<div class="field-name">${key}</div>`).join("")
    : `<span class="field-name">—</span>`;
}

function showNameCountryPairs(data) {
  const pairs = data.map((user) => [user.name, user.country]);
  nameCountryPairs.innerHTML = pairs.length
    ? pairs
        .map(
          ([name, country]) =>
            `<div class="panel-row"><span>${name}</span><span class="value">${country}</span></div>`
        )
        .join("")
    : `<span class="field-name">No matches</span>`;
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCountry = countrySelect.value;

  const filtered = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(keyword) ||
        user.country.toLowerCase().includes(keyword)) &&
      (selectedCountry === "" || user.country === selectedCountry)
  );

  renderUsers(filtered);
  updateStats(filtered);
  showGreetings(filtered);
  showObjectKeys(filtered[0] || {});
  showNameCountryPairs(filtered);
}

searchInput.addEventListener("input", applyFilters);
countrySelect.addEventListener("change", applyFilters);

renderUsers(users);
updateStats(users);
showGreetings(users);
showObjectKeys(users[0]);
showNameCountryPairs(users);