import { ActionTypes } from "../constants/action-types"
export const setProducts=(products)=>{
return{
    type:ActionTypes.SET_PRODCUTS,
    payload:products,
}
}

export const selectedProducts=(product)=>{
    return{
        type:ActionTypes.SELECTED_PRODUCT,
        payload:product,
    }
}
export const RemoveSelectedProducts=()=>{
    return{
        type:ActionTypes.REMOVE_SELECTED_PRODUCTS,
        
    }

}
export const RemoveCatProducts=()=>{
    return{
        type:ActionTypes.REMOVE_CAT_PRODUCTS,
        
    }

}
export const setCatProducts=(products)=>{
    return{
        type:ActionTypes.SET_CAT_PRODUCTS,
        payload:products
        
    }
}


export const setAllCartProducts=(cart_prod_list)=>{
    return {
        type:ActionTypes.SET_ALL_CART_PRODUCTS,
        payload:cart_prod_list
    }
}

export const setMainCatProducts=(main_cat_products)=>{
    return{
        type:ActionTypes.SET_MAIN_CAT_PRODUCTS,
        payload:main_cat_products
    }
}


export const removeMainCatProducts=()=>{
    return{
        type:ActionTypes.REMOVE_MAIN_CAT_PRODUCTS,
       
    }
}
