import React from 'react'
import {Link} from "react-router-dom"
import icon from "../../../public/Icon.png"
import { useNavigate } from 'react-router-dom'

export const Header = ({auth,setAuth}) => {

 const button=" border focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 border-gray-600 text-gray-400 hover:text-white hover:bg-gray-600 hover:border-white focus:ring-gray-800 shadow-2xl shadow-gray-700";

  return (
    <div className='w-full flex flex-row flex-wrap justify-between p-4 bg-gray-900 gap-4 items-center font-sarif text-white static gap-8'>
        <div className='flex flex-row gap-4 items-center'>
            <img src={icon} alt="Icon" className='rounded-full h-12 w-12' />
            <p className='sm:text-xl'>OpenRides</p>
        </div>
        <div className='flex flex-row gap-4 items-center flex-wrap justify-center'>
            <Link to="/"  class={button}>Home</Link>
            <Link to={auth?auth.driving_license?'/driverDashBoard':'/riderDashBoard':'/login'} class={button} >Ride</Link>
            <Link to="" class={button} >Services</Link>
            <Link to="" class={button} >About Us</Link>
            {!auth && <Link to="/login" class={button} >Login</Link> }
            {!auth && <Link to="/signIn" class={button} >SignIn</Link> }
            { auth &&<Link to="/" onClick={()=>setAuth(null)}  class={button}>Logout</Link> }
        </div>
    </div>
  )
}
