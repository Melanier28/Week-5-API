const peopleList = document.getElementById("people-list");

fetch("https://randomuser.me/api/?results=10")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const html = data.results
    .filter(person => person.dob.age >= 30)
      .map(person => `
        <div class="profile-card" tabindex="0">
          <img
            src="${person.picture.medium}"
            alt="${person.name.first} ${person.name.last}"
            width="72"
            height="72"
          >
          <h3>${person.name.first} ${person.name.last}</h3>
          <p>Age: ${person.dob.age}</p>
          <p class="location">${person.location.city}, ${person.location.country}</p>
        </div>
      `)
      .join("");

    peopleList.innerHTML = html;
  })
  .catch(error => {
    console.error("Could not load people:", error);
    peopleList.textContent = "Could not load people. Please try refreshing.";
  });
