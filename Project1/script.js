 const users = [
        { id: 1, name: "Aquib", age: 27, country: "India" },
        { id: 2, name: "Sanjay", age: 30, country: "India" },
        { id: 3, name: "Emily", age: 22, country: "USA" },
        { id: 4, name: "John", age: 29, country: "USA" },
        { id: 5, name: "Ahmed", age: 24, country: "UAE" },
      ];

      // 1. map → Formatted name list
      const nameList = users.map((user, i) => `${i + 1}. ${user.name}`);
      document.getElementById(
        "formattedList"
      ).innerHTML = `<strong>Formatted Name List:</strong><br>${nameList.join(
        "<br>"
      )}`;

      // 2. forEach → Greetings
      let greetHTML = `<strong>Greetings:</strong><br>`;
      users.forEach((user) => {
        greetHTML += `Hello ${user.name}, welcome back!<br>`;
      });
      document.getElementById("greetings").innerHTML = greetHTML;

      // 3. filter → Indian users
      const indians = users.filter((user) => user.country === "India");
      document.getElementById(
        "indians"
      ).innerHTML = `<strong>Users from India:</strong><br>${indians
        .map((u) => u.name)
        .join("<br>")}`;

      // 4. for...in → Keys in one user object
      let keyList = `<strong>User Keys:</strong><br>`;
      for (let key in users[0]) {
        keyList += `${key}: ${users[0][key]}<br>`;
      }
      document.getElementById("userKeys").innerHTML = keyList;

      // 5. for...of → Name and country
      let nameCountry = `<strong>Name and Country:</strong><br>`;
      for (let user of users) {
        nameCountry += `${user.name} is from ${user.country}<br>`;
      }
      document.getElementById("nameCountry").innerHTML = nameCountry;

      // 6. reduce → Count users by country
      const countryCount = users.reduce((acc, user) => {
        acc[user.country] = (acc[user.country] || 0) + 1;
        return acc;
      }, {});

      let countHTML = `<strong>User Count by Country:</strong><br>`;
      for (let country in countryCount) {
        countHTML += `${country}: ${countryCount[country]}<br>`;
      }
      document.getElementById("countryCount").innerHTML = countHTML;