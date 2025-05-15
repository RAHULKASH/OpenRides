import React,{useState} from 'react';
import { AllRoutes } from './Routes/AllRoutes';
import {Header,Footer} from "./Components"

 const App = () => {

  const [auth,setAuth]=useState(null)

  return (
    <div>
      <Header auth={auth} setAuth={setAuth}/>
      <AllRoutes auth={auth} setAuth={setAuth}/>
      <Footer />
    </div>
  )
}

export default App;
