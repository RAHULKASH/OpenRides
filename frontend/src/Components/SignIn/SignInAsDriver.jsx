import React,{useState} from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom";

export const SignInAsDriver = ({auth,setAuth}) => {

   const [metamask,setMetamask]=useState(null);
   const navigate=useNavigate();
  
    async function getMetaMaskID(e) {
      e.preventDefault();
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setMetamask(accounts[0]);
          return accounts[0]; // Return the first account (user's wallet address)
        } catch (error) {
          alert('denied account access or error occurred');
          return null;
        }
      } else {
        alert('MetaMask is not installed.');
        return null;
      }
    }

  function handleSubmit(e){
    e.preventDefault();
    const body={
      name:e.target.name.value,
      email:e.target.email.value,
      number:e.target.number.value,
      gender:e.target.gender.value,
      address:e.target.address.value,
      vehicle_name:e.target.address.value,
      vehicle_number:e.target.vehicle_number.value,
      vehicle_type:e.target.vehicle_type.value,
      driving_license:e.target.driving_license.value,
      experience:e.target.experience.value,
      metamask:e.target.metamask.value
    }
    axios.post(`/api/users/registerAsDriver/`,body)
        .then((response)=>{
          const data=response.data;
          toast.success(data.message);
          if(data.data){
            setAuth(data.data);
            navigate('/driverDashBoard');
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

  <form class="max-w-[75%] mt-5 " onSubmit={handleSubmit}>
<div class="relative z-0 w-full mb-5 group">
      <input type="text" name="name" id="name" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
      <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="email" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="number" name="number" id="number" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
      <label for="floating_number" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact number</label>
  </div>

  <div class="mb-4 mt-4">
  <label class="block text-sm  text-gray-600 mb-2">Gender</label>
  
  <div class="flex items-center space-x-6">
    <label class="inline-flex items-center">
      <input type="radio" name="gender" value="male" class="form-radio bg-gray-300 accent-gray-500" required />
      <span class="ml-2 text-gray-600">Male</span>
    </label>

    <label class="inline-flex items-center">
      <input type="radio" name="gender" value="female" class="form-radio bg-gray-300 accent-gray-500" required />
      <span class="ml-2 text-gray-600">Female</span>
    </label>
  </div>
</div>

  <div class="relative z-0 w-full mb-5 group">
      <input type="text" name="address" id="address" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
      <label for="floating_address" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="vehicle_name" id="vehicle_name" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
        <label for="floating_vehicle_name" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vehicle Details</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="vehicle_number" id="vehicle_number" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
        <label for="floating_vehicle_number" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vehicle Number</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <select name="vehicle_type" id="vehicle_type" className='block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer'>
          <option value="Mini" className='bg-gray-200 '>Mini</option>
          <option value="Sedan" className='bg-gray-200 '>Sedan</option>
          <option value="HatchBack" className='bg-gray-200 '>HatchBack</option>
          <option value="SUV" className='bg-gray-200 '>SUV</option>
          <option value="Bike" className='bg-gray-200 '>Bike</option>
          <option value="Auto" className='bg-gray-200 '>Auto</option>
        </select>
        <label for="floating_vehicle_type" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vehicle Type</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="driving_license" id="driving_license" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
        <label for="floating_driving_license" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Driving License Number</label>
    </div>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="number" name="experience" id="experience" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
      <label for="floating_experience" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Experience</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="metamask" value={metamask?metamask:""} id="metamask" class="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " disabled />
        <label for="floating_metamask" class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Metamask Id</label>
    </div>
    <button className='relative z-0 w-32 mb-5 group border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-7 py-3 text-center me-2  border-gray-600 text-gray-500  focus:ring-gray-800 'onClick={getMetaMaskID}>Connect</button>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6 mt-6">
    <div class="relative z-0 w-full mb-5 group">
    <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white" for="file_input">Upload your image</label>
    <input class="block p-2  text-sm text-gray-600 border border-gray-300 rounded-full cursor-pointer bg-gray-200 border-2 focus:outline-none " aria-describedby="file_input_help" id="file_input" type="file"/>
    <p class="mt-1 text-[12px] text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG or JPG  (MAX. 800x400px).</p>
    </div>
    <div class="relative z-0 w-full mb-5 group">
    <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white" for="file_input">Upload your vehicle image</label>
    <input class="block p-2  text-sm text-gray-600 border border-gray-300 rounded-full cursor-pointer bg-gray-200 border-2 focus:outline-none " aria-describedby="file_input_help" id="file_input" type="file"/>
    <p class="mt-1 text-[12px] text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG  (MAX. 800x400px).</p>
    </div>
  </div>
  <button type="submit" class=" mt-8 border focus:ring-2 focus:outline-none font-medium rounded-full text-sm px-9 py-3 text-center me-2 mb-2 border-gray-600 text-gray-500 hover:text-white hover:bg-gray-500 hover:border-white focus:ring-gray-800 shadow-xl bg-gray-300 ">Submit</button>
  </form>

  )
}
