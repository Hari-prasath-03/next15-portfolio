import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => axiosInstance.get("/about").then((res) => res.data),
  });
}
