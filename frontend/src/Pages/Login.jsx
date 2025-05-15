import React,{useState} from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

export const Login = ({auth,setAuth}) => {

  const [user,setUser]=useState("rider");
  const [metamask,setMetamask]=useState(null);
  const navigate=useNavigate();

  const active="border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-7 py-3 text-center me-2 mb-2 text-white bg-gray-500 border-white focus:ring-gray-800 shadow-xl shadow-gray-400 ";
  const inActive="border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-7 py-3 text-center me-2 mb-2 border-gray-600 text-gray-500 hover:text-white hover:bg-gray-500 hover:border-white focus:ring-gray-800 shadow-xl shadow-gray-400 bg-gray-300";

    
  async function getMetaMaskID() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setMetamask(accounts[0]);
          } catch (error) {
            alert('denied account access or error occurred');
          }
        } else {
          alert('MetaMask is not installed.');
        }
      }

  async function handleSubmit(){
    const body={
      metamask
    }
    axios.post(`/api/users/loginAs${user}`,body)
        .then((response)=>{
          const data=response.data;
          toast.success(data.message);
          if(data.data){
            setAuth(data.data)
            navigate(`/${user}DashBoard`);
          }
        })
        .catch((error)=>{
          if (error.response) {
            const data = error.response.data;
            toast.error(data.message || 'An error occurred');
            console.error('Error response:', data);
          } else if (error.request) {
            toast.error('No response received from server');
            console.error('Error request:', error.request);
          } else {
            toast.error('Error: ' + error.message);
            console.error('Error message:', error.message);
          }
        })
  }
  

  return (
    <div className='min-h-screen bg-gray-200 flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-col justify-center items-center gap-8 bg-gray-400 rounded-full px-32 py-18 shadow-2xl '>
      <p className='text-2xl font-serif text-gray-100'>Login With MetaMask</p>
      <div>
      <div className='flex flex-row gap-12 '>
            <button onClick={()=>setUser("rider")} className={user==="rider"?active:inActive}>As Rider</button>
            <button onClick={()=>setUser("driver")} className={user==="driver"?active:inActive}>As Driver</button>
        </div>
      </div>
      <button onClick={metamask?handleSubmit:getMetaMaskID} className='px-8 py-4 text-xl bg-gray-700 text-gray-300 rounded-full hover:shadow-2xl hover:text-gray-200 '>{metamask?"Login":"Connect"}</button>
      </div>
      <p className='text-[14px] text-gray-500'>{metamask?metamask:""}</p>
    </div>
  )
}
