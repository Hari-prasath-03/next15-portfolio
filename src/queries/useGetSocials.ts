import { useQuery } from "@tanstack/react-query";

export function useGetSocials() {
  return useQuery({
    queryKey: ["socials"],
    queryFn: () => fetch("api/socials").then((res) => res.json()),
  });
}
