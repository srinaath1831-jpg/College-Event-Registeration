// Get event name from URL

const params = new URLSearchParams(window.location.search);

const eventName = params.get("event");


// Display selected event

const selectedEvent =
    document.getElementById("selectedEvent");

if (selectedEvent && eventName) {

    selectedEvent.textContent =
        "Registering for: " + eventName;

}


// Registration form

const form =
    document.getElementById("registrationForm");


if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const registration = {

            id: Date.now(),

            event: eventName,

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            collegeId:
                document.getElementById("collegeId").value,

            department:
                document.getElementById("department").value,

            year:
                document.getElementById("year").value,

            phone:
                document.getElementById("phone").value,

            registeredAt:
                new Date().toLocaleString()

        };


        // Get existing registrations

        let registrations =
            JSON.parse(
                localStorage.getItem("registrations")
            ) || [];


        // Check duplicate registration

        const alreadyRegistered =
            registrations.some(function (item) {

                return (
                    item.event === registration.event &&
                    item.email === registration.email
                );

            });


        if (alreadyRegistered) {

            showMessage(
                "You have already registered for this event.",
                "error"
            );

            return;
        }


        // Save registration

        registrations.push(registration);


        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        showMessage(
            "Registration successful! 🎉",
            "success"
        );


        form.reset();

    });

}


// Show registration message

function showMessage(message, type) {

    const messageBox =
        document.getElementById("message");

    if (!messageBox) return;

    messageBox.textContent = message;

    messageBox.style.marginTop = "20px";

    messageBox.style.fontWeight = "bold";

    if (type === "success") {

        messageBox.style.color = "green";

    } else {

        messageBox.style.color = "red";

    }

}


// Dashboard

const registrationList =
    document.getElementById("registrationList");


if (registrationList) {

    loadRegistrations();

}


function loadRegistrations() {

    const registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    if (registrations.length === 0) {

        registrationList.innerHTML = `
            <div class="registration-card">
                <h2>No Registrations Yet</h2>

                <p>
                    You haven't registered for any events.
                </p>

                <br>

                <a href="events.html" class="btn">
                    Browse Events
                </a>
            </div>
        `;

        return;
    }


    registrationList.innerHTML = "";


    registrations.forEach(function (registration) {

        const card =
            document.createElement("div");

        card.className =
            "registration-card";


        card.innerHTML = `

            <h2>${registration.event}</h2>

            <p>
                <strong>Name:</strong>
                ${registration.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${registration.email}
            </p>

            <p>
                <strong>College ID:</strong>
                ${registration.collegeId}
            </p>

            <p>
                <strong>Department:</strong>
                ${registration.department}
            </p>

            <p>
                <strong>Year:</strong>
                ${registration.year}
            </p>

            <p>
                <strong>Phone:</strong>
                ${registration.phone}
            </p>

            <p>
                <strong>Registered:</strong>
                ${registration.registeredAt}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelRegistration(${registration.id})"
            >
                Cancel Registration
            </button>

        `;


        registrationList.appendChild(card);

    });

}


// Cancel registration

function cancelRegistration(id) {

    let registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    registrations =
        registrations.filter(function (registration) {

            return registration.id !== id;

        });


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    loadRegistrations();

}


// Event search

function searchEvents() {

    const searchInput =
        document.getElementById("search");

    const cards =
        document.querySelectorAll(".event-card");


    const searchText =
        searchInput.value.toLowerCase();


    cards.forEach(function (card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
