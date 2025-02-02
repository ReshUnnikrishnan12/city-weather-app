import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchCityComponent } from './search-city.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

describe('SearchCityComponent', () => {
  let component: SearchCityComponent;
  let fixture: ComponentFixture<SearchCityComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCityComponent],
      imports: [RouterTestingModule,
        MatFormFieldModule, 
        MatInputModule,
        MatIconModule,
        FormsModule,
        NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCityComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty cityName', () => {
    expect(component.cityName).toBe('');
  });

  it('should update cityName when input changes', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'London';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.cityName).toBe('London');
  });

  it('should navigate to the correct route when searchCity is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.cityName = 'Paris';
    component.searchCity();

    expect(navigateSpy).toHaveBeenCalledWith(['/weather', 'Paris']);
  });
});