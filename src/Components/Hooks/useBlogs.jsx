import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBlogs = () => {
    const { isLoading, isError, data: blogs } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axios.get("https://summer-camp-server-weld.vercel.app/blogs");
            console.log(res);
            return res.data;
        }
    });

    return { isLoading, isError, blogs }; // Return an object instead of an array
};
export default useBlogs;