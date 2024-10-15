import data from "../assets/data.json";
import arrowLeft from "../assets/images/arrow.png";
import { Link, useParams } from "react-router-dom";
import { Country } from "../models/Country";
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";

export default function CountryDetails() {
  const { countryId } = useParams(); // Access the param
  const {
    flags,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = data.find(
    (country) => country.name === countryId || country.alpha3Code === countryId
  ) as Country;
  const { theme } = useTheme();

  return (
    <article className="min-h-full py-10 px-7 xl:py-20">
      <div className="grid gap-16 md:mx-auto md:container">
        <Link
          className="flex items-center gap-3 py-2 rounded-md shadow-md px-7 bg-element max-w-max text-text"
          to="/"
        >
          <img
            className={`size-6 ${theme === "dark" && "invert"}`}
            src={arrowLeft}
            alt="Arow left icon"
            aria-hidden
          />
          Back
        </Link>

        <div className="grid gap-10 md:grid-cols-2 md:max-h-max md:gap-10 lg:gap-20">
          <picture>
            <source srcSet={flags.svg} type="image/svg+xml" />
            <motion.img
              className="object-cover w-full h-full shadow-md max-h-[25rem]"
              src={flags.png}
              alt={`Flag of the ${name}`}
              initial={{ translateX: "-100%", opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </picture>
          <div className="self-center">
            <header className="mb-5 text-xl font-extrabold md:text-2xl text-text">
              <h2>{name}</h2>
            </header>
            <ul className="grid gap-10 sm:grid-cols-2 ">
              <div className="space-y-3">
                <li className="font-light text-text">
                  <span className="font-semibold">Native Name: </span>
                  {nativeName}
                </li>
                <li className="font-light text-text">
                  <span className="font-semibold text-text">Population: </span>
                  {population}
                </li>
                <li className="font-light text-text">
                  <span className="font-semibold text-text">Region: </span>
                  {region}
                </li>
                <li className="font-light text-text">
                  <span className="font-semibold text-text">Sub Region: </span>
                  {subregion}
                </li>
                <li className="font-light text-text">
                  <span className="font-semibold text-text">Capital: </span>
                  {capital}
                </li>
              </div>
              <div className="space-y-3">
                <li className="font-light text-text">
                  <span className="font-semibold text-text">
                    To Level Domain:{" "}
                  </span>
                  {topLevelDomain}
                </li>
                {currencies && (
                  <li className="font-light text-text">
                    <span className="font-semibold text-text">
                      Currencies:{" "}
                    </span>
                    {currencies[0].name}
                  </li>
                )}
                <li className="font-light text-text">
                  <span className="font-semibold text-text">Languages: </span>
                  {languages.map((language, index) => (
                    <React.Fragment key={index}>
                      {language.name}
                      {index < languages.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </li>
              </div>

              <li className="grid col-span-2 gap-4 text-text">
                <span className="text-lg font-semibold text-text">
                  Border Countries:
                </span>
                {borders ? (
                  <ul
                    className={`grid ${
                      borders.length > 1 ? "gap-3 auto-fit" : ""
                    }`}
                  >
                    {borders.map((border, index) => (
                      <li className="px-8 py-1.5 bg-element shadow-md rounded-sm text-center">
                        <Link to={`/country/${border}`} key={index}>
                          {border}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  " No borders..."
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
