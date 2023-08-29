import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import SubCategoryWiseView from './Routes/SubCategoryWiseView'
import ItemsList from './Routes/ItemsList'
import SelectedProduct from './Routes/SelectedProduct'
import Login from './Routes/Login'
import Register from './Routes/Register'
import Cart from './Routes/Cart'
import Context_Wrapper from './components/Context/Provider/Context_Wrapper'
import Cart_Size_Provider from './components/Context/Provider/Cart_Size_Provider'


import Edit_Profile from './Routes/Edit_Profile'

import Footer from './components/Footer'
import Main_Category from './Routes/Main_Category'



const App = () => {

  return (
   
  

<>
<Context_Wrapper>
<Cart_Size_Provider>
  <Navbar/>
<Routes>
   <Route exact path='/home' element={<ItemsList/>}/>
    <Route exact path='/cart' element={<Cart/> }/>
    <Route exact path='/productdetail/:productid' element={<SelectedProduct/>}/>
    <Route exact path='/categorywise/:category/:subCat' element={<SubCategoryWiseView/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/user/editProfile' element={<Edit_Profile/>}/>
    <Route exact path='/categorywise/:category' element={<Main_Category/>}/>
    <Route/>
  </Routes>
</Cart_Size_Provider>
<Footer/>
</Context_Wrapper>

</>

  )
}

export default App








