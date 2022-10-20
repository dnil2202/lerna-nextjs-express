import axios from 'axios';
import React, {useEffect} from 'react'
import {AiFillHome,AiFillPlusCircle} from "react-icons/ai";
import { BiSearchAlt2 } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../helper';
import { loginAction}  from '../../action/userAction';


const Navbar = () => {

    const dispatch = useDispatch()

    const keepLogin=()=>{
      let sosmed = localStorage.getItem('guild')
      if(sosmed){
        axios.get(API_URL +`/auth/keep`,{
          headers:{
            'Authorization': `Bearer ${sosmed}`
          }
        })
        .then((res)=>{
          if(res.data.token){
            localStorage.getItem('guild', res.data.token);
            delete res.data.token
            dispatch(loginAction(res.data));
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }else{
        console.log('============================> GAGAAL')
      }
    }
  
    useEffect(()=>{
      keepLogin()
    },[])

return (
    <div className='shadow-xl lg:container lg:mx-auto lg:px-80'>
        <div className='py-2 flex'>
            <div className='h-9 w-[333px]'>
                <p className='text-2xl font-Fuzy font-normal leading-5 mt-2'>GUILD</p>
            </div>
            <div className='h-9 w-64 relative'>
                <input placeholder='search' className='bg-slate-200 w-full h-9 rounded-md focus:outline-none pl-10'/>
                <BiSearchAlt2 size={24} className='absolute top-2 left-1 fill-slate-500'/>
            </div>
            <div className='h-9 w-[333px]'>
                <div className='flex justify-end'>
                    <div className='grid grid-cols-3 gap-2 pt-1'>
                        <AiFillHome size={24}/>
                        <AiFillPlusCircle size={24}/>
                        <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='h-7'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Navbar