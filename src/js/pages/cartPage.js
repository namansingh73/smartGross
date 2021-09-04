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
        const quantityAll = document.getElementsByClassName("cart__quantity");
        const pairsData = Array.from(quantityAll).map((ele)=>{
            const quantity = ele.getElementsByClassName("cart__quantity-input")[0].value;
            const id = ele.getElementsByClassName("incDecCart")[0].value;
            return {id,quantity};
        });
        //console.log(pairsData);
        const res = await axios({
            method:'POST',
            url:'/cartSaveChanges',
            data:{
                pairsData
            }
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
    let total = 0;
    Array.from(quantityAll).forEach((ele)=>{
        const quantity = ele.getElementsByClassName("cart__quantity-input")[0].value;
        const price = ele.getElementsByClassName("priceCart")[0].value;
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
