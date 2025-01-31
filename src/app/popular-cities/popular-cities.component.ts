import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-popular-cities',
  templateUrl: './popular-cities.component.html',
  styleUrls: ['./popular-cities.component.css']
})
export class PopularCitiesComponent implements OnInit{
  popularCities = [
    { name: 'Vancouver', country: 'Canada', image: '' },
    { name: 'Los Angeles', country: 'United States', image: '' },
    { name: 'London', country: 'United Kingdom', image: '' },
    { name: 'Seattle', country: 'United States', image: '' },
    { name: 'Mumbai', country: 'India', image: '' },
    { name: 'Las Vegas', country: 'United States', image: '' },
    { name: 'Paris', country: 'France', image: '' },
    { name: 'Rome', country: 'Italy', image: '' },
    { name: 'Sydney', country: 'Australia', image: '' },
    { name: 'Montreal', country: 'Canada', image: '' },
  ];

  constructor(private router: Router, private imageService: ImageService) {}

  ngOnInit(): void {
    this.popularCities.forEach(city => {
      this.imageService.getCityImage(city.name).subscribe(imageUrl => {
        city.image = imageUrl;
      });
    });
  }

  navigateToCityWeather(cityName: string) {
    this.router.navigate(['/weather', cityName]);
  }
}
