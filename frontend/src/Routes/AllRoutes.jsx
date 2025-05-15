import React from 'react';
import { Routes ,Route} from 'react-router-dom';
import {Home,RiderDashBoard,DriverDashBoard,Login,SignIn} from "../Pages";
import { RideRequest,RiderRideHistory,RiderLiveTracking,RiderProfile,AvailableRideRequest,DriverLiveTracking,DriverRideHistory,DriverProfile } from '../Components';

export const AllRoutes = ({auth,setAuth}) => {

  return (
    <Routes>
        <Route path='/' end element={<Home auth={auth}/>}/>
        <Route path='/riderDashBoard' element={<RiderDashBoard auth={auth}/>}>
          <Route path='' element={<RideRequest auth={auth}/>}/>
          <Route path='/riderDashBoard/rideHistory' element={<RiderRideHistory auth={auth}/>}/>
          <Route path='/riderDashBoard/liveTracking' element={<RiderLiveTracking auth={auth}/>}/>
          <Route path='/riderDashBoard/profile' element={<RiderProfile auth={auth}/>}/>
        </Route>
        <Route path='/driverDashBoard' element={<DriverDashBoard auth={auth}/>}>
          <Route path='' element={<AvailableRideRequest auth={auth}/>}/>
          <Route path='/driverDashBoard/rideHistory' element={<DriverRideHistory auth={auth}/>}/>
          <Route path='/driverDashBoard/liveTracking' element={<DriverLiveTracking auth={auth}/>}/>
          <Route path='/driverDashBoard/profile' element={<DriverProfile auth={auth}/>}/>
        </Route>
        <Route path='/login' element={<Login auth={auth} setAuth={setAuth}/>}/>
        <Route path="/signIn" element={<SignIn auth={auth} setAuth={setAuth}/>}/>
    </Routes>
  )
}