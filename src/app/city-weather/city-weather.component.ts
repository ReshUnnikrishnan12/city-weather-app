import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { ImageService } from '../services/image.service';

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


  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private imageService: ImageService) {}

  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {
      this.cityName = params.get('city') || '';
      if (this.cityName) {
        this.weatherService.getWeather(this.cityName).subscribe(data => {
          if (data) {
            this.weatherData = data;
            this.setWeatherBackground();
          }
        });
        this.imageService.getCityImage(this.cityName).subscribe(imageUrl => {
          this.backgroundImage = imageUrl;
        });
        this.weatherService.getWeatherForecast(this.cityName).subscribe(data => {
          
          this.forecastData = data.daily.slice(0, 7);
        });
      }
    });
    
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
