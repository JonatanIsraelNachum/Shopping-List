class Product {
    constructor(_parent, _name, _amount) {
        this.parent = _parent;
        this.name = _name;
        this.amount = _amount;
    }

    render() {
        let div = document.createElement("div");
        div.className = "d-flex justify-content-between align-items-center border rounded p-2 my-2 bg-light shadow-sm";
        
        let nameSpan = document.createElement("span");
        nameSpan.className = "fw-bold";
        nameSpan.innerText = this.name;

        let amountSpan = document.createElement("span");
        amountSpan.className = "text-muted";
        amountSpan.innerText = this.amount;

        let button_edit = document.createElement("button");
        button_edit.className = "btn btn-warning btn-sm";
        button_edit.innerHTML = "✏️ Edit";
        button_edit.addEventListener("click", () => this.editProduct(amountSpan));
        
        let button_remove = document.createElement("button");
        button_remove.className = "btn btn-warning btn-sm";
        button_remove.innerHTML = "🗑 Remove";
        button_remove.addEventListener("click", () => this.removeProduct(div));

        div.append(nameSpan, document.createTextNode(" - "), amountSpan, button_edit,button_remove);
        document.querySelector(this.parent).append(div);
    }

    editProduct(amountSpan) {
        let newAmount = prompt(`Enter new amount for "${this.name}":`, this.amount);

        if (newAmount && !isNaN(newAmount) && newAmount > 0) {
            this.amount = newAmount;
            amountSpan.innerText = this.amount; 
            updateLocalStorage();
        } else {
            alert("❌ Please enter a valid amount!");
        }
    }
    removeProduct(div) {
        div.remove();
        prod_arr = prod_arr.filter(prod => prod.name !== this.name); 
        updateLocalStorage();
    }
}

const addProduct = (id_name,id_amount)=>{
    let prodObj = new Product("#id_parent", id_name.value,id_amount.value)
        prod_arr.push(prodObj)
        updateLocalStorage()
}

