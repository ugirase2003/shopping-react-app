

import { ActionTypes } from "../constants/action-types"

const intialState={
    products:[]
}

export const productReducer=(state=intialState,action)=>{
   switch(action.type){
    case ActionTypes.SET_PRODCUTS:
        return {...state,products:action.payload};
        
    default:
        return state;
        
   }
}


export const productCatReducer=(state=intialState,action)=>{
    switch(action.type){
     case ActionTypes.SET_CAT_PRODUCTS:
         return {...state,products:action.payload};

     case ActionTypes.REMOVE_CAT_PRODUCTS:
            return intialState;   
    default:
         return state;
         
    }
 }
 

export const selectedProducts=(state={},action)=>{
    switch(action.type){
        case ActionTypes.SELECTED_PRODUCT:
            return{...state,...action.payload}

        case ActionTypes.REMOVE_SELECTED_PRODUCTS:
            return{}    
        default:return state;
    }


}



//****user-cart reducer****/

export const setCartProductsReducer=(state=intialState,action)=>{
    
    switch (action.type){
        case ActionTypes.SET_ALL_CART_PRODUCTS:
        return {...state,products:action.payload}

        default:
            return state;
    }
}


export const setMainCatProductsReducer=(state=intialState,action)=>{
    switch(action.type){
        case ActionTypes.SET_MAIN_CAT_PRODUCTS:
            return {...state,products:action.payload}

        case ActionTypes.REMOVE_MAIN_CAT_PRODUCTS:
            return {products:[]}       
        default:return state;    
    }
}


