import { useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import './App.css'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlic'
import AuthServices from './appwrite/auth'

function App() {
  const [count, setCount] = useState(0)
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
    console.log('errror');
    
  })
},[])
  return  !loading ?(
    <div className='min-h-screen'>
 <div className='w-full block'>
        {/* <Header /> */}
        <main>
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>

    </div>
  
  ): <><div>errro</div></>
   
  
}

export default App
