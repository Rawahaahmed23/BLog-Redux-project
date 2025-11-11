import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login,logout } from '../store/authSlic'
import {Button,Input,Logo}from './index'
import AuthServices from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'


function Login() {
     const navigate = useNavigate() 
    const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
    const [error, setError]= useState('')

    const handleLogin  = async(data)=>{
     setError('')
     try{
       const session =await AuthServices.Login(data)
       if(session){
        const user = await AuthServices.CurrentUser()
        if(user) dispatch(login(user))
        navigate('/')
       }
     }catch(error){
        setError(error.message)
     }
    }
  return (
     <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
         <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                 <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error &&<p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                <div className='space-y-5'>
                <Input 
                label ='Email:'
                placeholder= "Enter your Email"
                type = "email"

                {...register("email",{
                    required:true,
                    validate: {
                        matchPatern:(value)=>/[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(value)||"Email adress must be valid"
                    }
                })}
                /> 

                <Input 
                label = "Password"
                type = "Password"
                placeholder = "Enter your Password"
                {...register("password",{
                    required:true
                })}
                />
                <Button
                type="Submit"
                className = 'w-full'
                >Signin</Button>
                </div>
        </form>
</div>
</div>
  )
}

export default Login
