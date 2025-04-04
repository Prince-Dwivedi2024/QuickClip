import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="bg-[#222f3d] p-4 flex justify-between items-center h-28">
      
{/* <div className="ml-4">
        <Link to='/'>
          <img src={MyLogo} alt="Logo" className="h-28 text-[#000000] font-extrabold" />
        </Link>
      </div> */}
      <div className='text-[#FFFFFF] text-5xl font-bona font-semibold ml-4 hover:text-blue-400'>
        <Link to='/'>
        Quick  Clip</Link>
      </div>

               {/* create navlinks */}
      <div className="flex space-x-8 mr-4">
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-[#FFFFFF] font-bona text-lg hover:text-blue-400 transition-all duration-200 ${
              isActive ? ' text-orange-400 underline' : ''
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to='/pastes'
          className={({ isActive }) =>
            `text-[#FFFFFF] font-bona text-lg hover:text-blue-400 transition-all duration-200 ${
              isActive ? 'text-orange-400 underline' : ''
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
