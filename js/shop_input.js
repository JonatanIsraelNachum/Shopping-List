let id_form = document.querySelector("#id_form")
let reset_btn = document.querySelector("#reset_btn")
let id_name = document.querySelector("#id_name")
let id_amount = document.querySelector("#id_amount")


const declarEvents = ()=>{
    id_form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addProduct(id_name,id_amount)
        clearForm()
        createList()
        localJS()
    })
}


const clearForm = ()=>{
    id_name.value = "" 
    id_amount.value = null 
}


createList()
declarEvents()