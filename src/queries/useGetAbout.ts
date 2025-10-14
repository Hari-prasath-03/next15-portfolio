import { useQuery } from "@tanstack/react-query";

export default function useGetAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/about`).then((res) =>
        res.json()
      ),
  });
}
