import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCart = () => {
    const { user } = useContext(AuthContext)

    const { isLoading, isError, data: cart = [], error, refetch } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4214/cart?email=${user.email}`)
            return res.data
        }
    })
    return [isLoading, isError, cart, error, refetch];
};

export default useCart;