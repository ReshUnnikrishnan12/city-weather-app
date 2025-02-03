import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { ImageService } from '../services/image.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent {
  weatherData: any = {};
  cityName: string = '';
  backgroundImage: string = '';
  forecastData: any[] = [];
  backgroundClass: string = '';
  weatherIconBaseUrl = environment.weatherIconBaseUrl;
  errorMessage: string = '';


  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private imageService: ImageService) {}

  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {
      this.cityName = params.get('city') || '';
      if (this.cityName) {
        this.getWeatherData();
        this.getCityImage();
        this.getForecastData();
      }
    });
    
  }

  getWeatherData() {
    this.weatherService.getWeather(this.cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.setWeatherBackground();
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        this.errorMessage = 'Unable to fetch weather data. Please try again later.';
      }
    });
  }

  getCityImage() {
    this.imageService.getCityImage(this.cityName).subscribe({
      next: (imageUrl) => {
        this.backgroundImage = imageUrl;
      },
      error: (err) => {
        console.error('Error fetching city image:', err);
        this.backgroundImage = 'assets/default-background.jpg'; // Fallback image
      }
    });
  }

  getForecastData() {
    this.weatherService.getWeatherForecast(this.cityName).subscribe({
      next: (data) => {
        this.forecastData = data.daily ? data.daily.slice(0, 7) : [];
      },
      error: (err) => {
        console.error('Error fetching forecast data:', err);
        this.errorMessage = 'Unable to fetch forecast data. Please try again later.';
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `${this.weatherIconBaseUrl}${iconCode}@2x.png`;
  }

  setWeatherBackground() {
    const weatherCondition = this.weatherData.weather[0].main.toLowerCase(); 
    this.backgroundClass = this.getWeatherBackground(weatherCondition);
  }

  getWeatherBackground(condition: string): string {
    const weatherBackgrounds = {
      clear: "clear-sky",
      clouds: 'cloudy',
      rain: 'rainy',
      snow: 'snowy',
      thunderstorm: 'thunderstorm',
      mist: 'misty',
    };

    return weatherBackgrounds[condition as keyof typeof weatherBackgrounds] || 'default'; 
  }
}
