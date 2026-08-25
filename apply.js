import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL =
    "https://ikwfhhgtcxaxbvrnxsaj.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_nXH6TntBNdXrxJWn0LDN2Q_3QxomvZt";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const params =
    new URLSearchParams(window.location.search);


const catId =
    params.get("cat");


const selectedCat =
    document.getElementById("selected-cat");


const form =
    document.getElementById("adoption-form");


const message =
    document.getElementById("form-message");



/* LOAD SELECTED CAT */

async function loadCat() {

    if (!catId) {

        selectedCat.textContent =
            "No cat selected 🐱";

        return;
    }


    const { data: cat, error } =
        await supabase
            .from("cats")
            .select("id, name")
            .eq("id", catId)
            .single();


    if (error || !cat) {

        selectedCat.textContent =
            "Cat not found 🐱";

        console.error(error);

        return;
    }


    selectedCat.textContent =
        cat.name;

}



/* SUBMIT APPLICATION */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        message.textContent =
            "Submitting your application... 🐱";


        message.className =
            "form-message";


        const application = {

            cat_id: catId,

            applicant_name:
                document.getElementById(
                    "applicant_name"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            phone:
                document.getElementById(
                    "phone"
                ).value.trim(),

            home_type:
                document.getElementById(
                    "home_type"
                ).value,

            owns_or_rents:
                document.getElementById(
                    "owns_or_rents"
                ).value,

            previous_cat_experience:
                document.getElementById(
                    "previous_cat_experience"
                ).value.trim(),

            other_pets:
                document.getElementById(
                    "other_pets"
                ).value.trim(),

            reason:
                document.getElementById(
                    "reason"
                ).value.trim()

        };


        const { error } =
            await supabase
                .from("applications")
                .insert([application]);


        if (error) {

            console.error(
                "Application error:",
                error
            );


            message.textContent =
                "Sorry, we couldn't submit your application. Please try again.";

            message.className =
                "form-message error";

            return;
        }


        message.textContent =
            "Application submitted successfully! ❤️ We'll be in touch soon.";

        message.className =
            "form-message success";


        form.reset();


        selectedCat.textContent =
            "Application received! 🐱";

    }
);


loadCat();
