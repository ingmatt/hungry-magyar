
import { menuArray } from './data.js'

const menuList = document.getElementById("menu-list")
const orderList = document.getElementById("order-list")

let order = []

const orderOverlay = document.getElementById("order-overlay")

function render() {
    let html = ""
    menuArray.forEach(item => html+= `
    
    <div class="container">
        <div class="emoji-item-container" >
            <div class="emoji-container">
                <p class="emoji">${item.emoji}</p>
            </div>
            <div class="item-container">
                <h3 class="bold-text">${item.name}</h3>
                <p class="grey-text">${item.ingredients.join(", ")}</p>
                <p class="bold-text">£${item.price}</p>
            </div>
        </div>
        <div class="btn-container">
            <button class="btn" data-id="${item.id}">+</button>
        </div>
    </div>
    `)
    
    menuList.innerHTML = html
    
    
    let orderHtml = ""
    
    if (order.length > 0) {
        orderHtml += `<h4>Your Order</h4>`
        order.map(item => orderHtml+= `
        <div class="order-container">
            <div class="ordered-item">
                <p class="bold-text">${item.name}</p>
                <p class="remove grey-text" data-remove="${item.id}" >remove</p>
            </div>
            <div class="order-price">
                <p class="bold-text">£${item.price}</p>
            </div>
        </div>
        `)
        orderHtml += `
        <div class="total-container">
            <p class="bold-text">Total Price</p>
            <p class="bold-text" >£${order.reduce((sum, item) => sum + item.price, 0)}</p>
        </div>
        <div class="complete-order-btn-container">
            <button class="complete-order-btn" data-pay="complete-order" >Complete Order</button>
        </div>`
    }
    
    orderList.innerHTML = orderHtml
}


document.addEventListener("click", function(e){
    const menuItemId = e.target.dataset.id
    if(menuItemId) {
        order.push(menuArray[menuItemId])
        console.log(order)
        render()
    }
    
    const orderItemId = Number(e.target.dataset.remove)
    if(orderItemId) {
        order = order.filter(item => item.id !== orderItemId)
        console.log(order)
        render()
    }
    
    const orderAction = e.target.dataset.pay
    if(orderAction) {
        console.log("Processing order completion...")
        orderOverlay.style.display = 'block'
    }
    
    const orderComplete = e.target.dataset.complete
    if(orderComplete !== undefined){
        
        const fName = document.getElementById("fname").value.trim()
        const card = document.getElementById("card").value.trim()
        const cvc = document.getElementById("cvc").value.trim()
        
        
        if (!fName || !card || !cvc) {
            alert("Please fill in all the details")
            return
        }
        
        
        
        orderOverlay.style.display = 'none'
        orderList.innerHTML = `
        <div class="complete-order">
            <p>Thank you ${fName}, your order is on its way!</p>
        </div>`
    }
    
    
})



render()