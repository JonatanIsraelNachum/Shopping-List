let prod_arr = []


const updateLocalStorage = () => {
    localStorage.setItem("shoppingList", JSON.stringify(prod_arr));
};

const loadProducts = () => {
    let data = localStorage.getItem("shoppingList");
    if (data) {
        prod_arr = JSON.parse(data).map(item => new Product("#id_parent", item.name, item.amount));
    } else {
        prod_arr = [];
    }
    
    document.querySelector("#id_parent").innerHTML = "";
    prod_arr.forEach(prod => prod.render());
};

const syncWithNetlify = async () => {
    await fetch("/.netlify/functions/updateList", {
        method: "POST",
        body: JSON.stringify({ list: prod_arr }),
        headers: { "Content-Type": "application/json" }
    });
};

const loadFromNetlify = async () => {
    const res = await fetch("/.netlify/functions/updateList");
    const data = await res.json();

    if (data && data.list) {
        prod_arr = data.list;
        renderAllProducts();
    }
};

const loadFromLocalStorage = () => {
    const list = localStorage.getItem('shoppingList');
    if (list) {
        prod_arr = JSON.parse(list);
        renderAllProducts();
    }
};

// קרא מהשרת כשנטען הדף
window.onload = async () => {
    alert("hellow")
    await loadFromNetlify();
    loadFromLocalStorage();
};


// window.onload = loadProducts;

