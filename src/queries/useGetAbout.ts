import { useQuery } from "@tanstack/react-query";

export default function useGetAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => fetch("api/about").then((res) => res.json()),
  });
}
