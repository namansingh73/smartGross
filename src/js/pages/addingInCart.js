import 'regenerator-runtime/runtime';
import axios from 'axios';

const addToCart = document.getElementsByClassName("product-desc");
Array.from(addToCart).forEach(form=>{
    form.addEventListener("submit",async function(e){
        e.preventDefault();
        const idVar = this.getElementsByClassName("inputClass")[0].value;
        const quanVar = this.getElementsByClassName("cart__quantity-input")[0].value*1;
        const btn = this.getElementsByClassName("addToCartBtn")[0];
        btn.setAttribute("disabled","disabled");
        const res = await axios({
            method:'POST',
            url:'/cart',
            data:{
                idVar,
                quanVar
            }
        });
        btn.getElementsByClassName("btn--load__content")[0].textContent = "Modify in Cart";
        setTimeout(()=>{
            btn.removeAttribute("disabled");
        },1000);
    });
});