import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FullCountryInfoModel } from '@models/country.model';
import { CountryService } from '@services/country.service';

@Component({
  selector: 'app-home-country-widget',
  templateUrl: './home-country-widget.component.html',
  styleUrl: './home-country-widget.component.scss',
})
export class HomeCountryWidgetComponent {
  randomCountries$: Observable<FullCountryInfoModel[]> =
    this.countryService.getRandomThree();

  constructor(private countryService: CountryService) {}
}
