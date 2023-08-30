import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img1 from'../components/assets/img/img4.png'
import { useTransition,animated } from '@react-spring/web';
import GoToTop from '../components/subComp/GoToTop';





const Register = () => {
// registration page
    const [isExist,setIsExit]=useState(false)
    const [loader,setLoader]=useState(false);


    const transition=useTransition(isExist,{
      from:{opacity:0},
      enter:{opacity:1},
      leave:{opacity:0}
    })

  const register_user_schema=Yup.object({
    name:Yup.string().min(2).max(25).required('Please Enter Your Name'),
    phone:Yup.string().min(10,"Enter Valid Phone").max(10,'Enter Valid Phone').required('Please Enter Your Phone'),
    email:Yup.string().email().required('Please Enter Your Email'),
    password:Yup.string().min(6).required('Please Enter Your Password'),
    repassword:Yup.string().required('Confrim Your Password').oneOf([Yup.ref('password'),null],'Password must match')
  });


  const formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      repassword:''
    },


    validationSchema:register_user_schema,

    onSubmit:async(values)=>{

      setLoader(true)

     const res=await axios.post(process.env.REACT_APP_BASE_URL+'/register',values).then((response)=>{
      setLoader(false)
      alert('Resistration Done!!! Go to login')
      formik.resetForm();
      
     }).catch((err)=>{
        if(err.response.status===409){
          setLoader(false)
          setIsExit(!isExist)
        }
        else {
            setLoader(false)
            alert('Network Issue',err)
      
        }
     });
  
    }
  })

  
  


    return (
      <div className='grid sm:grid-cols-1 md:grid-cols-2 relative mb-4 max-w-[1200px] mx-auto'>
      <div><img className='sm:h-[450px] h-[300px] z-10  object-contain mx-auto mt-5 sm:mt-24' src={img1}/></div>
    
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">



<h2 className="mt-10 text-left text-2xl font-semibold  leading-9 tracking-tight text-gray-900 font-sans">Get Started</h2>
<p className='text-xs mt-1'>Already have an account ?<Link className="border-b-2 ml-2 font-bold  border-gray-600  " to={'/login'}>Login </Link></p>
</div>
    
      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
      {transition((style,item)=>item?<animated.div style={style} className='bg-red-200 text-red-700 text-xs p-2  rounded-sm my-1'>Account Already Exist</animated.div>:'')}
        <form className="space-y-6"  onSubmit={formik.handleSubmit}>

        <div>
            <label for="name" className="block text-sm   leading-6 text-gray-900 font-sans">Name</label>
            <div className="mt-0.5">
              <input id="name" name="name" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
              onChange={formik.handleChange} value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ?<p className='text-xs text-red-500'>{formik.errors.name}</p>:null}
            </div>
          </div>

          <div>
            <label for="phone" className="block text-sm  leading-6 text-gray-900 font-sans">Phone Number</label>
            <div className="mt-1">
              <input id="phone" name="phone" type="mobile"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"  onChange={formik.handleChange} value={formik.values.phone}/>

              {formik.errors.phone && formik.touched.phone ?<p className='text-xs text-red-500'>{formik.errors.phone}</p>:null}
            </div>
          </div>

          <div>
            <label for="email" className="block text-sm  leading-6 text-gray-900 font-sans">Email address</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"  onChange={formik.handleChange} value={formik.values.email}/>

              {formik.errors.email && formik.touched.email ?<p className='text-xs text-red-500'>{formik.errors.email}</p>:null}
            </div>
          </div>
    
          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm text-gray-900 font-sans">Password</label>
            </div>
            <div className="mt-1">
              <input id="password" name="password" type="password"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"  onChange={formik.handleChange} value={formik.values.password}/>

              {formik.errors.password && formik.touched.password ?<p className='text-xs text-red-500'>{formik.errors.password}</p>:null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="repassword" className="block text-sm font-sans text-gray-900">Re-Enter Password</label>
            </div>
            <div className="mt-1">
              <input id="repassword" name="repassword" type="password"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"  onChange={formik.handleChange} value={formik.values.repassword}/>

              {formik.errors.repassword && formik.touched.repassword ?<p  className='text-xs text-red-500'>{formik.errors.repassword}</p>:null}
            </div>
          </div>
    
          <div className='flex flex-col'>
            <button type="submit" className="flex w-full justify-center items-center rounded-md   bg-purple-700 px-3 h-10 text-sm font-semibold  text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 ">     {loader?
            <div
  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status"></div> : 'Register'}</button>
       
          </div>
        </form>
      
      </div>
    </div>
    <GoToTop/>
    </div>
      )
}

export default Register



