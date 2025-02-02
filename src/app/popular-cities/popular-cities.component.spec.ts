import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ImageService } from '../services/image.service';
import { PopularCitiesComponent } from './popular-cities.component';
import { MatCardModule } from '@angular/material/card';

describe('PopularCitiesComponent', () => {
  let component: PopularCitiesComponent;
  let fixture: ComponentFixture<PopularCitiesComponent>;
  let router: Router;
  let imageService: jasmine.SpyObj<ImageService>;

  beforeEach(async () => {
    const imageServiceSpy = jasmine.createSpyObj('ImageService', ['getCityImage']);
    imageServiceSpy.getCityImage.and.returnValue(of('mock-image-url'));
    await TestBed.configureTestingModule({
      declarations: [PopularCitiesComponent],
      imports: [RouterTestingModule,
      MatCardModule],
      providers: [
        { provide: ImageService, useValue: imageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCitiesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    imageService = TestBed.inject(ImageService) as jasmine.SpyObj<ImageService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct popularCities data', () => {
    expect(component.popularCities.length).toBe(10);
    expect(component.popularCities[0].name).toBe('Vancouver');
    expect(component.popularCities[1].name).toBe('Los Angeles');
    expect(component.popularCities[2].name).toBe('London');
  });

  it('should navigate to the correct route when navigateToCityWeather is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); 
    const cityName = 'Paris';

    component.navigateToCityWeather(cityName);

    expect(navigateSpy).toHaveBeenCalledWith(['/weather', cityName]);
  });

  it('should update the image property of each city', () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    imageService.getCityImage.and.returnValue(of(mockImageUrl));

    component.ngOnInit();

    component.popularCities.forEach(city => {
      expect(city.image).toBe(mockImageUrl);
    });
  });
});