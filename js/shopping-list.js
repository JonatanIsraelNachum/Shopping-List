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
    return prod_arr;
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
        loadFromLocalStorage();
        // try {
        //     await fetch("https://shoppingli.netlify.app/.netlify/functions/updateList", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ list: [] }), // שולח רשימה ריקה לשרת
        //     });
        //     console.log("Netlify data cleared.");
        // } catch (err) {
        //     console.error("Clear error:", err);
        // }
        try {
            const res = await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList");
            const data = await res.json();
            
            if (data && data.list) {
                const serverData = data.list;
                const localData = loadProducts;

                // const localData = prod_arr;
                const mergedData = [...localData];
                serverData.forEach((item)=>{
                    console.log(item);
                    console.log(item.name);
                })
                console.log("merge");
                
                mergedData.forEach((item)=>{
                    console.log(item);
                    console.log(item.name);
                })


                serverData.forEach(serverItem => {
                    if (!mergedData.some(localItem => localItem.name === serverItem.name)) {
                        mergedData.push(serverItem);
                    }
                });
                // prod_arr = serverData;
                prod_arr = mergedData;
                updateLocalStorage();
                renderAllProducts();
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
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



