import { combineReducers } from "@reduxjs/toolkit";
import { CproductReducer, productCatReducer, productReducer,selectedProducts, setCartProductsReducer, setMainCatProductsReducer } from "./productReducer";

export const reducers=combineReducers({
    allProducts:productReducer,
    product:selectedProducts,
    catProducts:productCatReducer,
    setAllCartProduct:setCartProductsReducer,
    setMainCatProducts:setMainCatProductsReducer
 

})
