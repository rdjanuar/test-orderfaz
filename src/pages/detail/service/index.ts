import { CallingCode, Country, Currencies, Currency } from "~/@types";
import { http } from "~/lib";

export const getDetailCountry = async (name: string) => {
  const data = await http<Country>("GET", {
    url: `name/${name}`,
    params: {
      fullText: true,
    },
  });

  return data;
};

export const getCurrencies = async (currencies: string) => {
  const data = await http<Currencies>("GET", {
    baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
    url: `currency/${currencies}`,
  });

  return data;
};

export const getCallingCode = async (callingCode: string) => {
  const data = await http<CallingCode>("GET", {
    baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
    url: `callingcode/${callingCode}`,
  });

  return data;
};
