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
    "Dairy_Products", "Meat_Poultry_and_Fish", "Fruits_and_Vegetables", "Bakery_and_Breads",
    "Staples_and_Dry_Goods", "Canned", "Beverages", "Baking_Products",
    "Snacks_and_Sweets", "Spices_and_Sauces", "Cereals_and_Porridges", "Natural_and_Health_Products",
    "Cleaning_and_Laundry_Products", "Hygiene_and_Toiletries", "Baby_Products", "Pet_Food",
    "Disposable_Products", "Frozen_Products", "Pistachios_and_Nuts"
];
const categoriesDisplayWithSpas = 
[
    "Dairy Products 🥛",
    "Meat Poultry and Fish 🍗🐟",
    "Fruits and Vegetables 🍎🥦",
    "Bakery and Breads 🍞🥐",
    "Staples and Dry Goods 🍚",
    "Canned 🥫",
    "Beverages 🥤☕",
    "Baking Products 🎂🍰",
    "Snacks and Sweets 🍪🍫",
    "Spices and Sauces 🌶️🥫",
    "Cereals and Porridges 🥣",
    "Natural and Health Products 🍃",
    "Cleaning and Laundry Products 🧼🧴",
    "Hygiene and Toiletries 🚿🪥",
    "Baby Products 🍼👶",
    "Pet Food 🐶🐱",
    "Disposable Products 🛍️",
    "Frozen Products ❄️🍦",
    "Pistachios and Nuts 🥜"
  ]
  

;

const createCategoriesObj = categoriesDisplayWithSpas.map(category => {
    return new Category(category)
})
const createCategoriesDisplay = ()=> {
categoriesDisplay.forEach((category,index) => {
    const div = document.createElement("div") 
    div.id = `id_${category}`
    div.className = "hidden fw-bold"
    div.innerHTML = `<h2 class="text-primary">${categoriesDisplayWithSpas[index]}</h2>`
    document.querySelector("#id_parent").append(div)
})
}
createCategoriesDisplay()

