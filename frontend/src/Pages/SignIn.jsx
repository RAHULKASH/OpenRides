import React, { useState } from 'react'
import { SignInAsDriver , SignInAsRider } from '../Components'


export const SignIn = ({auth,setAuth}) => {

  const [type,setType]=useState("Rider");

  const active="border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-7 py-3 text-center me-2 mb-2 text-white bg-gray-600 border-white focus:ring-gray-800 shadow-xl shadow-gray-400";
  const inActive="border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-7 py-3 text-center me-2 mb-2 border-gray-600 text-gray-500 hover:text-white hover:bg-gray-500 hover:border-white focus:ring-gray-800 shadow-xl shadow-gray-400";

  return (
    <div className='min-h-screen bg-gray-200 pb-40'>

      <div className='flex flex-col p-16 min-h-screen gap-8'>

        <div className='flex flex-row gap-12 '>
            <button onClick={()=>setType("Rider")} className={type==="Rider"?active:inActive}>As Rider</button>
            <button onClick={()=>setType("Driver")} className={type==="Driver"?active:inActive}>As Driver</button>
        </div>

        {type==="Rider" && <SignInAsRider  auth={auth} setAuth={setAuth}/>}

        {type==="Driver" && <SignInAsDriver  auth={auth} setAuth={setAuth}/>}

      </div>

    </div>
  )
}
