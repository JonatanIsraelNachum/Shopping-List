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
        await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list: prod_arr }),
        });
    } catch (err) {
        console.error("Sync error:", err);
    }
};

// const loadFromNetlify = async () => {
//     try {
//         const res = await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList");
//         const data = await res.json();

//         if (data && data.list && data.list.length > 0) {
//             serverData.forEach((item)=>{
//                                     console.log(item);
//                                     console.log(item.name);
//                                 })


//             console.log(data.length);
//             prod_arr = JSON.parse(data.list).map(item => new Product(item.category.name, item.name, item.amount));
//             updateLocalStorage();
//         } else {
//             console.warn("Server returned empty list, loading from localStorage.");
//             loadFromLocalStorage();
//         }
//     } catch (error) {
//         console.error("Fetch error:", error.message, "Loading from localStorage instead.");
//         loadFromLocalStorage();
//     }
//     renderAllProducts();
// };
const loadFromNetlify = async () => {
    try {
        loadProducts()
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
            
            if (data && data.list && data.list.length > 0) {
                const serverData = data.list;
                const localData = prod_arr;
                const mergedData = [...serverData];
                serverData.forEach((item)=>{
                    console.log(item);
                    console.log(item.name);
                })
                console.log("merge");
                
                mergedData.forEach((item)=>{
                    console.log(item);
                    console.log(item.name);
                })

                localData.forEach(localItem => {
                    if (!mergedData.some(serverItem => localItem.name === serverItem.name)) {
                        mergedData.push(localItem);
                    }
                });
                prod_arr = mergedData;
                updateLocalStorage();
                loadProducts();
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
        prod_arr = JSON.parse(list).map(item => new Product(item.category.name, item.name, item.amount));
        renderAllProducts();
    }
};
window.onload = async () => {
    await loadFromNetlify();
};



