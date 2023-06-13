import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";


const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const { isLoading, isError, data: users = [], error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/user')
            return res.data
        }
    })
    return [isLoading, isError,  users, error, refetch] 
};

export default useAdmin;