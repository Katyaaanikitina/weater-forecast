import { NgModule } from '@angular/core';
import { ForecastRoutingModule } from './forecast-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DayCardComponent } from './components/day-card/day-card.component';
import { SearchComponent } from './components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MainPageComponent,
    DayCardComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule
  ]
})
export class ForecastModule { }