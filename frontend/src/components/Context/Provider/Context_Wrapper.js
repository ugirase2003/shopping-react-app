import React, { useState } from 'react'
import { UserContext } from '../UserContext'



// wrapper for usercontext
const Context_Wrapper = (props) => {
    const [user,setUser]=useState(null)
  return (
    <UserContext.Provider value={{user,setUser}}>
        {props.children}
    </UserContext.Provider> 
  )
}

export default Context_Wrapper

