class Category {

    constructor(category, categoryAttributes) {
        this.id = category.id;
        this.name = categoryAttributes.name;
        Category.all.push(this);
    }


}

Category.all = [];