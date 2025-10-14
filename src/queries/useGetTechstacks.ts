import { useQuery } from "@tanstack/react-query";

export default function useGetTechstacks() {
  return useQuery({
    queryKey: ["techstacks"],
    queryFn: () => fetch("api/techstacks").then((res) => res.json()),
  });
}
