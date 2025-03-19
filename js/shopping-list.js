let prod_arr = []

const updateLocalStorage = () => {
    localStorage.setItem("shoppingList", JSON.stringify(prod_arr));
};
const syncWithNetlify = async () => {
    try {
        await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList", {
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
        const res = await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        if (data && data.list && data.list.length > 0) {
            const serverData = data.list;
            prod_arr = serverData;
            updateLocalStorage();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    removeLoadingImg()
    loadFromLocalStorage()
};
const loadFromLocalStorage = () => {
    const list = localStorage.getItem('shoppingList');
    if (list) {
        prod_arr = JSON.parse(list).map(item => new Product(item.category.name, item.name, item.amount));
        renderAllProducts();
    }
};
const removeLoadingImg = () => {
    document.querySelector(".loadingImg").classList.add("hidden")
}
window.onload = async () => {
    await loadFromNetlify();
};



