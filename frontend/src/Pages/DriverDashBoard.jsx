import React from 'react'
import { Outlet } from 'react-router-dom'
import { DriverDashBoardNavigation } from '../Components'

export const DriverDashBoard = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      <DriverDashBoardNavigation />
      <Outlet/>
    </div>
  )
}
