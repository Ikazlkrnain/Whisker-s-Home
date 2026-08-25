import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ikwfhhgtcxaxbvrnxsaj.supabase.co";

const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const container = document.getElementById("cat-container");


async function loadCats() {

    container.innerHTML = "<p>Loading our cats... 🐱</p>";

    const { data, error } = await supabase
        .from("cats")
        .select("*")
        .eq("status", "Available")
        .order("created_at", { ascending: false });


    if (error) {

        console.error("Supabase error:", error);

        container.innerHTML = `
            <p>
                Sorry, we couldn't load the cats right now. 🐱
            </p>
        `;

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML = `
            <p>
                No cats are currently available for adoption. ❤️
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    data.forEach(cat => {

        const card = document.createElement("div");

        card.className = "cat-card";


        const imageHTML = cat.image_url
            ? `<img src="${cat.image_url}" alt="${cat.name}" style="width:100%; height:260px; object-fit:cover;">`
            : `<div class="cat-image">🐱</div>`;


        card.innerHTML = `
            ${imageHTML}

            <div class="cat-info">

                <h3>${cat.name}</h3>

                <p class="cat-details">
                    ${cat.age || "Age unknown"}
                    •
                    ${cat.gender || "Unknown"}
                    <br>
                    ${cat.breed || "Mixed breed"}
                </p>

                <span class="status">
                    ${cat.status}
                </span>

            </div>
        `;


        container.appendChild(card);

    });

}


loadCats();
