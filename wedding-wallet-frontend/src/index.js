const createUserContainer = document.querySelector("#login-or-signup-form").parentElement;
let budgetAmount = document.getElementById("display-budget-amount");
let totalExpenseAmount = document.getElementById("display-expense-amount");
let balanceAmount = document.getElementById("balance-amount");
let getUser

//DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderedProfile = document.querySelector("#user-rendered-container");
    checkIfLoggedIn();
    getCategories();
    document.querySelector("#add-expense-modal-form").addEventListener("submit", (e) => addExpenseHandler(e));
    document.querySelector("#edit-budget-modal-form").addEventListener("submit", (e) => editBudgetHandler(e));

    //edit exp event listener
    // document.getElementById("#edit-expense-form").addEventListener('show.bs.modal', (e) => editExpenseModal(e));
    // document.getElementById("#editExpenseForm").on('show.bs.modal', function () {
        // alert('The modal is displayed completely!');
    //   });
})

function clearField(element){
    element.value = '';
}
//-------------------------------------------users---------------------------------------------------

//user data
function getUserData() {
    // if (getUser !== undefined) {
    //     return getUser
    // }
    getUser = 
    fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => { return json.user})
    return getUser
}

function checkIfLoggedIn(){
    const token = localStorage.jwt_token
    if (token) {
        renderUserProfile();
    } else {
        promptUserLogIn();
    }
}

function promptUserLogIn() {
    const loginButton = createUserContainer.firstElementChild.cloneNode(true);
    loginButton.innerHTML = '<button class="btn btn-outline-secondary btn-lg" style="text-align:center">Login</button><br><br>'
    const signupButton = createUserContainer.firstElementChild.cloneNode(true);
    signupButton.innerHTML = '<button class="btn btn-outline-secondary btn-lg" style="text-align:center">Sign Up</button><br>'

    createUserContainer.firstElementChild.append(loginButton, signupButton)

    loginButton.addEventListener("click", launchLoginForm)
    signupButton.addEventListener("click", launchSignupForm)
}
  
function launchLoginForm() {
    createUserContainer.innerHTML = `
        <div class="login-signup-form" style="text-align:center" id="login-form-container">

            <form id="login-form">
            <h4>Log In</h4><br>
            <div class="form-group">
                <h5>Username</h5>
                <input type="text" class="form-control" id="login-username" required>
            </div>
            <div class="form-group">
                <h5>Password</h5>
                <input type="password" class="form-control" id="login-password" required>
            </div><br>
            <input id= 'login-submit' type="submit" name="submit" value="Log In" class="btn btn-outline-danger submit">
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
        <div class="login-signup-form" style="text-align:center" id="signup-form-container">
            <form id="signup-form">
            <h4>Signup</h4><br>
            <div class="form-group">
                <h5>Username</h5>
                <input type="text" class="form-control" id="signup-username" required>
            </div>
            <div class="form-group">
                <h5>Password</h5>
                <input type="password" class="form-control" id="signup-password" required>
            </div><br>
            <input id='signup-submit' type="submit" name="submit" value="Sign Up" class="btn btn-outline-danger submit">
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
        localStorage.setItem('jwt_token', json.jwt)
        json.jwt ? createUserContainer.innerHTML = "" : null;
        renderUserProfile();
    })
}

//render profiles (these are essentially the same... can we make them one method??)
function renderNewUserProfile() {
    renderedProfile.removeAttribute("hidden");
    getUserData().then((user) => {
        user ? alert(`Welcome ${user.data.attributes.username}`) : alert("Unable to create account. Please try again.");
    });
}

function renderUserProfile() {
    renderedProfile.removeAttribute("hidden");
    getUserData().then((user) => {
        !user.data.attributes.budget ? renderBudgetForm() : displayBudget();
        user ? alert(`Welcome back ${user.data.attributes.username}`) : alert("Incorrect username or password.");
    });
}

//logout
function logout() {
    console.log("logout")
    localStorage.removeItem('jwt_token');
    location = window.location
}

//----------------------------------------end users------------------------------------------------

//----------------------------------------budget---------------------------------------------------
function renderBudgetForm(){
    createBudgetForm = document.createElement("div")
    createBudgetForm.id = "create-budget-form-container"
    createBudgetForm.innerHTML = `
        <div class="create-budget-container">
            <form id="create-budget-form">
                <h4>Please Enter Your Budget.</h4><br>
                <span class="input-group-text " style="display:inline-block">$</span><input class ="form-contron" id='budget-amount' type="number" min="1" name="budget-amount" value="" style="display:inline-block" placeholder="Enter desired budget." aria-label="Amount"><br><br>
                <input id= 'budget-submit' type="submit" name="submit" value="Save Budget" class="submit btn btn-danger"><br><br>
            </form>
        </div>`
    renderedProfile.appendChild(createBudgetForm)
    document.querySelector("#create-budget-form").addEventListener("submit", (e) => createBudgetHandler(e))
}

function createBudgetHandler(e){
    e.preventDefault()
    const budgetAmount = e.target.querySelector("#budget-amount").value
    if(budgetAmount === '' || budgetAmount < 0){
        alert("value cannot be empty or negative.") ;
    } 
    else {
        createBudgetFetch(budgetAmount)
    }
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
    .then(json => {
        budget = json.data.attributes.amount
        //is there a more graceful way to do this??
        document.querySelector("#create-budget-form-container").style.visibility="hidden"     
        budgetAmount.textContent = budget;
        displayBudget();
    })
}

//should all the extras be moved?
function displayBudget(){
    const budgetDisplay = document.querySelector("#budget-display");
    budgetDisplay.removeAttribute("hidden");
    const logOutBtn = document.querySelector("#logout-btn");
    logOutBtn.removeAttribute("hidden");
    Promise.resolve(displayCategories())
    .then(getExpenses());
    // getExpenses();
    getUserData().then((user) => {
        budget = user.data.attributes.budget.amount
        budgetAmount.textContent = budget;
    });
    document.querySelector("#expense-header").removeAttribute("hidden");

    totalExpense();
    showBalance();

}

function editBudgetHandler(e){
    e.preventDefault()
    const newAmount = e.target[1].value
    if(newAmount === '' || newAmount < 0){
        alert("value cannot be empty or negative.") ;
    } 
    else {
        //hide modal
        editBudgetFetch(newAmount)
    } 
}

function editBudgetFetch(newAmount){
    getUser.then((user) => {
        const budgetId = user.data.attributes.budget.id;
        bodyData = {newAmount}
        fetch(`http://localhost:3000/api/v1/budgets/${budgetId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            newBudget = json.data.attributes.amount;
            budgetAmount.textContent = newBudget;
        })
        showBalance();
    }); 
}

//-------------------------------------------------end budget------------------------------------------------

//------------------------------------------------categories-------------------------------------------------
function getCategories(){
    return fetch('http://localhost:3000/api/v1/categories', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {return json.category.data})
    .then((list) => {
        list.forEach(category => {
            let newCategory = new Category(category, category.attributes)
        })
    })
}

function displayCategories(){
    categoryList = document.querySelector('#expense-list-categories');
    let categories = Category.all
    categories.forEach( (category) => {
        id = category.name.replace(/[^A-Z0-9]/ig, "")
        let accordian = document.createElement('div');
        accordian.classList.add('accoridan-item');
        accordian.innerHTML= `
            <h2 class="accordion-header" id="flush-heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}" aria-expanded="false" aria-controls="flush-collapse">
                    ${category.name}
                </button>
            </h2>
            <div id="flush-collapse-${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading">
                <div class="accordion-body">
                    <table id="${id}" class="table table-striped table-hover" style="width:100%">
                        <thead>
                            <tr class="table table-danger table-sm head-row">
                                <th class="fw-light" style="width:35%">Expense Item</th>
                                <th class="fw-light" style="width:35%">Expense Cost</th>
                                <th class="fw-light" style="width:20%"></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>`
        categoryList.appendChild(accordian);
    });        
}

//potential for dynamically coding categories into form
// function addCategories(){
//     categories = getCategories()
//     const select = document.querySelector("#expense-category")
//     categories.forEach (category => {
//         let option = document.createElement('option');
//         option.text = option.value = category;
//         select.add(option, 0); 
//     })    
// }

//-----------------------------------------------------end categories--------------------------------------

//-----------------------------------------------------expenses----------------------------------------------

function getExpenses(){
    getUser.then((user) => {
        expenses = user.data.attributes.expenses
        expenses.forEach (expense => {
            //expense.category_id -- will need to get name here (category.js??)
            fetch(`http://localhost:3000/api/v1/categories/${expense.category_id}`, {
                    method: 'GET',
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            })
            .then(response => response.json())
            .then(json => { return json.category.data.attributes.name})
            .then (category => {
                expenseCategory = category
                expenseName = expense.name
                expenseAmount = expense.amount
                expenseNotes = expense.notes
                expenseId = expense.id
                
                displayExpense(expenseCategory, expenseName, expenseAmount, expenseNotes, expenseId)
            })
        })
    })
}

function addExpenseHandler(e){
    e.preventDefault()
    const expenseAmount = e.target[3].value
    if(expenseAmount === '' || expenseAmount < 0){
        alert("Expense amount cannot be empty or negative.") ;
    } 
    else {
        //hide modal
        const expenseCategory = e.target[1].value
        const expenseName = e.target[2].value 
        const expenseNotes = document.querySelector("#expense-notes").value
        createExpenseFetch(expenseCategory, expenseName, expenseAmount, expenseNotes)
    } 
}

function createExpenseFetch(category, name, amount, notes){ 
    const bodyData = {category, name, amount, notes}
    fetch("http://localhost:3000/api/v1/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
        expenseId = json.data.id
        expenseCategory = json.data.attributes.category.name;
        expenseName = json.data.attributes.name;
        expenseAmount = json.data.attributes.amount;
        expenseNotes = json.data.attributes.notes;

        displayExpense(expenseCategory, expenseName, expenseAmount, expenseNotes, expenseId)
        
        totalExpense();
        showBalance();
    });
}

function displayExpense(category, name, amount, notes, id){
    categoryId = category.replace(/[^A-Z0-9]/ig, "")
    table = document.querySelector(`#${categoryId}`)
    expenseRow = table.insertRow(-1);
    expenseRow.id = `expense-${id}`
    expenseName = expenseRow.insertCell(0)
    expenseName.innerHTML =  `${name}`
    expenseAmount = expenseRow.insertCell(1)
    expenseAmount.innerHTML =  `$${amount}`
    expenseButtons = expenseRow.insertCell(2)
    expenseButtons.style = "text-align: right"
    expenseButtons.innerHTML =  `
        <button class="btn btn-outline-secondary edit-expense" data-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg></button> 
        <button class="btn btn-outline-secondary delete-expense" data-id="${id}" type="button" onclick="return confirm('Are you sure you want to delete?')?deleteExpense(${id}):''"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg></button>
    `
    // document.querySelectorAll(".edit-expense").forEach((element) => {element.addEventListener("click", (e) => editExpenseHandler(e) )})

}

// function editExpenseHandler(e){
//     console.log("edit expense");
//     console.log(e);
// }

// function updateExpense(id){
//     console.log("update expense")
//     editExpenseForm = document.querySelector("#edit-expense-form")
//     expense = fetch(`http://localhost:3000/api/v1/expenses/${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
//         },
//         })
//         .then(response => response.json())
// }

function deleteExpense(id){
    console.log("delete")
    bodyData = {id}
    fetch(`http://localhost:3000/api/v1/expenses/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: JSON.stringify(bodyData)
        })
    row = document.querySelector(`#expense-${id}`)
    row.remove();

    showBalance();
    totalExpense();
}

//expense total
function totalExpense(){
    console.log("total expense")
    let expenseTotal = 0;
    getUserData().then((user) => {
        expenses = user.data.attributes.expenses;
        console.log(expenses.length)

        if(expenses.length >0){
            expenseTotal = expenses.reduce(function(acc,curr){
                acc += parseInt(curr.amount);
                return acc;
            }, 0)
        }
        totalExpenseAmount.textContent = expenseTotal;
        return expenseTotal;
    })
    return expenseTotal;
}

//------------------------------------------end expense---------------------------------------------------------

//------------------------------------------balance--------------------------------------------------------------
function showBalance(){
    console.log("show balance")
    //why doesnt this work? can we make it work when calling totalExpense() ???
    // const expenseTotal = totalExpense();
    let balance = 0
    //repeat of total epxense call----------------
    getUserData().then((user) => {
        expenses = user.data.attributes.expenses;
        console.log(expenses.length)

        if(expenses.length > 0){
            expenseTotal = expenses.reduce(function(acc,curr){
                acc += parseInt(curr.amount);
                return acc;
            }, 0)
    //end repeat---------------------
            budget = parseInt(user.data.attributes.budget.amount)
            balance = budget - expenseTotal
        }
        balanceAmount.textContent = balance;
        return balance;
    })
    return balance;
    
}
//-----------------------------------------------end balance-----------------------------------------------
