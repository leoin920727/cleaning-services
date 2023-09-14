import axios from "axios";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({
  children,
  redirectPath = "/"
}) => {
  const [isAuthorised, setIsAuthorised] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4107/staffAdmin', { withCredentials: true });
        const auth = response.data.isAuthorised
        setIsAuthorised(auth);
        if(!auth) return navigate("/loginpage")
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/loginpage")
      }
    };
    fetchData()
  }, [isAuthorised]);

    return children ?? <Outlet /> 
    
  
};
export default ProtectedRoute;