class Category {

    constructor(category, categoryAttributes) {
        this.id = category.id;
        this.name = categoryAttributes.name;
        Category.all.push(this);
    }

    displayCategory(){
        return `
        <div class="accordian-item">
            <h2 class="accordion-header" id="flush-heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${this.id}" aria-expanded="false" aria-controls="flush-collapse">
                ${this.name}
                </button>
            </h2>
            <div id="flush-collapse-${this.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading">
                <div class="accordion-body">
                    <table id="category-${this.id}" class="table table-hover" style="width:100%">
                        <thead>
                            <tr class="table table-danger table-sm head-row">
                                <th class="fw-light" style="width:35%">Expense Item</th>
                                <th class="fw-light" style="width:35%">Expense Cost</th>
                                <th class="fw-light" style="width:20%"></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>`
        
    }

    renderDropdownOption(){
        return `<option value="${this.id}">${this.name}</option>`
    }
}

Category.all = [];