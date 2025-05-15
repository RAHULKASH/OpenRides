import React from 'react'
import { RiderDashBoardNavigation } from '../Components'
import { Outlet } from 'react-router-dom'


export const RiderDashBoard = () => {

  return (
    <div className='flex flex-row min-h-screen'>
      <RiderDashBoardNavigation/>
      <Outlet />
    </div>
  )
}
