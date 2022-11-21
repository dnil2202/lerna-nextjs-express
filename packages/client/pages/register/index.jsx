import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '../../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [visible, setVisible]=useState('password')
    const [onDisabled, setOnDisabled]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
    const [input,setInput]=useState({
        email:'',
        fullname:'',
        username:'',
        password:'',
    })

    const onChange = (event) =>{
        const {value,name}=event.target
        if(name === 'email'){
            if(value.includes('@') && value.includes('.com')){
                setOnDisabled(false)
            }
        }
        setInput({...input,[name]:value})
    }

    const onSubmit = ()=>{
        setIsLoading(true)
        let{username,email,password,fullname} = input
                axios.post(API_URL+'/auth/regis',{
                    fullname,
                    username,
                    email,
                    password
                })
                .then((res)=>{
                    console.log('data token',res.data)
                    if(res.data.success){
                        // navigate('/',{replace:true})
                        toast.success('Success please verified your account', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                    setIsLoading(false)
                }).catch((err)=>{
                    setIsLoading(false)
                    toast.error('Cek your data', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                })
    }

    const showHide = ()=>{
        if(visible === 'password'){
            setVisible('text')
        }else if(visible === 'text'){
            setVisible('password')
        }
    }
return (
    <div className='container mx-auto px-[570px] bg-[#FAFAFA] '>
        <div className='pt-10'>
            <div className='border border-slate-200 h-[617px] w-[350px] bg-white'>
                <Link href='/'>
                    <div className='mx-auto h-14 w-44 mt-14'>
                        <p className='text-center text-5xl leading-[18px] font-Fuzy'>GUILD</p>
                    </div>
                </Link>
                <div className='mx-auto h-10 w-64'>
                    <p className='text-base font-semibold text-center leading-5 text-[#8e8e8e]'>Sign up to see photos and videos from your friend</p>
                </div>
                <div className='flex justify-center border border-slate-200 hover:bg-slate-300 mt-5 pt-1 rounded-md mx-auto h-8 w-[268px]'>
                    <FcGoogle size={15} className='mt-1'/>
                    <p className=' ml-2 text-sm'>Log in with google</p>
                </div>
                <div className='relative py-4'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full mx-10 border-b border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center'>
                        <span className='bg-white px-4 text-sm text-gray-500 font-Public'>OR</span>
                    </div>
                </div>
                <form className=' mx-auto px-[51px]'>
                    <input className='border border-slate-200 h-[25px] w-[250px] py-[14px] pl-1 text-sm leading-4 mb-4 focus:outline focus:outline-slate-200 invalid:border-red-400' type='email' placeholder='email' name='email' value={input.email} onChange={onChange}/>
                    <input className='border border-slate-200 h-[25px] w-[250px] py-[14px] pl-1 text-sm leading-4 mb-4 focus:outline focus:outline-slate-200' type='text' placeholder='fullname' name='fullname' value={input.fullname} onChange={onChange} />
                    <input className='border border-slate-200 h-[25px] w-[250px] py-[14px] pl-1 text-sm leading-4 mb-4 focus:outline focus:outline-slate-200' type='text' placeholder='username' name='username' value={input.username} onChange={onChange} />
                    <div className='relative'>
                        <input className='border border-slate-200 h-[25px] w-[250px] py-[14px] pl-1 text-sm leading-4 mb-4 focus:outline focus:outline-slate-200' placeholder='password' type={visible} name='password' value={input.password} onChange={onChange} />
                        <p className='text-sm absolute top-1 right-1 fw-bold' onClick={showHide}>
                        {
                            visible === 'password'?'Show':'Hide'
                        }
                        </p>
                    </div>
                </form>
                <div className='h-[96px] w-[270px] mx-auto'>
                    <p className='text-xs text-center leading-4 px-3 text-[#8e8e8e]'>People who use our service may have uploaded your contact information to Guild. Learn More</p> 
                    <p className='text-xs text-center leading-4 px-3 text-[#8e8e8e] mt-3'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                </div>
                <div className='flex justify-center mt-5'>
                    <button className='border border-slate-200 px-28 rounded-md py-1 text-white bg-sky-500 disabled:bg-sky-200' disabled={onDisabled} onClick={onSubmit}>Sign up</button>
                </div>
            </div>
            <Link href='/'>
                <div className='border border-slate-200 bg-white h-16 w-[350px] mt-2'>
                    <p className='my-5 text-center text-sm leading-[18px]'>Have an account?<span className='ml-1 text-sky-400 font-bold'>Sign in </span></p>
                </div>
            </Link>
        </div>
        {
            isLoading &&
            <p className='font bold text-4xl'>Loading</p>
        }

    </div>
  )
}

export default Register