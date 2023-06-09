import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useInstructors = () => {
    const { isLoading, isError, data: instructors = [], error } = useQuery({
        queryKey: ['Instructors'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/instructors');
            console.log(res);
            return res.data;
        },
    });
    
    return [isLoading, isError, instructors, error]
};

export default useInstructors;