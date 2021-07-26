const createUserContainer = document.querySelector("#login-or-signup-form").parentElement;
let budgetAmount = document.getElementById("display-budget-amount");
let totalExpenseAmount = document.getElementById("display-expense-amount");
let balanceAmount = document.getElementById("balance-amount");
let getUser
let categories=[]

//DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderedProfile = document.querySelector("#user-rendered-container");
    checkIfLoggedIn();
    categories = getCategories();
    document.querySelector("#add-expense-form").addEventListener("submit", (e) => addExpenseHandler(e));
    document.querySelector("#edit-budget-form").addEventListener("submit", (e) => editBudgetHandler(e));
})

function clearField(element){
    element.value = '';
}

//user data
function getUserData() {
    if (getUser !== undefined) {
        return getUser
    }

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

//user 
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

//budget
function renderBudgetForm(){
    //modal?
    createBudgetForm = document.createElement("div")
    createBudgetForm.id = "create-budget-form-container"
    createBudgetForm.innerHTML = `
        <form id="create-budget-form">
            <h4>Please Enter Your Budget.</h4>
            <input id='budget-amount' type="number" step=.01 name="budget-amount" value="" placeholder="Enter desired budget.">
            <input id= 'budget-submit' type="submit" name="submit" value="Save Budget" class="submit"><br><br>
        </form>`
    renderedProfile.appendChild(createBudgetForm)
    document.querySelector("#create-budget-form").addEventListener("submit", (e) => createBudgetHandler(e))
}

function createBudgetHandler(e){
    e.preventDefault()
    const budgetAmount = e.target.querySelector("#budget-amount").value
    //account for empty submit here
    //   if(budgetAmount === '' || budgetAmount < 0){
    //     this.budgetFeedback.classList.add('showItem');
    //     this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
    //     const self = this;
    //     setTimeout(function(){
    //       self.budgetFeedback.classList.remove('showItem');
    //     }, 3000);
    //   } else {
    //     this.budgetAmount.textContent = value;
    //     this.budgetInput.value = '';
    //     this.showBalance();
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
    displayCategories();
    getExpenses();
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
    //need catch for if submitted without value
    const newAmount = e.target[0].value
    editBudgetFetch(newAmount)
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
            // const display = document.querySelector("#budget-display")
            // display.removeChild(display.firstElementChild)
            budgetAmount.textContent = newBudget;
        })
        showBalance();
    }); 
}

//categories
function getCategories(){
    let categories = []
    listCategories = fetch('http://localhost:3000/api/v1/categories', {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {return json.category.data})
    
    listCategories.then((list) => {
        list.forEach(category => {
            categories.push(category.attributes.name)
        })
        return categories
    })  
    return categories
}

function displayCategories(){
    categoryList = document.querySelector('#expense-list-categories');
    categories.forEach( (category) => {
        let table = document.createElement('table');
        id = category.replace(/[^A-Z0-9]/ig, "")
        table.id = `${id}`
        table.style = "width:100%"
        table.innerHTML = `
            <caption style="text-align:left"><b><i>${category}</b></i></caption>
            <tr>
                <th style="width:35%">Expense Item</th>
                <th style="width:35%">Expense Cost</th>
                <th style="width:20%"></th>
            </tr
        `
        categoryList.appendChild(table);
    });        
}

//potential for dynamically coding categories into form
function addCategories(){
    categories = getCategories()
    const select = document.querySelector("#expense-category")
    categories.forEach (category => {
        let option = document.createElement('option');
        option.text = option.value = category;
        select.add(option, 0); 
    })    
}

//expense
function getExpenses(){
    getUser.then((user) => {
        expenses = user.data.attributes.expenses
        expenses.forEach (expense => {
            category = fetch(`http://localhost:3000/api/v1/categories/${expense.category_id}`, {
                    method: 'GET',
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                })
                .then(response => response.json())
                .then(json => { return json.category.data.attributes.name
                })
            category.then((categoryName) => {
                const id = categoryName.replace(/[^A-Z0-9]/ig, "")
                table = document.querySelector(`#${id}`)
                const expenseRow = document.createElement("tr")
                expenseRow.id = `expense-${expense.id}`
                expenseRow.innerHTML = `
                    <td>${expense.name}</td> 
                    <td>${expense.amount}</td> 
                    <td><button class="edit-expense" data-id="${expense.id}" type="button"onclick="document.getElementById('edit-expense-form').style.display='block'; updateExpense(${expense.id})">Edit</button> 
                    <button class="delete-expense" data-id="${expense.id}" type="button" onclick="return confirm('Are you sure you want to delete?')?deleteExpense(${expense.id}):''">Delete</button></td>    
    `
                table.appendChild(expenseRow);
            })
        })
    })
}

function addExpenseHandler(e){
    e.preventDefault()
    const expenseCategory = e.target[0].value
    const expenseName = e.target[1].value 
    const expenseAmount = e.target[2].value
    const expenseNotes = e.target.childNodes[12].value

    createExpenseFetch(expenseCategory, expenseName, expenseAmount, expenseNotes)
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
        // debugger
        expenseId = json.data.id
        expenseCategory = json.data.attributes.category.name;
        expenseName = json.data.attributes.name;
        expenseAmount = json.data.attributes.amount;
        expenseNotes = json.data.attributes.notes;
        displayExpense(expenseCategory, expenseName, expenseAmount, expenseNotes, expenseId)
    });
}

function displayExpense(category, name, amount, notes, id){
    categoryId = category.replace(/[^A-Z0-9]/ig, "")
    table = document.querySelector(`#${categoryId}`)
    const expenseRow = document.createElement("tr")
    expenseRow.id = `expense-${id}`
    expenseRow.innerHTML = `
        <td>${name}</td> 
        <td>${amount}</td> 
        <td><button class="edit-expense" data-id="${id}" type="button" onclick="document.getElementById('edit-expense-form').style.display='block'; updateExpense(${id})">Edit</button> 
        <button class="delete-expense" data-id="${id}" type="button" onclick="return confirm('Are you sure you want to delete?')?deleteExpense(${id}):''">Delete</button></td>    
    `
    table.appendChild(expenseRow);
    totalExpense();
    showBalance();
}

function totalExpense(){
    let total = 0;
    getUserData().then((user) => {
        expenses = user.data.attributes.expenses;
        if(expenses.length >0){
            total = expenses.reduce(function(acc,curr){
                acc += parseInt(curr.amount);
                return acc;
            }, 0)
        }
        totalExpenseAmount.textContent = total;
        return total;
    })
}

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
    totalExpense();
    showBalance();
}

//balance
function showBalance(){
    //why doesnt this work? can we make it work when calling totalExpense() ???
    // const expenseTotal = totalExpense();
    getUserData().then((user) => {
        expenses = user.data.attributes.expenses;
        if(expenses.length >0){
            expenseTotal = expenses.reduce(function(acc,curr){
                acc += parseInt(curr.amount);
                return acc;
            }, 0)
        }
        budget = parseInt(user.data.attributes.budget.amount)
        const total = budget - expenseTotal
        balanceAmount.textContent = total;
        return total;
    })
    // if want to add balance color styling later on
    // if(total < 0){
    //   this.balance.classList.remove('showGreen', 'showBlack');
    //   this.balance.classList.add('showRed');
    // } else if(total > 0){
    //   this.balance.classList.remove('showRed', 'showBlack');
    //   this.balance.classList.add('showGreen');
    // } else if(total === 0){
    //   this.balance.classList.remove('showRed', 'showGreen');
    //   this.balance.classList.add('showBlack');
    // }
  }