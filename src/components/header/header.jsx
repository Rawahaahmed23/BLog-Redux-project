import React from 'react'
import { Container, Logo, Logout } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authstatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authstatus },
    { name: 'Signup', slug: '/signup', active: !authstatus },
    { name: 'Add Post', slug: '/add-post', active: authstatus },
    { name: 'All Posts', slug: '/all-post', active: authstatus },
  ]

  return (
    <header className="py-3 shadow bg-gray-500 bg-gray">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex flex-row  ml-auto items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authstatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
