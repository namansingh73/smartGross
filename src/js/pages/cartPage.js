import 'regenerator-runtime/runtime';
import axios from 'axios';

const discardChanges = document.getElementById("discardChange");
if(discardChanges)
{
    discardChanges.addEventListener("click",function(e){
        e.preventDefault();
        location.reload();
    });
}

const clearTheCart = document.getElementById("clearCart");
if(clearTheCart)
{
    clearTheCart.addEventListener("click",async function(e){
        e.preventDefault();
        const res = await axios({
            method:'POST',
            url:'/clearCart',
            data:{
            }
        });
        //console.log(res);
        location.reload();
    });
}

//remaining
const saveTheCart = document.getElementById("saveChanges");
if(saveTheCart)
{
    saveTheCart.addEventListener("click",async function(e){
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
        console.log(data);
        const res = await axios({
            method:'POST',
            url:'/cartSaveChanges',
            data:data
        });
        location.reload();
    });
}






const updateButton = document.getElementsByClassName("cart__quantity-btn");
const updateAmount = document.getElementsByClassName("cart__quantity-input");
const totalAmount = document.getElementsByClassName("totalAmount");
const removeEle = document.getElementsByClassName("removeEle");

const updateHelper = function(){
    const quantityAll = document.getElementsByClassName("cart__quantity");
    //console.log("HI");
    let total = 0;
    Array.from(quantityAll).forEach((ele)=>{
        const quantity = ele.getElementsByClassName("cart__quantity-input")[0].value;
        const price = ele.getElementsByClassName("inputPrice")[0].value;
        total += quantity*price;
    });
    Array.from(totalAmount).forEach(ele=>{
        ele.textContent = total;
    });
};

Array.from(removeEle).forEach(ele=>{
    ele.addEventListener("click",function(){
        this.closest(".inner-card").remove();
        updateHelper();
    });
});


//manual type quantity
Array.from(updateAmount).forEach(ele=>{
    ele.addEventListener("change",updateHelper);
});

//button change
Array.from(updateButton).forEach(ele=>{
    ele.addEventListener("click",updateHelper);
});
