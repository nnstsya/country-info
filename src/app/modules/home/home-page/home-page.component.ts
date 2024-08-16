import { Component } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { CountryModel } from '@models/country.model';
import { CountryService } from '@services/country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  searchControl = new FormControl('');
  countries$: Observable<CountryModel[]> = combineLatest([
    this.countryService.getAll(),
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([countries, searchTerm]) => {
      return countries.filter(country =>
        country.name.toLowerCase().startsWith(searchTerm!.trim().toLowerCase())
      );
    })
  );

  constructor(private countryService: CountryService) {}
}
