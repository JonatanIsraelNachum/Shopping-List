class Category{
    constructor(_category){
        this.name = _category;
        this.display = false;
    }
    render(){
        if (this.display) {   
            const category_div = document.createElement("div");
            category_div.className = `${this.name}`
            category_div.textContent = this.name;
            document.querySelector("#id_parent").appendChild(category_div);
        }
    }

}
const categoriesDisplay = [
    "Dairy Products", "Meat, Poultry, and Fish", "Fruits and Vegetables", "Bakery and Breads",
    "Staples and Dry Goods", "Canned and Preserved Foods", "Beverages", "Baking Products",
    "Snacks and Sweets", "Spices and Sauces", "Cereals and Porridges", "Natural and Health Products",
    "Cleaning and Laundry Products", "Hygiene and Toiletries", "Baby Products", "Pet Food",
    "Disposable Products", "Frozen Products"
];
const createCategoriesObj = categoriesDisplay.map(category => {
    return new Category(category)
})
const createCategoriesDisplay = ()=> {
createCategoriesObj.forEach(category => {
    const div = document.createElement("div") 
    div.id = `id_${category.name}`
    console.log(div.id);
    div.textContent = `${div.id}`
    document.querySelector("#id_parent").append(div)
})
}
createCategoriesDisplay()

