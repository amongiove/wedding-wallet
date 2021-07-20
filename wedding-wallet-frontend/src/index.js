document.addEventListener('DOMContentLoaded', () => {
   
    console.log("DOM is Loaded");  
  
    const loginForm = document.querySelector("#login-form")
    loginForm.addEventListener("submit", (e) => 
    loginFormHandler(e))
})

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
      localStorage.setItem('jwt_token', json.jwt)
    renderUserProfile()
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
        alert(`Welcome back ${json.user.data.attributes.name}`)
    })
}

//end log in




