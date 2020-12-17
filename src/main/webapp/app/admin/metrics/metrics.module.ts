import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CityNewsAndWeatherSharedModule } from 'app/shared/shared.module';

import { MetricsComponent } from './metrics.component';

import { metricsRoute } from './metrics.route';

@NgModule({
  imports: [CityNewsAndWeatherSharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [MetricsComponent],
})
export class MetricsModule {}
