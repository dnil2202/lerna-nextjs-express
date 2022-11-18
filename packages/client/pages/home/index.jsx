import React, {useState} from 'react'
import axios from 'axios'
import { API_URL } from '../../helper'
import Navbar from '../component/Navbar'
import { BsThreeDots, BsHeart, BsChat } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link'

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
  
  return (
    <div>

      <Navbar/>
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






