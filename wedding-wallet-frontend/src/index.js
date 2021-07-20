document.addEventListener('DOMContentLoaded', () => {
    // checkIfLoggedIn();

    const loginForm = document.querySelector("#login-form")
    loginForm.addEventListener("submit", (e) => 
    loginFormHandler(e))

    const signupForm = document.querySelector("#signup-form")
    signupForm.addEventListener("submit", (e) => 
    signupFormHandler(e))

    // const budgetForm = document.querySelector("#create-budget-form")
    // budgetForm.addEventListener("submit", (e) => createBudgetHandler(e))
})

//login (need to add sign up and figure out how to hide everything until this is completed)
function signupFormHandler(e) {
    e.preventDefault()
    const usernameInput = e.target.querySelector("#signup-username").value
    const passwordInput = e.target.querySelector("#signup-password").value
    console.log("signup form")
    console.log(usernameInput, passwordInput)
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
      console.log("end signup fetch")
    renderNewUserProfile()
    })
}

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
      localStorage.setItem('jwt_token', json.jwt)
    renderUserProfile()
    })
}

function renderNewUserProfile() {
    fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {
        alert(`Welcome ${json.user.data.attributes.username}`)
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
        console.log(json)
        alert(`Welcome back ${json.user.data.attributes.username}`)
    })
}

// function checkIfLoggedIn(){
//     const token = localStorage.token
//     if (token) {
//         console.log("there is a token")
//         renderUserProfile()
//     } else {
//         console.log("no token")
//         promptUserLogIn();
//     }
//   }
// function promptUserLogIn() {
//     const loginParent = document.querySelector("#login-container").parentElement;
  
//     const loginButton = loginParent.firstElementChild.cloneNode(true);
//     loginButton.innerText = "Login"
  
//     loginParent.firstElementChild.replaceWith(loginButton)
  
//     loginButton.addEventListener("click", launchLoginForm)
// }
  
// function launchLoginForm() {console.log("log in form launch")}


//budget

// function createBudgetHandler(e){
//     e.preventDefault()
//     const budgetAmount = e.target.querySelector("#budget-amount").value
//     console.log(budgetAmount)
//     createBudgetFetch(budgetAmount)
// }

// function createBudgetFetch(amount){  
//     const bodyData = {amount}
//     fetch("http://localhost:3000/api/v1/budgets", {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(bodyData)
//     })
//     .then(response => response.json())
//     .then(budget => {
//       console.log(budget);
//     })
// }

