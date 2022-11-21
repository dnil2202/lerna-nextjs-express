import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../component/Navbar'
import { useRouter } from 'next/router'

const editProfile  = () => {

    const route = useRouter()

    const {id,fullname,username,email,bio} = useSelector((state)=>{
        return{
          id : state.userReducer.idusers,
          fullname : state.userReducer.fullname,
          username : state.userReducer.username,
          avatar : state.userReducer.images,
          email : state.userReducer.email,
          bio : state.userReducer.bio,
        }
      })
  return (
    <div>
        <Navbar/>        
        <div className=' container mx-auto px-96'>
            <div className='border border-slate-400 mx-auto my-5 grid grid-cols-4 divide-x-2 h-96'>
                <div className='pt-5 '>
                    <p className='py-3 px-4 cursor-pointer font-semibold'>Edit Profile</p>
                    <p className='py-3 px-4 cursor-pointer font-light' onClick={()=>route.push('/change-pass')}>Change Password</p>
                </div>
                <div className='col-span-3 pt-5 px-20'>
                    <div className='flex'>
                        <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='h-12'/>
                        <p className='pl-3'>{username}</p>
                    </div>  
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-7'>Name</p>
                        <input value={fullname} className='border border-slate-200 w-[1696px] ml-3 rounded-md pl-3'/>
                    </div>
                    <div className='flex pt-5'>
                        <p className='font-semibold'>Username</p>
                        <input value={username} className='border border-slate-200 w-[1696px] ml-3 rounded-md pl-3'/>
                    </div>
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-8'>Email</p>
                        <input value={email} className='border border-slate-200 w-[1696px] ml-3 rounded-md pl-3' disabled/>
                    </div>
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-12'>Bio</p>
                        <textarea className='border border-slate-200 w-[1696px] ml-3 rounded-md pl-3'>{bio}</textarea>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <button className='bg-sky-500 text-white px-2 py-1 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default editProfile