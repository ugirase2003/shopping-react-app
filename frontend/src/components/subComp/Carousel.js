import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const Carousel = ({ slides }) => {
  const [imgLoad, setImgLoad] = useState(false)
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr(curr === 0 ? slides.length - 1 : curr - 1)
    console.log(curr)
  }
  const next = () => {
    setCurr(curr === slides.length - 1 ? 0 : curr + 1)
    
  }
 

  return (
    <SkeletonTheme baseColor="white" highlightColor="#C8C6C5 ">
      <div className='overflow-hidden relative max-w-[1400px] h-[25vh] sm:h-[450px]  mx-auto '>
        <Link to={'/categorywise/Men'}>
        <div className={`flex transition-transform ease-out duration-500 h-full`} style={{ transform: `translateX(-${curr * 100}%)` }}>

          {slides.map((img, index) => {
            return (<div className='min-w-full h-full  '>

              {!imgLoad ? <Skeleton className='h-full absolute' /> : null}
              <img src={img} className='h-full w-full' onLoad={() => setImgLoad(true)} />
            </div>)
          })}


        </div>

        <div className='absolute inset-0  flex justify-between items-center'>
          <button className=' ml-6' onClick={prev}>
            <AiOutlineLeft className=' rounded-full p-2  bg-purple-100/80' size={40} />
          </button>
          <button className=' mr-6' onClick={next}>
            <AiOutlineRight className='rounded-full p-2 bg-purple-100/80 ' size={40} />
          </button>
        </div>
        <div className='absolute bottom-4  right-0 left-0'>
          <div className={`flex  items-center  justify-center gap-2`}>
            {
              slides.map((_, i) => (<div className={`transition-all w-2 h-2  bg bg-white  rounded-full  ${curr === i ? "p-[5px]" : "bg-opacity-50"}`} />))
            }
          </div>
        </div>
        </Link>
      </div>
    </SkeletonTheme>
  )
}

export default Carousel