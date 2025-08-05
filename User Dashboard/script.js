 
      const users = [
        { id: 1, name: "Aquib", age: 27, country: "India" },
        { id: 2, name: "Sanjay", age: 29, country: "India" },
        { id: 3, name: "Emily", age: 25, country: "USA" },
        { id: 4, name: "John", age: 31, country: "USA" },
        { id: 5, name: "Ahmed", age: 28, country: "UAE" },
      ];

      const userList = document.getElementById("userList");
      const searchInput = document.getElementById("searchInput");
      const countrySelect = document.getElementById("countrySelect");
      const userStats = document.getElementById("userStats");
      const userGreetings = document.getElementById("userGreetings");
      const userKeys = document.getElementById("userKeys");
      const nameCountryPairs = document.getElementById("nameCountryPairs");

      function renderUsers(data) {
        userList.innerHTML = data
          .map(
            (user) => `
        <div class="card">
          <h3>${user.name}</h3>
          <p>Age: ${user.age}</p>
          <p>Country: ${user.country}</p>
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

        userStats.innerHTML =
          `<strong>User Count by Country:</strong><br/>` +
          Object.entries(count)
            .map(([key, val]) => `${key}: ${val}`)
            .join("<br/>");
      }

      function showGreetings(data) {
        let greetings = "<strong>Welcome Messages:</strong><br/>";
        data.forEach((user, i) => {
          greetings += `Hello ${user.name}, you're user #${i + 1}!<br/>`;
        });
        userGreetings.innerHTML = greetings;
      }

      function showObjectKeys(user) {
        let keys = "<strong>Sample User Object Keys:</strong><br/>";
        for (let key in user) {
          keys += `${key}<br/>`;
        }
        userKeys.innerHTML = keys;
      }

      function showNameCountryPairs(data) {
        const pairs = data.map((user) => [user.name, user.country]);
        let result = "<strong>Name-Country Pairs:</strong><br/>";
        for (let [name, country] of pairs) {
          result += `${name} - ${country}<br/>`;
        }
        nameCountryPairs.innerHTML = result;
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
    
