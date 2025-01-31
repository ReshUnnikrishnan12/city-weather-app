import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'weather/:city', component: CityWeatherComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
