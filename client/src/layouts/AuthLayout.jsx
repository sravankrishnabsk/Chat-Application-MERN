import React from 'react'
import logo from '../assets/chat-logo/svg/logo-color.svg'

function AuthLayout({children}) {
  return (
    <>
        <div className='flex justify-center items-center bg-[#0093fb] py-3 h-20 shadow-md'>
            <img src={logo} className='hover: cursor-pointer' width={80} alt='Chat Logo'/>
        </div>
        {children}
    </>
  )
}

export default AuthLayout