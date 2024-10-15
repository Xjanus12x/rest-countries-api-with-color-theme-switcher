import data from "../assets/data.json";
import { useCountry } from "../context/CountriesProvider";

export default function RegionFilterDropdown() {
  const { setCountries, setRegionFilter, searchCountry } = useCountry();

  return (
    <div className="relative flex items-center justify-center px-4 overflow-hidden rounded-lg shadow-md w-52 md:w-64 bg-element">
      <label
        className="sr-only"
        htmlFor="dropdown-filter" // Use htmlFor for label
      >
        Filter by Region
      </label>
      <select
        id="dropdown-filter"
        className="w-full p-0 py-4 m-0 font-semibold border-none outline-none bg-element text-text"
        onChange={(e) => {
          const region = e.target.value;

          if (region) {
            const filteredCountries = data.filter((country) => {
              if (searchCountry) {
                const regex = new RegExp(searchCountry, "i");
                return regex.test(country.name) && country.region === region;
              }
              return country.region === region;
            });
            setCountries(filteredCountries);
            setRegionFilter(region);
          } else {
            setCountries(data);
            setRegionFilter(undefined);
          }
        }}
        aria-labelledby="dropdown-filter"
      >
        <option value="">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
