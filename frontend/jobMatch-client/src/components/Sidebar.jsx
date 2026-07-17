import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navItems } from '../utils/navItems';

function Sidebar() {

  const navigate = useNavigate();
  
  return (
    <div className='flex flex-col justify-between h-screen py-5 pl-2'
    >
      <div>
        <header>
          <h1 class="text-3xl font-bold underline">AI JOB Match</h1>
        </header>

        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {navItems.map((item)=>{
              return <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    }`
                  }>{item.name}</NavLink>
              </li>
            })}
          </ul>
        </nav>
         
      </div>
    </div>
  )
}

export default Sidebar