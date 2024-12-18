import React, { useState } from 'react'
import { Link, Link as RouterLink } from 'react-router-dom';
import { Button,TextField } from '@mui/material'
import useSingUp from '../../Hooks/useSingUp.js';




const SignUp = () => {
  const [inputs,setInput]=useState({
    fullName:'',
    userName:'',
    password:'',
    conformPassword:''
  });

    const {loading,signup} = useSingUp();

   const handleSubmit= async(e)=>{
         e.preventDefault();
         await signup(inputs)
   }

  return (
    <form onSubmit={handleSubmit} className='container box'  >
         <h2>SignUp</h2>
         <TextField id="outlined-basic" label="FullName" variant="outlined" style={{ minWidth: '250px' }} 
          value={inputs.fullName}onChange={(e)=>setInput({...inputs,fullName:e.target.value})}
         />
         <TextField id="outlined-basic" label="Username" variant="outlined" style={{ minWidth: '250px' }} 
         value={inputs.userName}onChange={(e)=>setInput({...inputs,userName:e.target.value})}
         />
         <TextField id="outlined-basic" label="Password" variant="outlined" style={{ minWidth: '250px' }}
           value={inputs.password} onChange={(e)=>setInput({...inputs,password:e.target.value})}
         />
         <TextField id="outlined-basic" label="ConfirmPassword" variant="outlined" style={{ minWidth: '250px' }} 
          value={inputs.conformPassword} onChange={(e)=>setInput({...inputs,conformPassword:e.target.value})}
         />
         <Button variant="contained" style={{ minWidth: '250px'}}   type="submit">SignUp</Button>
         
         <Link to='/login'><Button variant="outlined">Login</Button></Link>   
         
    </form>
  )
}

export default SignUp;