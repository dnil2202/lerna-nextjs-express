import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../component/Navbar'

const index = () => {

    const route = useRouter()

  return (
    <div>
        <Navbar/>
        <div className=' container mx-auto px-96'>
            <div className='border border-slate-400 mx-auto my-5 grid grid-cols-4 divide-x-2 h-96'>
                <div className='pt-5 '>
                    <p className='py-3 px-4 cursor-pointer font-light ' onClick={()=>route.push('/edit-profile')}>Edit Profile</p>
                    <p className='py-3 px-4 cursor-pointer font-semibold' >Change Password</p>
                </div>
                <div className='col-span-3 pt-5 px-5'>
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-20'>Password</p>
                        <input className='border border-slate-200 w-[300px] ml-3 rounded-md pl-3'/>
                    </div>
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-11'>New password</p>
                        <input className='border border-slate-200 w-[300px] ml-3 rounded-md pl-3'/>
                    </div>
                    <div className='flex pt-5'>
                        <p className='font-semibold mr-7'>Repeat Password</p>
                        <input className='border border-slate-200 w-[300px] ml-3 rounded-md pl-3'/>
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

export default index