import { NgModule } from '@angular/core';
import { CityNewsAndWeatherSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { LocationComponent } from './components/location/location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CityNewsAndWeatherSharedLibsModule, FormsModule, ReactiveFormsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    LocationComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    CityNewsAndWeatherSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    LocationComponent,
  ],
})
export class CityNewsAndWeatherSharedModule {}
