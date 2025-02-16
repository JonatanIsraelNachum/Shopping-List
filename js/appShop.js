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
    try {
        await fetch("/.netlify/functions/updateList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list: prod_arr }),
        });
    } catch (err) {
        console.error("Sync error:", err);
    }
};

const loadFromNetlify = async () => {
    try {
        const res = await fetch("/.netlify/functions/updateList");
        const data = await res.json();
        if (data && data.list) {
            prod_arr = data.list;
            renderAllProducts();
        }
    } catch (error) {
        console.error("Failed to load data:", error);
    }
};


const loadFromLocalStorage = () => {
    const list = localStorage.getItem('shoppingList');
    if (list) {
        prod_arr = JSON.parse(list);
        renderAllProducts();
    }
};

window.onload = async () => {
    await loadFromNetlify();
    
};


