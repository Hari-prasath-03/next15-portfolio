import { useQuery } from "@tanstack/react-query";

export default function useGetProjectByTitle<T>(title: string) {
  return useQuery<T>({
    queryKey: ["project", title],
    queryFn: () => fetch(`/api/projects/${title}`).then((res) => res.json()),
    enabled: !!title,
  });
}
