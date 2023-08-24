import React, { useState } from 'react'
import { Cart_Context } from '../CartSizeContext'
import { Navbar } from '../../Navbar'
import Cart from '../../../Routes/Cart'
import SelectedProduct from '../../../Routes/SelectedProduct'

const Cart_Size_Provider = (props) => {
  // storing total cart size of user
    const [cartSize,setCartSize]=useState(0)
  return (
    <Cart_Context.Provider value={{cartSize,setCartSize}}>
      {props.children}
   
    </Cart_Context.Provider>
  )
}

export default Cart_Size_Provider