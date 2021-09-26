import 'regenerator-runtime/runtime';
import axios from 'axios';

const addAllToCart = document.getElementById("addWholeBag");
if(addAllToCart)
{
    addAllToCart.addEventListener("click",async function(e){
        e.preventDefault();
        const data = [];
        Array.from(document.getElementsByClassName('product-desc')).forEach(ele => {
            const pid = ele.getElementsByClassName("inputId")[0].value;
            const name = ele.getElementsByClassName("inputName")[0].value;
            const brand = ele.getElementsByClassName("inputBrand")[0].value;
            const price = ele.getElementsByClassName("inputPrice")[0].value*1;
            const quantity = ele.getElementsByClassName("cart__quantity-input")[0].value*1;
            data.push({ pid, name, brand, price, quantity });
        });
        //console.log(data);
        const res = await axios({
            method:'POST',
            url:'/addAllInCart',
            data:data
        });
        location.assign("/cart");
    });
}