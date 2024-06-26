import { useQuery } from "@tanstack/react-query";
import { getSupporter } from "../lib/Api/noteApi";
export const useGetSupporters = (slug) => {
  const { data, isLoading, isError, isPending, isSuccess } = useQuery({
    queryKey: ["supporter", slug],
    queryFn: () => getSupporter(slug),
  });

  return { data, isLoading, isError, isPending, isSuccess };
};
