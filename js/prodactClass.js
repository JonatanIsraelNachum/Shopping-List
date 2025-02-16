class Product {
    constructor(_parent,_name,_amount){
        this.parent = _parent
        this.name = _name
        this.amount = _amount
    }
    render(){
        let div = document.createElement("div")
        div.className = "col-md-8 border my-2"
        div.innerHTML= `${this.name} - ${this.amount} `
        let button = document.createElement("button")
        button.id = `btn_${this.name}`
        button.innerHTML = "edit"
        div.append(button)
        document.querySelector(this.parent).append(div)
    }
}

const addProduct = (id_name,id_amount)=>{
    let prodObj = new Product("#id_parent", id_name.value,id_amount.value)
        prod_arr.push(prodObj)
        localJS()
}