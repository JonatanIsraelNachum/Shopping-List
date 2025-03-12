let prod_arr = []


const updateLocalStorage = () => {
    localStorage.setItem("shoppingList", JSON.stringify(prod_arr));
};
const loadProducts = () => {
    let data = localStorage.getItem("shoppingList");
    if (data) {
        prod_arr = JSON.parse(data).map(item => new Product(item.category.name, item.name, item.amount));
        renderAllProducts()
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
        // loadProducts()



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
            try {
                const res = await fetch("https://listofshopping.netlify.app/.netlify/functions/updateList");
                
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();
                console.log("Data received:", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            
            console.log(data);
            console.log(data.list);
            console.log(data.list.length);
            
            if (data && data.list && data.list.length > 0) {
                console.log(data.list.length);
                
                const serverData = data.list;
                const localData = localStorage.getItem('shoppingList');
                const mergedData = [...serverData];

                serverData.forEach((item)=>{
                    console.log("server");
                    console.log(item);
                    console.log(item.name);
                })
                
                mergedData.forEach((item)=>{
                    console.log("merge");
                    console.log(item);
                    console.log(item.name);
                })

                // localData.forEach(localItem => {
                //     if (!mergedData.some(serverItem => localItem.name === serverItem.name)) {
                //         mergedData.push(localItem);
                //     }
                // });


                prod_arr = serverData;
                updateLocalStorage();
                loadProducts()
                // renderAllProducts();
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



