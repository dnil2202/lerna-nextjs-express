import React from 'react'
import {useRouter} from 'next/router';
import { logoutAction } from '../../action/userAction';
import { useDispatch } from 'react-redux';

const Dropdown = () => {
    const route = useRouter()
    const dispatch = useDispatch()

    const onLogout = ()=>{
        dispatch(logoutAction())
        route.push('/')
      }
  
  return (
    <div className='rounded-lg w-52 divide-y divide-slate-200 bg-white shadow-lg'>
        <p className='text-base py-1 pl-2 text-slate-600 hover:bg-sky-300 hover:text-black cursor-pointer' onClick={()=>route.push('/edit-profile')}>Setting</p>
        <p className='text-base py-1 pl-2 text-slate-600 hover:bg-sky-300 hover:text-black cursor-pointer' onClick={()=>route.push('/profile')}>Profile</p>
        <p className='text-base py-1 pl-2 text-slate-600 hover:bg-sky-300 hover:text-black cursor-pointer' onClick={onLogout}>Logout</p>
    </div>
  )
}

export default Dropdown