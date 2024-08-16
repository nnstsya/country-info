import { Component } from '@angular/core';
import { CountryService } from '@services/country.service';
import { catchError, finalize, Observable, of } from 'rxjs';
import { FullCountryInfoModel } from '@models/country.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-details-page',
  templateUrl: './country-details-page.component.html',
  styleUrl: './country-details-page.component.scss',
})
export class CountryDetailsPageComponent {
  countryCode: string = this.route.snapshot.paramMap.get('countryCode')!;
  columnsId: string[] = ['date', 'holiday', 'type'];
  years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  hasError = false;
  selectedYear: number = new Date().getFullYear();
  country$: Observable<FullCountryInfoModel | null> = this.countryService
    .getFullCountryInfo(this.countryCode!, this.selectedYear)
    .pipe(
      catchError(() => {
        this.hasError = true;
        return of(null);
      })
    );
  yearSelect = new FormControl(this.selectedYear);

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  onYearChange(year: number): void {
    this.country$ = this.countryService.getFullCountryInfo(
      this.countryCode,
      year
    );
  }
}
