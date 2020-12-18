import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CityNewsAndWeatherSharedModule } from 'app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';
import { NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { newsRoute } from './news.route';
import { NewsCardComponent } from './news-card/news-card.component';

@NgModule({
  imports: [CityNewsAndWeatherSharedModule, RouterModule.forChild(newsRoute)],
  declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsCardComponent],
  entryComponents: [NewsDeleteDialogComponent],
})
export class CityNewsAndWeatherNewsModule {}
