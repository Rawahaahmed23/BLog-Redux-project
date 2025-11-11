import React from 'react'
import { useDispatch } from 'react-redux'
import AuthServices from '../../appwrite/auth'
import slice,{logout} from'../../store/authSlic'


function Logout() {

    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        AuthServices.Logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
   <>
   <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full 'onClick={logoutHandler}>Logout</button>
   </>
  )
}

export default Logout
