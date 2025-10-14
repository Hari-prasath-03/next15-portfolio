import { useQuery } from "@tanstack/react-query";

export default function useGetTechstacks() {
  return useQuery({
    queryKey: ["techstacks"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/techstacks`).then((res) =>
        res.json()
      ),
  });
}
