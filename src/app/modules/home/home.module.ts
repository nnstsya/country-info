import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeCountryWidgetComponent } from './home-page/componets/home-country-widget/home-country-widget.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CountryService } from '@services/country.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@NgModule({
  declarations: [HomePageComponent, HomeCountryWidgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
      },
    ]),
    AsyncPipe,
    ReactiveFormsModule,
    MatDivider,
    MatFormField,
    MatInput,
  ],
  providers: [CountryService],
})
export class HomeModule {}
