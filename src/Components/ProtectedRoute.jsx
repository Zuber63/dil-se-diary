import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  const user = localStorage.getItem("loginsession");

useEffect(()=>{
    if (!user) {
    return navigate('/Login')
  }
},[navigate,user])

  return children;
};

export default ProtectedRoute;