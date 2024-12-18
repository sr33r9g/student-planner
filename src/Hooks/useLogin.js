import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/Auth.context";

const useLoging=()=>{
    const [loading,setLoading]=useState();
    const {setAuthUser}=useAuthContext()
    
     const login=async(userName,password)=>{
        const success = handleInputErrors({ userName, password });
        if(!success) return;
        setLoading(true)
        try{
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({userName,password})
            }
        )
        const data =await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        localStorage.setItem("user-id",JSON.stringify(data))
        setAuthUser(data)
        }catch(error){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,login}

}


export default useLoging
function handleInputErrors({userName, password}) {
    if ( !userName || !password) {
        toast.error("Some fields are empty.");
        return false;
    }
   
    return true;
}