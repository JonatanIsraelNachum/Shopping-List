let prod_arr = []


const createList = ()=>{
    document.querySelector("#id_parent").innerHTML = ""
    if (localStorage.getItem("products")) {
        const listLocal = JSON.parse(localStorage.getItem("products"))
        listLocal.forEach((item)=>{
        let prod = new Product("#id_parent", item.name,item.amount)
        prod.render()  
    })  
    }
}

const localJS = ()=>{
    const JSproducts = JSON.stringify(prod_arr)
    localStorage.setItem("products",JSproducts)   
}


