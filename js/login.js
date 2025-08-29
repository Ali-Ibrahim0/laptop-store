// Hardcoded dentials for testing
const hardcodedEmail = "ali@gmail.com";
const hardcodedPassword = "123456";

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Validate inputs
    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please fill in all fields"
        });
        return;
    }


    // Check credentials
    if (email === hardcodedEmail && password === hardcodedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "Home.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid email or password"
        });
    }
});