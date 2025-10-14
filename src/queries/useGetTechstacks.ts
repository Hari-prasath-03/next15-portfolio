import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetTechstacks() {
  return useQuery({
    queryKey: ["techstacks"],
    queryFn: () => axiosInstance.get("/techstacks").then((res) => res.data),
  });
}
