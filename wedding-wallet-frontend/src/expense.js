console.log("expense class file")
class Expense {

    constructor(id, expenseAttributes) {
        this.id = id;
        this.name = expenseAttributes.name;
        this.amount = expenseAttributes.amount;
        this.category = expenseAttributes.category;
        this.notes = expenseAttributes.notes;
        Expense.all.push(this);
      }


}

Expense.all = [];