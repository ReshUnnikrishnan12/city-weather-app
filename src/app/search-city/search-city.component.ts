import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent {
  cityName: string = '';
  @Output() citySelected = new EventEmitter<string>();

  constructor(private router: Router) {}

  searchCity() {
    console.log("inside search");
    this.router.navigate(['/weather', this.cityName]);
  }

}
