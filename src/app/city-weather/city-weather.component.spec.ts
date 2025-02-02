import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherComponent } from './city-weather.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherService } from '../services/weather.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CityWeatherComponent', () => {
  let component: CityWeatherComponent;
  let fixture: ComponentFixture<CityWeatherComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      declarations: [ CityWeatherComponent ],
      imports: [RouterTestingModule,
        MatFormFieldModule, 
        MatInputModule,
        MatIconModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherComponent);
    component = fixture.componentInstance;

    mockWeatherService.getWeather.and.returnValue(of({"coord":{"lon":-123.1193,"lat":49.2497},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":3.2,"feels_like":1.02,"temp_min":2.08,"temp_max":3.9,"pressure":1010,"humidity":83,"sea_level":1010,"grnd_level":1001},"visibility":10000,"wind":{"speed":2.24,"deg":176,"gust":4.92},"clouds":{"all":100},"dt":1738458999,"sys":{"type":2,"id":2011597,"country":"CA","sunrise":1738424596,"sunset":1738458533},"timezone":-28800,"id":6173331,"name":"Vancouver","cod":200}));
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display city name and country', (done) => {
    const mockWeatherData = {
      coord: { lon: -123.1193, lat: 49.2497 },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
      base: 'stations',
      main: {
        temp: 3.2,
        feels_like: 1.02,
        temp_min: 2.08,
        temp_max: 3.9,
        pressure: 1010,
        humidity: 83,
        sea_level: 1010,
        grnd_level: 1001,
      },
      visibility: 10000,
      wind: { speed: 2.24, deg: 176, gust: 4.92 },
      clouds: { all: 100 },
      dt: 1738458999,
      sys: { type: 2, id: 2011597, country: 'CA', sunrise: 1738424596, sunset: 1738458533 },
      timezone: -28800,
      id: 6173331,
      name: 'Vancouver',
      cod: 200,
    };
  
    mockWeatherService.getWeather.and.returnValue(of(mockWeatherData));
    component.weatherData = mockWeatherData;
    
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {

      const cityAndCountryElement = fixture.nativeElement.querySelector('.weather-info h2');
  
      expect(cityAndCountryElement).toBeTruthy();
  
      expect(cityAndCountryElement.textContent).toContain('Vancouver');
      expect(cityAndCountryElement.textContent).toContain('CA');
  
      done();
    });
  });
});
