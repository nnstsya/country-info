export interface CountryModel {
  countryCode: string;
  name: string;
}

export interface ExtendedCountryInfoModel {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: ExtendedCountryInfoModel[];
}

export interface HolidayModel {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: string[];
}

export interface FullCountryInfoModel {
  countryName: string;
  countryCode: string;
  holidaysInfo: HolidaysShortInfoModel[];
}

export interface HolidaysShortInfoModel {
  date: string;
  name: string;
  types: string[];
}
