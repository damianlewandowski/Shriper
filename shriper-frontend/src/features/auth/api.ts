import axios from "@/axiosInstance";
import type { UserDto } from "@/generated-types";
import queryClient from "@/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const GET_ME = "GET_ME";

async function getMe() {
  const res = await axios.get<UserDto>("/api/auth/me");
  return res.data;
}

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: [GET_ME],
    queryFn: getMe,
  });
};

export async function logout() {
  const res = await axios.post("/api/auth/logout");
  return res.data;
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await logout();
      // if (!response.ok) {
      // throw new Error("Logout failed");
      // const errorData = await response.json();
      // throw new Error(errorData?.message || "Logout failed");
      // }
      // return response.json(); // Or response.text() if your backend returns plain text
      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [GET_ME] }); // Assuming you have a query with the key 'me' to fetch user info
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
      // Optionally display an error message to the user
    },
  });
};
