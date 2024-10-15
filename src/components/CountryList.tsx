import { Link } from "react-router-dom";
import { useCountry } from "../context/CountriesProvider";
import RegionFilterDropdown from "../ui/RegionFilterDropdown";
import { SearchBar } from "../ui/SearchBar";
import { AnimatePresence, motion } from "framer-motion";

export function CountryList() {
  const { countries } = useCountry();

  return (
    <section role="region" aria-label="Country information">
      <div className="container pt-10 mx-auto">
        <div className="flex flex-col gap-10 mx-4 sm:flex-row sm:items-center sm:justify-between lg:mx-12">
          <SearchBar />
          <RegionFilterDropdown />
        </div>
      </div>
      {countries.length > 0 ? (
        <motion.ul
          className="container grid gap-10 px-12 py-8 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:mx-auto xl:py-10 md:gap-12"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // This controls the stagger timing
              },
            },
          }}
        >
          <AnimatePresence>
            {countries.map(({ name, flags, population, region, capital }) => {
              return (
                <motion.li
                  className="overflow-hidden rounded-md shadow-md bg-element"
                  key={name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Link to={`/country/${name}`}>
                    <CountryInfoCard
                      name={name}
                      flags={flags}
                      population={population}
                      region={region}
                      capital={capital}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="container px-12 py-12 mx-auto text-lg font-medium text-center text-gray-500">
          Sorry, we couldn’t find any results for your search. <br />
          Try adjusting your search or explore other countries!
        </p>
      )}
    </section>
  );
}

type CountryInfoCardProps = {
  name: string;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  region: string;
  capital?: string;
};
function CountryInfoCard({
  name,
  flags,
  population,
  region,
  capital,
}: CountryInfoCardProps) {
  return (
    <article>
      <header>
        <picture>
          <source srcSet={flags.svg} type="image/svg+xml" />
          <img
            className="object-cover w-full h-40 sm:h-60"
            src={flags.png}
            alt={`Flag of the ${name}`}
          />
        </picture>
      </header>
      <div className="p-5 pb-10 space-y-3">
        <h2 className="text-xl font-extrabold text-text">{name}</h2>
        <ul className="space-y-1 text-text">
          <li className="font-light">
            <span className="font-semibold">Population:</span> {population}
          </li>
          <li className="font-light">
            <span className="font-semibold">Region:</span> {region}
          </li>
          <li className="font-light">
            <span className="font-semibold">Capital:</span> {capital}
          </li>
        </ul>
      </div>
    </article>
  );
}
