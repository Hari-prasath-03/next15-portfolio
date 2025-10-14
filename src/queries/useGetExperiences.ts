import { useQuery } from "@tanstack/react-query";

export default function useGetExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: () => fetch("api/experience").then((res) => res.json()),
  });
}
