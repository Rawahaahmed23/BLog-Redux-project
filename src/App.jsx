import { useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import './App.css'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlic'
import AuthServices from './appwrite/auth'


import {Header} from './components'
import { Outlet } from 'react-router-dom'

function App() {

const [loading,setloading]=  useState(true)
const dispatch = useDispatch(AuthServices)

useEffect(()=>{
  AuthServices.CurrentUser().then((data)=>{
    if(data){
dispatch(login({data}))
      
    }else{
      dispatch(logout())
    }
  }).finally(()=>{
    setloading(false)
  })

  .catch(()=>{
         

    
  })
},[])
  return  !loading ?(
    <div className='min-h-screen'>
 <div className='w-full block'>
        <Header />

        <main>
    <Outlet />
        </main>
  
      </div>

    </div>
  
  ): <><div>errro</div></>
   
  
}

export default App
