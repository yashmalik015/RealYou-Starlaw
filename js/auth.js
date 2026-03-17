const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const nameField = document.getElementById("nameField");
const roleSelect = document.getElementById("roleSelect");

loginBtn.addEventListener("click", () => {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    nameField.style.display = "none";
    roleSelect.style.display = "none";
});

signupBtn.addEventListener("click", () => {
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
    nameField.style.display = "block";
    roleSelect.style.display = "block";
});

/* Fake Google Sign-In (Frontend Only) */
function googleSignIn() {
    alert("Google Sign-In integration requires Google Cloud OAuth setup.");
}

/* Role Based Routing (Frontend Simulation) */
document.getElementById("authForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const role = roleSelect.value;

    if(role === "lawyer") {
        window.location.href = "dashboard-lawyer.html";
    } else if(role === "entrepreneur" || role === "businessman") {
        window.location.href = "dashboard-business.html";
    } else {
        window.location.href = "dashboard.html";
    }
});

function googleSignIn() {
    google.accounts.id.initialize({
        client_id: "YOUR_CLIENT_ID",
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt();
}

async function handleCredentialResponse(response) {
    const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    window.location.href = "dashboard-business.html";
}