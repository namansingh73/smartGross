import 'regenerator-runtime/runtime';
import axios from 'axios';

const addToCart = document.getElementsByClassName("product-desc");
Array.from(addToCart).forEach(form=>{
    form.addEventListener("submit",async function(e){
        e.preventDefault();
        const pid = this.getElementsByClassName("inputId")[0].value;
        const name = this.getElementsByClassName("inputName")[0].value;
        const brand = this.getElementsByClassName("inputBrand")[0].value;
        const price = this.getElementsByClassName("inputPrice")[0].value*1;
        const quantity = this.getElementsByClassName("cart__quantity-input")[0].value*1;
        const btn = this.getElementsByClassName("addToCartBtn")[0];
        btn.setAttribute("disabled","disabled");
        const res = await axios({
            method:'POST',
            url:'/cart',
            data:{
                pid,
                name,
                price,
                brand,
                quantity
            }
        });
        btn.getElementsByClassName("btn--load__content")[0].textContent = "Modify in Cart";
        setTimeout(()=>{
            btn.removeAttribute("disabled");
        },1000);
    });
});