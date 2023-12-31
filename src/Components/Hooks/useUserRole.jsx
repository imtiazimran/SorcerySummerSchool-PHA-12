import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, isError, data: userRole } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axios.get(`https://summer-camp-server-weld.vercel.app/users/admin/${user?.email}`);
      return res.data;
    }
  });

  return { isLoading, isError, userRole }; // Return an object instead of an array
};

export default useUserRole;
