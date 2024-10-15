type Flag = {
  svg: string;
  png: string;
};

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  iso639_1?: string;
  iso639_2: string;
  name: string;
  nativeName?: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
};

type Translations = {
  [key: string]: string | undefined; // Allow values to be string or undefined
};

export type Country = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital?: string;
  altSpellings?: string[];
  subregion: string;
  region: string;
  population: number;
  latlng?: number[];
  demonym: string;
  area?: number;
  timezones: string[];
  borders?: string[];
  nativeName: string;
  numericCode: string;
  flags: Flag;
  currencies?: Currency[];
  languages: Language[];
  translations: Translations; // This is now flexible to handle undefined
  flag: string;
  regionalBlocs?: RegionalBloc[];
  cioc?: string;
  independent: boolean;
};
