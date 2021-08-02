class Expense {

    constructor(id, category, expense) {
        this.id = parseInt(id);
        this.name = expense.name;
        this.amount = expense.amount;
        this.category = category;
        this.notes = expense.notes;
        Expense.all.push(this);
      }

    renderExpense(){ 
        return `
            <tr id="expense-${this.id}">
                <td>${this.name}</td>
                <td id="expense-${this.id}-amount">${this.amount}</td>
                <td style="text-align: right;">
                    <button class="btn btn-outline-secondary edit-expense" id="${this.id}" data-bs-toggle="modal" data-bs-target="#edit-expense-form">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                    </button> 
                    <button class="btn btn-outline-secondary delete-expense" data-id="${this.id}" type="button" onclick="return confirm('Are you sure you want to delete?')?deleteExpense(${this.id}):''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                    </button>
                </td> 
            </tr>`
    }

    renderEditExpense(){
        return `
            <div class="modal-header">
                <h5 class="modal-title" id="editExpenseFormTitle">${this.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
                <span class="input-group-text" style="display:inline-block" class="form-control">$</span>
                <input id= 'expense-amount' type="number" min="1" name="expense-amount" style="display:inline-block" value="${this.amount}" placeholder="Item amount" required><br><br>
                <textarea rows="4" cols="50" id="edit-expense-notes" name="edit-expense-notes" class="form-control" form="add-expense-form" value="${this.notes}">${this.notes}</textarea><br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input id="${this.id}" type="submit" value="Save Changes" class="submit btn btn-danger">
            </div>`
    }

    static findById(id) {
        return this.all.find(expense => expense.id === id);
    }

}

Expense.all = [];