import data from "../assets/data.json";
import { useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useCountry } from "../context/CountriesProvider";

export function SearchBar() {
  const { setCountries, filterRegion, setSearchCountry, searchCountry } =
    useCountry();

  const debounceSearchCountry = useDebounce(searchCountry);

  useEffect(() => {
    if (debounceSearchCountry) {
      const regex = new RegExp(debounceSearchCountry, "i");
      setCountries((countries) => {
        return countries.filter((country) => {
          if (regex.test(country.name)) {
            if (filterRegion && filterRegion === country.region) {
              return true;
            }
            return true; // Match by name but no region filtering
          }
          return false; // No match for country name
        });
      });
      setSearchCountry(debounceSearchCountry);
    } else {
      setCountries(() => {
        const filteredRegion = filterRegion
          ? data.filter((country) => country.region === filterRegion)
          : data; // If no filterRegion, return all countries
        return filteredRegion;
      });
      setSearchCountry(undefined);
    }
  }, [
    debounceSearchCountry,
    filterRegion,
    data,
    setCountries,
    setSearchCountry,
  ]);

  return (
    <form
      className="flex items-center px-10 py-4 rounded-md shadow-md bg-element gap-7 "
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <svg
        className="text-text size-7"
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        ></path>
      </svg>
      <label htmlFor="search-bar" className="sr-only">
        Search for a country
      </label>
      <input
        className="w-full bg-transparent outline-none text-text"
        type="text"
        id="search-bar"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        onChange={(e) => setSearchCountry(e.target.value)}
      />
    </form>
  );
}
