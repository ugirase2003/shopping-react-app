import React from 'react'
import './../../App.css'


const Loader = () => {
  return (
   <div className='w-full flex justify-center flex-col items-center h-full    inset-0 absolute'>
     <div class="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-purple-500 border-t-transparent "></div>
                    <p className='font-serif  text-md font-bold mt-5'>Hold Your Cup</p>
                    <p className='font-serif  text-sm font-bold'>We are loading stuff for you...</p>
</div>

  )
}

export default Loader