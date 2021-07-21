const createUserContainer = document.querySelector("#login-or-signup-form").parentElement;

//DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderedProfile = document.querySelector("#user-rendered-container");
    checkIfLoggedIn();

    createBudgetForm = document.querySelector("#create-budget-form").addEventListener("submit", (e) => createBudgetHandler(e))

})

//check if user logged in
function checkIfLoggedIn(){
    // is there a case where the first part is accessed?
    const token = localStorage.token
    if (token) {
        renderUserProfile()
    } else {
        promptUserLogIn();
    }
}

function promptUserLogIn() {
    const loginButton = createUserContainer.firstElementChild.cloneNode(true);
    loginButton.innerText = "Login"
    const signupButton = createUserContainer.firstElementChild.cloneNode(true);
    signupButton.innerText = "Sign Up"

    createUserContainer.firstElementChild.append(loginButton, signupButton)

    loginButton.addEventListener("click", launchLoginForm)
    signupButton.addEventListener("click", launchSignupForm)
}
  
function launchLoginForm() {
    createUserContainer.innerHTML = `
        <div style="text-align:center" id="login-form-container">
            <form id="login-form">
            <h4>Log In</h4>
            <div class="form-group">
                <h5>Username</h5>
                <input type="text" class="form-control" id="login-username">
            </div>
            <div class="form-group">
                <h5>Password</h5>
                <input type="password" class="form-control" id="login-password">
            </div>
            <input id= 'login-submit' type="submit" name="submit" value="Log In" class="submit">
            </form><br><br>
            <p class="go-sign-up">Don't have an account? Sign Up Here</p>
        </div>`
    createUserContainer.querySelector(".go-sign-up").addEventListener("click", (e) =>
    launchSignupForm(e))
    createUserContainer.querySelector("#login-form").addEventListener("submit", (e) => 
    loginFormHandler(e))
}

function launchSignupForm(){
    createUserContainer.innerHTML = `
        <div style="text-align:center" id="signup-form-container">
            <form id="signup-form">
            <h4>Signup</h4>
            <div class="form-group">
                <h5>Username</h5>
                <input type="text" class="form-control" id="signup-username">
            </div>
            <div class="form-group">
                <h5>Password</h5>
                <input type="password" class="form-control" id="signup-password">
            </div>
            <input id='signup-submit' type="submit" name="submit" value="Sign Up" class="submit">
            </form><br><br>
            <p class="go-log-in">Already have an account? Log In Here</p>
        </div>`
    createUserContainer.querySelector(".go-log-in").addEventListener("click", (e) =>
    launchLoginForm(e))
    createUserContainer.querySelector("#signup-form").addEventListener("submit", (e) => 
    signupFormHandler(e))
}

//signup
function signupFormHandler(e) {
    e.preventDefault()
    const usernameInput = e.target.querySelector("#signup-username").value
    const passwordInput = e.target.querySelector("#signup-password").value
    signupFetch(usernameInput, passwordInput)
}
  
function signupFetch(username, password) {
    const bodyData = {user: {username, password} }
  
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem('jwt_token', json.jwt)
        json.jwt ? createUserContainer.innerHTML = "" : null;
        renderedProfile.removeAttribute("hidden")
        renderNewUserProfile()
    })
}

//login
function loginFormHandler(e) {
    e.preventDefault()
    const usernameInput = e.target.querySelector("#login-username").value
    const passwordInput = e.target.querySelector("#login-password").value
    loginFetch(usernameInput, passwordInput)
}
  
function loginFetch(username, password) {
    const bodyData = {user: {username, password} }
  
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        localStorage.setItem('jwt_token', json.jwt)
        json.jwt ? createUserContainer.innerHTML = "" : null;
        renderedProfile.removeAttribute("hidden")
        renderUserProfile()
    })
}

//render profiles (these are essentially the same... can we make them one method??)
function renderNewUserProfile() {
    fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {
        json.user ? alert(`Welcome ${json.user.data.attributes.username}`) : alert("Unable to create account. Please try again.");
    })
}

function renderUserProfile() {
    fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {
        json.user ? alert(`Welcome back ${json.user.data.attributes.username}`) : alert("Incorrect username or password.");
    })
    
}

//budget
function createBudgetHandler(e){
    e.preventDefault()
    const budgetAmount = e.target.querySelector("#budget-amount").value
    console.log(budgetAmount)
    console.log(localStorage)
    // console.log(current_user)
    createBudgetFetch(budgetAmount)
}

function createBudgetFetch(amount){  
    const bodyData = {amount}
    fetch("http://localhost:3000/api/v1/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(budget => {
      console.log(budget);
    })
}

