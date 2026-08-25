import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL =
    "https://ikwfhhgtcxaxbvrnxsaj.supabase.co";


const SUPABASE_KEY =
    "YOUR_PUBLISHABLE_KEY";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const container =
    document.getElementById("profile-container");


const params =
    new URLSearchParams(window.location.search);


const catId =
    params.get("id");


async function loadCatProfile() {

    if (!catId) {

        container.innerHTML = `
            <h2>Cat not found 🐱</h2>

            <a href="index.html#cats">
                ← Back to cats
            </a>
        `;

        return;
    }


    const { data: cat, error } =
        await supabase
            .from("cats")
            .select("*")
            .eq("id", catId)
            .single();


    if (error || !cat) {

        console.error(error);

        container.innerHTML = `
            <h2>Sorry, we couldn't find this cat. 🐱</h2>

            <a href="index.html#cats">
                ← Back to cats
            </a>
        `;

        return;
    }


    const imageHTML = cat.image_url

        ? `
            <img
                src="${cat.image_url}"
                alt="${cat.name}"
                class="profile-image"
            >
        `

        : `
            <div class="profile-placeholder">
                🐱
            </div>
        `;


    container.innerHTML = `

        <div class="profile-card">

            <div>

                ${imageHTML}

            </div>


            <div class="profile-info">

                <p class="small-title">
                    🐾 MEET YOUR NEW FRIEND
                </p>


                <h1>
                    ${cat.name}
                </h1>


                <span class="status">
                    ${cat.status}
                </span>


                <div class="profile-details">

                    <p>
                        🎂 <strong>Age:</strong>
                        ${cat.age || "Not provided"}
                    </p>

                    <p>
                        ⚧️ <strong>Gender:</strong>
                        ${cat.gender || "Not provided"}
                    </p>

                    <p>
                        🧬 <strong>Breed:</strong>
                        ${cat.breed || "Not provided"}
                    </p>

                    <p>
                        📍 <strong>Location:</strong>
                        ${cat.location || "Not provided"}
                    </p>

                </div>


                <div class="profile-description">

                    <h3>
                        💕 Personality
                    </h3>

                    <p>
                        ${cat.personality || "Information coming soon."}
                    </p>


                    <h3>
                        🩺 Health
                    </h3>

                    <p>
                        ${cat.health || "Information coming soon."}
                    </p>

                </div>


                ${
                    cat.status === "Available"

                    ?

                    `
                    <a
                        href="apply.html?cat=${cat.id}"
                        class="main-button"
                    >
                        ❤️ Apply to Adopt ${cat.name}
                    </a>
                    `

                    :

                    `
                    <p>
                        ❤️ ${cat.name} has found a
                        forever home!
                    </p>
                    `
                }


                <br><br>


                <a
                    href="index.html#cats"
                    class="back-button"
                >
                    ← Back to All Cats
                </a>

            </div>

        </div>

    `;

}


loadCatProfile();
