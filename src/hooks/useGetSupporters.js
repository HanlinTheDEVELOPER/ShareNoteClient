import { useQuery } from "@tanstack/react-query";
import { getSupporter } from "../lib/Api/noteApi";
export const useGetSupporters = (slug) => {
  console.log(slug);
  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["supporter", slug],
    queryFn: () => getSupporter(slug),
  });

  return { data, isLoading, isError, isPending };
};
