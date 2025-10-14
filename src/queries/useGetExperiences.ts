import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: () => axiosInstance.get("/experience").then((res) => res.data),
  });
}
