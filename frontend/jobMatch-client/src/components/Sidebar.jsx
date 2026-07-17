import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navItems } from '../utils/navItems';

function Sidebar() {

  const navigate = useNavigate();

  return (
    <>
      <div className="fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-8 px-5">
        <div>
          <header className="px-2 mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              AI Job <span className="text-blue-600">Match</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1.5">Find your next role, faster</p>
          </header>

          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-5 py-3.5 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <footer className="px-2">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} AI Job Match</p>
        </footer>
      </div>
    </>
  )
}

export default Sidebar