document.getElementById("loginButton").addEventListener("click", function () {
    let loginForm = document.getElementById("loginForm");
    let overlay = document.querySelector(".overlay");
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        overlay.style.display = "block";
    } else {
        loginForm.style.display = "none";
        overlay.style.display = "none";
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    let loginForm = document.getElementById("loginForm");
    let overlay = document.getElementById("overlay");
    event.preventDefault();
    setTimeout(function () {
        loginForm.style.display = "none";
        overlay.style.display = "none";
        loginForm.submit();
    }, 100); 
});

// chatgpt helped me create this log in form:)

