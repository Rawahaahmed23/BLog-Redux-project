import React from 'react'
import {Contianer,Logo,Logout} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authstatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()
  const navItems =[
    {
      name:'Home',
      slug: '/',
      active:true
    },
     {
      name:'Login',
      slug: '/login',
      active:!authstatus
    }, {
      name:'Sigup',
      slug: '/Sigup',
      active:!authstatus
    }, {
      name:'Add post',
      slug: '/add-post',
      active:authstatus
    }, {
      name:'All post',
      slug: '/all-post',
      active:authstatus
    },
  ]
  return (
  <>
  <header className='py-3 shadow bg-gray-500'>
 <Contianer>
  <nav className='flex'>
    <div className='mr-4'>
      <Link to={'/'}>
      <Logo width='70px' />
      </Link>
</div>
<ul className='flex ml-auto'>
  {navItems.map((items)=>
  items.active ?<li key={items.name}>
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={()=> navigate(items.slug)}></button>
  </li> :null
  )}
  {authstatus &&(
    <li>
      <Logout />
    </li>
  )}
</ul>
  </nav>
 </Contianer>
  </header>
  </>
  )
}

export default Header
