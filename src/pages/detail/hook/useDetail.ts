import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CallingCode, Country, Currencies } from "~/@types";
import { getCallingCode, getCurrencies, getDetailCountry } from "../service";

export const useDetail = () => {
  const router = useRouter();
  const { data: detailData } = useQuery<Country>({
    queryFn: () => getDetailCountry(router.query.country as unknown as string),
    queryKey: ["detail", router.query.country],
    enabled: !!router.query.country,
    staleTime: Infinity,
  });

  const { data: currencies } = useQuery<Currencies>({
    queryFn: () => getCurrencies(router.query.currencies as unknown as string),
    queryKey: ["currencies", router.query.currencies],
    enabled: !!router.query.currencies,
    staleTime: Infinity,
  });

  const { data: callingCode } = useQuery<CallingCode>({
    queryFn: () =>
      getCallingCode(router.query.callingCode as unknown as string),
    queryKey: ["callingCode", router.query.callingCode],
    enabled: !!router.query.callingCode,
    staleTime: Infinity,
  });

  return { detailData, currencies, callingCode };
};
