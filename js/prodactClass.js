class Product {
    constructor(_category, _name, _amount) {
        this.category = createCategoriesObj.find(categoris => categoris.name === _category);
        this.category.display = true;
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
        let removeEmojiStr = removeEmoji(this.category.name)
        let stringWithUnderscores = removeEmojiStr.replace(/ /g, '_');
        let parentElement = document.querySelector(`#id_${stringWithUnderscores}`)
        
        if (parentElement.classList.contains('hidden')) {
            parentElement.classList.remove('hidden');
        }
        parentElement.append(div);
    }
    editProduct(amountSpan) {
        let newAmount = prompt(`Enter new amount for "${this.name}":`, this.amount);

        if (newAmount && !isNaN(newAmount) && newAmount > 0) {
            // this.amount = newAmount;
            prod_arr.forEach((item)=>{
                console.log(item.name);
                console.log(item.category);
                console.log(this.name);
                console.log(this.category);
                
                if (item._name === this.name && item.category === this.category) {
                    item.amount = newAmount;
                }
            })
            prod_arr.forEach((item)=>{
                console.log(item);
                
            })
            amountSpan.innerText = newAmount; 
            updateLocalStorage();
            syncWithNetlify();
        } else {
            alert("❌ Please enter a valid amount!");
        }
    }
    removeProduct(div) {
        removeDivAndChangeParentClass(div)
        prod_arr = prod_arr.filter(prod => prod.name !== this.name); 
        updateLocalStorage();
        syncWithNetlify();
    }
}

const removeEmoji = (text)=> {
    return text.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim();
}

const removeDivAndChangeParentClass = (divToRemove)=> {
    let parent = divToRemove.parentElement;
    divToRemove.remove();
    if (parent.children.length === 1) {
        parent.classList.add('hidden');
    }
}


const addProduct = (_category,id_name,id_amount)=>{
    let prodObj = new Product(_category, id_name.value,id_amount.value)
        prod_arr.push(prodObj)
        updateLocalStorage()
        syncWithNetlify();
}
const renderAllProducts = () => {
    const parent = document.querySelector("#id_parent");
    parent.innerHTML = "";
    createCategoriesDisplay()

    prod_arr.forEach(product => {
        let prod = new Product(product.category.name, product.name, product.amount);
        prod.render();
    });
};

