import Head from 'next/head'
import React, { useEffect } from 'react'
import Navbar from '../component/Navbar'
import { useSelector } from 'react-redux'
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { API_URL } from '../../helper'
import { useState } from 'react'
import Link from 'next/link'

const Profile = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const {id,fullname,username,avatar,status,email,bio} = useSelector((state)=>{
    return{
      id : state.userReducer.idusers,
      fullname : state.userReducer.fullname,
      username : state.userReducer.username,
      avatar : state.userReducer.images,
      status : state.userReducer.status,
      email : state.userReducer.email,
      bio : state.userReducer.bio,
    }
  })

  const [postingUser,setPostingUser]=useState([])
  const [postingLike,setPostingLike]=useState([])


  const getData = async ()=>{
    try {
      let res = await axios.get(API_URL+`/posting/profile/${id}`)
      setPostingUser(res.data)
    } catch (error) {
      console.log(error)
    }
}

const getDataLike = async ()=>{
  try {
    let res = await axios.get(API_URL+`/like/${id}`)
    setPostingLike(res.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  getData()
  getDataLike()
},[])

const printDataPosting = () =>{
  return postingUser.map((val)=>{
    return(
      <Link href={`profile/detail?idposting=${val.idposting}`}>
        <img src={API_URL+val.images} className='h-[293px] w-[935px] mt-10 shadow-lg'/>
      </Link>
    )
  })
}
const printDataLike = () =>{
  return postingLike.map((val)=>{
    return(
      <Link href={`profile/detail?idposting=${val.idposting}`}>
        <img src={API_URL+val.images} className='h-[293px] w-[935px] mt-10 shadow-lg'/>
      </Link>
    )
  })
}


  return (
    <div>
      <Head>
        <title>Guild-app</title>
        <meta name='description' content='Generate by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <Navbar/>
            <div className='container mx-auto px-96 pt-5 py-20'>
                <div className='grid grid-cols-2'>
                  <div className='flex justify-center'>
                    <img src={avatar?API_URL + avatar:'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className='h-[150px] w-[150px] rounded-full'/>
                  </div>
                  <div className='h-10 w-[613px]'>
                   <p className='text-[32px] font-extralight text-gray-600'>{username}</p>
                   <p className='text-[16px]'>{email}</p>
                   <p className='text-[16px]'>{fullname}</p>
                   <p className='text-[16px]'>{bio}</p>
                  </div>
                </div>
                <div className='mt-10'>
                <Tab.Group as='div'>
                <Tab.List className='flex justify-around border border-slate-400 border-b-0 border-r-0 border-l-0'>
                  <Tab className={({ selected })=> classNames('w-1/3 mx-4 py-5' ,selected && 'border-2 border-b-0 border-r-0 border-l-0   border-black font-bold')}>Post</Tab>
                  <Tab className={({ selected })=> classNames('w-1/3 mx-4 py-5' ,selected && 'border-2 border-b-0 border-r-0 border-l-0   border-black font-bold')}>Liked</Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className='grid grid-cols-3 gap-4'>
                    {printDataPosting()}
                  </Tab.Panel>
                  <Tab.Panel className='grid grid-cols-3 gap-4'>
                    {printDataLike()}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
                </div>
            </div>
    </div>
  )
}


export default Profile