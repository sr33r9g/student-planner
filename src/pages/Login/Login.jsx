import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button,TextField } from '@mui/material'
import useLoging from "../../Hooks/useLogin";
const Login=()=>{
  const [userName,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const{loading,login} =useLoging()
  const handelSubmit=async(e)=>{
    e.preventDefault()
    await login(userName,password)
  }
   return(
    <form className="container box " onSubmit={handelSubmit}>
      <h2 >Login </h2>
      <TextField id="outlined-basic" label="Username" variant="outlined" style={{ minWidth: '250px' }} 
         value={userName}
         onChange={(e)=>setUsername(e.target.value)}
       />
      <TextField id="outlined-basic" label="Password" variant="outlined" style={{ minWidth: '250px' }} 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Button variant="contained"style={{ minWidth: '250px' }}  type='submit' disabled={loading} >Login</Button>
      <Link to='/signup'>
      <Button variant="outlined" >SignUp</Button>
      </Link>
           
    </form>
   );
}
export default Login;
