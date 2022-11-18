import React, {useState, useRef} from 'react'
import axios from 'axios'
import { API_URL } from '../../helper'
import Navbar from '../component/Navbar'
import { BsThreeDots, BsHeart, BsChat } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link'
import { Dialog } from '@headlessui/react'

const HomePage = (props) => {
  const route = useRouter()
  const {id,fullname,username,avatar,status} = useSelector((state)=>{
    return{
      id : state.userReducer.idusers,
      fullname : state.userReducer.fullname,
      username : state.userReducer.username,
      avatar : state.userReducer.images,
      status : state.userReducer.status,
    }
  })

  const hiddenFileInput = useRef(null)

  const [toggle,setToggle]=useState(false)
  const [img,setImg]=useState('')
  const [caption,setCaption]=useState('')


  const printDataPosting = () => {
    return props.posting.map((val,idx)=>{
      return (
        <div key={val.idposting} >
          <div className='w-[470px] bg-white border border-slate-200 my-3'>
            <div className='h-14  pt-1 shadow-2xl'>
              <div className='flex px-2 '>
                <div className='h-10 w-10 bg-white'>
                  <img src={API_URL+val.avatar} className='rounded-full border w-full'/>
                </div>
                <div className='h-10 w-[368px] ml-3 mt-1'>
                  <p>{val.user_name_post}</p>
                </div>
                <BsThreeDots  className='mt-2 h-6 w-6'/>
              </div>
            </div>
            <div className='h-[587px] '>
              <img src={API_URL+val.images} className='w-full h-full'/>
            </div>
            <div className='h-10 flex '>
              <div className='mt-1 flex justify-around w-32'>
                <BsHeart className='h-6 w-6 mt-[2px]'/>
                <BsChat className='h-6 w-6 '/>
                <RiShareForwardLine className='h-6 w-6'/>
              </div>
            </div>
            <div className=' px-2 w-[445px]'>
              <div className='text-sm leading-[18px] font-semibold'>
                {
                  val.likes ?
                  <p>{val.likes.length} Likes</p>
                  :
                  <p>0 likes</p>
                }
              </div>
              <div className='mt-3'>
                <div className='flex'>
                  <p className='text-sm leading-[18px] font-semibold'>{val.user_name_post}</p>
                  <p className='text-sm leading-[18px] text-[#262626] ml-2'>{val.caption}</p>
                </div>
              </div>
              <Link href={`profile/detail?idposting=${val.idposting}`}>
                <div>
                  {
                    val.comment ?
                      <p className='text-sm leading-[18px] text-[#8e8e8e] my-3'>View {val.comment.length} Comment</p>
                    :
                      <p className='text-sm leading-[18px] text-[#8e8e8e] my-3'>View Detail</p>
                  }
                </div>
              </Link>
              <div>
                {
                  val.comment &&
                  val.comment.map ((v,i)=>{
                    if(i<2){
                      return (
                        <div key={i} >
                          <div className=''>
                            <p className='text-sm leading-[18px] font-semibold pt-1'>{v.user_name_comment}<a className='text-sm leading-[18px] font-normal text-[#262626] ml-2'>{v.comment}</a></p>
                          </div>
                        </div>
                      )
                      
                    }
                  })
                }
              </div>
              <p className='text-[10px] text-[#8e8e8e] my-2'>{val.add_date.split('').splice(0,10).join('')}</p>
            </div>
              <div className='border border-slate-200 px-3'>
                <div className='flex'>
                  <input className='my-2 h-10 w-[441px] focus:outline-none' placeholder='Add a comment'/>
                  <button className='h-[18px] w-7 my-4 text-sky-500'> Post</button>
                </div>
              </div>
          </div>
        </div>
      )
    })
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const submitPosting = ()=>{
    let formData = new FormData();
    formData.append('data',JSON.stringify({
      caption,
      users_id:id
    }))
    formData.append('images',img)
    axios.post(API_URL+`/posting`,formData).then((res)=>{
      if(res.data.success){
        alert('success')
        setImg('')
        setCaption('')
        setToggle(false)
        route.push('/home')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <div className='absolute'>
      <Navbar
      onClickOpenModal={()=>{setToggle(true)}}
      />
      <div className='bg-[#FAFAFA] container mx-auto px-96 pt-5'>
        <div className='grid grid-cols-3'>
          <div className='col-span-2'>
          {printDataPosting()}
          </div>
          <div className='h-16 w-80 mt-3 flex'>
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='h-16 w-16' onClick={()=>route.push('/profile')}/>
            <div className='mt-2 ml-4'>
              <p className='text-sm leading-[18px] font-semibold'>{fullname}</p>
              <p className='text-sm leading-[18px] font-light'>{username}</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog as='div' className='relative inset-x-[500px] top-32' open={toggle} onClose={() => setToggle(false)}>
      <Dialog.Panel className='w-[600px] h-[420px] bg-white shadow-lg'>
        <Dialog.Title className='font-semibold text-center py-5 border border-slate-400 border-l-0 border-r-0 border-t-0'>Create New Post </Dialog.Title>
        <div className='flex justify-center'>
            <img src={img ? URL.createObjectURL(img) : 'https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png'} className='w-52 h-52 my-5' />
        </div>
          {
            !img ?
            <div className='flex justify-center'>
            <input type='file' accept='image' onChange={(e)=>setImg(e.target.files[0])} ref={hiddenFileInput} className='hidden' />
            <button onClick={handleClick} className='bg-sky-600 text-white rounded-lg py-1 px-2'>Select from computer</button>
            </div>
            :
            <div>
              <textarea className='border border-slate-400 w-full' placeholder='Write caption here' onChange={(e)=>setCaption(e.target.value)}></textarea>
              <div className='my-5'>
                <button onClick={submitPosting} className='bg-sky-600 text-white rounded-lg py-1 px-2'>Submit</button>
                <button onClick={()=>setImg('')} className='bg-red-600 text-white rounded-lg py-1 px-2 ml-2'>Cancel</button>
              </div>
            </div>
            
          }
      </Dialog.Panel>
    </Dialog>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    let res = await axios.get(API_URL+`/posting?page=1&pageSize=5`)
    console.log(res)
      return {
        props:{
          posting : res.data
        }
      }

  } catch (error) {
    console.log(error)
  }
}

export default HomePage






