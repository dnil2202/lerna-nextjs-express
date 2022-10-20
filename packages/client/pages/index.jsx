import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Layout from './component/layout';
import { useDispatch} from 'react-redux'
import { loginAction } from '../action/userAction';
import  {useRouter } from 'next/router'
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';


export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [isLoading,setIsLoading]=useState(false)


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  const onLogin=(event)=>{
    event.preventDefault()
    setIsLoading(true)
    axios.post(API_URL +`/auth/login`,{
      email,
      password
    })
    .then((res)=>{
      setIsLoading(false)
      console.log(res.data)
      localStorage.setItem('guild', res.data.token)
      delete (res.data.token)
      dispatch(loginAction(res.data))
      router.push('/home')
      alert('sukses')
    }).catch((err)=>{
      setIsLoading(false)
      console.log(err)
      alert(err)
    })
}
  
  
  return (
      <div>
        <div className='container mx-auto px-96 bg-[#FAFAFA] '>
          <div className='pt-10'>
            <div className='grid grid-cols-2'>
              <Image
                    loader={myLoader}
                    src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
                    alt="Picture of the author"
                    width={100}
                    height={520}
              />
              <div className='border border-slate-200 bg-white mx-4 h-[394px]'>
                <div className='my-10'>
                  <div className='font-Fuzy font-normal text-5xl text-center mb-10'>
                    Guild              
                  </div>
                  <form className=' w-full '>
                    <div className='mb-4 flex justify-center'>
                      <input className='h-9 w-64 border border-slate-400 bg-[#FAFAFA] focus:outline focus:outline-offset-0 focus:outline-gray-200 placeholder:text-start pl-2 text-xs' onChange={(e)=>setEmail(e.target.value)} placeholder='username or email'/>
                    </div>
                    <div className='mb-4 flex justify-center'>
                      <input className='h-9 w-64 border border-slate-400 bg-[#FAFAFA] focus:outline focus:outline-offset-0 focus:outline-gray-200 placeholder:text-start pl-2 text-xs' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                    </div>
                    <div className='flex justify-center'>
                      <button className='w-64 py-1 bg-sky-200 rounded-md text-white font-bold' onClick={onLogin}>Log in</button>
                    </div>
                  </form>
                  <div className='relative py-4'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full mx-10 border-b border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center'>
                      <span className='bg-white px-4 text-sm text-gray-500 font-Public'>OR</span>
                    </div>
                  </div>
                    <div className='flex justify-center'>
                      <FcGoogle size={15} className='mt-1'/>
                      <p className=' ml-2 text-sm'>Log in with google</p>
                    </div>
                    <div className='mt-5 flex justify-center'>
                      <button className='text-xs text-slate-400'>Forgot Password ?</button>
                    </div>
                </div>
              <div className='h-16 border-[1px] border-[#dbdbdb] bg-white'>
                <Link href='/register'>
                  <p className='my-5 text-center text-sm leading-[18px]'>Dont have an account?<span className='ml-1 text-sky-400 font-bold'>Sign up </span></p>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading&&
        <p className='text-5xl font-bold'>Loading................</p>
        
        }
      </div>
  )
}
