let prod_arr = []


const updateLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(prod_arr));
};

const loadProducts = () => {
    let data = localStorage.getItem("products");
    if (data) {
        prod_arr = JSON.parse(data).map(item => new Product("#id_parent", item.name, item.amount));
    } else {
        prod_arr = [];
    }
    
    document.querySelector("#id_parent").innerHTML = "";
    prod_arr.forEach(prod => prod.render());
};

window.onload = loadProducts;

