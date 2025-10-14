import { useQuery } from "@tanstack/react-query";

export default function useGetExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/experience`).then((res) =>
        res.json()
      ),
  });
}
