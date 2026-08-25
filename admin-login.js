import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ikwfhhgtcxaxbvrnxsaj.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_nXH6TntBNdXrxJWn0LDN2Q_3QxomvZt";

// Create Supabase connection
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// Login form
const loginForm =
    document.getElementById("admin-login-form");

const loginMessage =
    document.getElementById("login-message");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("admin-email").value.trim();

    const password =
        document.getElementById("admin-password").value;


    loginMessage.textContent = "Logging in...";


    const { data, error } =
        await supabase.auth.signInWithPassword({

            email: email,

            password: password

        });


    if (error) {

        loginMessage.textContent =
            "❌ " + error.message;

        return;

    }


    loginMessage.textContent =
        "✅ Login successful!";


    // Go to admin dashboard
    setTimeout(function () {

        window.location.href =
            "admin.html";

    }, 800);

});
