import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetProjectByTitle<T>(title: string) {
  return useQuery<T>({
    queryKey: ["project", title],
    queryFn: () =>
      axiosInstance
        .get(`/projects/${title}`)
        .then((res) => res.data)
        .catch(() => undefined),
    enabled: !!title,
  });
}
