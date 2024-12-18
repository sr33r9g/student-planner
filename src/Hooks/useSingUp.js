import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useAuthContext } from "../Context/Auth.context";
const useSignUp = () => {

    const [loading, setLoading] = useState(false);
    const {authUser,setAuthUser}=useAuthContext()

    const signup = async ({ fullName, userName, password, conformPassword }) => {
        
        const success = handleInputErrors({ fullName, userName, password, conformPassword });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/singup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, conformPassword })
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("user-id",JSON.stringify(data));
            setAuthUser(data);

            console.log(data);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

function handleInputErrors({ fullName, userName, password, conformPassword }) {
    if (!fullName || !userName || !password || !conformPassword) {
        toast.error("Some fields are empty.");
        return false;
    }
    if (password !== conformPassword) {
        toast.error("Passwords do not match.");
        return false;
    }
    return true;
}

export default useSignUp;
