import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useInstructors = () => {
    const accessToken = localStorage.getItem("access-token");
    const { isLoading, isError, data: instructors = [], error } = useQuery({
        queryKey: ['Instructors'],
        queryFn: async () => {
            const res = await axios.get('https://summer-camp-server-weld.vercel.app/instructors',{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  }
            });
            return res.data;
        },
    });
    
    return {isLoading, isError, instructors, error}
};

export default useInstructors;