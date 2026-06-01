 // ==========================================
// PART 1
// LOGIN SYSTEM
// AUTO LOGIN
// LOGOUT
// PAGE NAVIGATION
// USER STORAGE
// ==========================================


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let currentUser = null;


// ==========================================
// PAGE REFERENCES
// ==========================================

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const todayTripPage = document.getElementById("todayTripPage");
const tripListPage = document.getElementById("tripListPage");


// ==========================================
// LOGIN REFERENCES
// ==========================================

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


// ==========================================
// DASHBOARD REFERENCES
// ==========================================

const displayUser = document.getElementById("displayUser");
const todayDate = document.getElementById("todayDate");

const openTodayTrip =
    document.getElementById("openTodayTrip");

const openTripList =
    document.getElementById("openTripList");

const logoutBtn =
    document.getElementById("logoutBtn");

    const logoutModal =
    document.getElementById("logoutModal");

const confirmLogoutBtn =
    document.getElementById("confirmLogoutBtn");

const cancelLogoutBtn =
    document.getElementById("cancelLogoutBtn");


// ==========================================
// BACK BUTTONS
// ==========================================

const backToDashboard1 =
    document.getElementById("backToDashboard1");

const backToDashboard2 =
    document.getElementById("backToDashboard2");


// ==========================================
// LOCAL STORAGE KEYS
// ==========================================

const USERS_KEY = "trip_manager_users";

const SESSION_KEY =
    "trip_manager_current_user";


// ==========================================
// GET USERS
// ==========================================

function getUsers() {

    const users =
        localStorage.getItem(USERS_KEY);

    return users
        ? JSON.parse(users)
        : {};

}


// ==========================================
// SAVE USERS
// ==========================================

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


// ==========================================
// CREATE NEW USER
// ==========================================

function createUser(username, password) {

    const users = getUsers();

    users[username] = {

        password: password,

        trips: []

    };

    saveUsers(users);

}


// ==========================================
// GET USER DATA
// ==========================================

function getUserData(username) {

    const users = getUsers();

    return users[username];

}


// ==========================================
// SAVE CURRENT USER SESSION
// ==========================================

function saveSession(username) {

    localStorage.setItem(
        SESSION_KEY,
        username
    );

}


// ==========================================
// REMOVE SESSION
// ==========================================

function clearSession() {

    localStorage.removeItem(
        SESSION_KEY
    );

}


// ==========================================
// GET CURRENT SESSION
// ==========================================

function getSessionUser() {

    return localStorage.getItem(
        SESSION_KEY
    );

}


// ==========================================
// SHOW PAGE
// ==========================================

function showPage(page) {

    loginPage.classList.remove("active");
    dashboardPage.classList.remove("active");
    todayTripPage.classList.remove("active");
    tripListPage.classList.remove("active");

    page.classList.add("active");

}


// ==========================================
// TODAY DATE FORMAT
// ==========================================

function getFormattedDate() {

    const date = new Date();

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


// ==========================================
// TODAY DAY NAME
// ==========================================

function getTodayText() {

    const date = new Date();

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


// ==========================================
// SET DASHBOARD DATA
// ==========================================

function loadDashboard() {

    displayUser.textContent =
        currentUser;

    todayDate.textContent =
        getTodayText();

}


// ==========================================
// LOGIN FORM
// ==========================================

loginForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value.trim();

        if (
            username === "" ||
            password === ""
        ) {
            return;
        }

        const users = getUsers();

        // NEW USER

        if (!users[username]) {

            createUser(
                username,
                password
            );

        }

        // EXISTING USER

        else {

            if (
                users[username].password !==
                password
            ) {

                alert(
                    "Wrong Password"
                );

                return;

            }

        }

        currentUser = username;

        saveSession(username);

        loadDashboard();

        showPage(dashboardPage);

    }
);


// ==========================================
// AUTO LOGIN
// ==========================================

window.addEventListener(
    "load",
    function () {

        const savedUser =
            getSessionUser();

        if (!savedUser) {

            showPage(loginPage);

            return;

        }

        const users =
            getUsers();

        if (!users[savedUser]) {

            clearSession();

            showPage(loginPage);

            return;

        }

        currentUser =
            savedUser;

        loadDashboard();

        showPage(dashboardPage);

    }
);


// ==========================================
// DASHBOARD NAVIGATION
// ==========================================

openTodayTrip.addEventListener(
    "click",
    function () {

        showPage(todayTripPage);

    }
);


openTripList.addEventListener(
    "click",
    function () {

        showPage(tripListPage);

    }
);


// ==========================================
// BACK BUTTONS
// ==========================================

backToDashboard1.addEventListener(
    "click",
    function () {

        showPage(dashboardPage);

    }
);


backToDashboard2.addEventListener(
    "click",
    function () {

        showPage(dashboardPage);

    }
);


// ==========================================
// LOGOUT
// ==========================================

 logoutBtn.addEventListener(
    "click",
    function () {

        logoutModal.classList.add(
            "show"
        );

    }
);


cancelLogoutBtn.addEventListener(
    "click",
    function () {

        logoutModal.classList.remove(
            "show"
        );

    }
);


confirmLogoutBtn.addEventListener(
    "click",
    function () {

        logoutModal.classList.remove(
            "show"
        );

        clearSession();

        currentUser = null;

        usernameInput.value = "";

        passwordInput.value = "";

        showPage(loginPage);

    }
);

// ==========================================
// HELPER FUNCTION
// USER TRIPS RETURN
// ==========================================

function getCurrentUserTrips() {

    const users = getUsers();

    if (
        !users[currentUser]
    ) {
        return [];
    }

    return users[currentUser].trips;

}


// ==========================================
// HELPER FUNCTION
// SAVE USER TRIPS
// ==========================================

function saveCurrentUserTrips(
    trips
) {

    const users =
        getUsers();

    users[currentUser].trips =
        trips;

    saveUsers(users);

}
// ==========================================
// PART 2
// TODAY TRIP PAGE
// ADD ROW
// AUTO TOTAL
// SAVE TRIPS
// CANCEL TRIP ROWS
// ==========================================


// ==========================================
// TODAY TRIP REFERENCES
// ==========================================

const tripEntryBody =
    document.getElementById("tripEntryBody");

const addTripBtn =
    document.getElementById("addTripBtn");

const saveTripBtn =
    document.getElementById("saveTripBtn");

const cancelTripBtn =
    document.getElementById("cancelTripBtn");

const advanceTotal =
    document.getElementById("advanceTotal");

const balanceTotal =
    document.getElementById("balanceTotal");


// ==========================================
// CREATE TRIP ROW
// ==========================================

function createTripRow() {

    const row =
        document.createElement("tr");

    row.innerHTML = `

        <td>
            <input
                type="text"
                value="${getFormattedDate()}"
                readonly
            >
        </td>

        <td>
            <input
                type="text"
                class="location-input"
                placeholder="Location"
            >
        </td>

        <td>
            <input
                type="number"
                class="advance-input"
                placeholder="0"
            >
        </td>

        <td>
            <input
                type="number"
                class="balance-input"
                placeholder="0"
            >
        </td>

    `;

    tripEntryBody.appendChild(row);

    attachTotalEvents();

}


// ==========================================
// LOAD DEFAULT ROWS
// ==========================================

function loadDefaultRows() {

    tripEntryBody.innerHTML = "";

    createTripRow();

    createTripRow();

    calculateTripTotals();

}


// ==========================================
// ADD TRIP BUTTON
// ==========================================

addTripBtn.addEventListener(
    "click",
    function () {

        createTripRow();

    }
);


// ==========================================
// ATTACH INPUT EVENTS
// ==========================================

function attachTotalEvents() {

    const advanceInputs =
        document.querySelectorAll(
            ".advance-input"
        );

    const balanceInputs =
        document.querySelectorAll(
            ".balance-input"
        );

    advanceInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                calculateTripTotals
            );

        }
    );

    balanceInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                calculateTripTotals
            );

        }
    );

}


// ==========================================
// CALCULATE TOTALS
// ==========================================

function calculateTripTotals() {

    let totalAdvance = 0;

    let totalBalance = 0;

    document
        .querySelectorAll(".advance-input")
        .forEach(function (input) {

            totalAdvance +=
                Number(input.value) || 0;

        });

    document
        .querySelectorAll(".balance-input")
        .forEach(function (input) {

            totalBalance +=
                Number(input.value) || 0;

        });

    advanceTotal.textContent =
        "₹" + totalAdvance;

    balanceTotal.textContent =
        "₹" + totalBalance;

}


// ==========================================
// OPEN TODAY TRIP PAGE
// ==========================================

openTodayTrip.addEventListener(
    "click",
    function () {

        showPage(todayTripPage);

        loadDefaultRows();

    }
);


// ==========================================
// SAVE TRIPS
// ==========================================

saveTripBtn.addEventListener(
    "click",
    function () {

        const rows =
            tripEntryBody.querySelectorAll("tr");

        let trips =
            getCurrentUserTrips();

        rows.forEach(function (row) {

            const inputs =
                row.querySelectorAll("input");

            const date =
                inputs[0].value;

            const location =
                inputs[1].value.trim();

            const advance =
                Number(inputs[2].value) || 0;

            const balance =
                Number(inputs[3].value) || 0;

            if (location === "") {
                return;
            }

            trips.push({

                id:
                    Date.now() +
                    Math.random(),

                date,

                location,

                advance,

                balance

            });

        });

        saveCurrentUserTrips(trips);

        showPage(dashboardPage);

        showToast(
            "Trip Saved Successfully"
        );

    }
);


// ==========================================
// CANCEL MODE FLAG
// ==========================================

let cancelMode = false;


// ==========================================
// CANCEL BUTTON
// ==========================================

cancelTripBtn.addEventListener(
    "click",
    function () {

        if (!cancelMode) {

            enableCancelMode();

            cancelMode = true;

            return;

        }

        deleteSelectedRows();

        cancelMode = false;

    }
);


// ==========================================
// ENABLE CANCEL MODE
// ==========================================

function enableCancelMode() {

    const rows =
        tripEntryBody.querySelectorAll("tr");

    rows.forEach(function (row) {

        if (
            row.querySelector(
                ".row-selector"
            )
        ) {
            return;
        }

        const td =
            document.createElement("td");

        td.innerHTML = `

            <input
                type="checkbox"
                class="row-selector"
            >

        `;

        row.appendChild(td);

    });

}


// ==========================================
// DELETE SELECTED ROWS
// ==========================================

function deleteSelectedRows() {

    const rows =
        tripEntryBody.querySelectorAll("tr");

    rows.forEach(function (row) {

        const checkbox =
            row.querySelector(
                ".row-selector"
            );

        if (
            checkbox &&
            checkbox.checked
        ) {

            row.remove();

        }

    });

    calculateTripTotals();

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.textContent =
        message;

    toast.style.display =
        "block";

    setTimeout(function () {

        toast.style.display =
            "none";

    }, 4000);

}
// ==========================================
// PART 3
// TRIP LIST
// GRAND TOTAL
// CUSTOM TOTAL
// DELETE SAVED TRIPS
// SELECTED TOTAL
// ==========================================


// ==========================================
// REFERENCES
// ==========================================

const savedTripBody =
    document.getElementById(
        "savedTripBody"
    );

const grandAdvance =
    document.getElementById(
        "grandAdvance"
    );

const grandBalance =
    document.getElementById(
        "grandBalance"
    );

const customTotalBtn =
    document.getElementById(
        "customTotalBtn"
    );

const deleteSelectedBtn =
    document.getElementById(
        "deleteSelectedBtn"
    );

const selectedSection =
    document.getElementById(
        "selectedSection"
    );

const selectedTripBody =
    document.getElementById(
        "selectedTripBody"
    );

const selectedAdvance =
    document.getElementById(
        "selectedAdvance"
    );

const selectedBalance =
    document.getElementById(
        "selectedBalance"
    );


// ==========================================
// LOAD TRIP LIST
// ==========================================

function loadTripList() {

    savedTripBody.innerHTML = "";

    const trips =
        getCurrentUserTrips();

    let totalAdvance = 0;
    let totalBalance = 0;

    trips.forEach(function (trip) {

        totalAdvance +=
            Number(trip.advance);

        totalBalance +=
            Number(trip.balance);

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>

                <input
                    type="checkbox"
                    class="saved-trip-check"
                    data-id="${trip.id}"
                >

            </td>

            <td>${trip.date}</td>

            <td>${trip.location}</td>

            <td>₹${trip.advance}</td>

            <td>₹${trip.balance}</td>

        `;

        savedTripBody.appendChild(
            row
        );

    });

    grandAdvance.textContent =
        "₹" + totalAdvance;

    grandBalance.textContent =
        "₹" + totalBalance;

}


// ==========================================
// OPEN TRIP LIST PAGE
// ==========================================

openTripList.addEventListener(
    "click",
    function () {

        loadTripList();

        selectedSection.style.display =
            "none";

        showPage(tripListPage);

    }
);


// ==========================================
// CUSTOM TOTAL
// ==========================================

customTotalBtn.addEventListener(
    "click",
    function () {

        const checks =
            document.querySelectorAll(
                ".saved-trip-check"
            );

        const trips =
            getCurrentUserTrips();

        selectedTripBody.innerHTML =
            "";

        let totalAdvance = 0;
        let totalBalance = 0;

        checks.forEach(function (
            checkbox
        ) {

            if (
                !checkbox.checked
            ) {
                return;
            }

            const tripId =
                Number(
                    checkbox.dataset.id
                );

            const trip =
                trips.find(
                    function (item) {

                        return (
                            item.id ==
                            tripId
                        );

                    }
                );

            if (!trip) {
                return;
            }

            totalAdvance +=
                Number(
                    trip.advance
                );

            totalBalance +=
                Number(
                    trip.balance
                );

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `

                <td>${trip.date}</td>

                <td>${trip.location}</td>

                <td>₹${trip.advance}</td>

                <td>₹${trip.balance}</td>

            `;

            selectedTripBody.appendChild(
                row
            );

        });

        selectedAdvance.textContent =
            "₹" + totalAdvance;

        selectedBalance.textContent =
            "₹" + totalBalance;

        selectedSection.style.display =
            "block";

    }
);


// ==========================================
// DELETE SELECTED TRIPS
// ==========================================

deleteSelectedBtn.addEventListener(
    "click",
    function () {

        const checks =
            document.querySelectorAll(
                ".saved-trip-check"
            );

        const selectedIds = [];

        checks.forEach(function (
            checkbox
        ) {

            if (
                checkbox.checked
            ) {

                selectedIds.push(
                    Number(
                        checkbox.dataset.id
                    )
                );

            }

        });

        let trips =
            getCurrentUserTrips();

        trips = trips.filter(
            function (trip) {

                return !selectedIds.includes(
                    Number(trip.id)
                );

            }
        );

        saveCurrentUserTrips(
            trips
        );

        loadTripList();

        selectedSection.style.display =
            "none";

        showToast(
            "Selected Trips Removed"
        );

    }
);


// ==========================================
// REFRESH LIST WHEN RETURNING
// ==========================================

backToDashboard2.addEventListener(
    "click",
    function () {

        selectedSection.style.display =
            "none";

    }
);


// ==========================================
// EXTRA SAFETY
// ==========================================

window.addEventListener(
    "storage",
    function () {

        if (
            tripListPage.classList.contains(
                "active"
            )
        ) {

            loadTripList();

        }

    }
);


// ==========================================
// END OF APP.JS
// ==========================================