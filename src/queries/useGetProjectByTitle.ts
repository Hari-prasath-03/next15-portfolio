import { useQuery } from "@tanstack/react-query";

export default function useGetProjectByTitle<T>(title: string) {
  return useQuery<T>({
    queryKey: ["project", title],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${title}`)
        .then((res) => res.json())
        .catch(() => undefined),
    enabled: !!title,
  });
}
