import { listProducts } from './services/product.js';
import { getCode } from './services/promotion.js';

var id = function( id ) { return document.getElementById( id ); };
let products;
let discount = 0, final_amount = 0;

function draw_invoice(){
    let html= '';

    final_amount = 0;
    
    products.forEach(function(element,index) {
        if(element.amount > 0){
            html += '<tr><td style="width:90%">'+element.product_name+'</td><td >'+element.product_price+'</td><td >'+element.amount+'</td></tr>' 
            final_amount += (parseFloat(element.product_price) * parseFloat(element.amount))
        }
    });
    id('draw_invoice').style.display = 'block'
    id('draw_body_invoice').innerHTML = html

    update_final_amount();
}

function update_final_amount(){
    id('final_amount').innerHTML = final_amount - final_amount*discount/100
}
function addProduct(e){
    let prod_id = this.getAttribute('rel-prod')
    let badge = id("badge_"+prod_id)

    //write my object to update the amount
    var foundIndex = products.findIndex(x =>  x.product_id == prod_id)
    products[foundIndex].amount =  products[foundIndex].amount + 1;

    //update the interface
    if (badge.classList.contains("hidden")) {
        badge.classList.remove("hidden");
    }

    badge.innerHTML =  products[foundIndex].amount

    draw_invoice()
    
}
function getPromotion(){
    let code = this.value
    getCode(code).then( res =>{
        
        if(res.length == 0){
            discount = 0;
            id('promo--container').style.backgroundColor = '#f4d4d6'
            id('promo_description').innerHTML ='Invalid code'
        }else{
            let promotion = res[0]
            discount = promotion.discount
            id('promo--container').style.backgroundColor = '#e5f4d5'
            id('promo_description').innerHTML = promotion.promotion_description +' '+promotion.discount+'%'
        }
        update_final_amount();
    },err =>{
        console.log(err)
    })
}
function init(){
    id('draw_body_invoice').innerHTML = ''
    id('draw_invoice').style.display = 'none'
    listProducts().then( res =>{
        let html= '';

        products = res;
        products.forEach(function(element,index) {
            products[index].amount = 0
            html += '<div  rel-prod="'+element.product_id+'" class="stock--product-card"><span id="badge_'+element.product_id+'" class="stock--badge hidden">0</span><p class="product_emoji">'+element.product_emoji+'</p><p class="product_name">'+element.product_name+'</p><p class="product_price">'+element.product_price+'</p></div>'
        });    
        id('stock').innerHTML = html

        //adding events for our items
        let html_prod = document.getElementsByClassName("stock--product-card"); 
        for (var i = 0; i < html_prod.length; i++) {
            html_prod[i].addEventListener('click', addProduct, false);
        }

    },error =>{
        console.log(error)
    });
}

document.getElementById("btn--clear-all").addEventListener('click', init, false);

document.getElementById("promo_code").addEventListener('blur', getPromotion, false);

init()





