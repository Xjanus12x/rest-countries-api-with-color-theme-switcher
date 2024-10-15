import data from "../assets/data.json";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Country } from "../models/Country";

type ContriesContextType = {
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  searchCountry?: string;
  setSearchCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterRegion?: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const CountriesContext = createContext<ContriesContextType | null>(null);

export function useCountry() {
  const context = useContext(CountriesContext);

  if (!context) {
    throw new Error("useCountry must be used within a CountriesProvider");
  }

  return {
    countries: context.countries,
    setCountries: context.setCountries,
    searchCountry: context.searchCountry,
    setSearchCountry: context.setSearchCountry,
    filterRegion: context.filterRegion,
    setRegionFilter: context.setRegionFilter,
  };
}

type CountriesProviderProps = PropsWithChildren & {};
export function CountriesProvider({ children }: CountriesProviderProps) {
  const [countries, setCountries] = useState<Country[]>(data);
  const [searchCountry, setSearchCountry] = useState<string | undefined>();
  const [filterRegion, setRegionFilter] = useState<string | undefined>();

  return (
    <CountriesContext.Provider
      value={{
        countries,
        setCountries,
        searchCountry,
        setSearchCountry,
        filterRegion,
        setRegionFilter,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
