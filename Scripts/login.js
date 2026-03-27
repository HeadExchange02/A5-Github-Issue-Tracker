document.getElementById("signin-btn").addEventListener("click", () => {

    // 1 get username
    const usernameInput = document.getElementById("input-username");
    const username = usernameInput.value;
    // 2 get password
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    // 3 match username & password
    if (username == "admin" && password == "admin123"){
        // 3-1 true ::> alert > homepage
        alert("SignIn Successful");

        window.location.assign("/home.html");
    }
    else{
        alert("Incorrect Username or Password");
        return;
    }
        // 3-2 false ::> alert > return
});