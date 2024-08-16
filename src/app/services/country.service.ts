import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, take } from 'rxjs';
import {
  CountryModel,
  HolidayModel,
  FullCountryInfoModel,
  ExtendedCountryInfoModel,
} from '@models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = process.env['API_URL'];
  private http = inject(HttpClient);

  getAll(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(this.baseUrl + '/AvailableCountries');
  }

  get(countryCode: string): Observable<ExtendedCountryInfoModel> {
    return this.http.get<ExtendedCountryInfoModel>(
      this.baseUrl + `/CountryInfo/${countryCode}`
    );
  }

  getNextHolidays(countryCode: string): Observable<HolidayModel[]> {
    return this.http.get<HolidayModel[]>(
      this.baseUrl + `/NextPublicHolidays/${countryCode}`
    );
  }

  getHolidays(countryCode: string, year: number): Observable<HolidayModel[]> {
    return this.http.get<HolidayModel[]>(
      this.baseUrl + `/PublicHolidays/${year}/${countryCode}`
    );
  }

  getRandomThree(): Observable<FullCountryInfoModel[]> {
    return this.getAll().pipe(
      map((countries: CountryModel[]) => {
        const shuffled = countries.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
      }),
      switchMap((selectedCountries: CountryModel[]) => {
        return forkJoin(
          selectedCountries.map(country => this.getNearestHoliday(country))
        );
      }),
      take(1)
    );
  }

  private getNearestHoliday(
    country: CountryModel
  ): Observable<FullCountryInfoModel> {
    return this.getNextHolidays(country.countryCode).pipe(
      map((holidays: HolidayModel[]): FullCountryInfoModel => {
        const holiday = holidays[0];
        return {
          countryName: country.name,
          countryCode: country.countryCode,
          holidaysInfo: [
            {
              date: holiday.date,
              name: holiday.name,
              types: holiday.types,
            },
          ],
        };
      })
    );
  }

  getFullCountryInfo(
    countryCode: string,
    year: number
  ): Observable<FullCountryInfoModel> {
    return this.get(countryCode).pipe(
      switchMap((country: ExtendedCountryInfoModel) =>
        this.getHolidays(countryCode, year).pipe(
          map((holidays: HolidayModel[]): FullCountryInfoModel => {
            return {
              countryName: country.commonName,
              countryCode: country.countryCode,
              holidaysInfo: holidays.map(holiday => ({
                date: holiday.date,
                name: holiday.name,
                types: holiday.types,
              })),
            };
          })
        )
      )
    );
  }
}
