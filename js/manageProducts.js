let id_form = document.querySelector("#id_form")
let reset_btn = document.querySelector("#reset_btn")
let id_name = document.querySelector("#id_name")
let id_amount = document.querySelector("#id_amount")
const selectElement = document.querySelector("#id_categories_select");
const categories = [
    "Dairy Products", "Meat, Poultry, and Fish", "Fruits and Vegetables", "Bakery and Breads",
    "Staples and Dry Goods", "Canned and Preserved Foods", "Beverages", "Baking Products",
    "Snacks and Sweets", "Spices and Sauces", "Cereals and Porridges", "Natural and Health Products",
    "Cleaning and Laundry Products", "Hygiene and Toiletries", "Baby Products", "Pet Food",
    "Disposable Products", "Frozen Products"
];
const createCategoriesSelect = ()=>{
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        selectElement.appendChild(option);
    });
}



const clearForm = ()=>{
    id_name.value = "" 
    id_amount.value = 1 
}
id_form.addEventListener("submit", (event) => {
    event.preventDefault();
    addProduct(id_name,id_amount);
    clearForm()
    loadProducts()
});

createCategoriesSelect()
loadProducts()
