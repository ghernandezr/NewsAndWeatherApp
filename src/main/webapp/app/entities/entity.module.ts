import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.CityNewsAndWeatherAuthorModule),
      },
      {
        path: 'city',
        loadChildren: () => import('./city/city.module').then(m => m.CityNewsAndWeatherCityModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.CityNewsAndWeatherNewsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CityNewsAndWeatherEntityModule {}
