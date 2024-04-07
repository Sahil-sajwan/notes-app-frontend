import { useEffect, useState } from "react";
import {getToken} from "../utils/auth"
import axios from "axios";

function useFetchData(url){
    const [data, setData] = useState([])
    const [error,setError] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const headers = {
        'Authorization': getToken(),
        'Content-Type': 'application/json'
      };
    useEffect(() => {
        const fetchData = async () =>{

           try{
            const response = await axios.get(url,{headers})
            setData(response.data)
            setLoading(false)
            
           }
           catch(err){
            setError(true)
           } 
           
             
        }
        fetchData()
      
        
    },[])
   
    return {data,
        setData,
        isLoading,
        error
    }
}

export default useFetchData;