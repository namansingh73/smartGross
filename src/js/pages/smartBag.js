import 'regenerator-runtime/runtime';
import axios from 'axios';

const addAllToCart = document.getElementById("addWholeBag");
if(addAllToCart)
{
    addAllToCart.addEventListener("click",async function(e){
        console.log("Hi");
        e.preventDefault();
        const res = await axios({
            method:'POST',
            url:'/addAllInCart',
            data:{
            }
        });
        location.assign("/cart");
    });
}

// const addToCart = document.getElementsByClassName("product-inner-card__main");
// Array.from(addToCart).forEach(form=>{
//     form.addEventListener("submit",async function(e){
//         e.preventDefault();
//         const idVar = this.getElementsByClassName("incDecCart")[0].value;
//         const quanVar = this.getElementsByClassName("productQuantity")[0].value*1;
//         const btn = this.getElementsByClassName("addToCartBtn")[0];
//         btn.setAttribute("disabled","disabled");
//         const res = await axios({
//             method:'POST',
//             url:'/cartSmart',
//             data:{
//                 idVar,
//                 quanVar
//             }
//         });
//         btn.getElementsByClassName("btn--load__content")[0].textContent = "Modify in Cart";
//         setTimeout(()=>{
//             btn.removeAttribute("disabled");
//         },1000);
//     });
// });