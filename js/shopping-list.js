let prod_arr = []


const updateLocalStorage = () => {
    localStorage.setItem("shoppingList", JSON.stringify(prod_arr));
};
const loadProducts = () => {
    let data = localStorage.getItem("shoppingList");
    if (data) {
        prod_arr = JSON.parse(data).map(item => new Product(item.category.name, item.name, item.amount));
        renderAllProducts()
    } else {
        prod_arr = [];
    }
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
        loadFromLocalStorage();
        try {
            const res = await fetch("/.netlify/functions/updateList");
            // const res = await fetch("https://shoppingli.netlify.app/.netlify/functions/updateList");
            const data = await res.json();
            if (data && data.list) {
                const serverData = data.list;
                const localData = prod_arr;
                const mergedData = [...localData];
                serverData.forEach(serverItem => {
                    if (!mergedData.some(localItem => localItem.name === serverItem.name)) {
                        mergedData.push(serverItem);
                    }
                });
                
                prod_arr = mergedData;
                updateLocalStorage();
                renderAllProducts();
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
        // const res = await fetch("/.netlify/functions/updateList");
        // const data = await res.json();
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



