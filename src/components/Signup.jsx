import React from 'react'
import { useState } from 'react'
import AuthServices from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login, logout } from '../store/authSlic'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'


function Signup() {
    const navigate = useNavigate()
        const [error, setError] = useState('')
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const create = async (data) => {
        try{
            setError("")
             const newUser = await AuthServices.CreateAccount(data);
       
             
        if (newUser) {
          const current = await AuthServices.CurrentUser();
          if (current) {
            dispatch(login(current));
            navigate("/");
          }
            
        }}
    catch(error){
        console.log(error);
        
    }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name:"
                            placeholder='Enter your full Name'
                            {...register('name', { required: true })}
                        />
                        <Input
                            label='Email:'
                            placeholder="Enter your Email"
                            type="email"

                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
                        />
                        <Input
                            label='Password'
                            type='Password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true
                            })}
                        />

                        <Button type="submit"
                            className='w=full'>Create Account</Button>

                    </div>


                </form>

            </div>
        </div>
    )
}

export default Signup
