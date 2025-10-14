import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useGetSocials() {
  return useQuery({
    queryKey: ["socials"],
    queryFn: () => axiosInstance.get("/socials").then((res) => res.data),
  });
}
