import { useQuery } from "@tanstack/react-query";

export function useGetSocials() {
  return useQuery({
    queryKey: ["socials"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/socials`).then((res) =>
        res.json()
      ),
  });
}
