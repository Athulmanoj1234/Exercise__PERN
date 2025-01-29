import React from 'react'
import UserProfile from '../../pages/UserProfile'

const Header = () => {
  return (
    <div className='flex'>
        <div>
            exercise makes a man happy
        </div>
        <div className='absolute right-1'>
            <UserProfile />
        </div>
    </div>
  )
}

export default Header
