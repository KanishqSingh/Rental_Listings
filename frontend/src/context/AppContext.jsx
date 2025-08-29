import { createContext, useContext, useState,useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// console.log("Base Url",axios.defaults.baseURL);


export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [properties, setProperties] = useState([])

    //chech is user is logged in
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data');
            // console.log('user data',data);
            
            if (data.success) {
                setUser(data.user)
                // console.log('user',data.user);
                
                setIsOwner(data.user.role === 'owner')
            } else {
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //function to fetch all cars
    const fetchProperties = async () => {
        try {

            const { data } = await axios.get('/api/user/properties')
            // console.log("cars",data);

            console.log(data);
            
            
            data.success ? setProperties(data.property) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message)

        }
    }

    //funcstion to logout from user
    const logout = () =>{
        localStorage.removeItem('token')
        setToken(null);
        setUser(null)
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You Have been logged out')
    }


    //useeffect to retrieve token from local storage
    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
        fetchProperties()

    }, [])


    //useeffect to fetch user data when token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    }, [token])



    const value = {
        navigate,
        axios,user,
        setUser,
        token,setToken,
        isOwner,setIsOwner,
        fetchUser,showLogin,
        setShowLogin,logout,
        fetchProperties,properties,
        setProperties,
        startDate,setStartDate,
        returnDate,setReturnDate



    }

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}

export const useAppContext = () => {
    return useContext(AppContext)
}