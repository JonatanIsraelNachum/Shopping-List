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

const syncWithNetlify = async () => {
    const response = await fetch("/.netlify/functions/updateList", {
        method: "POST",
        body: JSON.stringify({ list: prod_arr }),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        console.error("Error syncing with Netlify:", response.status);
    }
};

const loadFromNetlify = async () => {
    const res = await fetch("/.netlify/functions/getList");
    const data = await res.json();

    if (data && data.list) {
        prod_arr = data.list;
        renderAllProducts();
    }
};

// קרא מהשרת כשנטען הדף
window.onload = async () => {
    await loadFromNetlify();
    loadFromLocalStorage();
};


window.onload = loadProducts;

