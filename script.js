const cats = [
    {
        name: "Luna",
        age: "3 years",
        gender: "Female",
        breed: "Domestic Longhair",
        status: "Available"
    },

    {
        name: "Milo",
        age: "2 years",
        gender: "Male",
        breed: "Domestic Shorthair",
        status: "Available"
    },

    {
        name: "Oreo",
        age: "1 year",
        gender: "Male",
        breed: "Tuxedo",
        status: "Available"
    }
];


const container = document.getElementById("cat-container");


cats.forEach(cat => {

    const card = document.createElement("div");

    card.className = "cat-card";

    card.innerHTML = `
        <div class="cat-image">
            🐱
        </div>

        <div class="cat-info">

            <h3>${cat.name}</h3>

            <p class="cat-details">
                ${cat.age} • ${cat.gender}<br>
                ${cat.breed}
            </p>

            <span class="status">
                ${cat.status}
            </span>

        </div>
    `;

    container.appendChild(card);

});
