import { useEffect } from "react";
import useUserAuth from "@/store/useUserAuth";
import { ME_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import { User } from "@/types/loginResponse";

export const useAuthSync = () => {
  const token = useUserAuth((state) => state.token);
  const user = useUserAuth((state) => state.user);
  const updateUser = useUserAuth((state) => state.updateUser);
  const logout = useUserAuth((state) => state.logout);

  const { data, error } = useQuery<{ me: { data: Partial<User> } }>(ME_QUERY, {
    skip: !token || !!user, // Professional optimization: Skip if we already have the user data
    context: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  useEffect(() => {
    if (data?.me?.data) {
      updateUser(data.me.data);
    }

    // If the token is invalid (401), logout automatically
    if (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  }, [data, error, updateUser, logout]);
};
