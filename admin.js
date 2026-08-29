import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL =
    "https://ikwfhhgtcxaxbvrnxsaj.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_nXH6TntBNdXrxJWn0LDN2Q_3QxomvZt";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const container =
    document.getElementById("applications-container");


async function loadApplications() {

    container.innerHTML =
        '<p class="loading">Loading applications... 🐱</p>';


    const { data: applications, error } =
        await supabase
            .from("applications")
            .select("*");


    if (error) {

        console.error("Applications error:", error);

        container.innerHTML = `
            <div class="admin-error">
                <h2>Unable to load applications 😿</h2>
                <p>${error.message}</p>
            </div>
        `;

        return;
    }


    console.log("Applications found:", applications);


    if (!applications || applications.length === 0) {

        container.innerHTML = `
            <div class="no-applications">

                <div class="no-applications-icon">
                    🐱
                </div>

                <h2>
                    No applications yet
                </h2>

                <p>
                    No adoption applications were found.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = "";


    for (const application of applications) {

        let catName = "Unknown cat";


        if (application.cat_id) {

            const { data: cat } =
                await supabase
                    .from("cats")
                    .select("name")
                    .eq("id", application.cat_id)
                    .maybeSingle();


            if (cat) {
                catName = cat.name;
            }
        }


        const card =
            document.createElement("div");


        card.className =
            "application-card";


        card.innerHTML = `

            <div class="application-card-header">

                <div>

                    <p class="application-label">
                        Applicant
                    </p>

                    <h2>
                        ${escapeHTML(
                            application.applicant_name
                        )}
                    </h2>

                </div>

<span class="application-status">
    ${escapeHTML(application.status || "Pending")}
</span>

            </div>


            <div class="application-cat">

                🐱

                <strong>
                    ${escapeHTML(catName)}
                </strong>

            </div>


            <div class="application-details">

                <div>
                    <strong>Email</strong>
                    <span>
                        ${escapeHTML(
                            application.email || "-"
                        )}
                    </span>
                </div>


                <div>
                    <strong>Phone</strong>
                    <span>
                        ${escapeHTML(
                            application.phone || "-"
                        )}
                    </span>
                </div>


                <div>
                    <strong>Home</strong>
                    <span>
                        ${escapeHTML(
                            application.home_type || "-"
                        )}
                    </span>
                </div>


                <div>
                    <strong>Own / Rent</strong>
                    <span>
                        ${escapeHTML(
                            application.owns_or_rents || "-"
                        )}
                    </span>
                </div>

            </div>


            <div class="application-answer">

                <strong>
                    Previous cat experience
                </strong>

                <p>
                    ${escapeHTML(
                        application.previous_cat_experience ||
                        "None provided."
                    )}
                </p>

            </div>
        <div class="application-actions">

            <button
                class="approve-button"
                data-id="${application.id}"
            >
                ✅ Approve
            </button>

            <button
                class="reject-button"
                data-id="${application.id}"
            >
                ❌ Reject
            </button>

        </div>

            <div class="application-answer">

                <strong>
                    Other pets
                </strong>

                <p>
                    ${escapeHTML(
                        application.other_pets ||
                        "None provided."
                    )}
                </p>

            </div>


            <div class="application-answer">

                <strong>
                    Why they want to adopt
                </strong>

                <p>
                    ${escapeHTML(
                        application.reason ||
                        "No reason provided."
                    )}
                </p>

            </div>

        `;


        container.appendChild(card);
    }
}


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


async function updateApplicationStatus(id, status) {

    // Update application status
    const { data: application, error: applicationError } =
        await supabase
            .from("applications")
            .update({ status: status })
            .eq("id", id)
            .select()
            .single();

    if (applicationError) {

        console.error(
            "Application update error:",
            applicationError
        );

        alert("Unable to update application status.");

        return;
    }


    // If approved, mark the cat as adopted
    if (status === "Approved" && application.cat_id) {

        const { error: catError } =
            await supabase
                .from("cats")
                .update({ status: "Adopted" })
                .eq("id", application.cat_id);

        if (catError) {

            console.error(
                "Cat status update error:",
                catError
            );

            alert(
                "Application was approved, but the cat status could not be updated."
            );

            return;
        }
    }

// If rejected, mark the cat as Available
    if (status === "Rejected" && application.cat_id) {

        const { error: catError } =
            await supabase
                .from("cats")
                .update({ status: "Available" })
                .eq("id", application.cat_id);

        if (catError) {

            console.error(
                "Cat status update error:",
                catError
            );

            alert(
                "Application was rejected, but the cat status could not be updated."
            );

            return;
        }
    }

    await loadApplications();
}
