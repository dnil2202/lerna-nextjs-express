import axios from 'axios'
import React from 'react'
import { API_URL } from '../../helper'
import Navbar from '../component/Navbar';
import { BsThreeDots, BsHeart, BsChat } from 'react-icons/bs';
import { RiShareForwardLine  } from 'react-icons/ri';
import Head from 'next/head'

const detail = (props) => {
    const {idposting, images, add_date, avatar,user_name_post,caption}= props.detail
  return (
    <div>
    <Head>
        <title>posting from {user_name_post}||Guild</title>
        <meta name="title" content={`posting from ${user_name_post}||from GUILD`}/>
        <meta name="description" content={caption}/>

      {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="http://localhost:3000/profile/detail?idposting=14"/>
        <meta property="og:title" content={`posting from ${user_name_post}||from GUILD`}/>
        <meta property="og:description" content={caption}/>
        <meta property="og:image" content={images}/>

      {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="http://localhost:3000/home"/>
        <meta property="twitter:title" content={`posting from ${user_name_post}||from GUILD`}/>
        <meta property="twitter:description" content={caption}/>
        <meta property="twitter:image" content={images}></meta>
    </Head>
        <Navbar/>
        <div className='bg-[#FAFAFA] container mx-auto px-72 py-5'>
            <div className='h-[600px] w-[935px] border border-slate-200 grid grid-cols-3'>
                <div className='col-span-2'>
                    <img src={API_URL +images} className='w-full h-[598px]' />
                </div>
                <div className='shadow-lg '>
                        <div className='h-[60px] py-2 border px-5 '>
                            <div className='flex'>
                                <img src={avatar ? API_URL + avatar:'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className='w-10 h-10 rounded-full '/>
                                <div className='h-[26px] w-[220px]'>
                                    <p className='text-sm leading-[18px] font-semibold mt-1 ml-3'>{user_name_post}</p>
                                </div>
                                <BsThreeDots className=' mt-1 h-6 w-6 flex justify-end'/>
                            </div>
                        </div>
                        <div className='py-2 px-5 flex'>
                            {
                                caption &&
                                <>
                                <div className='h-[26px] w-[220px] mb-4'>
                                    <p className='text-sm leading-[18px] font-semibold mt-1 ml-3'>{user_name_post}<a className='text-sm leading-[18px] font-normal text-[#262626] ml-2'>{caption}</a></p>
                                    <p className='mt-1 ml-3 text-xs leading-4 text-[#8e8e8e]'>{add_date.split('').splice(0,10).join('')}</p>
                                </div>
                                </>
                            }
                        </div>
                        <div className='py-2 px-8 mt-2 overflow-auto h-[332px] mb-5'>
                            {
                                props.detail.comment &&
                                props.detail.comment.map((v)=>{
                                    return (
                                        <div className='' key={v.idcomment}>
                                            <p className='text-sm leading-[18px] font-semibold pt-1'>{v.user_name_comment}<a className='text-sm leading-[18px] font-normal text-[#262626] ml-2'>{v.comment}</a></p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='h-10 flex px-5'>
                            <div className=' flex justify-around w-32 '>
                                <BsHeart className='h-6 w-6 mt-[2px]'/>
                                <BsChat className='h-6 w-6 '/>
                                <RiShareForwardLine className='h-6 w-6'/>
                            </div>
                        </div>
                        <div className='text-sm leading-[18px] font-semibold px-8'>
                            {
                            props.detail.likes ?
                            <p>{props.detail.likes.length} Likes</p>
                            :
                            <p>0 likes</p>
                            }
                        </div>
                        <div className='border border-slate-200 border-b-0 px-3 mt-3'>
                            <div className=' flex'>
                                <input className='mt-2 h-8 w-[441px] bg-[#FAFAFA] focus:outline-none' placeholder='Add a comment'/>
                                <button className='h-[15px] w-7 my-4 text-sky-500'> Post</button>
                            </div>
                        </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export const getServerSideProps = async (context) =>{
    try {
        let res = await axios.get(API_URL+`/posting/${context.query.idposting}?page=1&pageSize=${10}`)
        return{
            props:{
                detail:res.data[0]
            }
        }
    } catch (error) {
        
    }
}

export default detail